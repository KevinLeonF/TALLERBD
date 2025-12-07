import React, { useEffect, useState } from "react";
import { getPedidos, deletePedido } from "../services/ApiPedidos";


function PedidosList({ onEdit }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    setPedidos(await getPedidos());
  };


  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este pedido?")) return;
    await deletePedido(id);
    loadPedidos();
  };

  return (
    <div className="page">
      <h2>Lista de Pedidos</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Cantidad</th>
            <th>Gafa Asociada</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {(pedidos || []).map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.cliente}</td>
              <td>{p.cantidad}</td>
              <td>{p.gafa ? p.gafa.diseno : "Sin gafa"}</td>

              <td>
                <button onClick={() => onEdit(p)}>
                  Editar
                </button>

                <button onClick={() => handleDelete(p.id)}>
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

export default PedidosList;


/*lista de pedidos uno*/
/*import React, { useEffect, useState } from "react";
import { getPedidos, deletePedido } from "../services/ApiPedidos";

function PedidosList({ onEdit }) {
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await getPedidos();
    setData(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="page">
      <h2>Lista de Pedidos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Cliente</th>
            <th>Cantidad</th>
            <th>ID Gafas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.cliente}</td>
              <td>{p.cantidad}</td>
              <td>{p.gafa?.id}</td>
              <td>
                <button onClick={() => onEdit(p)}>Editar</button>
                <button onClick={() => { deletePedido(p.id).then(load); }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PedidosList;*/


