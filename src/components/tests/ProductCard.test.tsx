import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../ProductCard";
import { Product, Cart } from "../../types";
import { useCart } from "../../hooks/useCart";

jest.mock("../Roast", () => ({
  notifySuccess: jest.fn(),
  notifyError: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../hooks/useCart", () => ({
  useCart: jest.fn(),
}));

describe("ProductCard Component", () => {
  const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    description: "This is a test product.",
    price: 60588,
    stock: 5,
    salesUnit: "unit",
    img: "test-img.jpg",
    unitValue: 1,
  };

  const mockCart: Cart = {
    id: "cart-1",
    items: [],
    createdAt: new Date(),
  };

  const setCart = jest.fn();
  const mockAddToCart = jest.fn();
  const mockRemoveFromCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });
  });

  it("renders product details correctly", () => {
    render(
      <ProductCard product={mockProduct} cart={mockCart} setCart={setCart} />
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$60.588")).toBeInTheDocument();
  });

  it("increments and decrements quantity", () => {
    render(
      <ProductCard product={mockProduct} cart={mockCart} setCart={setCart} />
    );

    const incrementButton = screen.getByText("+");
    const decrementButton = screen.getByText("-");
    const quantityDisplay = screen.getByText("0");

    fireEvent.click(incrementButton);
    expect(quantityDisplay.textContent).toBe("1");

    fireEvent.click(decrementButton);
    expect(quantityDisplay.textContent).toBe("0");
  });

  it("does not exceed stock limit when incrementing quantity", () => {
    render(
      <ProductCard product={mockProduct} cart={mockCart} setCart={setCart} />
    );

    const incrementButton = screen.getByText("+");
    const quantityDisplay = screen.getByText("0");

    for (let i = 0; i < mockProduct.stock + 1; i++) {
      fireEvent.click(incrementButton);
    }

    expect(quantityDisplay.textContent).toBe(`${mockProduct.stock}`);
  });

  it("calls addToCart with correct arguments", () => {
    render(
      <ProductCard product={mockProduct} cart={mockCart} setCart={setCart} />
    );

    const incrementButton = screen.getByText("+");
    const addToCartButton = screen.getByText("Agregar");

    fireEvent.click(incrementButton);
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("calls removeFromCart when the product is in the cart", () => {
    const cartWithItem: Cart = {
      ...mockCart,
      items: [{ product: mockProduct, quantity: 1 }],
    };

    render(
      <ProductCard
        product={mockProduct}
        cart={cartWithItem}
        setCart={setCart}
      />
    );

    const removeFromCartButton = screen.getByText("Eliminar del carrito");

    fireEvent.click(removeFromCartButton);

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct);
  });

  it("displays 'Agregar' button when product is not in the cart", () => {
    render(
      <ProductCard product={mockProduct} cart={mockCart} setCart={setCart} />
    );

    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  it("displays 'Eliminar del carrito' button when product is in the cart", () => {
    const cartWithItem: Cart = {
      ...mockCart,
      items: [{ product: mockProduct, quantity: 1 }],
    };

    render(
      <ProductCard
        product={mockProduct}
        cart={cartWithItem}
        setCart={setCart}
      />
    );

    expect(screen.getByText("Eliminar del carrito")).toBeInTheDocument();
  });
});
