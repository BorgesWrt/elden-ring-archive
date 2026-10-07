import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import {App} from './App';
export {allRecords,recordPath} from './data';
export const siteUrl=(import.meta.env.VITE_SITE_URL??'').replace(/\/$/,'');
export function render(url:string){return renderToString(<StaticRouter location={url}><App/></StaticRouter>)}
