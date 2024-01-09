// File: pages/api/unidadesEconomicas.js
import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

export default async function handler(req, res) {
    try {
        const browser = await puppeteer.launch({
            args: chrome.args,
            executablePath: process.env.AWS_LAMBDA_FUNCTION_NAME ? await chrome.executablePath : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
            headless: chrome.headless,
        });

        const page = await browser.newPage();
        await page.goto('http://carc.com.ar/valores/');

        const targetElement = await page.$x('/html/body/div[1]/div[2]/main/div/section/div/div/div[1]/div/div/div/div[1]/div[2]/div/div[3]/h2/strong');
        const text = targetElement.length ? await page.evaluate(el => el.textContent.trim(), targetElement[0]) : '-';

        if (text !== '-') {
            res.status(200).json({ unidadesEconomicas: text });
        } else {
            res.status(404).json({ error: 'Data not available' });
        }

        await browser.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}