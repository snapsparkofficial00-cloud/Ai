import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-extra';
import { getApprovalSession } from '@/lib/browser-automation/session-store';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { cookies, url } = await getApprovalSession(params.id);
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setCookie(...cookies);
  await page.goto(url);
  // Wait for the final publish button and click
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await browser.close();
  return NextResponse.json({ success: true, message: 'Gig published!' });
}
