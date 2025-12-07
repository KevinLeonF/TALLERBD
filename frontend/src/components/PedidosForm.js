/*estilo de tabla mas bonito*/
/*estilo de tabla mas bonito*/
import React, { useState, useEffect } from "react";
import { createPedido, updatePedido } from "../services/ApiPedidos";
import { useNavigate } from "react-router-dom";

function PedidosForm({ editData }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: null,
    cliente: "",
    cantidad: "",
    gafas_id: "",
  });

  // Cargar datos al editar
  useEffect(() => {
    if (editData) {
      setForm({
        id: editData.id,
        cliente: editData.cliente,
        cantidad: editData.cantidad,
        gafas_id: editData.gafa?.id || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      cliente: form.cliente,
      cantidad: Number(form.cantidad),
      gafas_id: Number(form.gafas_id),
    };

    try {
      if (form.id) {
        await updatePedido(form.id, data);
      } else {
        await createPedido(data);
      }

      navigate("/pedidos");

    } catch (err) {
      console.error("Error guardando pedido:", err);
      alert("Error al guardar el pedido");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{form.id ? "Editar Pedido" : "Registrar Pedido"}</h2>

      <input
        name="cliente"
        placeholder="Cliente"
        value={form.cliente}
        onChange={handleChange}
      />

      <input
        name="cantidad"
        type="number"
        placeholder="Cantidad"
        value={form.cantidad}
        onChange={handleChange}
      />

      <input
        name="gafas_id"
        type="number"
        placeholder="ID de Gafas"
        value={form.gafas_id}
        onChange={handleChange}
      />

      <button type="submit">
        {form.id ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default PedidosForm;


/*primera forma de formulario*/
/*import React, { useState, useEffect } from "react";
import { createPedido, updatePedido } from "../services/ApiPedidos";

function PedidosForm({ editData, onSaved }) {
  const [form, setForm] = useState({
    cliente: "",
    cantidad: "",
    gafas_id: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        id: editData.id,
        cliente: editData.cliente,
        cantidad: editData.cantidad,
        gafas_id: editData.gafa?.id || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      cliente: form.cliente,
      cantidad: parseInt(form.cantidad),
      gafas_id: parseInt(form.gafas_id),
    };

    try {
      if (form.id) {
        await updatePedido(form.id, data);
      } else {
        await createPedido(data);
      }
      onSaved();
      setForm({ cliente: "", cantidad: "", gafas_id: "" });
    } catch (err) {
      console.error("Error guardando pedido:", err);
      alert("Error al guardar el pedido");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.id ? "Editar Pedido" : "Nuevo Pedido"}</h2>
      <input
        name="cliente"
        placeholder="Cliente"
        value={form.cliente}
        onChange={handleChange}
      />
      <input
        name="cantidad"
        type="number"
        placeholder="Cantidad"
        value={form.cantidad}
        onChange={handleChange}
      />
      <input
        name="gafas_id"
        type="number"
        placeholder="ID de Gafas"
        value={form.gafas_id}
        onChange={handleChange}
      />
      <button type="submit">{form.id ? "Actualizar" : "Guardar"}</button>
    </form>
  );
}

export default PedidosForm;*/




