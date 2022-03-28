import { useState } from "react";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioColaborador = () => {
  const [email, setEmail] = useState("");
  const { mostrarAlerta, alerta, submitColaborador } = useProyectos();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      mostrarAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return
    }
    submitColaborador(email)
  };

  const { msg } = alerta

  return (
    <form
      className="bg-white py-10 px-5 md:w-2/2 xl:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
        { msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email Colaborador
        </label>
        <input
          id="email"
          type="email"
          className="border-2 p-2 mt-2 placeholder-gray-400 w-full rounded-md"
          placeholder="Email del Usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <input
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase cursor-pointer transition-colors rounded text-sm"
        name=""
        value="Buscar Colaborador"
      />
    </form>
  );
};

export default FormularioColaborador;
