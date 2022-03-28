import { formatearFecha } from "../helpers/formatearFecha";
import useAdmin from "../hooks/useAdmin";
import useProyectos from "../hooks/useProyectos";

const Tarea = ({ tarea }) => {
  const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea;

  const { handleModalEditar, handleModalEliminarTarea, completarTarea } =
    useProyectos();

  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">Prioridad: {prioridad}</p>
        { estado && <p className="text-xs bg-green-600 uppercase p-2 rounded-lg text-white">Completada por: {tarea.completado.nombre}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        {admin && (
          <button
            type=""
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditar(tarea)}
          >
            Editar
          </button>
        )}

        <button
          type=""
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        {admin && (
          <button
            type=""
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
