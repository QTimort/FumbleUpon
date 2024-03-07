import axios from 'axios';
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, context: {params: {url: string}}) {
  try {
    const searchParams = new URL(req.url)?.searchParams;
    const url = searchParams?.get('url');

    if (!url) {
      return NextResponse.json({ error: 'No URL provided' });
    }

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      responseType: 'text',
    });

    const r = new NextResponse(response.data);
    r.headers.set('Content-Type', 'text/html; charset=utf-8');
    r.headers.set('Access-Control-Allow-Origin', '*');
    return r;
  } catch (error) {
    console.error('Error fetching the URL:', error);
    return NextResponse.json({ error: 'Failed to fetch the URL' });
  }
}
