import {useId} from 'react';
export function Mark(){return <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges"><path fill="currentColor" d="M15 4h2v5h4v2h-4v5h6v2h-6v9h-2v-9H9v-2h6v-5h-4V9h4zM7 9h2v14H7zM23 9h2v14h-2zM9 23h14v2H9z"/></svg>}
export function Icon({name}:{name:'search'|'arrow'|'menu'|'close'|'save'|'check'}){
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">{name==='search'?<><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></>:name==='menu'?<path d="M3 5h18M3 12h18M3 19h18"/>:name==='close'?<path d="m5 5 14 14M19 5 5 19"/>:name==='save'?<path d="M6 3h12v18l-6-4-6 4z"/>:name==='check'?<path d="m4 12 5 5L20 6"/>:<path d="M3 12h18m-7-7 7 7-7 7"/>}</svg>
}
// Original schematic motifs, not reproductions of official item icons.
export function Pixel({kind='sword'}:{kind?:string}){
 const sword=<><path fill="currentColor" d="M29 6h6v32h-2v6h-2v-6h-2z"/><path fill="#f0dfae" d="M29 6h2v30h-2z"/><path fill="#8c7446" d="M21 42h22v4H34v12h-5V46h-8z"/></>;
 return <svg aria-hidden="true" className={`pixel pixel-${kind}`} viewBox="0 0 64 64" shapeRendering="crispEdges">{
 kind==='greatsword'?<><path fill="currentColor" d="M24 5h16v31h-4v10h-8V36h-4z"/><path fill="#eee1b9" d="M24 5h4v30h-4z"/><path fill="#8c7446" d="M17 42h30v5H35v13h-6V47H17z"/></>:
 kind==='katana'||kind==='curved'?<><path fill="currentColor" d="M41 5h5v19h-5v10h-6v10h-6v6h-6v-7h6V31h6V19h6z"/><path fill="#8c7446" d="M18 43h23v4H29v13h-6V47h-5z"/></>:
 kind==='twinblade'?<><path fill="currentColor" d="M29 3h6v17h-2v5h-4zM29 39h6v20h-4v-5h-2z"/><path fill="#8c7446" d="M23 22h18v4h-6v12h6v4H23v-4h6V26h-6z"/></>:
 kind==='staff'?<><path fill="#8c7446" d="M29 20h5v39h-5z"/><path fill="currentColor" d="M24 8h15v5h4v12h-8v6h-8v-6h-8V13h5z"/><path fill="#e2e6e3" d="M27 10h6v12h-6z"/></>:
 kind==='flame'?<><path fill="currentColor" d="M30 4h6v14h6v-5h5v16h6v16h-7v9H18v-9h-7V29h6V18h7v12h6z"/><path fill="#e5ce87" d="M30 28h7v9h6v11H24V36h6z"/><path fill="#fbebbd" d="M30 39h6v11h-6z"/></>:
 kind==='shield'?<><path fill="currentColor" d="M12 8h40v26h-5v9h-7v9h-8v6h-4v-6h-8v-9h-8z"/><path fill="#e2c781" d="M16 12h32v4H16zM29 17h5v29h-5zM21 25h21v4H21z"/></>:
 kind==='seal'||kind==='talisman'?<><path fill="#8c7446" d="M25 4h14v4h-4v9h-5V8h-5z"/><path fill="currentColor" d="M20 17h24v5h6v25h-6v8H20v-8h-6V22h6z"/><path fill="#e1c881" d="M28 25h8v20h-8zM22 31h20v6H22z"/></>:
 kind==='turtle'?<><path fill="currentColor" d="M18 22h27v5h6v17h-6v5H18v-5h-6V27h6zM44 16h10v12H44zM16 44h7v11h-7zM37 44h7v11h-7z"/><path fill="#a0b68c" d="M25 26h12v13H25z"/></>:
 kind==='boss'?<><path fill="currentColor" d="M15 14h9V7h5v11h6V7h5v7h9v29h-8v10H23V43h-8z"/><path fill="#151915" d="M21 26h8v7h-8zM35 26h8v7h-8zM29 37h6v7h-6z"/></>:
 kind==='moon'?<><path fill="currentColor" d="M22 7h20v5h8v7h5v26h-7v9H22v-6H12V18h10z"/><path fill="#151915" d="M32 7h10v5h8v7h5v18H40v-6H29V17h3z"/></>:
 kind==='tree'?<><path fill="#8c7446" d="M29 28h7v28h13v4H16v-4h13z"/><path fill="currentColor" d="M26 6h13v7h10v8h8v12H43v8H22v-8H7V21h10v-8h9z"/><path fill="#ede0ab" d="M27 9h7v6h-7zM13 23h13v5H13z"/></>:
 kind==='map'?<><path fill="#8c7446" d="M9 10h46v47H9z"/><path fill="currentColor" d="M13 6h38v46H13z"/><path fill="#786341" d="M20 15h24v4H20zM20 25h14v4H20zM20 35h24v4H20zM20 43h15v4H20z"/></>:sword}</svg>
}
export function GoldenScene(){const id=useId().replaceAll(':','');return <svg className="golden-scene" viewBox="0 0 480 260" aria-hidden="true" shapeRendering="crispEdges">
 <defs><radialGradient id={id}><stop stopColor="#d3ab52" stopOpacity=".2"/><stop offset="1" stopColor="#d3ab52" stopOpacity="0"/></radialGradient></defs>
 <ellipse className="tree-glow" fill={`url(#${id})`} cx="288" cy="103" rx="160" ry="125"/>
 <g fill="#6e795c" opacity=".55"><path d="M22 73h3v3h-3zM73 37h2v2h-2zM149 29h3v3h-3zM395 40h3v3h-3zM444 85h2v2h-2zM184 91h2v2h-2z"/></g>
 <path fill="#282e23" d="M0 174h38v-17h31v8h48v-15h31v11h36v-20h31v-8h29v19h44v-9h37v16h30v-19h44v15h38v-14h24v22h20v-12h24v54H0z"/>
 <path fill="#39412e" d="M18 171v-53h10v-13h26v13h10v53H49v-35H34v35zM99 164v-64h9V87h29v13h10v64h-13v-44h-20v44zM363 163v-65h9V82h29v16h10v65h-15v-47h-18v47z"/>
 <g fill="#7a8251" opacity=".38"><path d="M21 120h4v31h-4zM102 105h4v40h-4zM367 103h4v38h-4z"/></g>
 <path fill="#927b3f" d="M268 164v-39h-8V98h-13V72h-13V59h9v10h16v23h11v24h11V87h-5V68h6v-8h7v21h7V57h8V42h7v23h-7v35h-9v33h-7v31h20v6h-67v-6z"/>
 <path fill="#c6a45b" d="M276 162v-40h-5V93h7v20h7V94h7V64h6v34h-7v36h-8v28z"/>
 <path fill="#a58b48" d="M205 54h-14V43h18V33h19V21h34V12h53v9h35v12h18v16h17v13h-23v15h-30v-9h-21V52h-23v13h-22V51h-19v14h-20v7h-31z"/>
 <path fill="#d6b76e" d="M207 39h21V28h34V20h53v8h24v9h16v11h-29v7h-26V40h-34v6h-29v13h-22V49h-8z"/>
 <g fill="#eddaa0"><path d="M247 27h15v6h-15zM273 21h20v5h-20zM312 31h19v5h-19zM215 43h12v5h-12zM331 43h16v5h-16z"/></g>
 <g className="falling-light" fill="#cbb16b"><path d="M225 88h3v6h-3zM317 89h3v5h-3zM341 111h3v5h-3zM259 59h3v4h-3z"/></g>
 <path fill="#1d251d" d="M0 208h41v-9h33v8h51v-13h37v9h32v-10h42v10h36v-13h45v10h36v-7h38v10h39v-7h34v11h46v53H0z"/>
 <path fill="#4b5034" d="M145 229h83v-6h79v-7h84v6h56v9H145z"/>
 <path fill="#a49c73" d="M186 153h12v5h6v11h-5v7h-16v-7h-4v-11h7z"/>
 <path fill="#6b795a" d="M183 176h18v7h6v19h-7v24h-7v-23h-5v23h-8v-24h-6v-20h9z"/>
 <path fill="#8f9a77" d="M183 179h8v19h-8z"/><path fill="#2b3326" d="M191 162h11v7h-11z"/>
 <path fill="#c2b990" d="M214 163h3v59h-3zM210 211h11v4h-11z"/>
 <path className="grace-light" fill="#e2bd6c" d="M249 216h14v3h-14zM254 196h3v20h-3zM251 200h3v10h-3zM257 193h3v9h-3z"/>
 <path fill="#101910" d="M0 246h24v-9h11v11h29v-4h11v10h49v6H0zM403 260v-15h17v-13h8v20h25v-9h13v10h14v7z"/>
 </svg>}
