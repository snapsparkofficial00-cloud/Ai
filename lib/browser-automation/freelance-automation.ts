// lib/browser-automation/freelance-automation.ts
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { saveApprovalSession } from './session-store';

puppeteer.use(StealthPlugin());

export interface FiverrGigData {
  title: string;
  description: string;
  packages: { name: string; price: number; description: string }[];
  faq: { question: string; answer: string }[];
  galleryImageUrls: string[];
}

export interface UpworkProposalData {
  jobUrl: string;
  proposalText: string;
  bidAmount?: number;
}

export async function createFiverrGig(gigData: FiverrGigData, approvalId: string): Promise<{ approvalUrl: string }> {
  const browser = await puppeteer.launch({ 
    headless: true, 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  try {
    const page = await browser.newPage();

    // Login to Fiverr
    await page.goto('https://www.fiverr.com/login');
    await page.waitForSelector('#username', { timeout: 10000 });
    await page.type('#username', process.env.FIVERR_USERNAME!);
    await page.type('#password', process.env.FIVERR_PASSWORD!);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Navigate to gig creation
    await page.goto('https://www.fiverr.com/start_selling');
    await page.waitForSelector('input[name="title"]', { timeout: 10000 });

    // Fill title
    await page.type('input[name="title"]', gigData.title);

    // Fill description (adjust selector as needed)
    if (gigData.description) {
      const descSelector = 'textarea[name="description"], [data-testid="description"]';
      await page.waitForSelector(descSelector, { timeout: 5000 });
      await page.type(descSelector, gigData.description);
    }

    // Save session for later approval
    const cookies = await page.context().cookies();
    const currentUrl = page.url();
    await saveApprovalSession(approvalId, cookies, currentUrl);

    const approvalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelance/approve/${approvalId}`;
    
    await browser.close();
    return { approvalUrl };
    
  } catch (error) {
    await browser.close();
    throw error;
  }
}
