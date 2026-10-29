import React, { useState } from "react";
import { formatoPrecio } from "../data/productos";

function AdminPanel({ productos, crear, actualizar, eliminar, cambiarVista }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("Acción");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  function limpiarFormulario() {
    setNombre("");
    setCategoria("Acción");
    setPrecio("");
    setStock("");
    setEditando(null);
  }

  function guardar(evento) {
    evento.preventDefault();
    if (!nombre.trim() || Number(precio) < 0 || precio === "" || Number(stock) < 0 || stock === "") {
      setMensaje("Completa el nombre, el precio y el stock con valores válidos.");
      return;
    }
    const datos = {
      nombre: nombre.trim(),
      categoria,
      precio: Number(precio),
      precioAnterior: Number(precio),
      stock: Number(stock),
      descripcion: "Videojuego disponible en Pixel Game.",
      imagen: "/imagenes/videojuegos.png",
      oferta: false
    };
    if (editando !== null) {
      actualizar(editando, datos);
      setMensaje("Producto actualizado.");
    } else {
      crear(datos);
      setMensaje("Producto creado.");
    }
    limpiarFormulario();
  }

  function comenzarEdicion(producto) {
    setEditando(producto.id);
    setNombre(producto.nombre);
    setCategoria(producto.categoria);
    setPrecio(String(producto.precio));
    setStock(String(producto.stock));
    setMensaje("");
  }

  return (
    <section>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div><p className="etiqueta-seccion">PANEL DE CONTROL</p><h1 className="h2">Administración de Pixel Game</h1></div>
        <button className="btn btn-outline-light" onClick={() => cambiarVista("inicio")}>Volver a la tienda</button>
      </div>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><div className="stat-card"><span>Productos</span><strong>{productos.length}</strong></div></div>
        <div className="col-md-4"><div className="stat-card"><span>Unidades en stock</span><strong>{productos.reduce((suma, p) => suma + Number(p.stock || 0), 0)}</strong></div></div>
        <div className="col-md-4"><div className="stat-card"><span>Productos en oferta</span><strong>{productos.filter((p) => p.oferta).length}</strong></div></div>
      </div>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="formulario-panel">
            <h2 className="h4">{editando !== null ? "Editar producto" : "Nuevo producto"}</h2>
            <form onSubmit={guardar}>
              <label className="form-label" htmlFor="admin-nombre">Nombre</label>
              <input id="admin-nombre" className="form-control mb-3" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              <label className="form-label" htmlFor="admin-categoria">Categoría</label>
              <select id="admin-categoria" className="form-select mb-3" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option>Acción</option><option>RPG</option><option>Aventura</option><option>Plataforma</option><option>Mundo abierto</option><option>Deportes</option>
              </select>
              <label className="form-label" htmlFor="admin-precio">Precio (CLP)</label>
              <input id="admin-precio" type="number" min="0" className="form-control mb-3" value={precio} onChange={(e) => setPrecio(e.target.value)} />
              <label className="form-label" htmlFor="admin-stock">Stock</label>
              <input id="admin-stock" type="number" min="0" className="form-control mb-3" value={stock} onChange={(e) => setStock(e.target.value)} />
              {mensaje && <p role="status" className="mensaje-correcto">{mensaje}</p>}
              <div className="d-flex gap-2 flex-wrap">
                <button className="btn btn-pixel" type="submit">Guardar</button>
                <button className="btn btn-outline-light" type="button" onClick={limpiarFormulario}>Limpiar</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="table-responsive tabla-panel">
            <table className="table table-dark table-hover align-middle">
              <thead><tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}<div className="small texto-secundario">{producto.categoria}</div></td>
                    <td>{formatoPrecio(producto.precio)}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <div className="d-flex gap-2 flex-wrap">
                        <button className="btn btn-sm btn-outline-info" onClick={() => comenzarEdicion(producto)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(producto.id)}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small texto-secundario mt-2">Los cambios se guardan en el almacenamiento local del navegador. No hay una base de datos ni servidor real.</p>
        </div>
      </div>
    </section>
  );
}

export default AdminPanel;