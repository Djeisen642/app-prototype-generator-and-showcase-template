import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Showcase from "./pages/Showcase";
import Generator from "./pages/Generator";
import PrototypeView from "./pages/PrototypeView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="showcase" element={<Showcase />} />
          <Route path="showcase/:id" element={<PrototypeView />} />
          <Route path="generator" element={<Generator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
