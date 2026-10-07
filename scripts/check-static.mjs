import {readFile} from 'node:fs/promises';
const manifest=JSON.parse(await readFile('dist/route-manifest.json','utf8'));
const routes=[...manifest.contentRoutes,...manifest.privateRoutes];
const allowed=new Set([...routes,'/404/']);const errors=[];let links=0;
for(const route of routes){const html=await readFile(`dist${route}index.html`,'utf8');
 if(!html.includes('data-route='))errors.push(`${route}: missing hydration route`);
 if((html.match(/<h1\b/g)??[]).length!==1)errors.push(`${route}: H1 count`);
 if((html.match(/name="description"/g)??[]).length!==1)errors.push(`${route}: description count`);
 for(const [,href] of html.matchAll(/href="([^"#]*)/g)){if(href.startsWith('/')&&!href.startsWith('//')&&!href.match(/\.(?:webp|png|jpg|svg|woff|css|js)/)){links++;if(!allowed.has(href.split('?')[0]))errors.push(`${route}: unknown link ${href}`)}}
 if(html.includes('G-')||html.includes('googletagmanager')||html.includes('adsbygoogle'))errors.push(`${route}: unwanted external tracking`);
 if(!manifest.publicOrigin&&(!html.includes('noindex')||html.includes('rel="canonical"')))errors.push(`${route}: unsafe local SEO`);
}
const missing=await fetch('http://127.0.0.1:4180/not-in-the-archive/');if(missing.status!==404)errors.push('Unknown route did not return HTTP 404');
const unknownRecord=await fetch('http://127.0.0.1:4180/builds/missing/');if(unknownRecord.status!==404)errors.push('Unknown record did not return HTTP 404');
for(const path of ['/','/builds/colossal-knight/','/equipment/milady/','/bosses/mohg/','/guides/affinities/','/saved/','/assets/../favicon.svg']){const res=await fetch('http://127.0.0.1:4180'+path);if(res.status!==200)errors.push(`${path}: HTTP ${res.status}`)}
const slash=await fetch('http://127.0.0.1:4180/builds',{redirect:'manual'});if(slash.status!==301||slash.headers.get('location')!=='/builds/')errors.push('Trailing slash redirect failed');
const assets=JSON.parse(await readFile('src/media-assets.json','utf8'));let images=0;
for(const asset of Object.values(assets))for(const key of ['src','thumb']){const res=await fetch('http://127.0.0.1:4180'+asset[key]);if(res.status!==200||res.headers.get('content-type')!=='image/webp')errors.push(`${asset[key]}: invalid image response`);const served=Buffer.from(await res.arrayBuffer());const built=await readFile('dist'+asset[key]);if(!served.equals(built))errors.push(`${asset[key]}: served bytes differ from build`);images++}
if(errors.length)throw new Error(errors.join('\n'));
console.log(`PASS: ${routes.length} route HTML files, ${links} internal links, ${images} complete image HTTP responses, metadata, local noindex, direct HTTP routes, slash redirect and real 404 responses.`);
