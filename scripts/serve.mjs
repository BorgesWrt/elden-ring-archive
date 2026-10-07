import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');const port=Number(process.env.PORT||4180);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff':'font/woff','.xml':'application/xml; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return}
 try{
  const url=new URL(req.url,'http://localhost');const path=decodeURIComponent(url.pathname);let target=resolve(root,'.'+path);
  if(target!==root&&!target.startsWith(root+sep)){res.writeHead(400);res.end();return}
  try{const info=await stat(target);if(info.isDirectory()){if(!path.endsWith('/')){res.writeHead(301,{Location:path+'/'+url.search});res.end();return}target=resolve(target,'index.html')}}catch{target=resolve(root,'404.html');res.statusCode=404}
  let data;try{data=await readFile(target)}catch{target=resolve(root,'404.html');data=await readFile(target);res.statusCode=404}
  res.setHeader('Content-Type',mime[extname(target)]??'application/octet-stream');res.setHeader('Cache-Control','no-cache');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(400);res.end('Invalid request')}
});
server.listen(port,'127.0.0.1',()=>console.log(`Elden Ring Archive: http://127.0.0.1:${port}/ (prerendered production build)`));
