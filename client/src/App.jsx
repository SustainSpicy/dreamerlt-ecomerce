import { useSelector } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./scenes/layout";
import { useMemo, useState } from "react";
import { themeSettings } from "./theme";
import Products from "./scenes/products";
import Navbar from "./components/Navbar";
import Home from "./scenes/home";
import Dashboard from "./scenes/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./scenes/profile";
import Signin from "./scenes/signin/Signin";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const user = useSelector((state) => state.global.user);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route element={<Layout />}>
            {/* public routes */}
            <Route path="/" element={<Home />} />

            {/* protected routes */}
            <Route path="/owner" element={<ProtectedRoute user={user?.role} />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
