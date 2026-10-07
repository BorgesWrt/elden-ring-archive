import {createHash} from 'node:crypto';
import {readFile,readdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const assets=JSON.parse(await readFile('src/media-assets.json','utf8'));
const inventory=JSON.parse(await readFile('public/media/sources.json','utf8'));
const errors=[];
const hashes=new Map(inventory.map(a=>[a.id,a]));
let bytes=0;
for(const [id,a] of Object.entries(assets)){
 if(!a.alt||!a.credit||!a.source.startsWith('https://')||!a.original.startsWith('https://'))errors.push(`${id}: missing attribution`);
 if(a.width<=0||a.height<=0||a.thumbWidth<=0)errors.push(`${id}: invalid dimensions`);
 for(const key of ['src','thumb']){
  if(!/^\/media\/[a-z0-9-]+(?:-thumb)?\.webp$/.test(a[key])){errors.push(`${id}: invalid local path`);continue}
  const content=await readFile(resolve('public','.'+a[key]));bytes+=content.length;
  if(content.toString('ascii',0,4)!=='RIFF'||content.toString('ascii',8,12)!=='WEBP')errors.push(`${id}: not a WebP image`);
  const actual=createHash('sha256').update(content).digest('hex');
  if(actual!==hashes.get(id)?.[key+'Hash'])errors.push(`${id}: ${key} checksum mismatch`);
 }
}
const files=(await readdir('public/media')).filter(f=>f.endsWith('.webp'));
if(files.length!==Object.keys(assets).length*2)errors.push('Untracked or missing media files');
if(errors.length)throw new Error(errors.join('\n'));
console.log(`PASS: ${Object.keys(assets).length} attributed local assets, ${files.length} verified WebP files, ${(bytes/1024/1024).toFixed(2)} MB.`);
