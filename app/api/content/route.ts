import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'landing-content.json');

export async function GET() {
    if (process.env.NODE_ENV !== 'development') {
        return new NextResponse('Not allowed', { status: 403 });
    }
    try {
        const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading content file:', error);
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (process.env.NODE_ENV !== 'development') {
        return new NextResponse('Not allowed', { status: 403 });
    }
    try {
        const body = await request.json();
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error writing content file:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
