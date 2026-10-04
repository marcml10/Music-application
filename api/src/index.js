/**
 * Welcome to Cloudflare Workers! This is your first worker.
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Target categories to scrape via Shopify JSON APIs
const SCRAPE_TARGETS = [
  {
    category: "Audio Interfaces",
    url: "https://www.bajaao.com/collections/audio-interfaces/products.json?limit=15"
  },
  {
    category: "Headphones & IEMs",
    url: "https://www.headphonezone.in/collections/beginner-audiophile-iems/products.json?limit=15"
  },
  {
    category: "Microphones",
    url: "https://www.bajaao.com/collections/microphones/products.json?limit=15"
  },
  {
    category: "Studio Monitors",
    url: "https://www.bajaao.com/collections/studio-monitors/products.json?limit=15"
  }
];

async function syncProducts(env) {
  let added = 0;
  let updated = 0;
  const batchStmts = [];

  // 1. Fetch all existing products into memory to avoid per-product SELECT queries
  const { results: existingProducts } = await env.music_store_db
    .prepare("SELECT id, name FROM products")
    .all();
    
  const existingMap = new Map();
  if (existingProducts) {
    existingProducts.forEach(p => existingMap.set(p.name, p.id));
  }

  for (const target of SCRAPE_TARGETS) {
    try {
      const response = await fetch(target.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
        }
      });
      
      if (!response.ok) {
        console.error("Failed to fetch", target.url, response.status);
        continue;
      }

      const data = await response.json();
      
      for (const product of data.products) {
        if (!product.variants || product.variants.length === 0) continue;
        
        const name = product.title;
        const price = parseFloat(product.variants[0].price || 0);
        const originalPrice = product.variants[0].compare_at_price ? parseFloat(product.variants[0].compare_at_price) : price;
        const imageUrl = product.images && product.images.length > 0 ? product.images[0].src : "";
        const tag = product.vendor || "Sale";
        const category = target.category;
        
        const existingId = existingMap.get(name);

        if (existingId) {
          // Queue Update
          batchStmts.push(
            env.music_store_db
              .prepare(`UPDATE products SET price = ?, original_price = ?, image_url = ?, tag = ? WHERE id = ?`)
              .bind(price, originalPrice, imageUrl, tag, existingId)
          );
          updated++;
        } else {
          // Queue Insert
          const rating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
          const reviews = Math.floor(Math.random() * 200) + 10;
          
          batchStmts.push(
            env.music_store_db
              .prepare(`INSERT INTO products (name, category, price, original_price, rating, reviews, image_url, tag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
              .bind(name, category, price, originalPrice, rating, reviews, imageUrl, tag)
          );
          added++;
        }
      }
    } catch (err) {
      console.error(`Failed to scrape ${target.url}:`, err);
    }
  }

  // Execute all inserts/updates in a single D1 batch
  if (batchStmts.length > 0) {
    await env.music_store_db.batch(batchStmts);
  }

  return { added, updated };
}

export default {
  // Cron Trigger - runs automatically based on schedule in wrangler.json
  async scheduled(event, env, ctx) {
    ctx.waitUntil(syncProducts(env));
  },

  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // =========================
    // GET or POST /api/sync (Manual Scrape Trigger)
    // =========================
    if (url.pathname === "/api/sync" && (request.method === "POST" || request.method === "GET")) {
      try {
        const stats = await syncProducts(env);
        return Response.json({ message: "Sync successful", ...stats }, { headers: corsHeaders });
      } catch (err) {
        return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
      }
    }

    // =========================
    // GET /api/products
    // =========================
    if (url.pathname === "/api/products" && request.method === "GET") {
      const { results } = await env.music_store_db
        .prepare("SELECT * FROM products ORDER BY id DESC")
        .all();
      return Response.json(results, { headers: corsHeaders });
    }

    // =========================
    // GET /api/proxy/headphonezone
    // =========================
    if (url.pathname === "/api/proxy/headphonezone" && request.method === "GET") {
      try {
        // Fetch directly from headphonezone (avoids browser CORS)
        const fetchUrl = "https://www.headphonezone.in/products.json?limit=16";
        const response = await fetch(fetchUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/117.0.0.0 Safari/537.36"
          }
        });
        const data = await response.json();
        
        // Transform their Shopify JSON format into our ProductCard format
        const transformedProducts = (data.products || []).filter(p => p.variants && p.variants.length > 0).map(p => ({
          id: p.id,
          name: p.title,
          category: "Headphones",
          price: parseFloat(p.variants[0].price || 0),
          original_price: p.variants[0].compare_at_price ? parseFloat(p.variants[0].compare_at_price) : parseFloat(p.variants[0].price || 0),
          image_url: p.images && p.images.length > 0 ? p.images[0].src : "",
          tag: "Headphone Zone",
          rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
          reviews: Math.floor(Math.random() * 200) + 10
        }));

        return Response.json(transformedProducts, { headers: corsHeaders });
      } catch (err) {
        return Response.json({ error: err.message }, { status: 500, headers: corsHeaders });
      }
    }

    // =========================
    // POST /api/products
    // =========================
    if (url.pathname === "/api/products" && request.method === "POST") {
      try {
        const body = await request.json();
        const result = await env.music_store_db
          .prepare(
            `INSERT INTO products (name, category, price, original_price, rating, reviews, image_url, tag)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            body.name, body.category, body.price, body.original_price ?? null,
            body.rating ?? 0, body.reviews ?? 0, body.image_url ?? "", body.tag ?? ""
          ).run();

        const product = await env.music_store_db
          .prepare("SELECT * FROM products WHERE id = ?")
          .bind(result.meta.last_row_id)
          .first();

        return new Response(JSON.stringify(product), {
          status: 201,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500, headers: corsHeaders });
      }
    }

    // =========================
    // PUT /api/products/:id
    // =========================
    if (url.pathname.startsWith("/api/products/") && request.method === "PUT") {
      const id = url.pathname.split("/").pop();
      const product = await request.json();
      const result = await env.music_store_db
        .prepare("UPDATE products SET name = ?, category = ?, price = ? WHERE id = ?")
        .bind(product.name, product.category, product.price, id)
        .run();
      return Response.json({ message: "Product updated", changes: result.meta.changes }, { headers: corsHeaders });
    }

    // =========================
    // DELETE /api/products/:id
    // =========================
    if (url.pathname.startsWith("/api/products/") && request.method === "DELETE") {
      const id = url.pathname.split("/").pop();
      const result = await env.music_store_db
        .prepare("DELETE FROM products WHERE id = ?")
        .bind(id)
        .run();
      return Response.json({ message: "Product deleted", changes: result.meta.changes }, { headers: corsHeaders });
    }

    // Unknown route
    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};