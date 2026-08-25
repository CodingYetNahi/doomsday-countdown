import fs from 'node:fs';import path from 'node:path'
const origin='https://doomsday.cfd';
const staticPages={
'/':['Doomsday Daily — Countdown, Trivia and Fan Analysis','A cinematic countdown and daily fan experience for Avengers: Doomsday.'],
'/daily-challenge/':['Daily Challenge | Doomsday Daily','Today’s deterministic Asia/Kolkata trivia and browser-game challenge.'],
'/trivia/':['Trivia Archive | Doomsday Daily','A reviewed Marvel film and comics-context trivia archive.'],
'/games/':['Browser Games | Doomsday Daily','Play three accessible, original superhero-inspired browser games.'],
'/articles/':['Articles | Doomsday Daily','Original sourced explainers, historical context and clearly labelled analysis.'],
'/updates/':['Confirmed Updates | Doomsday Daily','Official Avengers: Doomsday information separated from rumours.'],
'/about/':['About | Doomsday Daily','About the independent Doomsday Daily fan project.'],
'/sources/':['Sources | Doomsday Daily','The primary-source and verification standards used by Doomsday Daily.'],
'/editorial-policy/':['Editorial Policy | Doomsday Daily','Editorial labels, corrections, spoiler and supervised drafting policies.'],
'/privacy/':['Privacy Policy | Doomsday Daily','Privacy details for local-only scores, preferences and optional advertising.'],
'/contact/':['Contact | Doomsday Daily','How to request a correction or contact the editorial project.']};
const source=fs.readFileSync('dist/index.html','utf8');const articleSource=fs.readFileSync('src/data/articles.ts','utf8');
const articles=[...articleSource.matchAll(/make\('([a-z0-9-]+)','([^']+)','([^']+)'/g)].map(([,slug,title,description])=>({slug,title,description}));
function render(route,title,description,type='website',jsonLd=''){let html=source.replace(/<title>.*?<\/title>/,`<title>${title}</title>`).replace(/<meta name="description" content="[^"]*" \/>/,`<meta name="description" content="${description}" />`).replace(/<meta property="og:title" content="[^"]*" \/>/,`<meta property="og:title" content="${title}" />`).replace(/<meta property="og:description" content="[^"]*" \/>/,`<meta property="og:description" content="${description}" />`).replace(/<meta property="og:type" content="[^"]*" \/>/,`<meta property="og:type" content="${type}" />`).replace(/<meta property="og:url" content="[^"]*" \/>/,`<meta property="og:url" content="${origin}${route}" />`).replace(/<link rel="canonical" href="[^"]*" \/>/,`<link rel="canonical" href="${origin}${route}" />`);if(!html.includes('twitter:title'))html=html.replace('<meta name="twitter:card" content="summary" />',`<meta name="twitter:card" content="summary" /><meta name="twitter:title" content="${title}" /><meta name="twitter:description" content="${description}" />`);if(jsonLd)html=html.replace('</head>',`<script type="application/ld+json">${jsonLd}</script></head>`);return html}
for(const [route,[title,description]] of Object.entries(staticPages)){const file=route==='/'?'dist/index.html':path.join('dist',route,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,render(route,title,description))}
for(const a of articles){const route=`/articles/${a.slug}/`,file=path.join('dist',route,'index.html'),ld=JSON.stringify({'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.description,datePublished:'2026-08-25',dateModified:'2026-08-25',author:{'@type':'Organization',name:'Doomsday Daily editorial desk'},mainEntityOfPage:origin+route});fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,render(route,`${a.title} | Doomsday Daily`,a.description,'article',ld))}
fs.writeFileSync('dist/404.html',render('/404/','Page Not Found | Doomsday Daily','The requested signal could not be found.'));
const urls=[...Object.keys(staticPages),...articles.map(a=>`/articles/${a.slug}/`)];fs.writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${origin}${u}</loc><lastmod>2026-08-25</lastmod></url>`).join('\n')}\n</urlset>\n`);console.log(`Generated ${urls.length} canonical routes and 404.`)
