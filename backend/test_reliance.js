import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

async function test() {
  try {
    const symbol = 'RELIANCE.NS';
    console.log('Fetching options for:', symbol);
    const results = await yahooFinance.options(symbol);
    if (results && results.options && results.options.length > 0) {
      console.log('Success! Found expirations:', results.options.length);
      console.log('First strike:', results.options[0].calls[0].strike);
    } else {
      console.log('No options found for this symbol.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

test();
