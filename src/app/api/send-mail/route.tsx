import { sendEmail } from '../../../lib/mailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const response = await req.json();


    const subject = `New Order Received: ${response.subject}`;
  

    try {
        await sendEmail('petermathe1969@gmail.com',subject,"O comanda noua.");
        
        return NextResponse.json({ message: 'Order processed' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error processing order and sending email' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}
