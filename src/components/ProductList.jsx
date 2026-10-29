import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ productos, agregarAlCarrito, abrirDetalle }) {
  if (productos.length === 0) {
    return <p className="mensaje-vacio">No se encontraron juegos con esos criterios.</p>;
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div className="col-12 col-sm-6 col-lg-4" key={producto.id}>
          <ProductCard
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
            abrirDetalle={abrirDetalle}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;