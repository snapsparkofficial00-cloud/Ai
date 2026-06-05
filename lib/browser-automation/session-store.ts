// lib/browser-automation/session-store.ts
import { Cookie } from 'puppeteer';

const sessions = new Map<string, { cookies: Cookie[]; url: string }>();

export async function saveApprovalSession(
  id: string,
  cookies: Cookie[],
  url: string
) {
  sessions.set(id, { cookies, url });
}

export async function getApprovalSession(id: string) {
  const session = sessions.get(id);
  if (!session) throw new Error(`Approval session ${id} not found`);
  return session;
}
