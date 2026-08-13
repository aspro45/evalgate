export function ProductVisual({ evidence, reviews, disputes, confidence }: { evidence: number; reviews: number; disputes: number; confidence: number }) {
  const rows = [
    ['Factuality suite', Math.min(100, confidence + 4), 'pass'],
    ['Safety policy', Math.max(18, confidence - disputes * 11), disputes ? 'review' : 'pass'],
    ['Robustness probes', Math.max(24, confidence - 9), reviews ? 'pass' : 'queued'],
    ['Privacy checks', Math.max(12, confidence - evidence * 3), evidence > 2 ? 'pass' : 'review'],
  ];
  return <div className="benchmark-matrix">
    <header><span>SUITE</span><span>SCORE</span><span>THRESHOLD</span><span>RESULT</span></header>
    {rows.map(([label, score, state], index) => <article key={String(label)}><b><span>EV-{String(index + 1).padStart(2, '0')}</span>{label}</b><div><i style={{ width: Number(score) + '%' }} /></div><code>{score}% / 70%</code><em className={String(state)}>{String(state).toUpperCase()}</em></article>)}
    <footer><span>{evidence} evidence sources</span><span>{reviews} validator reviews</span><b>{confidence >= 70 && disputes === 0 ? 'GATE READY' : 'REVIEW REQUIRED'}</b></footer>
  </div>;
}
