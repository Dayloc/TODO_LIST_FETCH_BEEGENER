const apiUrl = "https://playground.4geeks.com/todo";

export const GetTareas = async (myUsuario) => {
  try {
    const response = await fetch(`${apiUrl}/users/${myUsuario}`);
    if (!response.ok) throw new Error("Error al obtener las tareas");
    const data = await response.json();

    return data.todos;
  } catch (error) {
    console.error("Error:", error);
  }
};

export const CrearUsuario = async (myUsuario) => {
  try {
    const response = await fetch(`${apiUrl}/users/${myUsuario}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Error al crear el usuario");

    return alert(`Usuario creado exitosamente`);
  } catch (error) {
    console.error("Error:", error);
    alert("El usuario ya existe");
  }
};

export const fetchUsuarios = async () => {
  try {
    const response = await fetch(`${apiUrl}/users`);
    if (!response.ok) throw new Error("Error al obtener la lista de usuarios");

    const data = await response.json();

    return Array.isArray(data.users) ? data.users : [];
  } catch (error) {
    console.error("Error en fetchUsuarios:", error);
    return [];
  }
};

export const EliminarUsuario = async (userName) => {
  try {
    const response = await fetch(`${apiUrl}/users/${userName}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar el usuario");

    return alert(`Usuario "${userName} y tareas eliminados exitosamente`);
  } catch (error) {
    console.error("Error:", error);
    setMensaje("Error al eliminar el usuario");
  }
};

export const CrearTarea = async (tarea, myUsuario) => {
  try {
    const response = await fetch(`${apiUrl}/todos/${myUsuario}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: tarea, is_done: false }),
    });
    if (!response.ok) throw new Error("Error al crear la tarea");
    else return alert(`Tarea creada exitosamente`);
  } catch (error) {
    alert("Error al crear la tarea");
  }
};

export const EliminarTarea = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar la tarea");

    return alert(`Tarea eliminada exitosamente`);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al eliminar la tarea");
  }
};
