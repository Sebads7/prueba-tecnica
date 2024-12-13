export const useFormatPrice = () => {
  const formatPrice = (price: number) => {
    const priceString = Math.floor(price).toString(); // Convert to string and remove decimals
    const digits = priceString.length; // Count the number of digits

    let formattedPrice;
    if (digits === 5) {
      formattedPrice = `${priceString.slice(0, 2)}.${priceString.slice(2)}`;
    } else if (digits === 6) {
      formattedPrice = `${priceString.slice(0, 3)}.${priceString.slice(3)}`;
    } else {
      formattedPrice = price.toFixed(2);
    }

    return `$${formattedPrice}`;
  };

  return { formatPrice };
};
