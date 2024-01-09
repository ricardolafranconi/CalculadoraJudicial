// pages/api/jus.js

// pages/api/jus.js

import puppeteer from 'puppeteer';
import xpath from 'xpath';
import { JSDOM } from 'jsdom'

export default async function handler(req, res) {
    try {
    const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto('http://carc.com.ar/valores/');
      const targetElement = await page.$x('/html/body/div[1]/div[2]/main/div/section/div/div/div[1]/div/div/div/div[1]/div[1]/div/div[3]/h2/strong');
      if (targetElement.length) {
        const text = await page.evaluate(el => el.textContent.trim(), targetElement[0]);
        if (text !== '-') {
          res.status(200).json({ jus: text });
        } else {
          res.status(404).json({ error: 'Data not available' });
        }
      } else {
        res.status(404).json({ error: 'Element not found' });
      }
      await browser.close();
    } catch (error) {
      console.error(error); // Log the error message
      res.status(500).json({ error: 'An error occurred' });
    }
  }