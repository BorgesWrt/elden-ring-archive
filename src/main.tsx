import {StrictMode} from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {App} from './App';
import './styles.css';
const root=document.getElementById('root')!;
const current=window.location.pathname.replace(/\/$/,'')||'/';
const app=<StrictMode><BrowserRouter><App/></BrowserRouter></StrictMode>;
if(root.children.length&&root.dataset.route===current&&!window.location.search)hydrateRoot(root,app);
else{root.replaceChildren();document.querySelectorAll('head [data-archive-meta]').forEach(e=>e.remove());createRoot(root).render(app)}
