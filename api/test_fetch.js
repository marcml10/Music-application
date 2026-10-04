const targets = [
  "https://www.bajaao.com/collections/audio-interfaces/products.json?limit=15",
  "https://www.headphonezone.in/collections/beginner-audiophile-iems/products.json?limit=15"
];
async function run() {
  for (const url of targets) {
    console.log("Fetching", url);
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }});
      console.log("Status:", res.status);
      if(res.ok) {
        const text = await res.text();
        console.log("Length:", text.length);
        console.log("Sample:", text.substring(0, 100));
      }
    } catch(e) {
      console.log("Error:", e.message);
    }
  }
}
run();
