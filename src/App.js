import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import RegisterForm from "./components/RegisterForm";
import CheckoutForm from "./components/CheckoutForm";
import AdminPanel from "./components/AdminPanel";
import {
  obtenerProductos, guardarProductos, crearProducto, actualizarProducto,
  eliminarProducto, formatoPrecio, filtrarProductos
} from "./data/productos";
import {
  obtenerProductosAPI, crearProductoAPI, actualizarProductoAPI, eliminarProductoAPI
} from "./data/api";

function App() {
  const [productos, setProductos] = useState(() => obtenerProductos());
  const [vista, setVista] = useState("inicio");
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [carrito, setCarrito] = useState(() => {
    try { return JSON.parse(localStorage.getItem("pixel-game-carrito") || "[]"); }
    catch (error) { return []; }
  });
  const [detalle, setDetalle] = useState(null);
  const [resultadoCompra, setResultadoCompra] = useState(null);
  const [ultimoPedido, setUltimoPedido] = useState(null);
  const [correoLogin, setCorreoLogin] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");


  useEffect(() => {
    async function cargarProductos() {
      const productosAPI = await obtenerProductosAPI();
      if (productosAPI) {
        setProductos(productosAPI);
        guardarProductos(productosAPI);
      }
    }
    cargarProductos();
  }, []);

  const categorias = ["Todas", "Acción", "RPG", "Mundo abierto", "Aventura", "Plataforma"];
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  const cantidadCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  function cambiarVista(nuevaVista) {
    setDetalle(null);
    setVista(nuevaVista);
    window.scrollTo(0, 0);
  }

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existe = actual.find((item) => item.id === producto.id);
      if (existe) {
        return actual.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...actual, { ...producto, cantidad: 1 }];
    });
  }

  function cambiarCantidad(id, cantidad) {
    if (cantidad < 1) {
      setCarrito((actual) => actual.filter((item) => item.id !== id));
    } else {
      setCarrito((actual) => actual.map((item) => item.id === id ? { ...item, cantidad } : item));
    }
  }

  function finalizarCompra(datos, resultado) {
    const pedido = {
      numero: Date.now(),
      datos,
      productos: carrito,
      total,
      fecha: new Date().toLocaleDateString("es-CL")
    };
    setUltimoPedido(pedido);
    setResultadoCompra(resultado);
    const pedidos = JSON.parse(localStorage.getItem("pixel-game-pedidos") || "[]");
    pedidos.push({ ...pedido, resultado });
    localStorage.setItem("pixel-game-pedidos", JSON.stringify(pedidos));
    if (resultado === "correcto") setCarrito([]);
    cambiarVista("resultado-compra");
  }

  async function crear(datos) {
    const productoAPI = await crearProductoAPI(datos);
    if (productoAPI) {
      const productosAPI = await obtenerProductosAPI();
      if (productosAPI) {
        setProductos(productosAPI);
        guardarProductos(productosAPI);
        return;
      }
    }
    const nuevosProductos = crearProducto(datos, productos);
    setProductos(nuevosProductos);
    guardarProductos(nuevosProductos);
  }

  async function actualizar(id, datos) {
    const productoAPI = await actualizarProductoAPI(id, datos);
    if (productoAPI) {
      const productosAPI = await obtenerProductosAPI();
      if (productosAPI) {
        setProductos(productosAPI);
        guardarProductos(productosAPI);
        return;
      }
    }
    const nuevosProductos = actualizarProducto(id, datos, productos);
    setProductos(nuevosProductos);
    guardarProductos(nuevosProductos);
  }

  async function eliminar(id) {
    const eliminadoAPI = await eliminarProductoAPI(id);
    if (eliminadoAPI) {
      const productosAPI = await obtenerProductosAPI();
      if (productosAPI) {
        setProductos(productosAPI);
        guardarProductos(productosAPI);
        return;
      }
    }
    const nuevosProductos = eliminarProducto(id, productos);
    setProductos(nuevosProductos);
    guardarProductos(nuevosProductos);
  }

  const productosVisibles = filtrarProductos(
    productos,
    busqueda,
    categoria,
    vista === "ofertas"
  );

  return (
    <div className="app-pixel">
      <Navbar cambiarVista={cambiarVista} cantidadCarrito={cantidadCarrito} vistaActual={vista} />
      <main className="container py-4 py-lg-5">
        {vista === "inicio" && (
          <>
            <section className="hero-pixel row align-items-center g-4 mb-5">
              <div className="col-lg-6">
                <p className="etiqueta-seccion">TU PRÓXIMA AVENTURA COMIENZA AQUÍ</p>
                <h1 className="titulo-hero">Juega a tu manera.<br /><span>Vive otra historia.</span></h1>
                <p className="texto-hero">Descubre videojuegos de distintos géneros, revisa las ofertas y encuentra tu próxima aventura en Pixel Game.</p>
                <div className="d-flex flex-wrap gap-2">
                  <button className="btn btn-pixel btn-lg" onClick={() => cambiarVista("juegos")}>Explorar juegos</button>
                  <button className="btn btn-outline-light btn-lg" onClick={() => cambiarVista("ofertas")}>Ver ofertas</button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-imagen-wrap">
                  <img src="/imagenes/videojuegos.png" alt="Ilustración de videojuegos" className="hero-imagen" />
                  <div className="hero-etiqueta"><span>PIXEL GAME</span><strong>Tu siguiente nivel</strong></div>
                </div>
              </div>
            </section>
            <section className="mb-5">
              <div className="titulo-seccion"><div><p className="etiqueta-seccion">SELECCIÓN DE LA TIENDA</p><h2>Juegos destacados</h2></div><button className="btn btn-outline-light" onClick={() => cambiarVista("juegos")}>Ver catálogo</button></div>
              <ProductList productos={productos.slice(0, 3)} agregarAlCarrito={agregarAlCarrito} abrirDetalle={setDetalle} />
            </section>
            <section className="bloque-informativo">
              <div><p className="etiqueta-seccion">PIXEL GAME</p><h2>Un catálogo para cada tipo de jugador</h2><p className="texto-secundario mb-0">Acción, rol, aventura y mundos abiertos en un solo lugar.</p></div>
              <button className="btn btn-pixel" onClick={() => cambiarVista("categorias")}>Explorar categorías</button>
            </section>
          </>
        )}

        {(vista === "juegos" || vista === "categorias" || vista === "ofertas") && (
          <section>
            <p className="etiqueta-seccion">{vista === "ofertas" ? "PRECIOS ESPECIALES" : "CATÁLOGO PIXEL GAME"}</p>
            <h1 className="mb-4">{vista === "ofertas" ? "Ofertas disponibles" : vista === "categorias" ? "Explorar por categoría" : "Todos los videojuegos"}</h1>
            <div className="filtros-panel row g-3 align-items-end mb-4">
              <div className="col-md-7">
                <label className="form-label" htmlFor="buscar-juego">Buscar juego</label>
                <input id="buscar-juego" className="form-control" placeholder="Escribe un nombre o descripción" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
              </div>
              <div className="col-md-5">
                <label className="form-label" htmlFor="filtro-categoria">Categoría</label>
                <select id="filtro-categoria" className="form-select" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                  {categorias.map((cat) => <option key={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            {vista === "categorias" && (
              <div className="d-flex flex-wrap gap-2 mb-4">
                {categorias.filter((cat) => cat !== "Todas").map((cat) => (
                  <button key={cat} className={"btn " + (categoria === cat ? "btn-pixel" : "btn-outline-light")} onClick={() => setCategoria(cat)}>{cat}</button>
                ))}
                <button className="btn btn-outline-light" onClick={() => setCategoria("Todas")}>Todas</button>
              </div>
            )}
            <ProductList productos={productosVisibles} agregarAlCarrito={agregarAlCarrito} abrirDetalle={setDetalle} />
          </section>
        )}

        {vista === "nosotros" && (
          <section className="formulario-panel">
            <p className="etiqueta-seccion">SOBRE NOSOTROS</p><h1 className="h2">Bienvenido a Pixel Game</h1>
            <p>Pixel Game es una tienda de videojuegos pensada para ayudar a los jugadores a descubrir títulos de distintos géneros desde una interfaz sencilla y visual.</p>
            <p>Nuestra propuesta reúne un catálogo organizado, información de cada juego y un flujo de compra de demostración.</p>
            <p className="texto-secundario">Este proyecto es una demostración académica. No procesa pagos reales ni se conecta a un servidor de ventas.</p>
          </section>
        )}

        {vista === "blog" && (
          <section>
            <p className="etiqueta-seccion">NOVEDADES Y RECOMENDACIONES</p><h1 className="mb-4">Blog Pixel Game</h1>
            <div className="row g-4">
              {[["Cómo elegir tu próximo RPG", "Considera el tipo de historia, la exploración y el tiempo que quieres dedicarle."], ["Juegos para una tarde con amigos", "Los títulos cooperativos y competitivos pueden convertir una sesión corta en una gran partida."], ["Explorar nuevos géneros", "Probar estilos diferentes ayuda a descubrir experiencias que no tenías en tu lista."]].map(([titulo, texto]) => (
                <div className="col-md-4" key={titulo}><article className="panel-blog h-100"><p className="etiqueta-seccion">LECTURA</p><h2 className="h4">{titulo}</h2><p className="texto-secundario">{texto}</p></article></div>
              ))}
            </div>
          </section>
        )}

        {vista === "contacto" && (
          <section className="formulario-panel mx-auto">
            <p className="etiqueta-seccion">ESTAMOS PARA AYUDARTE</p><h1 className="h2">Contacto</h1>
            <p className="texto-secundario">Completa el formulario para simular el envío de una consulta.</p>
            <ContactoForm />
          </section>
        )}

        {vista === "registro" && <RegisterForm cambiarVista={cambiarVista} />}

        {vista === "login" && (
          <section className="formulario-panel mx-auto">
            <h1 className="h2">Iniciar sesión</h1><p className="texto-secundario">Acceso demostrativo para la tienda.</p>
            <form onSubmit={(e) => { e.preventDefault(); setMensajeLogin(correoLogin.includes("@") ? "Formulario revisado. La autenticación real no está habilitada en esta versión." : "Ingresa un correo válido."); }}>
              <label className="form-label" htmlFor="login-correo">Correo electrónico</label>
              <input id="login-correo" type="email" className="form-control mb-3" value={correoLogin} onChange={(e) => setCorreoLogin(e.target.value)} />
              <label className="form-label" htmlFor="login-clave">Contraseña</label>
              <input id="login-clave" type="password" className="form-control mb-3" />
              {mensajeLogin && <p role="status" className="mensaje-correcto">{mensajeLogin}</p>}
              <button className="btn btn-pixel" type="submit">Ingresar</button>
            </form>
          </section>
        )}

        {vista === "carrito" && (
          <section>
            <p className="etiqueta-seccion">TU SELECCIÓN</p><h1 className="mb-4">Carrito de compra</h1>
            {carrito.length === 0 ? (
              <div className="formulario-panel"><p>Tu carrito está vacío.</p><button className="btn btn-pixel" onClick={() => cambiarVista("juegos")}>Ver juegos</button></div>
            ) : (
              <>
                <div className="table-responsive tabla-panel">
                  <table className="table table-dark table-hover align-middle mb-0">
                    <thead><tr><th>Juego</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acción</th></tr></thead>
                    <tbody>{carrito.map((item) => (
                      <tr key={item.id}>
                        <td><div className="d-flex align-items-center gap-3"><img className="miniatura-carrito" src={item.imagen} alt="" /><strong>{item.nombre}</strong></div></td>
                        <td>{formatoPrecio(item.precio)}</td>
                        <td><input aria-label={"Cantidad " + item.nombre} className="form-control campo-cantidad" type="number" min="0" value={item.cantidad} onChange={(e) => cambiarCantidad(item.id, Number(e.target.value))} /></td>
                        <td>{formatoPrecio(item.precio * item.cantidad)}</td>
                        <td><button className="btn btn-sm btn-outline-danger" onClick={() => cambiarCantidad(item.id, 0)}>Eliminar</button></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="resumen-carrito mt-4"><h2 className="h4">Total: <span className="precio-actual">{formatoPrecio(total)}</span></h2><div className="d-flex gap-2 flex-wrap"><button className="btn btn-outline-light" onClick={() => setCarrito([])}>Vaciar carrito</button><button className="btn btn-pixel" onClick={() => cambiarVista("checkout")}>Continuar compra</button></div></div>
              </>
            )}
          </section>
        )}

        {vista === "checkout" && <CheckoutForm carrito={carrito} total={total} finalizarCompra={finalizarCompra} cambiarVista={cambiarVista} />}

        {vista === "resultado-compra" && (
          <section className="formulario-panel mx-auto text-center">
            {resultadoCompra === "correcto" ? <div className="resultado-icono correcto">✓</div> : <div className="resultado-icono error">×</div>}
            <h1 className="h2">{resultadoCompra === "correcto" ? "¡Compra realizada!" : "No se pudo realizar el pago"}</h1>
            <p className="texto-secundario">{resultadoCompra === "correcto" ? "La compra de demostración se registró correctamente." : "El pago simulado fue rechazado. Puedes volver al carrito e intentarlo de nuevo."}</p>
            {ultimoPedido && <p>Pedido #{String(ultimoPedido.numero).slice(-8)} · Total {formatoPrecio(ultimoPedido.total)}</p>}
            <div className="d-flex justify-content-center flex-wrap gap-2 mt-4">
              {resultadoCompra === "error" && <button className="btn btn-pixel" onClick={() => cambiarVista("checkout")}>Volver a intentar</button>}
              <button className="btn btn-outline-light" onClick={() => cambiarVista("juegos")}>Volver a la tienda</button>
            </div>
          </section>
        )}

        {vista === "admin" && (
          <AdminPanel productos={productos} crear={crear} actualizar={actualizar} eliminar={eliminar} cambiarVista={cambiarVista} />
        )}
      </main>

      {detalle && (
        <div className="modal-fondo" role="presentation" onClick={() => setDetalle(null)}>
          <section className="modal-pixel" role="dialog" aria-modal="true" aria-labelledby="detalle-titulo" onClick={(e) => e.stopPropagation()}>
            <button className="btn-cerrar-modal" onClick={() => setDetalle(null)} aria-label="Cerrar detalles">×</button>
            <img src={detalle.imagen} alt={detalle.nombre} className="detalle-imagen" />
            <p className="etiqueta-seccion mt-3">{detalle.categoria}</p><h2 id="detalle-titulo">{detalle.nombre}</h2><p>{detalle.descripcion}</p>
            <p className="precio-actual">{formatoPrecio(detalle.precio)}</p>
            <button className="btn btn-pixel" onClick={() => { agregarAlCarrito(detalle); setDetalle(null); }}>Agregar al carrito</button>
          </section>
        </div>
      )}

      <footer className="footer-pixel">
        <div className="container d-flex flex-wrap justify-content-between gap-3">
          <div><strong>Pixel Game</strong><p className="small mb-0">Tu próxima aventura comienza aquí.</p></div>
          <div className="small">Contacto: pixelgame@email.com<br />Proyecto académico · Sin pagos reales</div>
        </div>
      </footer>
    </div>
  );
}

function ContactoForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [consulta, setConsulta] = useState("");
  const [mensaje, setMensaje] = useState("");

  function enviar(evento) {
    evento.preventDefault();
    if (!nombre.trim() || !correo.includes("@") || !consulta.trim()) {
      setMensaje("Completa todos los campos con información válida.");
      return;
    }
    setMensaje("Consulta registrada en esta demostración.");
    setNombre(""); setCorreo(""); setConsulta("");
  }

  return (
    <form onSubmit={enviar}>
      <label className="form-label" htmlFor="contacto-nombre">Nombre</label>
      <input id="contacto-nombre" className="form-control mb-3" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <label className="form-label" htmlFor="contacto-correo">Correo</label>
      <input id="contacto-correo" className="form-control mb-3" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      <label className="form-label" htmlFor="contacto-consulta">Consulta</label>
      <textarea id="contacto-consulta" className="form-control mb-3" rows="4" value={consulta} onChange={(e) => setConsulta(e.target.value)} />
      {mensaje && <p role="status" className="mensaje-correcto">{mensaje}</p>}
      <button className="btn btn-pixel" type="submit">Enviar consulta</button>
    </form>
  );
}

export default App;