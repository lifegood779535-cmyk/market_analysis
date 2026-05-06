const fetch = require('node-fetch');

async function test() {
  const urls = ["http://127.0.0.1:5000/api/stocks", "http://localhost:5000/api/stocks"];
  for (const url of urls) {
    try {
      console.log(`Testing ${url}...`);
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(`SUCCESS! Received ${data.length} stocks.`);
        console.log(`First stock: ${JSON.stringify(data[0])}`);
        return;
      } else {
        console.log(`FAILED with status: ${res.status}`);
      }
    } catch (e) {
      console.log(`ERROR: ${e.message}`);
    }
  }
}

test();
