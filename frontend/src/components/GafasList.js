import React, { useEffect, useState } from "react";
import { getGafas, deleteGafa } from "../services/ApiGafas";


function GafasList({ onEdit }) {
  const [gafas, setGafas] = useState([]);

  useEffect(() => {
    loadGafas();
  }, []);

  const loadGafas = async () => {
    const data = await getGafas();
    setGafas(data);
  };


  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta gafa?")) return;
    await deleteGafa(id);
    loadGafas();
  };

  return (
    <div className="page">
      <h2>Lista de Gafas</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Diseño</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {(gafas || []).map((g) => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.diseno}</td>
              <td>{g.color}</td>
              <td>{g.precio}</td>
              <td>{g.marca}</td>
              <td>
                <button onClick={() => onEdit(g)}>
                  Editar
                </button>

                <button onClick={() => handleDelete(g.id)}>
                  Eliminar
                </button>


              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GafasList;


/*lista de gafas primero*/
/*import React, { useEffect, useState } from "react";
import { getGafas, deleteGafa } from "../services/ApiGafas";

function GafasList({ onEdit }) {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await getGafas();
    setData(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Lista de Gafas</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Diseño</th><th>Color</th><th>Precio</th><th>Marca</th><th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(g => (
            <tr key={g.id}>
              <td>{g.id}</td>
              <td>{g.diseno}</td>
              <td>{g.color}</td>
              <td>{g.precio}</td>
              <td>{g.marca}</td>
              <td>
                <button onClick={() => onEdit(g)}>Editar</button>
                <button onClick={() => { deleteGafa(g.id).then(load); }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GafasList;*/
