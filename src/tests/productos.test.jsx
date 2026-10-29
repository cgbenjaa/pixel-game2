import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import RegisterForm from "../components/RegisterForm";
import CheckoutForm from "../components/CheckoutForm";
import {
  crearProducto, actualizarProducto, eliminarProducto, filtrarProductos,
  formatoPrecio, validarRut
} from "../data/productos";

const juego = {
  id: 77, nombre: "Juego de prueba", categoria: "RPG",
  descripcion: "Descripción de prueba", precio: 5000,
  precioAnterior: 7000, stock: 4, imagen: "/imagenes/videojuegos.png", oferta: true
};

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("Pruebas unitarias Pixel Game", () => {
  it("1. muestra el nombre y precio de un producto", () => {
    render(<ProductCard producto={juego} agregarAlCarrito={() => {}} abrirDetalle={() => {}} />);
    expect(screen.getByText("Juego de prueba")).toBeTruthy();
    expect(screen.getByText("$5.000")).toBeTruthy();
  });

  it("2. muestra la etiqueta de oferta cuando el producto tiene oferta", () => {
    render(<ProductCard producto={juego} agregarAlCarrito={() => {}} abrirDetalle={() => {}} />);
    expect(screen.getByText("Oferta")).toBeTruthy();
  });

  it("3. ejecuta la función al agregar un producto al carrito", () => {
    let agregado = null;
    render(<ProductCard producto={juego} agregarAlCarrito={(producto) => { agregado = producto; }} abrirDetalle={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));
    expect(agregado.nombre).toBe("Juego de prueba");
  });

  it("4. muestra un mensaje cuando la lista no tiene productos", () => {
    render(<ProductList productos={[]} agregarAlCarrito={() => {}} abrirDetalle={() => {}} />);
    expect(screen.getByText(/No se encontraron juegos/i)).toBeTruthy();
  });

 
it("5. filtra productos por nombre", () => {
  const resultado = filtrarProductos([
    juego,
    {
      ...juego,
      id: 78,
      nombre: "Otro juego",
      descripcion: "Otra descripcion",
      oferta: false
    }
  ], "prueba", "Todas", false);

  expect(resultado.length).toBe(1);
  expect(resultado[0].nombre).toBe("Juego de prueba");
});


  it("6. crea, actualiza y elimina productos de la fuente simulada", () => {
    let productos = crearProducto({ ...juego, id: 901 }, []);
    expect(productos.length).toBe(1);
    productos = actualizarProducto(901, { nombre: "Nombre actualizado" }, productos);
    expect(productos[0].nombre).toBe("Nombre actualizado");
    productos = eliminarProducto(901, productos);
    expect(productos.length).toBe(0);
  });

  it("7. formatea precios en pesos chilenos", () => {
    expect(formatoPrecio(19990)).toBe("$19.990");
  });

  it("8. valida un RUT chileno correcto", () => {
    expect(validarRut("12.345.678-5")).toBe(true);
  });

  it("9. informa si el formulario de registro tiene errores", () => {
    render(<RegisterForm cambiarVista={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Registrarse" }));
    expect(screen.getByRole("status").textContent).toContain("nombre");
  });

  it("10. muestra una advertencia si se intenta comprar con el carrito vacío", () => {
    render(<CheckoutForm carrito={[]} total={0} finalizarCompra={() => {}} cambiarVista={() => {}} />);
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeTruthy();
  });
});