import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {render,allRecords,recordPath,siteUrl} from '../.prerender/entry-server.js';
import {resolve} from 'node:path';
if(siteUrl&&(!/^https:\/\/[^/?#]+$/.test(siteUrl)||['localhost','127.0.0.1'].includes(new URL(siteUrl).hostname)))throw new Error('VITE_SITE_URL must be the confirmed public HTTPS origin without a path.');
const contentRoutes=['/','/builds/','/equipment/','/bosses/','/guides/','/about/',...allRecords.map(recordPath)];
const privateRoutes=['/saved/','/privacy/','/search/'];
const template=await readFile('dist/index.html','utf8');
const titles=new Set();
for(const route of [...contentRoutes,...privateRoutes,'/404/']){
 const rendered=render(route);const meta=[];
 const body=rendered.replace(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*\/>|<link\b[^>]*\/>/g,tag=>{meta.push(tag);return ''});
 const title=meta.find(t=>t.startsWith('<title'));
 if(!title||titles.has(title))throw new Error(`Missing or duplicate title for ${route}`);titles.add(title);
 if((body.match(/<h1\b/g)??[]).length!==1)throw new Error(`Expected one H1: ${route}`);
 const html=template.replace('<!--seo-head-->',meta.join('\n')).replace('<div id="root">',`<div id="root" data-route="${route.replace(/\/$/,'')||'/'}">`).replace('<!--app-html-->',body);
 const destination=route==='/404/'?'dist/404.html':`dist${route}index.html`;
 await mkdir(resolve(destination,'..'),{recursive:true});await writeFile(destination,html);
}
if(siteUrl){await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${contentRoutes.map(r=>`\n  <url><loc>${siteUrl}${r}</loc></url>`).join('')}\n</urlset>\n`)}
await writeFile('dist/robots.txt',siteUrl?`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n# Local build: configure VITE_SITE_URL before publication.\n');
await writeFile('dist/_redirects',[...contentRoutes,...privateRoutes].filter(r=>r!=='/').map(r=>`${r.slice(0,-1)} ${r} 301`).join('\n')+'\n');
await writeFile('dist/route-manifest.json',JSON.stringify({contentRoutes,privateRoutes,notFound:'/404.html',publicOrigin:siteUrl||null},null,2));
console.log(`PASS: ${contentRoutes.length} content routes + 3 private routes + 404 prerendered. ${siteUrl?'Canonical URLs and sitemap generated.':'Local build: noindex, no speculative canonical origin; public sitemap awaits confirmed VITE_SITE_URL.'}`);
