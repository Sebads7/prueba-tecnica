import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../ProductCard";
import { Product } from "../../types";
// Adjust this import path based on your project structure
import { useCart } from "../../hooks/useCart";
import { CartProvider } from "../../context/CartProvider";

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

  const mockAddToCart = jest.fn();
  const mockRemoveFromCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
    (useCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });
  });

  const renderWithProvider = (ui: React.ReactNode) => {
    return render(<CartProvider>{ui}</CartProvider>);
  };

  it("renders product details correctly", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$60.588")).toBeInTheDocument();
  });

  it("increments and decrements quantity", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const incrementButton = screen.getByText("+");
    const quantityDisplay = screen.getByText("0");

    fireEvent.click(incrementButton);
    expect(quantityDisplay.textContent).toBe("1");
  });

  it("does not exceed stock limit when incrementing quantity", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const incrementButton = screen.getByText("+");
    const quantityDisplay = screen.getByText("0");

    for (let i = 0; i < mockProduct.stock + 1; i++) {
      fireEvent.click(incrementButton);
    }

    expect(quantityDisplay.textContent).toBe(`${mockProduct.stock}`);
  });

  it("calls addToCart with correct arguments", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);

    const incrementButton = screen.getByText("+");
    const addToCartButton = screen.getByText("Agregar");

    fireEvent.click(incrementButton);
    fireEvent.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });

  it("displays 'Agregar' button when product is not in the cart", () => {
    renderWithProvider(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  // const removeButton = screen.getByText(/Eliminar del carrito/i);
  // fireEvent.click(removeButton);

  // expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct);
});
