export type LeadPayload = Record<string, any>;

function utmFromLocation() {
  if (typeof window === 'undefined') return {} as Record<string, string>;
  const q = new URLSearchParams(window.location.search);
  return {
    utm_source: q.get('utm_source') || '',
    utm_medium: q.get('utm_medium') || '',
    utm_campaign: q.get('utm_campaign') || '',
    utm_term: q.get('utm_term') || '',
    utm_content: q.get('utm_content') || '',
  } as Record<string, string>;
}

export async function notifyLead(context: string, payload: LeadPayload) {
  try {
    await fetch('https://utlyzecom.vercel.app/api/notify-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context, payload }),
      // No-cors not needed; endpoint sends appropriate CORS headers
    });
  } catch (e) {
    // best-effort only; do not block UX
    console.warn('notifyLead failed', e);
  }
}

export function buildBookingPayload(data: {
  name: string; email: string; company: string;
  challenge?: string; challengeDetails?: string;
  preferredDate?: string; preferredTime?: string; timezone?: string;
}) {
  const page_url = typeof window !== 'undefined' ? window.location.href : '';
  return {
    name: data.name,
    email: data.email,
    company: data.company,
    challenge: data.challenge,
    challenge_details: data.challengeDetails,
    preferred_date: data.preferredDate,
    preferred_time: data.preferredTime,
    timezone: data.timezone,
    page_url,
    ...utmFromLocation(),
  };
}

