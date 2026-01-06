// src/routes/index.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Login from "../pages/Login";
import Layout from "../components/Layout";

import Dashboard from "../pages/Dashboard";
import ListarImoveis from "../pages/imoveis/ListarImoveis";
import CriarImovel from "../pages/imoveis/CriarImovel";
import EditarImovel from "../pages/imoveis/EditarImovel";
import VisualizarImovel from "../pages/imoveis/VisualizarImovel";
import UploadFotos from "../pages/imoveis/UploadFotos";

import CriarCorretor from "../pages/corretores/CriarCorretor";

// Proteção
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROTA PÚBLICA – LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ROTAS PROTEGIDAS */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Dashboard padrão */}
          <Route index element={<Dashboard />} />

          {/* Imóveis */}
          <Route path="imoveis" element={<ListarImoveis />} />
          <Route path="imoveis/criar" element={<CriarImovel />} />
          <Route path="imoveis/:id/editar" element={<EditarImovel />} />
          <Route path="imoveis/:id" element={<VisualizarImovel />} />
          <Route path="imoveis/:id/fotos" element={<UploadFotos />} />

          {/* Corretores – só admin consegue ver o botão no menu */}
          <Route path="corretores/criar" element={<CriarCorretor />} />
        </Route>

        {/* Qualquer rota desconhecida cai pro login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
