// =============================================================
// HOUSE OF RAKHI — ADMIN PANEL LOGIC
// This file is only loaded by admin.html, which is never linked
// from the public site. All real access control lives in Supabase
// RLS (03_admin_lockdown.sql) — the checks here are just so the UI
// behaves sensibly; they are not the security boundary.
// =============================================================

const ADMIN_EMAIL = 'rajarajeshwarastore@gmail.com';
const supabaseClient = window.supabaseClient;

if (!supabaseClient) {
  throw new Error('Supabase client was not initialized. Check supabase-config.js.');
}

const CATEGORY_PREFIX = {
  'God Rakhi': 'GOD',
  'Designer Rakhi': 'DES',
  'Kids Rakhi': 'KID',
  'Premium Rakhi': 'PRM',
  'Handmade Rakhi': 'HAN',
  'Bracelet Rakhi': 'BRO',
  'Silver Rakhi': 'SIL',
  'Stone Rakhi': 'STN',
};

// ---------- DOM refs ----------
const loginScreen = document.getElementById('loginScreen');
const adminMain = document.getElementById('adminMain');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const whoLabel = document.getElementById('whoLabel');

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

const productsTableWrap = document.getElementById('productsTableWrap');
const productSearch = document.getElementById('productSearch');
const addProductBtn = document.getElementById('addProductBtn');

const ordersTableWrap = document.getElementById('ordersTableWrap');
const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');

const productModalBackdrop = document.getElementById('productModalBackdrop');
const productForm = document.getElementById('productForm');
const productModalTitle = document.getElementById('productModalTitle');
const cancelProductBtn = document.getElementById('cancelProductBtn');
const productFormStatus = document.getElementById('productFormStatus');

let allProducts = [];

// ---------- AUTH ----------
async function checkSession() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session && session.user?.email === ADMIN_EMAIL) {
    showAdmin(session.user.email);
  } else {
    if (session && session.user?.email !== ADMIN_EMAIL) {
      await supabaseClient.auth.signOut();
    }
    showLogin();
  }
}

function showLogin() {
  loginScreen.style.display = 'flex';
  adminMain.style.display = 'none';
  logoutBtn.style.display = 'none';
  whoLabel.textContent = '';
  // Force-clear the fields every time the login screen is shown.
  // Nothing in this project hardcodes credentials — this only exists
  // to override the browser's own autofill/remembered-password
  // behavior, so the form never appears pre-filled.
  loginForm.reset();
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  loginError.textContent = '';
}

function showAdmin(email) {
  loginScreen.style.display = 'none';
  adminMain.style.display = 'block';
  logoutBtn.style.display = 'inline-block';
  whoLabel.textContent = email;
  loadProducts();
  loadOrders();
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginError.textContent = '';
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    loginError.textContent = 'Login failed: ' + error.message;
    return;
  }

  if (data.user?.email !== ADMIN_EMAIL) {
    await supabaseClient.auth.signOut();
    loginError.textContent = 'This account is not authorized for admin access.';
    return;
  }

  showAdmin(data.user.email);
});

logoutBtn.addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  showLogin();
});

// ---------- TABS ----------
tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    tabPanels.forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ---------- PRODUCTS: LOAD + RENDER ----------
async function loadProducts() {
  productsTableWrap.innerHTML = '<p class="loading-note">Loading products…</p>';

  const { data: products, error } = await supabaseClient
    .from('products')
    .select('*')
    .order('category', { ascending: true })
    .order('id', { ascending: true });

  if (error) {
    productsTableWrap.innerHTML = `<p class="empty-note">Could not load products: ${escapeHtml(error.message)}</p>`;
    return;
  }

  const { data: images } = await supabaseClient
    .from('product_images')
    .select('product_id, storage_path, sort_order')
    .order('sort_order', { ascending: true });

  const firstImageByProduct = {};
  (images || []).forEach((img) => {
    if (firstImageByProduct[img.product_id]) return;
    const { data } = supabaseClient.storage.from('product-images').getPublicUrl(img.storage_path);
    firstImageByProduct[img.product_id] = data?.publicUrl || '';
  });

  allProducts = (products || []).map((p) => ({ ...p, _thumb: firstImageByProduct[p.id] || '' }));
  renderProductsTable(allProducts);
}

