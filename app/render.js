// DealScout's rendering: one job — turn deals into cards and the detail
// view. No data lives here; it reads deals.js through the caller.

import { discountOf, savingOf } from './filters.js';
import { SOURCES, VERDICTS } from './deals.js';

export function money(amount, monthly) {
  const text = amount % 1 === 0 ? `$${amount}` : `$${amount.toFixed(2)}`;
  return monthly ? `${text}/mo` : text;
}

export function checkedLabel(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d} ${months[m - 1]} ${y}`;
}

function verdictChip(verdict) {
  return `<span class="verdict verdict-${verdict}">${VERDICTS[verdict]}</span>`;
}

export function dealCard(deal) {
  const pct = discountOf(deal);
  const source = SOURCES[deal.source];
  return `<article class="card" data-id="${deal.id}" tabindex="0" role="button" aria-label="${deal.name} at ${deal.store}, details">
    <div class="card-top">
      <span class="chip">${deal.category}</span>
      <span class="store">${deal.store}</span>
    </div>
    <h3 class="card-name">${deal.name}</h3>
    <div class="card-verdict">${verdictChip(deal.verdict)}<span class="pct">−${pct}%</span></div>
    <div class="prices">
      <span class="sale">${money(deal.price, deal.monthly)}</span>
      <span class="was">${money(deal.was, deal.monthly)}</span>
      <span class="save">Save ${money(savingOf(deal), deal.monthly)}</span>
    </div>
    <p class="evidence">${deal.evidence}</p>
    <p class="checked">Checked ${checkedLabel(deal.checked)} · Source: ${source.label.split(' — ')[0]}</p>
    <a class="deal-link" href="${deal.url}" target="_blank" rel="noopener">View at ${deal.store} →</a>
  </article>`;
}

export function dealDetail(deal, allDeals) {
  const pct = discountOf(deal);
  const source = SOURCES[deal.source];
  const peers = deal.group
    ? allDeals.filter((d) => d.group === deal.group && d.id !== deal.id)
    : [];
  const compare = peers.length ? `
    <h4>Same product at other stores</h4>
    <table class="compare">
      <thead><tr><th>Store</th><th>Sale price</th><th>Usual</th><th>Discount</th><th></th></tr></thead>
      <tbody>
        <tr class="this-row"><td>${deal.store}</td><td><strong>${money(deal.price, deal.monthly)}</strong></td><td>${money(deal.was, deal.monthly)}</td><td>−${pct}%</td><td>This deal</td></tr>
        ${peers.map((p) => `<tr><td>${p.store}</td><td><strong>${money(p.price, p.monthly)}</strong></td><td>${money(p.was, p.monthly)}</td><td>−${discountOf(p)}%</td><td><a href="${p.url}" target="_blank" rel="noopener">View →</a></td></tr>`).join('')}
      </tbody>
    </table>` : '';
  return `
    <div class="detail-top">
      <span class="chip">${deal.category}</span>
      <span class="store">${deal.store}</span>
    </div>
    <h3 class="detail-name">${deal.name}</h3>
    <div class="card-verdict">${verdictChip(deal.verdict)}<span class="pct">−${pct}%</span></div>
    <div class="prices detail-prices">
      <span class="sale">${money(deal.price, deal.monthly)}</span>
      <span class="was">${money(deal.was, deal.monthly)}</span>
      <span class="save">Save ${money(savingOf(deal), deal.monthly)}</span>
    </div>
    <p class="evidence detail-evidence"><strong>Is it really a deal?</strong> ${deal.evidence}</p>
    <p class="checked">Price checked ${checkedLabel(deal.checked)}. Read in: <a href="${source.url}" target="_blank" rel="noopener">${source.label}</a> (${source.checkedNote}).</p>
    ${compare}
    <a class="deal-link detail-link" href="${deal.url}" target="_blank" rel="noopener">View at ${deal.store} →</a>`;
}
