import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, {
        email,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y no pierdas tus {""}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 text-xl block font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-sky-700 my-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex justify-between">
        <div className="lg:flex">
          <span className="block text-center my-5 text-slate-500 uppercase text-sm">
            ¿Ya tienes una cuenta?
          </span>
          <Link
            className="block mx-2 text-center my-5 text-slate-500 font-bold uppercase text-sm"
            to="/"
          >
            Inicia Sesión
          </Link>
        </div>
        <div className="lg:flex">
          <span className="block text-center my-5 text-slate-500 uppercase text-sm">
            ¿No tienes una cuenta?
          </span>
          <Link
            className="block mx-2 text-center my-5 text-slate-500 font-bold uppercase text-sm"
            to="/registrar"
          >
            Regístrate
          </Link>
        </div>
      </nav>
    </>
  );
};

export default OlvidePassword;