function statusPillClass(status) {
  if (status === 'Out of Stock') return 'out';
  if (status === 'Limited Stock') return 'limited';
  return 'in-stock';
}

function renderProductsTable(products) {
  if (!products.length) {
    productsTableWrap.innerHTML = '<p class="empty-note">No products yet. Click "Add Product" to create one.</p>';
    return;
  }

  const rows = products.map((p) => {
    const tags = Array.isArray(p.tags) ? p.tags : [];
    const flagBadges = [
      p.premium ? 'premium' : null,
      p.bestseller ? 'bestseller' : null,
      p.new_arrival ? 'new' : null,
      p.featured ? 'featured' : null,
      ...tags
    ].filter(Boolean);

    return `
      <tr data-id="${escapeHtml(p.id)}">
        <td>${p._thumb ? `<img class="thumb" src="${escapeHtml(p._thumb)}" alt="" />` : '<span class="thumb" style="background:#eee;"></span>'}</td>
        <td><strong>${escapeHtml(p.id)}</strong></td>
        <td>${escapeHtml(p.name)}</td>
        <td>${escapeHtml(p.category)}</td>
        <td>₹${Number(p.price).toLocaleString('en-IN')}</td>
        <td>${p.stock}</td>
        <td><span class="pill ${statusPillClass(p.status)}">${escapeHtml(p.status)}</span></td>
        <td>${p.discount_percent || 0}%</td>
        <td><div class="flag-tags">${flagBadges.map((f) => `<span>${escapeHtml(f)}</span>`).join('')}</div></td>
        <td>
          <div class="row-actions">
            <button class="btn-primary btn-small" data-action="edit" data-id="${escapeHtml(p.id)}">Edit</button>
            <button class="btn-danger btn-small" data-action="delete" data-id="${escapeHtml(p.id)}">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  productsTableWrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Photo</th><th>ID</th><th>Name</th><th>Category</th><th>Price</th>
          <th>Stock</th><th>Status</th><th>Discount</th><th>Flags</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

productSearch.addEventListener('input', () => {
  const q = productSearch.value.trim().toLowerCase();
  if (!q) { renderProductsTable(allProducts); return; }
  const filtered = allProducts.filter((p) =>
    [p.id, p.name, p.category, p.subcategory].filter(Boolean).join(' ').toLowerCase().includes(q)
  );
  renderProductsTable(filtered);
});

productsTableWrap.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const id = btn.dataset.id;
  const product = allProducts.find((p) => p.id === id);
  if (!product) return;

  if (btn.dataset.action === 'edit') openProductModal(product);
  if (btn.dataset.action === 'delete') deleteProduct(product);
});

// ---------- PRODUCT MODAL ----------
function openProductModal(product) {
  productForm.reset();
  productFormStatus.textContent = '';
  document.getElementById('pf_image_note').textContent = '';

  if (product) {
    productModalTitle.textContent = `Edit Product — ${product.id}`;
    document.getElementById('pf_id').value = product.id;
    document.getElementById('pf_name').value = product.name || '';
    document.getElementById('pf_name_te').value = product.name_te || '';
    document.getElementById('pf_category').value = product.category || 'God Rakhi';
    document.getElementById('pf_subcategory').value = product.subcategory || '';
    document.getElementById('pf_description').value = product.description || '';
    document.getElementById('pf_description_te').value = product.description_te || '';
    document.getElementById('pf_price').value = product.price;
    document.getElementById('pf_stock').value = product.stock;
    document.getElementById('pf_status').value = product.status;
    document.getElementById('pf_discount').value = product.discount_percent || 0;

    const tags = Array.isArray(product.tags) ? product.tags : [];
    document.getElementById('pf_premium').checked = Boolean(product.premium);
    document.getElementById('pf_bestseller').checked = Boolean(product.bestseller);
    document.getElementById('pf_new_arrival').checked = Boolean(product.new_arrival);
    document.getElementById('pf_featured').checked = Boolean(product.featured);
    document.getElementById('pf_handmade').checked = tags.includes('handmade');
    document.getElementById('pf_designer').checked = tags.includes('designer');
    document.getElementById('pf_god_rakhi').checked = tags.includes('god-rakhi');
    document.getElementById('pf_wholesale').checked = tags.includes('wholesale');
  } else {
    productModalTitle.textContent = 'Add Product';
    document.getElementById('pf_id').value = '';
    document.getElementById('pf_status').value = 'In Stock';
    document.getElementById('pf_discount').value = 0;
  }

  productModalBackdrop.classList.add('open');
}

function closeProductModal() {
  productModalBackdrop.classList.remove('open');
}

cancelProductBtn.addEventListener('click', closeProductModal);
productModalBackdrop.addEventListener('click', (event) => {
  if (event.target === productModalBackdrop) closeProductModal();
});

addProductBtn.addEventListener('click', () => openProductModal(null));

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  productFormStatus.textContent = 'Saving…';
  productFormStatus.className = 'status-msg';

  const existingId = document.getElementById('pf_id').value;
  const category = document.getElementById('pf_category').value;

  const tags = [];
  if (document.getElementById('pf_handmade').checked) tags.push('handmade');
  if (document.getElementById('pf_designer').checked) tags.push('designer');
  if (document.getElementById('pf_god_rakhi').checked) tags.push('god-rakhi');
  if (document.getElementById('pf_wholesale').checked) tags.push('wholesale');
  if (document.getElementById('pf_new_arrival').checked) tags.push('new');
  if (document.getElementById('pf_bestseller').checked) tags.push('bestseller');
  if (document.getElementById('pf_premium').checked) tags.push('premium');

  const payload = {
    name: document.getElementById('pf_name').value.trim(),
    name_te: document.getElementById('pf_name_te').value.trim(),
    category,
    subcategory: document.getElementById('pf_subcategory').value.trim() || category,
    description: document.getElementById('pf_description').value.trim(),
    description_te: document.getElementById('pf_description_te').value.trim(),
    price: Number(document.getElementById('pf_price').value),
    stock: Number(document.getElementById('pf_stock').value),
    status: document.getElementById('pf_status').value,
    discount_percent: Number(document.getElementById('pf_discount').value) || 0,
    tags,
    premium: document.getElementById('pf_premium').checked,
    bestseller: document.getElementById('pf_bestseller').checked,
    new_arrival: document.getElementById('pf_new_arrival').checked,
    featured: document.getElementById('pf_featured').checked,
  };

  try {
    let productId = existingId;

    if (existingId) {
      const { error } = await supabaseClient.from('products').update(payload).eq('id', existingId);
      if (error) throw error;
    } else {
      const prefix = CATEGORY_PREFIX[category] || 'GEN';
      const { data: newId, error: idError } = await supabaseClient.rpc('generate_product_id', { category_prefix: prefix });
      if (idError) throw idError;
      productId = newId;

      const { error } = await supabaseClient.from('products').insert({ id: productId, ...payload });
      if (error) throw error;
    }

    const imageFiles = Array.from(document.getElementById('pf_image').files || []);
    if (imageFiles.length) {
      document.getElementById('pf_image_note').textContent = 'Uploading photos…';
      await uploadProductImages(productId, imageFiles);
    }

    productFormStatus.textContent = 'Saved.';
    productFormStatus.className = 'status-msg ok';
    await loadProducts();
    setTimeout(closeProductModal, 500);
  } catch (err) {
    productFormStatus.textContent = 'Error: ' + err.message;
    productFormStatus.className = 'status-msg err';
  }
});

async function uploadProductImages(productId, files) {
  if (files.length > 5) {
    throw new Error('Please upload up to 5 images per product.');
  }

  const { data: existingImages } = await supabaseClient
    .from('product_images')
    .select('id, storage_path')
    .eq('product_id', productId);

  if (existingImages && existingImages.length) {
    await supabaseClient.storage.from('product-images').remove(existingImages.map((i) => i.storage_path));
    await supabaseClient.from('product_images').delete().eq('product_id', productId);
  }

  const uploadPromises = files.map((file, index) => {
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${productId}/${Date.now()}-${index}.${ext}`;
    return supabaseClient.storage.from('product-images').upload(path, file, { upsert: true }).then(({ error }) => {
      if (error) throw new Error(
        `Photo upload failed (${error.message}). If this is the first upload, ` +
        `create a public storage bucket named "product-images" in the Supabase dashboard first.`
      );
      return { storage_path: path, sort_order: index };
    });
  });

  const uploadedFiles = await Promise.all(uploadPromises);
  const { error: insertError } = await supabaseClient.from('product_images').insert(
    uploadedFiles.map((item) => ({
      product_id: productId,
      storage_path: item.storage_path,
      sort_order: item.sort_order,
    }))
  );
  if (insertError) throw insertError;
}

