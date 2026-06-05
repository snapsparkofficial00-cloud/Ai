import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
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
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Login
  await page.goto('https://www.fiverr.com/login');
  await page.waitForSelector('#username');
  await page.type('#username', process.env.FIVERR_USERNAME!);
  await page.type('#password', process.env.FIVERR_PASSWORD!);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // Navigate to gig creation
  await page.goto('https://www.fiverr.com/start_selling');
  await page.waitForSelector('input[name="title"]');

  // Fill title
  await page.type('input[name="title"]', gigData.title);

  // ... fill description, packages, FAQ (selectors depend on Fiverr's current DOM)
  // For brevity, we'll assume you map these fields.

  // Instead of clicking final "Publish", we store the current page state
  // and generate an approval URL that the user can click to continue.
  const approvalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/freelance/approve/${approvalId}`;
  // Save page context (cookies, session) to a file or database for later resumption
  const sessionData = await page.context().cookies();
  await saveApprovalSession(approvalId, sessionData, page.url());

  await browser.close();
  return { approvalUrl };
}
