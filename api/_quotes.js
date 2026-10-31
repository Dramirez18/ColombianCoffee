// Forma pública de una fila de quote_requests (la usan /api/quotes y /api/admin/quotes).
export function publicQuote(row) {
  return {
    id: Number(row.id),
    mode: row.mode,
    country: row.country,
    product: row.product,
    quantity: Number(row.quantity),
    unit: row.unit,
    usdPerKg: Number(row.usd_per_kg),
    totalUsd: Number(row.total_usd),
    quote: row.quote,
    note: row.note ?? '',
    status: row.status,
    createdAt: row.created_at,
  };
}