async function deleteProduct(product) {
  if (!confirm(`Delete "${product.name}" (${product.id})? This cannot be undone.`)) return;

  const { data: images } = await supabaseClient.from('product_images').select('storage_path').eq('product_id', product.id);
  if (images && images.length) {
    await supabaseClient.storage.from('product-images').remove(images.map((i) => i.storage_path));
  }

  const { error } = await supabaseClient.from('products').delete().eq('id', product.id);
  if (error) {
    alert('Could not delete product: ' + error.message);
    return;
  }
  loadProducts();
}

// ---------- ORDERS ----------
const ORDER_STATUSES = ['Pending', 'Packing', 'Packed', 'Ready', 'Delivered', 'Cancelled'];

async function loadOrders() {
  ordersTableWrap.innerHTML = '<p class="loading-note">Loading orders…</p>';

  const { data: orders, error } = await supabaseClient
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    ordersTableWrap.innerHTML = `<p class="empty-note">Could not load orders: ${escapeHtml(error.message)}</p>`;
    return;
  }

  if (!orders || !orders.length) {
    ordersTableWrap.innerHTML = '<p class="empty-note">No orders yet.</p>';
    return;
  }

  const rows = orders.map((o) => {
    const itemsSummary = Array.isArray(o.items)
      ? o.items.map((i) => `${i.name} ×${i.qty ?? i.quantity ?? 1}`).join(', ')
      : '';

    return `
      <tr data-order-id="${escapeHtml(o.id)}">
        <td><strong>${escapeHtml(o.id)}</strong></td>
        <td>${escapeHtml(o.customer_name)}<br><small>${escapeHtml(o.phone)}</small></td>
        <td>${escapeHtml(itemsSummary)}</td>
        <td>₹${Number(o.total).toLocaleString('en-IN')}</td>
        <td>
          <select data-action="order-status" data-id="${escapeHtml(o.id)}">
            ${ORDER_STATUSES.map((s) => `<option value="${s}" ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </td>
        <td>${new Date(o.created_at).toLocaleString('en-IN')}</td>
      </tr>
    `;
  }).join('');

  ordersTableWrap.innerHTML = `
    <table>
      <thead><tr><th>Order ID</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Placed</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

ordersTableWrap.addEventListener('change', async (event) => {
  const select = event.target.closest('select[data-action="order-status"]');
  if (!select) return;
  const { error } = await supabaseClient.from('orders').update({ status: select.value }).eq('id', select.dataset.id);
  if (error) alert('Could not update order status: ' + error.message);
});

refreshOrdersBtn.addEventListener('click', loadOrders);

// ---------- UTIL ----------
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------- BOOT ----------
window.addEventListener('pageshow', () => {
  if (loginForm) {
    loginForm.reset();
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
  }
});

checkSession();
