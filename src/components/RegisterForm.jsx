import React, { useState } from "react";
import { validarRut } from "../data/productos";

function RegisterForm({ cambiarVista }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rut, setRut] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [correcto, setCorrecto] = useState(false);

  function enviarFormulario(evento) {
    evento.preventDefault();
    setMensaje("");
    setCorrecto(false);

    if (!nombre.trim()) {
      setMensaje("Ingresa tu nombre.");
      return;
    }
    if (!correo.includes("@") || !correo.includes(".")) {
      setMensaje("Ingresa un correo válido.");
      return;
    }
    if (!validarRut(rut)) {
      setMensaje("Ingresa un RUT válido, por ejemplo 12.345.678-5.");
      return;
    }
    if (clave.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("pixel-game-usuarios") || "[]");
    usuarios.push({ nombre: nombre.trim(), correo: correo.trim(), rut });
    localStorage.setItem("pixel-game-usuarios", JSON.stringify(usuarios));
    setCorrecto(true);
    setMensaje("Registro correcto. Ya puedes volver a la tienda.");
  }

  return (
    <section className="formulario-panel mx-auto">
      <h1 className="h2">Crear cuenta</h1>
      <p className="texto-secundario">Regístrate para guardar tus datos de contacto en esta demostración.</p>
      <form onSubmit={enviarFormulario} noValidate>
        <label className="form-label" htmlFor="registro-nombre">Nombre completo</label>
        <input id="registro-nombre" className="form-control mb-3" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <label className="form-label" htmlFor="registro-correo">Correo electrónico</label>
        <input id="registro-correo" type="email" className="form-control mb-3" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        <label className="form-label" htmlFor="registro-rut">RUT</label>
        <input id="registro-rut" className="form-control mb-3" placeholder="12.345.678-5" value={rut} onChange={(e) => setRut(e.target.value)} />
        <label className="form-label" htmlFor="registro-clave">Contraseña</label>
        <input id="registro-clave" type="password" className="form-control mb-3" value={clave} onChange={(e) => setClave(e.target.value)} />
        {mensaje && <p role="status" className={correcto ? "mensaje-correcto" : "mensaje-error"}>{mensaje}</p>}
        <div className="d-flex flex-wrap gap-2">
          <button className="btn btn-pixel" type="submit">Registrarse</button>
          <button className="btn btn-outline-light" type="button" onClick={() => cambiarVista("juegos")}>Volver a la tienda</button>
        </div>
      </form>
    </section>
  );
}

export default RegisterForm;