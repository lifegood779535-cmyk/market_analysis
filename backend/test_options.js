import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

async function test() {
  try {
    const symbol = '^NSEI'; // Nifty 50
    console.log('Fetching options for:', symbol);
    const results = await yahooFinance.options(symbol);
    console.log('Results:', JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
