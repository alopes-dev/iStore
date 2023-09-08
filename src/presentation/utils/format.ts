export const { format: formatPrice } = new Intl.NumberFormat("pt-Br", {
  style: "currency",
  currency: "EUR",
});

export const getImage = (id: number) =>
  `https://picsum.photos/255/100?grayscale?random=${id}`;
