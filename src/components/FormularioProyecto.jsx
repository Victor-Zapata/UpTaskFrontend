import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setfechaEntrega] = useState("");
  const [cliente, setCliente] = useState("");
  const [id, setId] = useState(null)

  const params = useParams()

  const { mostrarAlerta, alerta, submitProyecto, proyecto} = useProyectos();

  useEffect(() => {
    if(params.id) {
        setNombre(proyecto.nombre)
        setDescripcion(proyecto.descripcion)
        setfechaEntrega(proyecto.fechaEntrega?.split('T')[0])
        setCliente(proyecto.cliente)
        setId(proyecto._id)
    } else {
        console.log('first')
    }
  }, [params])
  

  const handleSubmit = async (e) => {

    e.preventDefault(e)

    if ([nombre, descripcion, fechaEntrega, cliente].includes("")) {
        mostrarAlerta({
            msg: 'Todos los campos son obligatorios', 
            error: true
        })

        return
    }
    //Una vez salteo la validación, paso los datos al provider
    await submitProyecto({ nombre, descripcion, fechaEntrega, cliente, id })
    setId(null)
    setNombre('')
    setDescripcion('')
    setfechaEntrega('')
    setCliente('')
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded shadow"
      onSubmit={handleSubmit}
    >
        { msg && <Alerta alerta={alerta}/>}
      <div className="mb-5">
        <label
          className="text-gray-700 text-sm uppercase font-bold"
          htmlFor="nombre"
        >
          Nombre del Proyecto
        </label>
        <input
          id="nombre"
          type="text"
          className="border focus:outline-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 text-sm uppercase font-bold"
          htmlFor="descripcion"
        >
          Descripción
        </label>
        <textarea
          id="descripcion"
          type="text"
          className="border focus:outline-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Proyecto"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 text-sm uppercase font-bold"
          htmlFor="fecha-entrega"
        >
          Fecha de Entrega
        </label>
        <input
          id="fecha-entrega"
          type="date"
          className="border focus:outline-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={fechaEntrega}
          onChange={(e) => setfechaEntrega(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 text-sm uppercase font-bold"
          htmlFor="cliente"
        >
          Nombre del Cliente
        </label>
        <input
          id="cliente"
          type="text"
          className="border focus:outline-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value={id ? 'Actualizar Proyecto': 'Crear Proyecto'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default FormularioProyecto;
