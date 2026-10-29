import React, { useState } from "react";
import { formatoPrecio } from "../data/productos";

function CheckoutForm({ carrito, total, finalizarCompra, cambiarVista }) {
  const [datos, setDatos] = useState({
    nombre: "", apellido: "", correo: "", calle: "", region: "Región Metropolitana",
    comuna: "", entrega: "Estándar", resultadoPago: "correcto"
  });
  const [error, setError] = useState("");

  function cambiarDato(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
  }

  function enviar(evento) {
    evento.preventDefault();
    if (!datos.nombre.trim() || !datos.apellido.trim() || !datos.correo.includes("@") ||
        !datos.calle.trim() || !datos.comuna.trim()) {
      setError("Completa nombre, apellido, correo y dirección de entrega.");
      return;
    }
    setError("");
    finalizarCompra(datos, datos.resultadoPago);
  }

  if (carrito.length === 0) {
    return (
      <section className="formulario-panel mx-auto">
        <h1 className="h2">Finalizar compra</h1>
        <p>Tu carrito está vacío. Agrega algún juego antes de continuar.</p>
        <button className="btn btn-pixel" onClick={() => cambiarVista("juegos")}>Ver juegos</button>
      </section>
    );
  }

  return (
    <section className="formulario-panel checkout-panel mx-auto">
      <h1 className="h2">Finalizar compra</h1>
      <p className="texto-secundario">Revisa los productos e ingresa los datos de entrega. El pago es simulado.</p>
      <div className="table-responsive mb-4">
        <table className="table table-dark table-borderless align-middle">
          <thead><tr><th>Juego</th><th>Cantidad</th><th>Subtotal</th></tr></thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{formatoPrecio(item.precio * item.cantidad)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="h4 mb-4">Total: <span className="precio-actual">{formatoPrecio(total)}</span></h2>
      <form onSubmit={enviar} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="checkout-nombre">Nombre</label>
            <input id="checkout-nombre" name="nombre" className="form-control" value={datos.nombre} onChange={cambiarDato} />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="checkout-apellido">Apellido</label>
            <input id="checkout-apellido" name="apellido" className="form-control" value={datos.apellido} onChange={cambiarDato} />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="checkout-correo">Correo electrónico</label>
            <input id="checkout-correo" name="correo" type="email" className="form-control" value={datos.correo} onChange={cambiarDato} />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="checkout-calle">Dirección de entrega</label>
            <input id="checkout-calle" name="calle" className="form-control" value={datos.calle} onChange={cambiarDato} />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="checkout-region">Región</label>
            <select id="checkout-region" name="region" className="form-select" value={datos.region} onChange={cambiarDato}>
              <option>Región Metropolitana</option><option>Valparaíso</option><option>Biobío</option><option>Otra región</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="checkout-comuna">Comuna</label>
            <input id="checkout-comuna" name="comuna" className="form-control" value={datos.comuna} onChange={cambiarDato} />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="checkout-entrega">Tipo de entrega</label>
            <select id="checkout-entrega" name="entrega" className="form-select" value={datos.entrega} onChange={cambiarDato}>
              <option>Estándar</option><option>Prioritaria</option><option>Retiro en tienda</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="checkout-pago">Resultado de pago de prueba</label>
            <select id="checkout-pago" name="resultadoPago" className="form-select" value={datos.resultadoPago} onChange={cambiarDato}>
              <option value="correcto">Simular pago correcto</option>
              <option value="error">Simular pago rechazado</option>
            </select>
          </div>
        </div>
        {error && <p role="alert" className="mensaje-error mt-3">{error}</p>}
        <div className="d-flex flex-wrap gap-2 mt-4">
          <button type="submit" className="btn btn-pixel">Confirmar compra</button>
          <button type="button" className="btn btn-outline-light" onClick={() => cambiarVista("carrito")}>Volver al carrito</button>
        </div>
      </form>
    </section>
  );
}

export default CheckoutForm;