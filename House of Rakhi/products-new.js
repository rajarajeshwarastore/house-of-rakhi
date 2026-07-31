console.log("products.js loaded");
function createPlaceholderImage(label, palette) {
  const safeLabel = String(label).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" rx="32" fill="${palette.bg}" />
      <rect x="70" y="90" width="660" height="420" rx="28" fill="${palette.panel}" opacity="0.92" />
      <circle cx="620" cy="180" r="110" fill="${palette.accent}" opacity="0.22" />
      <path d="M220 430C270 320 360 280 520 220" stroke="${palette.accent}" stroke-width="18" stroke-linecap="round" fill="none" opacity="0.75" />
      <path d="M240 370C310 270 430 250 540 310" stroke="${palette.highlight}" stroke-width="10" stroke-linecap="round" fill="none" opacity="0.7" />
      <rect x="220" y="150" width="360" height="140" rx="24" fill="${palette.panel}" stroke="${palette.accent}" stroke-width="4" />
      <text x="400" y="230" text-anchor="middle" font-family="Georgia, serif" font-size="44" font-weight="700" fill="${palette.text}">${safeLabel}</text>
      <text x="400" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="${palette.text}" opacity="0.75">Temporary Rakhi Showcase</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const uploadedProductImages = ['god images/img.png', 'god images/img1.png', 'god images/img3.png'];

function getProductImage(index) {
  const imagePath = uploadedProductImages[index % uploadedProductImages.length];
  return encodeURI(imagePath);
}

const productSeed = [
  { name: 'Classic Maroon Rakhi', nameTe: 'క్లాసిక్ మరూన్ రఖీ', category: 'Designer Rakhi', description: 'Timeless festive rakhi with a rich maroon finish and graceful detailing.', descriptionTe: 'ప్రవత్తి పండుగలలో శోభించే సంప్రదాయ రఖీ.', price: 189, stockStatus: 'In Stock', quantity: 1, isNewest: true, isBestSelling: true, premium: false, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Golden Thread Rakhi', nameTe: 'గోల్డెన్ థ్రెడ్ రఖీ', category: 'Premium Rakhi', description: 'A radiant premium rakhi that brings glow and elegance to the celebration.', descriptionTe: 'ప్రభావవంతమైన పండుగ శోభను అందించే ప్రీమియం రఖీ.', price: 299, stockStatus: 'In Stock', quantity: 2, isNewest: true, isBestSelling: true, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Kundan Pearl Rakhi', nameTe: 'కుండన్ పియర్ల్ రఖీ', category: 'Stone Rakhi', description: 'Elegant pearl and kundan detailing for a royal festive look.', descriptionTe: 'రాయల్ శైలిలో మెరిసే పియర్ల్ మరియు కుండన్ లుక్.', price: 349, stockStatus: 'Limited Stock', quantity: 1, isNewest: false, isBestSelling: true, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Children’s Joy Rakhi', nameTe: 'చిన్నపిల్లల ఆనంద రఖీ', category: 'Kids Rakhi', description: 'Bright and cheerful rakhi crafted especially for little hands and happy smiles.', descriptionTe: 'చిన్న చేతుల కోసం తయారు చేసిన ఆనందకర రఖీ.', price: 129, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: false, isHandmade: false, isDesigner: false, isGodRakhi: false },
  { name: 'Playful Stars Rakhi', nameTe: 'ఆడగుచిన నక్షత్రాలు రఖీ', category: 'Kids Rakhi', description: 'Fun star-themed rakhi for playful siblings and joyful moments.', descriptionTe: 'ఆడగుచిన సోదరభావానికి మరియు ఆనందకరమైన క్షణాలకు సరైన నక్షత్ర రఖీ.', price: 119, stockStatus: 'In Stock', quantity: 1, isNewest: true, isBestSelling: false, premium: false, isHandmade: false, isDesigner: false, isGodRakhi: false },
  { name: 'Handcrafted Lotus Rakhi', nameTe: 'చేతితో చేసిన లోటస్ రખీ', category: 'Handmade Rakhi', description: 'A traditional handmade piece with devotional charm and artisan detail.', descriptionTe: 'ఆధ్యాత్మిక శోభతో కూడిన చేతితో చేసిన రఖీ.', price: 219, stockStatus: 'In Stock', quantity: 1, isNewest: true, isBestSelling: false, premium: false, isHandmade: true, isDesigner: false, isGodRakhi: false },
  { name: 'Bracelet Glow Rakhi', nameTe: 'బ్రేస్లెట్ గ్లో రఖీ', category: 'Bracelet Rakhi', description: 'Modern bracelet-style rakhi that pairs beautifully with festive outfits.', descriptionTe: 'ఆధునిక శైలిలో పండుగ దుస్తులకు కలిపిన బ్రేస్లెట్ రఖీ.', price: 249, stockStatus: 'Limited Stock', quantity: 1, isNewest: false, isBestSelling: true, premium: false, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Silver Festive Rakhi', nameTe: 'వెండి పండుగ రఖీ', category: 'Silver Rakhi', description: 'Premium silver finish with a polished and refined festive presence.', descriptionTe: 'నాణ్యమైన వెండి శోభతో కూడిన పండుగ రఖీ.', price: 399, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: true, isHandmade: false, isDesigner: false, isGodRakhi: false },
  { name: 'Divine Shiva Rakhi', nameTe: 'దివ్య శివ రఖీ', category: 'God Rakhi', description: 'A sacred Lord Shiva rakhi with elegant detailing and strong spiritual appeal.', descriptionTe: 'శివునికి అంకితం చేసిన పవిత్ర రఖీ.', price: 269, stockStatus: 'In Stock', quantity: 1, isNewest: true, isBestSelling: true, premium: true, isHandmade: true, isDesigner: false, isGodRakhi: true },
  { name: 'Ganesh Blessing Rakhi', nameTe: 'గణేశ ఆశీస్సు రఖీ', category: 'God Rakhi', description: 'Devotional Ganesha rakhi crafted to welcome prosperity and joy.', descriptionTe: 'సంతోషం మరియు సమృద్ధిని తీసుకొచ్చే గణేశ రఖీ.', price: 279, stockStatus: 'Limited Stock', quantity: 1, isNewest: false, isBestSelling: true, premium: true, isHandmade: true, isDesigner: false, isGodRakhi: true },
  { name: 'Royal Stone Rakhi', nameTe: 'రాయల్ స్టోన్ రఖీ', category: 'Stone Rakhi', description: 'A rich stone-studded rakhi that stands out in any festive display.', descriptionTe: 'పండుగలో ప్రత్యేకంగా నిలిచే స్టోన్-స్టడెడ్ రఖీ.', price: 329, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Lumba Heritage Rakhi', nameTe: 'లుంబా పూర్విక రఖీ', category: 'Designer Rakhi', description: 'Heritage-inspired rakhi designed with elegance and classic tradition.', descriptionTe: 'సంప్రదాయ శైలిలో రూపొందించిన లుంబా రఖీ.', price: 179, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: false, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Auspicious Pearl Rakhi', nameTe: 'శుభపరమైన పియర్ల్ రఖీ', category: 'Premium Rakhi', description: 'An ornate pearl rakhi ideal for gifting during festive house visits.', descriptionTe: 'పండుగ సందర్శనలలో బహుమతిగా ఇచ్చే శుభపరమైన రఖీ.', price: 389, stockStatus: 'Limited Stock', quantity: 1, isNewest: true, isBestSelling: false, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Mini Delight Rakhi', nameTe: 'మినీ డెలైట్ రఖీ', category: 'Kids Rakhi', description: 'A compact and cheerful choice perfect for younger siblings and cousins.', descriptionTe: 'చిన్న చెల్లెళ్ళకు, మేనల్లుళ్లకు ఉత్తమమైన చిన్న రఖీ.', price: 109, stockStatus: 'In Stock', quantity: 2, isNewest: false, isBestSelling: false, premium: false, isHandmade: false, isDesigner: false, isGodRakhi: false },
  { name: 'Saffron Thread Rakhi', nameTe: 'కుంకుమ థ్రెడ్ రఖీ', category: 'Handmade Rakhi', description: 'A warm handcrafted rakhi infused with a festive saffron spirit.', descriptionTe: 'పండుగ శైలికి అనుగుణంగా రూపొందించిన చేతితో చేసిన రఖీ.', price: 159, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: false, isHandmade: true, isDesigner: false, isGodRakhi: false },
  { name: 'Diamond Cut Rakhi', nameTe: 'డైమండ్ కట్ రఖీ', category: 'Bracelet Rakhi', description: 'A sleek bracelet-style rakhi designed for a contemporary festive touch.', descriptionTe: 'ఆధునిక శైలితో మెరిసే బ్రేస్లెట్ రఖీ.', price: 279, stockStatus: 'Out of Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Silver Line Rakhi', nameTe: 'సిల్వర్ లైన్ రఖీ', category: 'Silver Rakhi', description: 'A simple yet premium silver rakhi for understated grace and elegance.', descriptionTe: 'సులభంగా, కానీ శోభనంగా ఉండే వెండి రఖీ.', price: 319, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: true, isHandmade: false, isDesigner: false, isGodRakhi: false },
  { name: 'Sanskrit Blessing Rakhi', nameTe: 'సంస్కృత ఆశీస్సు రఖీ', category: 'God Rakhi', description: 'An auspicious devotional rakhi inspired by sacred chants and blessings.', descriptionTe: 'పవిత్ర మంత్రాలకు అనుగుణంగా రూపొందించిన ఆధ్యాత్మిక రఖీ.', price: 229, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: false, isHandmade: true, isDesigner: false, isGodRakhi: true },
  { name: 'Rose Gold Rakhi', nameTe: 'రోస్ గోల్డ్ రఖీ', category: 'Premium Rakhi', description: 'Modern rose-gold detailing with a luxe finish for special occasions.', descriptionTe: 'ప్రత్యేక సందర్భాలకు తగిన లగ్జరీ రోస్-గోల్డ్ రఖీ.', price: 469, stockStatus: 'Limited Stock', quantity: 1, isNewest: false, isBestSelling: true, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Little Star Rakhi', nameTe: 'లిటిల్ స్టార్ రఖీ', category: 'Kids Rakhi', description: 'A tiny star-inspired rakhi made for cheerful celebration and gifting.', descriptionTe: 'పిల్లల పండుగ ఉత్సవాలకు తగిన నక్షత్ర శైలి రఖీ.', price: 99, stockStatus: 'In Stock', quantity: 3, isNewest: true, isBestSelling: false, premium: false, isHandmade: false, isDesigner: false, isGodRakhi: false },
  { name: 'Traditional Temple Rakhi', nameTe: 'సాంప్రదాయ దేవాలయ రఖీ', category: 'Handmade Rakhi', description: 'A temple-inspired handmade rakhi that carries warmth and devotion.', descriptionTe: 'దేవాలయ శైలిలో రూపొందించిన చేతితో చేసిన రఖీ.', price: 199, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: false, isHandmade: true, isDesigner: false, isGodRakhi: false },
  { name: 'Velvet Luxury Rakhi', nameTe: 'వెల్వెట్ లగ్జరీ రఖీ', category: 'Designer Rakhi', description: 'A richly textured designer rakhi with a luxurious velvet effect.', descriptionTe: 'లగ్జరీ వెల్వెట్ ఎఫెక్టుతో నిండిన డిజైనర్ రఖీ.', price: 449, stockStatus: 'Limited Stock', quantity: 1, isNewest: true, isBestSelling: true, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Pearl Crown Rakhi', nameTe: 'పియర్ల్ క్రౌన్ రఖీ', category: 'Stone Rakhi', description: 'An ornate crown-style rakhi inspired by regal festive beauty.', descriptionTe: 'రాజసమాన శోభతో కూడిన క్రౌన్-శైలి రఖీ.', price: 379, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Family Bond Rakhi', nameTe: 'ఫ్యామిలీ బాండ్ రఖీ', category: 'Bracelet Rakhi', description: 'A family-friendly bracelet rakhi that suits siblings and cousins alike.', descriptionTe: 'చెల్లెళ్ళు మరియు మేనల్లుళ్లకు తగిన కుటుంబ-స్నేహపూర్వక రఖీ.', price: 239, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: false, isHandmade: false, isDesigner: false, isGodRakhi: false },
  { name: 'Festive Blessing Rakhi', nameTe: 'పండుగ ఆశీస్సు రఖీ', category: 'Premium Rakhi', description: 'A premium choice for festive gifting with a graceful, luminous finish.', descriptionTe: 'ముందుకు తీసుకెళ్లే శోభనమైన ప్రీమియం రఖీ.', price: 409, stockStatus: 'Limited Stock', quantity: 1, isNewest: false, isBestSelling: true, premium: true, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Traditional Glow Rakhi', nameTe: 'సాంప్రదాయ గ్లో రఖీ', category: 'Designer Rakhi', description: 'Classic detailing fused with modern glamour for a polished festive finish.', descriptionTe: 'సంప్రదాయ శైలి మరియు ఆధునిక శోభను మేళవించిన రఖీ.', price: 299, stockStatus: 'In Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: false, isHandmade: false, isDesigner: true, isGodRakhi: false },
  { name: 'Cultural Charm Rakhi', nameTe: 'సాంస్కృతిక మాధుర్య రఖీ', category: 'Handmade Rakhi', description: 'Handcrafted charm with bold color and warm cultural storytelling.', descriptionTe: 'శక్తివంతమైన రంగులు మరియు సాంస్కృతిక కథతో నిండిన చేతితో చేసిన రఖీ.', price: 219, stockStatus: 'Out of Stock', quantity: 1, isNewest: false, isBestSelling: false, premium: false, isHandmade: true, isDesigner: false, isGodRakhi: false },
  { name: 'Festival Parade Rakhi', nameTe: 'పండుగ ప్రదర్శన రఖీ', category: 'Bracelet Rakhi', description: 'A lively bracelet rakhi that adds color to festive celebrations.', descriptionTe: 'పండుగ ఉత్సవాలను మరింత సమృద్ధిగా చేసే రంగురంగుల బ్రేస్లెట్ రఖీ.', price: 189, stockStatus: 'In Stock', quantity: 2, isNewest: true, isBestSelling: false, premium: false, isHandmade: false, isDesigner: false, isGodRakhi: false }
];

const products = productSeed.map((product, index) => {
  const image = getProductImage(index);

  return {
    id: index + 1,
    name: product.name,
    nameTe: product.nameTe,
    category: product.category,
    subcategory: product.category,
    price: product.price,
    stock: product.price > 400 ? 20 : 70,
    description: product.description,
    descriptionTe: product.descriptionTe,
    image,
    discount: Math.max(5, 25 - (index % 5) * 3),
    availability: product.stockStatus,
    stockStatus: product.stockStatus,
    quantity: product.quantity,
    isNewest: product.isNewest,
    isBestSelling: product.isBestSelling,
    wholesale: index % 4 === 0,
    premium: product.premium,
    isHandmade: product.isHandmade,
    isDesigner: product.isDesigner,
    isGodRakhi: product.isGodRakhi
  };
});

const categories = [
  {
    id: 1,
    name: 'God Rakhi',
    nameTe: 'దేవత రాఖీ',
    description: 'Divine rakhi collections inspired by Gods and sacred traditions.',
    descriptionTe: 'దేవుళ్లకు అంకితం చేసి రూపొందించిన పవిత్ర రఖీ సేకరణ.',
    image: getProductImage(0),
    subcategories: [
      { name: 'Lord Shiva', nameTe: 'శివుడు' },
      { name: 'Lord Ganesha', nameTe: 'గణేశుడు' },
      { name: 'Sai Baba', nameTe: 'సాయి బాబా' }
    ]
  },
  {
    id: 2,
    name: 'Designer Rakhi',
    nameTe: 'డిజైనర్ రఖీ',
    description: 'Contemporary design-led rakhi pieces with elegant detailing.',
    descriptionTe: 'ఆధునిక శైలిలో రూపొందించిన అందమైన డిజైనర్ రఖీలు.',
    image: createPlaceholderImage('Designer Rakhi', { bg: '#7A1029', panel: '#FFF6E9', accent: '#E8C468', highlight: '#FBEAD1', text: '#7A1029' }),
    subcategories: []
  },
  {
    id: 3,
    name: 'Kids Rakhi',
    nameTe: 'పిల్లల రఖీ',
    description: 'Playful rakhi offerings especially made for little ones.',
    descriptionTe: 'చిన్న పిల్లల కోసం రూపొందించిన శుభప్రద రఖీలు.',
    image: createPlaceholderImage('Kids Rakhi', { bg: '#93233F', panel: '#FFF6E9', accent: '#194A3A', highlight: '#FBEAD1', text: '#93233F' }),
    subcategories: []
  },
  {
    id: 4,
    name: 'Premium Rakhi',
    nameTe: 'ప్రీమియం రఖీ',
    description: 'Premium curated selections for customers seeking exclusivity.',
    descriptionTe: 'ప్రత్యేకత కోరుకునే కస్టమర్లకు తగిన ప్రీమియం రఖీలు.',
    image: createPlaceholderImage('Premium Rakhi', { bg: '#4A0C18', panel: '#FFF6E9', accent: '#E8C468', highlight: '#FBEAD1', text: '#4A0C18' }),
    subcategories: []
  },
  {
    id: 5,
    name: 'Handmade Rakhi',
    nameTe: 'చేతితో చేసిన రఖీ',
    description: 'Handcrafted pieces with rich detail and traditional charm.',
    descriptionTe: 'సంప్రదాయ శోభతో కూడిన చేతితో చేసిన రఖీలు.',
    image: createPlaceholderImage('Handmade Rakhi', { bg: '#7A1029', panel: '#FFF6E9', accent: '#194A3A', highlight: '#FBEAD1', text: '#7A1029' }),
    subcategories: []
  },
  {
    id: 6,
    name: 'Bracelet Rakhi',
    nameTe: 'బ్రేస్లెట్ రఖీ',
    description: 'Modern bracelet-style rakhi designs for festive wear.',
    descriptionTe: 'ఆధునిక పండుగ దుస్తులకు తగిన బ్రేస్లెట్ రఖీలు.',
    image: createPlaceholderImage('Bracelet Rakhi', { bg: '#93233F', panel: '#FFF6E9', accent: '#C9971F', highlight: '#FBEAD1', text: '#93233F' }),
    subcategories: []
  },
  {
    id: 7,
    name: 'Silver Rakhi',
    nameTe: 'వెండి రఖీ',
    description: 'Premium silver rakhis suited for special occasions.',
    descriptionTe: 'ప్రత్యేక సందర్భాలకు తగిన ప్రీమియం వెండి రఖీలు.',
    image: createPlaceholderImage('Silver Rakhi', { bg: '#4A0C18', panel: '#FFF6E9', accent: '#C9971F', highlight: '#FBEAD1', text: '#4A0C18' }),
    subcategories: []
  },
  {
    id: 8,
    name: 'Stone Rakhi',
    nameTe: 'స్టోన్ రఖీ',
    description: 'Stone-studded rakhis crafted for festive glamour.',
    descriptionTe: 'పండుగ శోభకు తగిన స్టోన్-స్టడెడ్ రఖీలు.',
    image: createPlaceholderImage('Stone Rakhi', { bg: '#7A1029', panel: '#FFF6E9', accent: '#194A3A', highlight: '#FBEAD1', text: '#7A1029' }),
    subcategories: []
  }
];

if (typeof window !== 'undefined') {
  // Show the built-in demo data immediately so the page never sits
  // empty/blank while the network request below is in flight.
  window.products = products;
  window.categories = categories;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, categories };
}

// =============================================================
// LIVE DATA — replace the demo array above with real rows from
// Supabase once they arrive. If Supabase is unreachable or RLS
// blocks the read, the page just keeps showing the demo data above,
// so customers never see a broken page.
// =============================================================
(function loadLiveProductsFromSupabase() {
  if (typeof window === 'undefined' || !window.supabaseClient) return;

  function mapTagsToFlags(row) {
    const tags = Array.isArray(row.tags) ? row.tags : [];
    return {
      isHandmade: tags.includes('handmade'),
      isDesigner: tags.includes('designer'),
      isGodRakhi: tags.includes('god-rakhi'),
      wholesale: tags.includes('wholesale')
    };
  }

  async function fetchProductImageUrls(productIds) {
    const map = {};
    if (!productIds.length) return map;

    const { data, error } = await window.supabaseClient
      .from('product_images')
      .select('product_id, storage_path, sort_order')
      .in('product_id', productIds)
      .order('sort_order', { ascending: true });

    if (error || !data) return map;

    data.forEach((imageRow) => {
      if (!map[imageRow.product_id]) {
        map[imageRow.product_id] = [];
      }

      const { data: publicUrlData } = window.supabaseClient
        .storage
        .from('product-images')
        .getPublicUrl(imageRow.storage_path);

      if (publicUrlData?.publicUrl) {
        map[imageRow.product_id].push({
          url: publicUrlData.publicUrl,
          sort_order: imageRow.sort_order || 0
        });
      }
    });

    Object.keys(map).forEach((productId) => {
      map[productId].sort((a, b) => a.sort_order - b.sort_order);
    });

    return map;
  }

  async function run() {
    const { data: rows, error } = await window.supabaseClient
      .from('products')
      .select('*')
      .order('category', { ascending: true })
      .order('created_at', { ascending: true });

    if (error || !rows || !rows.length) return;

    const imageUrlByProductId = await fetchProductImageUrls(rows.map((r) => r.id));

    const liveProducts = rows.map((row, index) => {
      const flags = mapTagsToFlags(row);
      const imageEntries = imageUrlByProductId[row.id] || [];
      const fallbackImage = getProductImage(index);
      const images = imageEntries.length ? imageEntries.map((entry) => entry.url).slice(0, 5) : [fallbackImage];

      return {
        id: index + 1,          // stable numeric id — everything on the page keys off this
        dbId: row.id,           // real Supabase id (e.g. 'GOD001') — used for order references
        name: row.name,
        nameTe: row.name_te || '',
        category: row.category,
        subcategory: row.subcategory || row.category,
        price: Number(row.price),
        stock: row.stock,
        description: row.description || '',
        descriptionTe: row.description_te || '',
        image: images[0] || fallbackImage,
        images,
        discount: row.discount_percent || 0,
        availability: row.status,
        stockStatus: row.status,
        quantity: 1,
        isNewest: Boolean(row.new_arrival),
        isBestSelling: Boolean(row.bestseller),
        wholesale: flags.wholesale,
        premium: Boolean(row.premium),
        isHandmade: flags.isHandmade,
        isDesigner: flags.isDesigner,
        isGodRakhi: flags.isGodRakhi
      };
    });

    window.products = liveProducts;
    window.dispatchEvent(new Event('rakhi:products-ready'));
  }

  run().catch((err) => {
    console.warn('Could not load live products from Supabase, showing demo data instead.', err);
  });
})();
