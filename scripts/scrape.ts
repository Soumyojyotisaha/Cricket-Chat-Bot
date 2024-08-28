import * as fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface LinkData {
  url: string;
  title: string;
  description: string;
  paragraphs: string;
}

async function scrapeLink(link: string): Promise<LinkData> {
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);

    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content') || '';
    const paragraphs = $('body').text().trim();

    const data: LinkData = {
      url: link,
      title,
      description,
      paragraphs,
    };

    // console.log('Scraped data:', data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error scraping ${link}: ${error.message}`);
    } else {
      console.error(`Error scraping ${link}:`, error);
    }
    return {
      url: link,
      title: 'Error',
      description: '',
      paragraphs: '',
    };
  }
}

async function scrapeAllLinks(links: string[]): Promise<LinkData[]> {
  const scrapedData: LinkData[] = [];

  for (const link of links) {
    const data = await scrapeLink(link);
    scrapedData.push(data);
  }

  return scrapedData;
}

(async () => {
  try {
    const linksCSV = fs.readFileSync('data/links.csv', 'utf-8');
    const links = linksCSV.split('\n').map((link) => link.trim());

    if (links.length === 0) {
      throw new Error('No links found in the CSV file.');
    }

    const scrapedData = await scrapeAllLinks(links);

    if (scrapedData.length === 0) {
      throw new Error('No data scraped from the links.');
    }

    const outputJSON = 'scripts/pg.json';

    const json = {
      current_date: new Date().toISOString(),
      length: scrapedData.reduce((acc, essay) => acc + essay.paragraphs.length, 0),
      tokens: scrapedData.reduce((acc, essay) => acc + essay.paragraphs.split(' ').length, 0),
      essays: scrapedData,
    };

    fs.mkdirSync('scripts', { recursive: true });
    fs.writeFileSync(outputJSON, JSON.stringify(json, null, 2));

    console.log('Scraping completed. Data saved to:', outputJSON);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      console.error('Stack Trace:', error.stack);
    } else {
      console.error('Unknown error:', error);
    }
  }
})();
