import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import router from "./router.tsx";
import { createTheme } from "./theme/index.ts";
import { UserProvider } from "./contexts/UserContext.tsx";
import { CountriesProvider } from "./contexts/CountriesContext.tsx";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <CountriesProvider>
          <RouterProvider router={router} />
        </CountriesProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
