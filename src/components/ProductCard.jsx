import React from "react";
import { formatoPrecio } from "../data/productos";

function ProductCard({ producto, agregarAlCarrito, abrirDetalle }) {
  return (
    <article className="card tarjeta-producto h-100">
      <img
        className="card-img-top imagen-producto"
        src={producto.imagen}
        alt={producto.nombre}
        onError={(evento) => { evento.currentTarget.src = "/imagenes/videojuegos.png"; }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between gap-2 align-items-start">
          <h3 className="h5 card-title">{producto.nombre}</h3>
          {producto.oferta && <span className="badge texto-oferta">Oferta</span>}
        </div>
        <p className="small texto-secundario mb-2">{producto.categoria}</p>
        <p className="card-text flex-grow-1">{producto.descripcion}</p>
        <div className="mb-3">
          {producto.precioAnterior > producto.precio && (
            <span className="precio-anterior me-2">{formatoPrecio(producto.precioAnterior)}</span>
          )}
          <strong className="precio-actual">{formatoPrecio(producto.precio)}</strong>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-light flex-fill" onClick={() => abrirDetalle(producto)}>Detalles</button>
          <button className="btn btn-pixel flex-fill" onClick={() => agregarAlCarrito(producto)} disabled={producto.stock <= 0}>
            {producto.stock <= 0 ? "Sin stock" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;