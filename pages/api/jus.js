import cheerio from 'cheerio';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // Fetch the HTML content of the web page to be scraped
    const response = await fetch('http://carc.com.ar/valores/');
    const html = await response.text();

    // Load the HTML content into Cheerio
    const $ = cheerio.load(html);

    // Use Cheerio selectors to extract the desired data
    const text = $('html > body > div:first-of-type > div:nth-of-type(2) > main > div > section > div > div > div:first-of-type > div > div > div > div:first-of-type > div:first-of-type > div > div:nth-of-type(3) > h2 > strong').text().trim();

    // Return the scraped data as a JSON response
    if (text !== '-') {
      res.status(200).json({ jus: text });
    } else {
      res.status(404).json({ error: 'Data not available' });
    }
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};