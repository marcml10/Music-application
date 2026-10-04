const fs = require('fs');
const files = fs.readdirSync('api/.wrangler/state/v3/d1/miniflare-D1DatabaseObject/').filter(f => f.endsWith('.sqlite'));
if(files.length > 0) {
    const file = files[0];
    console.log("Found DB:", file);
    const dbPath = 'api/.wrangler/state/v3/d1/miniflare-D1DatabaseObject/' + file;
    // Just read the file and do a crude regex search for http
    const content = fs.readFileSync(dbPath, 'utf8');
    const urls = content.match(/https?:\/\/[^\s"']+/g);
    if(urls) console.log(urls.slice(0, 5));
}
