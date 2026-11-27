// DealScout's filter and sort logic: one job — take the full deal list and
// a set of user choices, return the deals to show, in order.

export function discountOf(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function savingOf(deal) {
  return deal.was - deal.price;
}

const VERDICT_RANK = { 'new-low': 0, strong: 1, routine: 2, inflated: 3 };

export function filterDeals(deals, { query, category, store, minDiscount }) {
  const q = query.trim().toLowerCase();
  return deals.filter((deal) => {
    if (q && !`${deal.name} ${deal.store} ${deal.category}`.toLowerCase().includes(q)) return false;
    if (category !== 'all' && deal.category !== category) return false;
    if (store !== 'all' && deal.store !== store) return false;
    if (minDiscount > 0 && discountOf(deal) < minDiscount) return false;
    return true;
  });
}

export function sortDeals(deals, sortKey) {
  const list = [...deals];
  if (sortKey === 'best') {
    list.sort((a, b) =>
      VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict]
      || discountOf(b) - discountOf(a)
      || savingOf(b) - savingOf(a));
  } else if (sortKey === 'discount') {
    list.sort((a, b) => discountOf(b) - discountOf(a) || savingOf(b) - savingOf(a));
  } else if (sortKey === 'saving') {
    list.sort((a, b) => savingOf(b) - savingOf(a) || discountOf(b) - discountOf(a));
  } else if (sortKey === 'price-low') {
    list.sort((a, b) => a.price - b.price || discountOf(b) - discountOf(a));
  } else if (sortKey === 'price-high') {
    list.sort((a, b) => b.price - a.price || discountOf(b) - discountOf(a));
  }
  return list;
}

export function listCategories(deals) {
  return [...new Set(deals.map((d) => d.category))].sort();
}

export function listStores(deals) {
  return [...new Set(deals.map((d) => d.store))].sort();
}
