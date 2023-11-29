import * as fs from 'fs';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface LinkData {
  url: string;
  title: string;
  description: string;
  paragraphs: string;
  // Add more fields as needed
}

async function scrapeLink(link: string): Promise<LinkData> {
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);

    // Extract data from HTML using Cheerio selectors
    const title = $('title').text().trim();
    const description = $('meta[name="description"]').attr('content') || '';

    // Extract all text within the body
    const paragraphs = $('body').text().trim();

    const data: LinkData = {
      url: link,
      title,
      description,
      paragraphs,
    };

    console.log('Scraped data:', data);
    return data;
  } catch (error) {
    console.error(`Error scraping ${link}: ${error.message}`);
    return {
      url: link,
      title: 'Error',
      description: '',
      paragraphs: '',
      // Add more error handling or fields as needed
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

async function main() {
  try {
    // Load links from CSV file
    const linksCSV = fs.readFileSync('data/links.csv', 'utf-8');
    const links = linksCSV.split('\n').map((link) => link.trim());

    // Scrape data from all links
    const scrapedData = await scrapeAllLinks(links);

    // Save scraped data to a new CSV file
    const outputCSV = 'data/scraped_data.csv';
    const header = 'url,title,description,paragraphs\n'; // Adjust the header based on your fields

    fs.writeFileSync(outputCSV, header);

    for (const data of scrapedData) {
      const line = `"${data.url}","${data.title}","${data.description}","${data.paragraphs.replace(/"/g, '""')}"\n`; // Adjust based on your fields
      fs.appendFileSync(outputCSV, line);
    }

    console.log('Scraping completed. Data saved to:', outputCSV);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the main function
main();
