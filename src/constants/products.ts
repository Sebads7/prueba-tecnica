import { Product } from "../types";

export const products: Product[] = [
  {
    id: "100012",
    title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
    description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
    price: 60588,
    listingPrice: 67320,
    stock: 5,
    discount: "10% OFF",
    salesUnit: "group",
    measurementUnit: "pallet",
    unitValue: 198,
    img: "/assets/palet-ladrillo.jpg",
  },
  {
    id: "2060",
    title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
    description:
      "Ceramica esmaltada36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
    price: 13031,
    stock: 7,
    salesUnit: "area",
    measurementUnit: "m2",
    unitValue: 2.68,
    img: "/assets/azabache-1.jpg",
  },
  {
    id: "10035",
    title: "Hierro 25 mm x 12 m Acindar",
    description: "HIERRO 25 MM X 12M",
    price: 76293,
    listingPrice: 89757,
    stock: 2,
    discount: "15% OFF",
    salesUnit: "unit",
    img: "/assets/hierro-nervado-25mm.jpg",
  },
];
