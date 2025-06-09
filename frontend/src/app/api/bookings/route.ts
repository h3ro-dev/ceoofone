import { NextRequest, NextResponse } from 'next/server';

interface BookingData {
  name: string;
  email: string;
  company: string;
  challenge: string;
  challengeDetails: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: BookingData = await req.json();

    // Basic validation
    const requiredFields = ['name', 'email', 'company', 'challenge', 'challengeDetails', 'preferredDate', 'preferredTime'];
    const missingFields = requiredFields.filter(field => !body[field as keyof BookingData]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For now, just log the booking data
    // In production, this would integrate with a booking system (Calendly, Cal.com, etc.)
    console.log('New booking received:', {
      ...body,
      submittedAt: new Date().toISOString(),
      ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown'
    });

    // TODO: Integration points for production:
    // 1. Save to database (PostgreSQL, MongoDB, etc.)
    // 2. Send confirmation email (SendGrid, AWS SES, etc.)
    // 3. Create calendar event (Google Calendar API, Calendly, etc.)
    // 4. Send notification to admin (Slack, email, etc.)
    // 5. Add to CRM (HubSpot, Salesforce, etc.)
    // 6. Analytics tracking (Google Analytics, Mixpanel, etc.)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Booking submitted successfully',
      bookingId: `BOOK-${Date.now()}`,
      data: {
        name: body.name,
        email: body.email,
        company: body.company,
        scheduledFor: `${body.preferredDate} at ${body.preferredTime} (${body.timezone})`
      }
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}