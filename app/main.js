// DealScout's entry point: one job — wire the controls to the deal list
// and keep the page in sync with the user's choices.

import { DEALS } from './deals.js';
import { filterDeals, sortDeals, listCategories, listStores, discountOf } from './filters.js';
import { dealCard, dealDetail } from './render.js';

const state = { query: '', category: 'all', store: 'all', minDiscount: 0, sort: 'best' };

const grid = document.getElementById('grid');
const countLine = document.getElementById('count');
const searchBox = document.getElementById('search');
const categorySelect = document.getElementById('category');
const storeSelect = document.getElementById('store');
const discountSelect = document.getElementById('discount');
const sortSelect = document.getElementById('sort');
const dialog = document.getElementById('detail');
const dialogBody = document.getElementById('detail-body');
const dialogClose = document.getElementById('detail-close');

function fillSelect(select, values, allLabel) {
  for (const value of values) {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }
  select.insertAdjacentHTML('afterbegin', `<option value="all">${allLabel}</option>`);
  // Inserting the "All" option at the front does not move the selection:
  // the first appended option stays selected, so point the select at "All".
  select.value = 'all';
}

function render() {
  const shown = sortDeals(filterDeals(DEALS, state), state.sort);
  grid.innerHTML = shown.length
    ? shown.map(dealCard).join('')
    : '<p class="empty">No deals match those filters. Loosen the search or pick a lower discount.</p>';
  countLine.textContent = `Showing ${shown.length} of ${DEALS.length} deals · ${DEALS.filter((d) => d.verdict === 'new-low').length} new lows · best discount ${Math.max(...DEALS.map(discountOf))}% off`;
}

function openDetail(id) {
  const deal = DEALS.find((d) => d.id === id);
  if (!deal) return;
  dialogBody.innerHTML = dealDetail(deal, DEALS);
  dialog.showModal();
}

fillSelect(categorySelect, listCategories(DEALS), 'All categories');
fillSelect(storeSelect, listStores(DEALS), 'All stores');

searchBox.addEventListener('input', () => { state.query = searchBox.value; render(); });
categorySelect.addEventListener('change', () => { state.category = categorySelect.value; render(); });
storeSelect.addEventListener('change', () => { state.store = storeSelect.value; render(); });
discountSelect.addEventListener('change', () => { state.minDiscount = Number(discountSelect.value); render(); });
sortSelect.addEventListener('change', () => { state.sort = sortSelect.value; render(); });

grid.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link) return;
  const card = event.target.closest('.card');
  if (card) openDetail(card.dataset.id);
});
grid.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  const card = event.target.closest('.card');
  if (card) openDetail(card.dataset.id);
});
dialogClose.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

render();
