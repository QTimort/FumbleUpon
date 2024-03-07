# Fumble Upon

Discover the Solana ecosystem click by click

## Usage

1. Copy `.env.example` to `.env.local`

```bash
cp .env.example .env.local
```

2. Install
```bash
yarn
```

2. Start dev
```bash
yarn dev
```

## Features

- Next.js 14+ `/app` router
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI + Tailwind)
- Prettier (w/ auto sort imports and tailwind classes)
- SEO optimized
- Typesafe env, icons, and config
- Ready to use - jump right into development

## Scripts

1. Check project formatting

```bash
yarn format:check
```

2. Format the project

```bash
yarn format
```

## Scrap alchemy.com
- Go to `https://www.alchemy.com/ecosystem/solana`
- Open the dev tools (debug tool)
- Find the script cmsload.js in @npm/finsweet
- Locate the line:
```js
return m && i !== u && (t.originalItemsPerPage = t.itemsPerPage = u),
await t.addItems(c, o),
m
```
- Put a break point at `m`
- Refresh the page
- If there is 5 page, skip 5 times
- Then store `t.originalItemsOrder` as global variable
- Then run the code below:
```js
let fetchHTML = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const htmlText = await response.text();
        return htmlText;
    } catch (error) {
        console.error("Could not fetch the HTML page:", error);
        return null;
    }
}
let extractJSONFromHTML = (htmlText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const scriptTags = doc.querySelectorAll('script[type="application/ld+json"]');

    const jsonObjects = Array.from(scriptTags).map(tag => {
        try {
            return JSON.parse(tag.textContent.replaceAll('\n', '').replaceAll('\r', ''));
        } catch (e) {
            console.error("Error parsing JSON from script tag:", e);
            return null; 
        }
    }).filter(Boolean);

    return jsonObjects?.[0];
}
let data = Promise.all(temp1.map(d => ({
    link: d.href,
    isValid: d.valid
})).map(async (d) => ({
    data: await extractJSONFromHTML(await fetchHTML(d.link))
})));
```
- you can now export the data object to a json file/stringify it

## Scrap dudestoolbox.xyz/
- Fetch: https://api.dudestoolbox.xyz/tool/chain/1

## Scrap cubik.so
This implementation only fetch the last 30 projects
```js
function extractProjectLink(str) {
    const regex = /\\"projectLink\\":\\"(https?:\/\/[^"]+)\\"/;
    const match = str.match(regex);
    return match ? match[1] : null;
}

function extractIndustryArray(str) {
  const regex = /\\"industry\\":(\[.*?\])/;
  const match = str.match(regex);
  if (match) {
    try {
      const industryArray = JSON.parse(match[1].replaceAll('\\"', '"'));
      return industryArray;
    } catch (error) {
      console.error("Error parsing industry array:", error);
      return null;
    }
  } else {
    return null;
  }
}
async function loadHtmlContentAsText(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error("Failed to fetch the page: ", error);
    return null;
  }
}
const projects = await fetch('https://web-api.cubik.so/v1/cached/home/load').then(r => r.json()).then(r => r.data.projects);
const parsedProjects = await Promise.all(
    projects.map(p => (
        loadHtmlContentAsText('https://www.cubik.so/p/' + p.slug).then(html => ({
            url: extractProjectLink(html),
            categories: extractIndustryArray(html),
            slug: p.slug
        }))
    ))
);
```
- you can now export the parsedProjects object to a json file/stringify it


