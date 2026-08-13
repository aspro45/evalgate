import Head from 'next/head';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { openOnchainAction, useOnchain } from '../lib/onchain';
import { contractState, project } from '../lib/project-data';
import { ProductVisual } from './ProductVisual';

const human = (value: string) => value.replaceAll('_', ' ').toLowerCase();
const short = (value: string) => value ? value.slice(0, 7) + '...' + value.slice(-5) : 'not available';
const routeHref = (route: string) => route === project.routes[0] ? '/' : '/' + route;
const icons = ["fa-rocket","fa-id-card","fa-vials","fa-triangle-exclamation","fa-door-closed"];

export function AppFrame({ view = "releases" }: { view?: string }) {
  const { snapshot, refreshing, refresh } = useOnchain();
  const active = snapshot.cases[0];
  const details = active ? snapshot.details[active.id] : undefined;
  const evidence = details?.evidence.length || 0;
  const reviews = details?.reviews.length || 0;
  const challenges = details?.challenges.length || 0;
  const appeals = details?.appeals.length || 0;
  const disputes = challenges + appeals;
  const confidence = Math.round((active?.confidenceBps || 0) / 100);
  const pending = (details?.challenges.filter(item => item.ruling === 'pending').length || 0)
    + (details?.appeals.filter(item => item.ruling === 'pending').length || 0);
  const records = snapshot.cases;
  const viewLabel = human(view);
  
  return <div className="eval-app">
    <Head><title>{project.name} | Model release laboratory</title><meta name="description" content={project.intro} /><link rel="icon" href="data:," /></Head>
    <header className="lab-status">
      <Link href="/" className="eval-brand"><span>EG</span><div>{project.name}<small>Model evaluation laboratory</small></div></Link>
      <div className="lab-signals"><span><i /> STUDIONET ONLINE</span><span>RELEASES {records.length}</span><span>OPEN RISKS {pending}</span></div>
      <ConnectButton chainStatus="icon" showBalance={false} accountStatus="address" />
    </header>
    <nav className="lab-tabs">{project.routes.map((route, index) => <Link className={route === view ? 'active' : ''} href={routeHref(route)} key={route}><i className={'fa-solid ' + icons[index]} />{human(route)}<span>{String(index + 1).padStart(2, '0')}</span></Link>)}</nav>
    <main className="lab-bench">
      <section className="release-strip">
        <div><small>Release candidate / {viewLabel}</small><h1>{active?.title || 'No release candidate'}</h1><p>{active?.summary || active?.claim || project.intro}</p></div>
        <dl><div><dt>Gate confidence</dt><dd>{confidence}%</dd></div><div><dt>Evaluation evidence</dt><dd>{evidence}</dd></div><div><dt>Risk filings</dt><dd>{disputes}</dd></div></dl>
        <button onClick={() => openOnchainAction('create')}><i className="fa-solid fa-plus" /> Propose release</button>
      </section>
      <section className="evaluation-grid">
        <article className="matrix-panel"><header><div><small>Evaluation suite</small><h2>Release evidence matrix</h2></div><button title="Refresh evaluation" onClick={() => void refresh()}><i className={'fa-solid fa-rotate' + (refreshing ? ' fa-spin' : '')} /></button></header><ProductVisual evidence={evidence} reviews={reviews} disputes={disputes} confidence={confidence} /></article>
        <aside className="risk-notebook">
          <header><span>RISK NOTEBOOK</span><b>{pending ? pending + ' OPEN' : 'CLEAR'}</b></header>
          <blockquote>{active?.rationale || 'The release is waiting for a validator-backed gate rationale.'}</blockquote>
          <ol><li><span>01</span><b>Model card</b><em>{evidence ? 'attached' : 'missing'}</em></li><li><span>02</span><b>Evaluation suite</b><em>{reviews ? 'reviewed' : 'queued'}</em></li><li><span>03</span><b>Risk findings</b><em>{pending ? 'open' : 'resolved'}</em></li><li><span>04</span><b>Release gate</b><em>{human(active?.outcome || 'pending')}</em></li></ol>
          <button onClick={() => openOnchainAction('challenge', active?.id)}>Open risk controls</button>
        </aside>
      </section>
      <section className="run-table"><header><span>Candidate</span><span>State</span><span>Evidence</span><span>Confidence</span><span>Gate</span><span /></header>{records.map(record => <article key={record.id}><b>EG-{record.id.padStart(4, '0')} / {record.title}</b><span>{human(record.status)}</span><span>{record.evidenceCount}</span><span>{Math.round(record.confidenceBps / 100)}%</span><em>{human(record.outcome)}</em><button onClick={() => openOnchainAction('lifecycle', record.id)}>Manage</button></article>)}</section>
      <footer className="lab-footer"><a href={contractState.explorerUrl} target="_blank" rel="noreferrer">Contract {short(contractState.address)}</a><span>Evidence and release decisions are read from GenLayer Studionet.</span></footer>
    </main>
  </div>;
  
}
