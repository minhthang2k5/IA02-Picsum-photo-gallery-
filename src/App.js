import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import PhotoListPage from "./pages/PhotoListPage";

const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

function App() {
  return (
    <BrowserRouter future={routerFutureConfig}>
      <div className="app-shell">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/photos" replace />} />
            <Route path="/photos" element={<PhotoListPage />} />
            <Route path="/photos/:id" element={<PhotoDetailPage />} />
            <Route path="*" element={<Navigate to="/photos" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
