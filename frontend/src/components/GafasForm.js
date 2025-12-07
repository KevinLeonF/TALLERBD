/*final*/
import React, { useState, useEffect } from "react";
import { createGafa, updateGafa } from "../services/ApiGafas";
import { useNavigate } from "react-router-dom";

function GafasForm({ editData }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: null,
    diseno: "",
    color: "",
    precio: "",
    marca: "",
  });

  // Cargar datos al editar
  useEffect(() => {
    if (editData) {
      setForm({
        id: editData.id,
        diseno: editData.diseno,
        color: editData.color,
        precio: editData.precio,
        marca: editData.marca,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      await updateGafa(form.id, form);
    } else {
      await createGafa(form);
    }

    navigate("/gafas");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{form.id ? "Editar Gafa" : "Registrar Gafa"}</h2>

      <input
        name="diseno"
        placeholder="Diseño"
        value={form.diseno}
        onChange={handleChange}
      />

      <input
        name="color"
        placeholder="Color"
        value={form.color}
        onChange={handleChange}
      />

      <input
        name="precio"
        type="number"
        placeholder="Precio"
        value={form.precio}
        onChange={handleChange}
      />

      <input
        name="marca"
        placeholder="Marca"
        value={form.marca}
        onChange={handleChange}
      />

      <button type="submit">
        {form.id ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default GafasForm;

/*primera forma de tabla*/
/*import React, { useState, useEffect } from "react";
import { createGafa, updateGafa } from "../services/ApiGafas";

function GafasForm({ editData, onSaved }) {
  const [form, setForm] = useState({
    diseno: "",
    color: "",
    precio: "",
    marca: "",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      await updateGafa(form.id, form);
    } else {
      await createGafa(form);
    }

    onSaved();
    setForm({ diseno: "", color: "", precio: "", marca: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.id ? "Editar Gafa" : "Registrar Gafa"}</h2>

      <input name="diseno" placeholder="Diseño" value={form.diseno} onChange={handleChange} />
      <input name="color" placeholder="Color" value={form.color} onChange={handleChange} />
      <input name="precio" type="number" placeholder="Precio" value={form.precio} onChange={handleChange} />
      <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} />

      <button type="submit">{form.id ? "Actualizar" : "Guardar"}</button>
    </form>
  );
}

export default GafasForm;*/



