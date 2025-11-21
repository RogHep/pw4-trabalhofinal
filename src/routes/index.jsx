// src/routes/index.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import ListarImoveis from "../pages/imoveis/ListarImoveis";
import CriarImovel from "../pages/imoveis/CriarImovel";
import EditarImovel from "../pages/imoveis/EditarImovel";
import VisualizarImovel from "../pages/imoveis/VisualizarImovel";
import UploadFotos from "../pages/imoveis/UploadFotos";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="imoveis" element={<ListarImoveis />} />
          <Route path="imoveis/criar" element={<CriarImovel />} />
          <Route path="imoveis/:id/editar" element={<EditarImovel />} />
          <Route path="imoveis/:id" element={<VisualizarImovel />} />
          <Route path="imoveis/:id/fotos" element={<UploadFotos />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
