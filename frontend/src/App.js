/*tercer diseño con imagenes mas*/
//import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"; // <-- IMPORTANTE: Añadir 'useLocation'
import { /*BrowserRouter*/HashRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"; // 🎯 Añadir 'useNavigate'
import React, { useState } from 'react';

import GafasList from "./components/GafasList";
import GafasForm from "./components/GafasForm";
import PedidosList from "./components/PedidosList";
import PedidosForm from "./components/PedidosForm";
import "./App.css";

// ----------------------------------------------------
// Componente de Imagen Dinámica
// ----------------------------------------------------
// Reemplaza esta función DynamicImage en tu App.js

function DynamicImage() {
  const location = useLocation();
  const path = location.pathname;

  // 1. Definición de URLs de imágenes
  const IMAGES = {
    CHICA_URL: 'https://i.pinimg.com/736x/84/22/bd/8422bd2da436b5670e21400c3574336a.jpg',//https://m.media-amazon.com/images/I/61ta381AcDS._AC_UF894,1000_QL80_.jpg
    GAFAS_LIST_URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0bH6evI-lL0scgVIQ4d1EEIePFEhrELw1A&s',
    GAFAS_FORM_URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAzJkWVX43SvZ5poyB7XT1Y7ChTSIuSigFg&s',
    PEDIDOS_LIST_URL: 'https://m.media-amazon.com/images/I/61x5pRrurEL._AC_SL1500_.jpg',
    PEDIDOS_FORM_URL: 'https://m.media-amazon.com/images/I/7158ikA3kqS.jpg',
  };

  // Estilos comunes para todas las imágenes (posición fija, z-index, transiciones)
  /*const commonStyle = {
    position: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: 1000,
    opacity: 0.9,
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    //borderRadius: '50%',
    //maskImage: 'radial-gradient(circle, white 50%, transparent 70%)',
    //WebkitMaskImage: 'radial-gradient(circle, white 50%, transparent 70%)',
  };*/

  const commonStyle = {
    position: 'fixed',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -1, // ⬅️ IMPORTANTE: zIndex bajo para que no tape el contenido
    opacity: 0.75, // Ajuste la opacidad para que el texto sea legible
    transition: 'opacity 0.5s ease, transform 0.5s ease',
  };

  let imageUrl = '';
  let customStyle = {};

  // 2. Lógica para determinar la imagen y el estilo según la ruta
  switch (path) {
    case '/': // INICIO
      imageUrl = IMAGES.CHICA_URL;
      customStyle = {
        bottom: '20vh', // ⬅️ Unidades relativas: 5% de la altura del viewport
        left: '38%',   // Centrado horizontalmente
        transform: 'translateX(-50%)', // Ajuste para centrar
        width: '50vw', // ⬅️ Ancho relativo: 50% del ancho del viewport
        maxWidth: '330px', // Limita el tamaño en pantallas grandes
        height: '45vh',
        maskImage: 'radial-gradient(circle, white 50%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle, white 50%, transparent 70%)',
      };
      break;

    case '/gafas': // LISTA DE GAFAS
      imageUrl = IMAGES.GAFAS_LIST_URL;
      customStyle = {
        top: '10%',    // ⬅️ Posición relativa
        right: '0%',   // ⬅️ Posición relativa
        width: '50vw', // ⬅️ Ancho relativo
        maxWidth: '400px', // Limita el ancho en desktop
        height: '70vh',
        //maskImage: 'radial-gradient(circle, white 50%, transparent 90%)',
      };
      break;

    case '/gafas/new': // AGREGAR GAFA (FORMULARIO)
      imageUrl = IMAGES.GAFAS_FORM_URL;
      customStyle = {
        top: '20vh',
        left: '0%', 
        width: '50vw',
        maxWidth: '450px',
        height: '60vh',
        maskImage: 'none',
        WebkitMaskImage: 'none',
      };
      break;

    case '/pedidos': // LISTA DE PEDIDOS
      imageUrl = IMAGES.PEDIDOS_LIST_URL;
      customStyle = {
        top: '10vh', // 10% de la altura de la pantalla
        left: '85%', // Centrado
        transform: 'translateX(-50%)',
        width: '45vw', // 45% del ancho de la pantalla
        maxWidth: '400px', // Límite en desktop
        height: '75vh',
        opacity: 1,
      };
      break;

    case '/pedidos/new': // AGREGAR PEDIDO (FORMULARIO)
      imageUrl = IMAGES.PEDIDOS_FORM_URL;
      customStyle = {
        bottom: '0vh',
        right: '-4%', // 5% del borde derecho
        width: '50vw', 
        maxWidth: '550px', 
        height: '50vw', // Usar vw para que el círculo mantenga la proporción
        maxHeight: '550px',
        borderRadius: '50%', // Mantener el círculo
        maskImage: 'radial-gradient(circle, white 50%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle, white 50%, transparent 70%)',
      };
      break;

    default:
      // Si la ruta no coincide con ninguna de las anteriores, no renderizar nada.
      return null;
  }

  // 3. Renderizar el div con la imagen y los estilos combinados
  return (
    <div
      style={{
        ...commonStyle,
        ...customStyle, // Sobrescribir commonStyle con los estilos específicos de la ruta
        backgroundImage: `url(${imageUrl})`
      }}
    />
  );
}
// ----------------------------------------------------

function Home() {
  return (
    <div className="home">
      <h1>Bienvenido al Sistema SIS414</h1>
      <p>Use la barra de navegación para gestionar Gafas y Pedidos.</p>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

// ----------------------------------------------------------
// 2) AppContent SÍ puede usar useNavigate()
// ----------------------------------------------------------
function AppContent() {
  const [editGafas, setEditGafas] = useState(null);
  const [editPedidos, setEditPedidos] = useState(null);
  const navigate = useNavigate();

  const handleEditGafas = (g) => {
    setEditGafas(g);
    navigate("/gafas/new");
  };

  const handleEditPedidos = (p) => {
    setEditPedidos(p);
    navigate("/pedidos/new");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">SIS414</div>
        <div className="navbar-links">
          <Link to="/">Inicio</Link>

          <div className="dropdown">
            <span>Gafas ▾</span>
            <div className="dropdown-content">
              <Link to="/gafas">Lista de Gafas</Link>
              <Link to="/gafas/new">Agregar Gafa</Link>
            </div>
          </div>

          <div className="dropdown">
            <span>Pedidos ▾</span>
            <div className="dropdown-content">
              <Link to="/pedidos">Lista de Pedidos</Link>
              <Link to="/pedidos/new">Agregar Pedido</Link>
            </div>
          </div>
        </div>
      </nav>

      <DynamicImage />

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/gafas"
            element={<GafasList onEdit={handleEditGafas} />}
          />

          <Route
            path="/gafas/new"
            element={<GafasForm editData={editGafas} />}
          />

          <Route
            path="/pedidos"
            element={<PedidosList onEdit={handleEditPedidos} />}
          />

          <Route
            path="/pedidos/new"
            element={<PedidosForm editData={editPedidos} />}
          />
        </Routes>
      </div>
    </>
  );
}


/*segundo diseño pero ahora con algo de diseño*/
/*import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GafasList from "./components/GafasList";
import GafasForm from "./components/GafasForm";
import PedidosList from "./components/PedidosList";
import PedidosForm from "./components/PedidosForm";
import "./App.css";

function Home() {
  return (
    <div className="home">
      <h1>Bienvenido al Sistema SIS414</h1>
      <p>Use la barra de navegación para gestionar Gafas y Pedidos.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="navbar-title">SIS414</div>

        <div className="navbar-links">
          <Link to="/">Inicio</Link>

          <div className="dropdown">
            <span>Gafas ▾</span>
            <div className="dropdown-content">
              <Link to="/gafas">Lista de Gafas</Link>
              <Link to="/gafas/new">Agregar Gafa</Link>
            </div>
          </div>

          <div className="dropdown">
            <span>Pedidos ▾</span>
            <div className="dropdown-content">
              <Link to="/pedidos">Lista de Pedidos</Link>
              <Link to="/pedidos/new">Agregar Pedido</Link>
            </div>
          </div>
        </div>
      </nav>


      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/gafas" element={<GafasList />} />
          <Route path="/gafas/new" element={<GafasForm />} />

          <Route path="/pedidos" element={<PedidosList />} />
          <Route path="/pedidos/new" element={<PedidosForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}*/

/*primer estilo sin diseño*/
/*import React, { useState } from "react";
import GafasForm from "./components/GafasForm";
import GafasList from "./components/GafasList";
import PedidosForm from "./components/PedidosForm";
import PedidosList from "./components/PedidosList";

function App() {
  const [editGafas, setEditGafas] = useState(null);
  const [editPedidos, setEditPedidos] = useState(null);

  return (
    <div>
      <h1>Sistema CRUD</h1>

      <GafasForm editData={editGafas} onSaved={() => setEditGafas(null)} />
      <GafasList onEdit={(d) => setEditGafas(d)} />

      <PedidosForm editData={editPedidos} onSaved={() => setEditPedidos(null)} />
      <PedidosList onEdit={(d) => setEditPedidos(d)} />
    </div>
  );
}

export default App;
*/


