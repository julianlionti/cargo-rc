const locale = "es-AR";
// Formatters for number and currency
export const numberFormatter = new Intl.NumberFormat(locale, {
  maximumFractionDigits: 2,
});

export const currencyFormatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2,
});
