import http from 'http';

function test() {
  const options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/api/stocks',
    method: 'GET'
  };

  console.log(`Testing http://${options.hostname}:${options.port}${options.path}...`);

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log(`STATUS: ${res.statusCode}`);
      try {
        const data = JSON.parse(body);
        console.log(`SUCCESS! Received ${data.length} stocks.`);
        if (data.length > 0) {
          console.log(`First stock: ${JSON.stringify(data[0], null, 2)}`);
        }
      } catch (e) {
        console.log(`BODY (raw): ${body}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`ERROR: ${e.message}`);
  });

  req.end();
}

test();
