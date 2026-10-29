const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/products";

// Usa json-server cuando está disponible. Si falla, la aplicación puede usar datos locales.
export async function obtenerProductosAPI() {
  try {
    const respuesta = await fetch(API_URL);
    if (!respuesta.ok) return null;
    return await respuesta.json();
  } catch (error) {
    return null;
  }
}

export async function crearProductoAPI(producto) {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto)
    });
    if (!respuesta.ok) return null;
    return await respuesta.json();
  } catch (error) {
    return null;
  }
}

export async function actualizarProductoAPI(id, cambios) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cambios)
    });
    if (!respuesta.ok) return null;
    return await respuesta.json();
  } catch (error) {
    return null;
  }
}

export async function eliminarProductoAPI(id) {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return respuesta.ok;
  } catch (error) {
    return false;
  }
}
