import React, { useEffect, useState } from "react";
import { fetchUsuarios, GetTareas, CrearUsuario, CrearTarea, EliminarTarea , EliminarUsuario} from "../../services/fetchs";
import rigoImage from "../../img/rigo-baby.jpg";

const Home = () => {
	const [listaUsuarios, setListaUsuarios] = useState([]);
	const [tareas, setTareas] = useState([]);
	const [tarea, setTarea] = useState("");
	const myUsuario = "Yumar";

	useEffect(() => {
		obtenerUsuarios();
	}, []);

	useEffect(() => {
		if (listaUsuarios.length === 0) return;

		const existe = listaUsuarios.some((u) => u.name === myUsuario);

		if (!existe) {
			CrearUsuario(myUsuario);
		} else {
			GetTareas(myUsuario).then(setTareas);
		}
	}, [listaUsuarios]);

	const obtenerUsuarios = async () => {
		const lista = await fetchUsuarios();
		setListaUsuarios(lista);
	};

	const handleCrearTarea = async () => {
		if (tarea.trim() === "") return;

		await CrearTarea(tarea, myUsuario);
		setTarea("");
		const nuevasTareas = await GetTareas(myUsuario);
		setTareas(nuevasTareas);
	};

	const handleEliminarTarea = async (id) => {
		await EliminarTarea(id);
		const nuevasTareas = await GetTareas(myUsuario);
		setTareas(nuevasTareas);
	};

	const handleEliminarUsuario = async () => {
		await EliminarUsuario(myUsuario);
		setTareas([]);
		setListaUsuarios([]);
		alert("Usuario y tareas eliminadas correctamente");
	}

	return (
		<div className="container mt-5">
			<h1 className="text-center mb-4">Lista de tareas de: <strong>{myUsuario}</strong></h1>

			<div className="row justify-content-center mb-4">
				<div className="col-md-8 col-lg-6">
					<div className="input-group">
						<input 
							type="text" 
							className="form-control"
							placeholder="Escribe una tarea..."
							value={tarea}
							onChange={(e) => setTarea(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && tarea.trim() !== "") {
									handleCrearTarea();
								}
							}}
						/>
						<button className="btn btn-success" onClick={handleCrearTarea}>
							Agregar
						</button>
					</div>
				</div>
			</div>

			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					{tareas.length === 0 ? (
						<div className="alert alert-secondary text-center">No hay tareas por ahora</div>
					) : (
						<ul className="list-group shadow-sm">
							{tareas.map((t, index) => (
								<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
									<span>{t.label || t}</span>
									<button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminarTarea(t.id)}>
										Eliminar
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
			<div className="row justify-content-center mt-4">

				<button className="btn btn-danger  w-50  mt-3 text-center " onClick={() => handleEliminarUsuario(myUsuario)}>Eliminar Tareas</button>
			</div>
		</div>
	);
};

export default Home;
