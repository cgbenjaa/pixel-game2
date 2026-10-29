import React from "react";

function Navbar({ cambiarVista, cantidadCarrito, vistaActual }) {
  const enlaces = [
    ["Inicio", "inicio"],
    ["Juegos", "juegos"],
    ["Categorías", "categorias"],
    ["Ofertas", "ofertas"],
    ["Nosotros", "nosotros"],
    ["Blog", "blog"],
    ["Contacto", "contacto"]
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark pixel-navbar">
      <div className="container">
        <button className="navbar-brand marca-pixel" onClick={() => cambiarVista("inicio")}>
          <span className="marca-icono">▣</span> Pixel Game
        </button>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPixel" aria-label="Abrir menú">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuPixel">
          <div className="navbar-nav me-auto">
            {enlaces.map(([texto, vista]) => (
              <button
                key={vista}
                className={"nav-link " + (vistaActual === vista ? "active" : "")}
                onClick={() => cambiarVista(vista)}
              >
                {texto}
              </button>
            ))}
          </div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <button className="btn btn-outline-light btn-sm" onClick={() => cambiarVista("login")}>Iniciar sesión</button>
            <button className="btn btn-outline-light btn-sm" onClick={() => cambiarVista("registro")}>Crear cuenta</button>
            <button className="btn btn-pixel btn-sm" onClick={() => cambiarVista("carrito")}>
              Carrito ({cantidadCarrito})
            </button>
            <button className="btn btn-outline-warning btn-sm" onClick={() => cambiarVista("admin")}>Administración</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;