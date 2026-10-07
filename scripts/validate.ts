import assets from '../src/media-assets.json';
import aliases from '../src/media-map.json';
import {allRecords,builds,byId,classes,recordPath,stats} from '../src/data';
const errors:string[]=[];
const assert=(ok:boolean,message:string)=>{if(!ok)errors.push(message)};
assert(new Set(allRecords.map(r=>r.id)).size===allRecords.length,'Duplicate record IDs');
assert(new Set(allRecords.map(recordPath)).size===allRecords.length,'Duplicate record paths');
for(const r of allRecords){
 const visual=(aliases as Record<string,string>)[r.id]??r.id;
 assert(!!(assets as Record<string,unknown>)[visual],`${r.id}: missing assigned image`);
 assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.id),`${r.id}: invalid slug`);
 assert(r.summary.length>50,`${r.id}: insufficient summary`);
 assert(r.sections.length>=2,`${r.id}: incomplete sections`);
 assert(r.sections.every(s=>s.title&&s.paragraphs.every(p=>p.length>50)),`${r.id}: empty or trivial prose`);
 assert(r.sources.length>0,`${r.id}: missing source`);
 for(const s of r.sources){assert(/^https:\/\//.test(s.url),`${r.id}: insecure source`);assert(!s.url.toLowerCase().includes('nightreign'),`${r.id}: Nightreign source`);assert(!s.url.includes('’'),`${r.id}: typographic apostrophe in source URL`)}
 for(const id of r.related)assert(!!byId[id],`${r.id}: missing relation ${id}`);
 assert(new Set(r.related).size===r.related.length,`${r.id}: duplicate relations`);
 for(const [k,n] of Object.entries(r.requirements??{}))assert(stats.includes(k as typeof stats[number])&&Number.isInteger(n)&&n>0&&n<=99,`${r.id}: invalid requirement ${k}`);
}
for(const r of builds){
 const b=r.build!;const start=classes[b.className];let allocated=0;
 for(const k of stats){const n=b.stats[k];assert(Number.isInteger(n)&&n>=start.stats[k]&&n<=99,`${r.id}: ${k} below class floor or out of range`);allocated+=n-start.stats[k]}
 assert(start.level+allocated===b.level,`${r.id}: level ${start.level+allocated} does not match ${b.level}`);
 assert(b.progression.length===3&&b.alternatives.length>=3,`${r.id}: missing progression or alternatives`);
 const talismans=b.loadout.filter(l=>byId[l.id]?.kind==='talisman');assert(talismans.length<=4,`${r.id}: more than 4 talismans`);
 for(const l of b.loadout){const item=byId[l.id];assert(!!item,`${r.id}: missing loadout ${l.id}`);if(!item)continue;
   assert(!item.dlc||r.dlc,`${r.id}: hidden DLC dependency ${l.id}`);
   for(const [k,n] of Object.entries(item.requirements??{}))assert(b.stats[k as keyof typeof b.stats]>=n,`${r.id}: unmet ${k} requirement for ${l.id}`);
 }
 for(const id of b.encounters)assert(byId[id]?.kind==='boss',`${r.id}: invalid encounter ${id}`);
}
if(errors.length)throw new Error(errors.join('\n'));
console.log(`PASS: ${allRecords.length} records, unique routes, source links, relationships, 6 class floors / level totals, equipment requirements, DLC dependencies and images for all records.`);
