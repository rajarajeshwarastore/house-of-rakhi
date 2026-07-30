products.js loaded
-- =============================================================
-- HOUSE OF RAKHI — SEED THE 24 DEMO PRODUCTS
-- Run this once in Supabase: Project -> SQL Editor -> New query
-- Safe to re-run: uses upsert on the primary key (id), so running
-- it twice just re-syncs the same 24 rows instead of duplicating them.
--
-- Run this AFTER 01_schema.sql, 02_security.sql, 03_admin_lockdown.sql,
-- and 04_bilingual_fields.sql have all been executed.
--
-- Note: these 24 demo products have no photos yet. The storefront
-- falls back to its existing placeholder images until you upload real
-- product photos from admin.html.
-- =============================================================

insert into products (
  id, name, name_te, category, subcategory, description, description_te,
  price, stock, status, tags, featured, premium, bestseller, new_arrival,
  discount_percent
) values
  ('DES001', 'Classic Maroon Rakhi', 'క్లాసిక్ మరూన్ రఖీ', 'Designer Rakhi', 'Designer Rakhi', 'Timeless festive rakhi with a rich maroon finish and graceful detailing.', 'ప్రవత్తి పండుగలలో శోభించే సంప్రదాయ రఖీ.', 189, 70, 'In Stock', ARRAY['new','bestseller','designer','wholesale']::text[], false, false, true, true, 25),
  ('PRM001', 'Golden Thread Rakhi', 'గోల్డెన్ థ్రెడ్ రఖీ', 'Premium Rakhi', 'Premium Rakhi', 'A radiant premium rakhi that brings glow and elegance to the celebration.', 'ప్రభావవంతమైన పండుగ శోభను అందించే ప్రీమియం రఖీ.', 299, 70, 'In Stock', ARRAY['new','bestseller','premium','designer']::text[], false, true, true, true, 22),
  ('STN001', 'Kundan Pearl Rakhi', 'కుండన్ పియర్ల్ రఖీ', 'Stone Rakhi', 'Stone Rakhi', 'Elegant pearl and kundan detailing for a royal festive look.', 'రాయల్ శైలిలో మెరిసే పియర్ల్ మరియు కుండన్ లుక్.', 349, 70, 'Limited Stock', ARRAY['bestseller','premium','designer']::text[], false, true, true, false, 19),
  ('KID001', 'Children’s Joy Rakhi', 'చిన్నపిల్లల ఆనంద రఖీ', 'Kids Rakhi', 'Kids Rakhi', 'Bright and cheerful rakhi crafted especially for little hands and happy smiles.', 'చిన్న చేతుల కోసం తయారు చేసిన ఆనందకర రఖీ.', 129, 70, 'In Stock', '{}', false, false, false, false, 16),
  ('HAN001', 'Handcrafted Lotus Rakhi', 'చేతితో చేసిన లోటస్ రఖీ', 'Handmade Rakhi', 'Handmade Rakhi', 'A traditional handmade piece with devotional charm and artisan detail.', 'ఆధ్యాత్మిక శోభతో కూడిన చేతితో చేసిన రఖీ.', 219, 70, 'In Stock', ARRAY['new','handmade','wholesale']::text[], false, false, false, true, 13),
  ('BRO001', 'Bracelet Glow Rakhi', 'బ్రేస్లెట్ గ్లో రఖీ', 'Bracelet Rakhi', 'Bracelet Rakhi', 'Modern bracelet-style rakhi that pairs beautifully with festive outfits.', 'ఆధునిక శైలిలో పండుగ దుస్తులకు కలిపిన బ్రేస్లెట్ రఖీ.', 249, 70, 'Limited Stock', ARRAY['bestseller','designer']::text[], false, false, true, false, 25),
  ('SIL001', 'Silver Festive Rakhi', 'వెండి పండుగ రఖీ', 'Silver Rakhi', 'Silver Rakhi', 'Premium silver finish with a polished and refined festive presence.', 'నాణ్యమైన వెండి శోభతో కూడిన పండుగ రఖీ.', 399, 70, 'In Stock', ARRAY['premium']::text[], false, true, false, false, 22),
  ('GOD001', 'Divine Shiva Rakhi', 'దివ్య శివ రఖీ', 'God Rakhi', 'God Rakhi', 'A sacred Lord Shiva rakhi with elegant detailing and strong spiritual appeal.', 'శివునికి అంకితం చేసిన పవిత్ర రఖీ.', 269, 70, 'In Stock', ARRAY['new','bestseller','premium','handmade','god-rakhi']::text[], false, true, true, true, 19),
  ('GOD002', 'Ganesh Blessing Rakhi', 'గణేశ ఆశీస్సు రఖీ', 'God Rakhi', 'God Rakhi', 'Devotional Ganesha rakhi crafted to welcome prosperity and joy.', 'సంతోషం మరియు సమృద్ధిని తీసుకొచ్చే గణేశ రఖీ.', 279, 70, 'Limited Stock', ARRAY['bestseller','premium','handmade','god-rakhi','wholesale']::text[], false, true, true, false, 16),
  ('STN002', 'Royal Stone Rakhi', 'రాయల్ స్టోన్ రఖీ', 'Stone Rakhi', 'Stone Rakhi', 'A rich stone-studded rakhi that stands out in any festive display.', 'పండుగలో ప్రత్యేకంగా నిలిచే స్టోన్-స్టడెడ్ రఖీ.', 329, 70, 'In Stock', ARRAY['premium','designer']::text[], false, true, false, false, 13),
  ('DES002', 'Lumba Heritage Rakhi', 'లుంబా పూర్విక రఖీ', 'Designer Rakhi', 'Designer Rakhi', 'Heritage-inspired rakhi designed with elegance and classic tradition.', 'సంప్రదాయ శైలిలో రూపొందించిన లుంబా రఖీ.', 179, 70, 'In Stock', ARRAY['designer']::text[], false, false, false, false, 25),
  ('PRM002', 'Auspicious Pearl Rakhi', 'శుభపరమైన పియర్ల్ రఖీ', 'Premium Rakhi', 'Premium Rakhi', 'An ornate pearl rakhi ideal for gifting during festive house visits.', 'పండుగ సందర్శనలలో బహుమతిగా ఇచ్చే శుభపరమైన రఖీ.', 389, 70, 'Limited Stock', ARRAY['new','premium','designer']::text[], false, true, false, true, 22),
  ('KID002', 'Mini Delight Rakhi', 'మినీ డెలైట్ రఖీ', 'Kids Rakhi', 'Kids Rakhi', 'A compact and cheerful choice perfect for younger siblings and cousins.', 'చిన్న చెల్లెళ్ళకు, మేనల్లుళ్లకు ఉత్తమమైన చిన్న రఖీ.', 109, 70, 'In Stock', ARRAY['wholesale']::text[], false, false, false, false, 19),
  ('HAN002', 'Saffron Thread Rakhi', 'కుంకుమ థ్రెడ్ రఖీ', 'Handmade Rakhi', 'Handmade Rakhi', 'A warm handcrafted rakhi infused with a festive saffron spirit.', 'పండుగ శైలికి అనుగుణంగా రూపొందించిన చేతితో చేసిన రఖీ.', 159, 70, 'In Stock', ARRAY['handmade']::text[], false, false, false, false, 16),
  ('BRO002', 'Diamond Cut Rakhi', 'డైమండ్ కట్ రఖీ', 'Bracelet Rakhi', 'Bracelet Rakhi', 'A sleek bracelet-style rakhi designed for a contemporary festive touch.', 'ఆధునిక శైలితో మెరిసే బ్రేస్లెట్ రఖీ.', 279, 70, 'Out of Stock', ARRAY['premium','designer']::text[], false, true, false, false, 13),
  ('SIL002', 'Silver Line Rakhi', 'సిల్వర్ లైన్ రఖీ', 'Silver Rakhi', 'Silver Rakhi', 'A simple yet premium silver rakhi for understated grace and elegance.', 'సులభంగా, కానీ శోభనంగా ఉండే వెండి రఖీ.', 319, 70, 'In Stock', ARRAY['premium']::text[], false, true, false, false, 25),
  ('GOD003', 'Sanskrit Blessing Rakhi', 'సంస్కృత ఆశీస్సు రఖీ', 'God Rakhi', 'God Rakhi', 'An auspicious devotional rakhi inspired by sacred chants and blessings.', 'పవిత్ర మంత్రాలకు అనుగుణంగా రూపొందించిన ఆధ్యాత్మిక రఖీ.', 229, 70, 'In Stock', ARRAY['handmade','god-rakhi','wholesale']::text[], false, false, false, false, 22),
  ('PRM003', 'Rose Gold Rakhi', 'రోస్ గోల్డ్ రఖీ', 'Premium Rakhi', 'Premium Rakhi', 'Modern rose-gold detailing with a luxe finish for special occasions.', 'ప్రత్యేక సందర్భాలకు తగిన లగ్జరీ రోస్-గోల్డ్ రఖీ.', 469, 20, 'Limited Stock', ARRAY['bestseller','premium','designer']::text[], false, true, true, false, 19),
  ('KID003', 'Little Star Rakhi', 'లిటిల్ స్టార్ రఖీ', 'Kids Rakhi', 'Kids Rakhi', 'A tiny star-inspired rakhi made for cheerful celebration and gifting.', 'పిల్లల పండుగ ఉత్సవాలకు తగిన నక్షత్ర శైలి రఖీ.', 99, 70, 'In Stock', ARRAY['new']::text[], false, false, false, true, 16),
  ('HAN003', 'Traditional Temple Rakhi', 'సాంప్రదాయ దేవాలయ రఖీ', 'Handmade Rakhi', 'Handmade Rakhi', 'A temple-inspired handmade rakhi that carries warmth and devotion.', 'దేవాలయ శైలిలో రూపొందించిన చేతితో చేసిన రఖీ.', 199, 70, 'In Stock', ARRAY['handmade']::text[], false, false, false, false, 13),
  ('DES003', 'Velvet Luxury Rakhi', 'వెల్వెట్ లగ్జరీ రఖీ', 'Designer Rakhi', 'Designer Rakhi', 'A richly textured designer rakhi with a luxurious velvet effect.', 'లగ్జరీ వెల్వెట్ ఎఫెక్టుతో నిండిన డిజైనర్ రఖీ.', 449, 20, 'Limited Stock', ARRAY['new','bestseller','premium','designer','wholesale']::text[], false, true, true, true, 25),
  ('STN003', 'Pearl Crown Rakhi', 'పియర్ల్ క్రౌన్ రఖీ', 'Stone Rakhi', 'Stone Rakhi', 'An ornate crown-style rakhi inspired by regal festive beauty.', 'రాజసమాన శోభతో కూడిన క్రౌన్-శైలి రఖీ.', 379, 70, 'In Stock', ARRAY['premium','designer']::text[], false, true, false, false, 22),
  ('BRO003', 'Family Bond Rakhi', 'ఫ్యామిలీ బాండ్ రఖీ', 'Bracelet Rakhi', 'Bracelet Rakhi', 'A family-friendly bracelet rakhi that suits siblings and cousins alike.', 'చెల్లెళ్ళు మరియు మేనల్లుళ్లకు తగిన కుటుంబ-స్నేహపూర్వక రఖీ.', 239, 70, 'In Stock', '{}', false, false, false, false, 19),
  ('PRM004', 'Festive Blessing Rakhi', 'పండుగ ఆశీస్సు రఖీ', 'Premium Rakhi', 'Premium Rakhi', 'A premium choice for festive gifting with a graceful, luminous finish.', 'ముందుకు తీసుకెళ్లే శోభనమైన ప్రీమియం రఖీ.', 409, 20, 'Limited Stock', ARRAY['bestseller','premium','designer']::text[], false, true, true, false, 16),
  ('DES004', 'Traditional Glow Rakhi', 'సాంప్రదాయ గ్లో రఖీ', 'Designer Rakhi', 'Designer Rakhi', 'Classic detailing fused with modern glamour for a polished festive finish.', 'సంప్రదాయ శైలి మరియు ఆధునిక శోభను మేళవించిన రఖీ.', 299, 70, 'In Stock', ARRAY['designer','wholesale']::text[], false, false, false, false, 13),
  ('HAN004', 'Cultural Charm Rakhi', 'సాంస్కృతిక మాధుర్య రఖీ', 'Handmade Rakhi', 'Handmade Rakhi', 'Handcrafted charm with bold color and warm cultural storytelling.', 'శక్తివంతమైన రంగులు మరియు సాంస్కృతిక కథతో నిండిన చేతితో చేసిన రఖీ.', 219, 70, 'Out of Stock', ARRAY['handmade']::text[], false, false, false, false, 25),
  ('BRO004', 'Festival Parade Rakhi', 'పండుగ ప్రదర్శన రఖీ', 'Bracelet Rakhi', 'Bracelet Rakhi', 'A lively bracelet rakhi that adds color to festive celebrations.', 'పండుగ ఉత్సవాలను మరింత సమృద్ధిగా చేసే రంగురంగుల బ్రేస్లెట్ రఖీ.', 189, 70, 'In Stock', ARRAY['new']::text[], false, false, false, true, 22)
on conflict (id) do update set
  name = excluded.name,
  name_te = excluded.name_te,
  category = excluded.category,
  subcategory = excluded.subcategory,
  description = excluded.description,
  description_te = excluded.description_te,
  price = excluded.price,
  stock = excluded.stock,
  status = excluded.status,
  tags = excluded.tags,
  featured = excluded.featured,
  premium = excluded.premium,
  bestseller = excluded.bestseller,
  new_arrival = excluded.new_arrival,
  discount_percent = excluded.discount_percent;

-- ---------------------------------------------------------------
-- Keep id_sequences in sync so the NEXT product added from the
-- admin panel in each category continues the numbering correctly
-- (e.g. next God Rakhi becomes GOD0XX+1, not GOD001 again).
-- ---------------------------------------------------------------
insert into id_sequences (prefix, last_seq) values
  ('DES', 4),
  ('PRM', 4),
  ('STN', 3),
  ('KID', 3),
  ('HAN', 4),
  ('BRO', 4),
  ('SIL', 2),
  ('GOD', 3)
on conflict (prefix) do update set
  last_seq = greatest(id_sequences.last_seq, excluded.last_seq);


-- Generated 27 product rows.
