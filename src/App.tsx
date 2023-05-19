import { ThemeProvider } from "@emotion/react";
import { createTheme, PaletteMode } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getDesignTokens, pages } from "./components/Utils/MuiCustomTheme";
import Home from "./containers/Home/Home";

function App(): JSX.Element {
  const [mode, setMode] = React.useState<PaletteMode>("light");

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          {pages.map((page) => (
            <Route
              path={page.link}
              index
              element={<Home page={page.page}></Home>}
            />
          ))}
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
