export const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
