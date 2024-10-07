import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/QTimort/FumbleUponDB/refs/heads/master/db.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
