const PRODUCTOS_INICIALES = [
  {
    id: 1,
    nombre: "Elden Ring",
    categoria: "RPG",
    descripcion: "Explora las Tierras Intermedias y supera grandes desafíos.",
    precio: 19990,
    precioAnterior: 24990,
    stock: 12,
    imagen: "/imagenes/elden.avif",
    oferta: true
  },
  {
    id: 2,
    nombre: "Marvel's Spider-Man",
    categoria: "Acción",
    descripcion: "Recorre la ciudad y vive una aventura como Spider-Man.",
    precio: 24990,
    precioAnterior: 24990,
    stock: 8,
    imagen: "/imagenes/spiderman.webp",
    oferta: false
  },
  {
    id: 3,
    nombre: "Grand Theft Auto V",
    categoria: "Mundo abierto",
    descripcion: "Explora Los Santos en una historia llena de acción.",
    precio: 14990,
    precioAnterior: 19990,
    stock: 15,
    imagen: "/imagenes/gta.jpg",
    oferta: true
  },
  {
    id: 4,
    nombre: "The Legend of Zelda",
    categoria: "Aventura",
    descripcion: "Descubre un mundo de aventura y exploración.",
    precio: 29990,
    precioAnterior: 29990,
    stock: 6,
    imagen: "/imagenes/zelda.avif",
    oferta: false
  },
  {
    id: 5,
    nombre: "Hollow Knight",
    categoria: "Plataforma",
    descripcion: "Viaja por un reino subterráneo dibujado a mano.",
    precio: 8990,
    precioAnterior: 11990,
    stock: 20,
    imagen: "/imagenes/videojuegos.png",
    oferta: true
  }
];

const CLAVE_PRODUCTOS = "pixel-game-productos";

export function obtenerProductos() {
  const guardados = localStorage.getItem(CLAVE_PRODUCTOS);
  if (guardados) {
    try {
      return JSON.parse(guardados);
    } catch (error) {
      localStorage.removeItem(CLAVE_PRODUCTOS);
    }
  }
  return PRODUCTOS_INICIALES.map((producto) => ({ ...producto }));
}

export function guardarProductos(productos) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos));
  return productos;
}

export function crearProducto(producto, productos = obtenerProductos()) {
  const nuevoProducto = {
    ...producto,
    id: producto.id || Date.now()
  };
  const actualizados = [...productos, nuevoProducto];
  guardarProductos(actualizados);
  return actualizados;
}

export function actualizarProducto(id, cambios, productos = obtenerProductos()) {
  const actualizados = productos.map((producto) =>
    producto.id === id ? { ...producto, ...cambios } : producto
  );
  guardarProductos(actualizados);
  return actualizados;
}

export function eliminarProducto(id, productos = obtenerProductos()) {
  const actualizados = productos.filter((producto) => producto.id !== id);
  guardarProductos(actualizados);
  return actualizados;
}

export function restablecerProductos() {
  localStorage.removeItem(CLAVE_PRODUCTOS);
  return PRODUCTOS_INICIALES.map((producto) => ({ ...producto }));
}

export function formatoPrecio(precio) {
  return "$" + Number(precio || 0).toLocaleString("es-CL");
}

export function validarRut(rutCompleto) {
  let rut = String(rutCompleto || "").replace(/\./g, "").replace(/\s/g, "").toUpperCase();
  if (!/^[0-9]+-[0-9K]$/.test(rut)) return false;

  const partes = rut.split("-");
  const cuerpo = partes[0];
  const digito = partes[1];
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let esperado = String(resto);
  if (resto === 11) esperado = "0";
  if (resto === 10) esperado = "K";
  return esperado === digito;
}

export function filtrarProductos(productos, texto, categoria, soloOfertas) {
  return productos.filter((producto) => {
    const coincideTexto =
      producto.nombre.toLowerCase().includes(texto.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(texto.toLowerCase());
    const coincideCategoria = categoria === "Todas" || producto.categoria === categoria;
    const coincideOferta = !soloOfertas || producto.oferta;
    return coincideTexto && coincideCategoria && coincideOferta;
  });
}

export { PRODUCTOS_INICIALES };