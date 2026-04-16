import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter (resets on cold start — fine for a portfolio)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
  }

  let body: { name?: string; message?: string; visitorId?: string; slot?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name = 'Anonymous', message, visitorId, slot } = body;

  // Validate
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }
  if (message.length > 100) {
    return NextResponse.json({ error: 'Message too long (max 100 chars)' }, { status: 400 });
  }
  if (!visitorId || typeof visitorId !== 'string') {
    return NextResponse.json({ error: 'Missing visitor ID' }, { status: 400 });
  }
  if (slot !== 1 && slot !== 2) {
    return NextResponse.json({ error: 'Invalid slot (must be 1 or 2)' }, { status: 400 });
  }

  // Fire-and-forget: create a GitHub Issue for notification
  const token = process.env.GITHUB_GUESTBOOK_TOKEN;
  const repo = process.env.GITHUB_GUESTBOOK_REPO;

  if (token && repo) {
    const displayName = String(name).trim().slice(0, 20) || 'Anonymous';
    const issueBody = [
      `**📋 Guestbook Sign**`,
      ``,
      `**Name:** ${displayName}`,
      `**Message:** ${message.trim()}`,
      `**Slot:** ${slot}`,
      ``,
      `---`,
      `*Visitor ID:* \`${visitorId}\``,
      `*Time:* ${new Date().toISOString()}`,
      `*IP:* ${ip}`,
    ].join('\n');

    // Fire and forget — don't await, don't fail the response if GitHub is down
    fetch(`https://api.github.com/repos/${repo}/issues`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `📋 Guestbook: ${displayName} placed a sign`,
        body: issueBody,
        labels: ['guestbook'],
      }),
    }).catch(() => {
      // Silent fail — localStorage already saved the sign client-side
    });
  }

  return NextResponse.json({ ok: true });
}
