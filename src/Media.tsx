import {useEffect,useRef,useState} from 'react';
import type {RecordNode} from './data';
import {Pixel} from './Art';
import assetData from './media-assets.json';
import aliasData from './media-map.json';

export type MediaAsset={src:string;thumb:string;width:number;height:number;thumbWidth:number;alt:string;credit:string;source:string;original:string;kind:'icon'|'screenshot'};
export const mediaAssets=assetData as Record<string,MediaAsset>;
const aliases=aliasData as Record<string,string>;
export function recordMediaId(record:RecordNode){return aliases[record.id]??record.id}
export function recordMediaIds(record:RecordNode){const main=recordMediaId(record);return record.id==='radagon-elden-beast'?[main,'elden-beast']:[main]}

export function AssetImage({id,eager=false,decorative=false,small=false}:{id:string;eager?:boolean;decorative?:boolean;small?:boolean}){
 const asset=mediaAssets[id];const [failed,setFailed]=useState(false);
 if(!asset||failed)return <span className="media-fallback" role={decorative?undefined:'img'} aria-label={decorative?undefined:asset?.alt??'Image unavailable'}><Pixel kind={asset?.kind==='icon'?'sword':'map'}/></span>;
 return <img className={`game-image ${asset.kind} ${asset.height>asset.width?'portrait':'landscape'}`} src={small?asset.thumb:asset.src} srcSet={!small&&asset.thumbWidth<asset.width?`${asset.thumb} ${asset.thumbWidth}w, ${asset.src} ${asset.width}w`:undefined} sizes={small?undefined:'(max-width: 600px) 100vw, (max-width: 900px) 85vw, 900px'} width={asset.width} height={asset.height} alt={decorative?'':asset.alt} loading={eager?'eager':'lazy'} fetchPriority={eager?'high':undefined} decoding="async" onError={()=>setFailed(true)}/>;
}
export function RecordVisual({record,small=false}:{record:RecordNode;small?:boolean}){
 const id=recordMediaId(record);return mediaAssets[id]?<AssetImage id={id} decorative small={small}/>:<Pixel kind={record.art}/>;
}
function ImageViewer({id,onClose}:{id:string;onClose:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);const asset=mediaAssets[id];
 useEffect(()=>{const dialog=ref.current;dialog?.showModal();return()=>dialog?.close()},[]);
 return <dialog className="image-viewer" ref={ref} aria-label={asset.alt} onCancel={e=>{e.preventDefault();onClose()}} onClick={e=>{if(e.target===e.currentTarget)onClose()}}><div className="viewer-top"><span>ARCHIVE / IMAGE VIEW</span><button className="button" autoFocus onClick={onClose}>Close ×</button></div><AssetImage id={id} eager/><p>{asset.alt}</p><a href={asset.source} target="_blank" rel="noopener noreferrer">{asset.credit} · Source ↗</a></dialog>;
}
export function MediaFigure({id}:{id:string}){
 const [open,setOpen]=useState(false);const trigger=useRef<HTMLButtonElement>(null);const asset=mediaAssets[id];if(!asset)return null;
 const close=()=>{setOpen(false);requestAnimationFrame(()=>trigger.current?.focus({preventScroll:true}))};
 return <><figure className={`media-figure panel media-${asset.kind}`}><button ref={trigger} className="image-open" onClick={()=>setOpen(true)} aria-label={`View image: ${asset.alt}`} aria-haspopup="dialog"><AssetImage id={id} eager/><span className="image-hint">INSPECT IMAGE ↗</span></button><figcaption><span>{asset.alt}</span><a href={asset.source} target="_blank" rel="noopener noreferrer">{asset.credit} · Source ↗</a></figcaption></figure>{open&&<ImageViewer id={id} onClose={close}/>}</>;
}
export function MediaCredits({record}:{record:RecordNode}){
 const ids=recordMediaIds(record).filter(id=>mediaAssets[id]);return <div className="media-credit-note"><h3>Image sources</h3>{ids.map(id=><p key={id}><a href={mediaAssets[id].source} target="_blank" rel="noopener noreferrer">{mediaAssets[id].alt} — {mediaAssets[id].credit} ↗</a></p>)}<p>Game visuals © FromSoftware / Bandai Namco. Publicly accessible reference images; no free asset license is claimed. <a href="/about/#images">Image credits and use notes.</a></p></div>;
}
