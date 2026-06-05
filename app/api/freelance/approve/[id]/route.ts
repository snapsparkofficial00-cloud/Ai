// app/api/freelance/approve/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // Browser automation is now handled by a separate Render worker.
  // This endpoint is kept for compatibility but doesn't execute Puppeteer.
  console.log(`Approval requested for session: ${params.id}`);
  
  return NextResponse.json({
    success: false,
    message: 'Browser automation moved to Render worker. Please ensure your freelance-worker is running.',
    sessionId: params.id,
    nextSteps: [
      'Create a Render Background Worker service',
      'Set environment variables (FIVERR_USERNAME, FIVERR_PASSWORD, etc.)',
      'The worker will pick up tasks from task_queue and execute them',
    ],
  });
}
