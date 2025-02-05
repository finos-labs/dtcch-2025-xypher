import { ThemeProvider } from "@/components/theme-provider";
import SettlementDashboard from "./pages/SettlementDashboard";
import { Login } from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<SettlementDashboard />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
