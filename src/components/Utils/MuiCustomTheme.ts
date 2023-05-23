import styled from "@emotion/styled";
import { CardContent, PaletteMode } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

// https://bareynol.github.io/mui-theme-creator/
export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#132f4c",
          },

          secondary: {
            main: "#bb86fc",
          },
          text: {
            primary: "#101130",
          },
          background: {
            default: "#fff",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#5A5A5C",
          },
          secondary: {
            main: "#182507",
          },
          background: {
            default: "#363640",
          },
          text: {
            primary: "#fff",
          },
        }),
  },
});

interface Page {
  name: string;
  link: string;
  page: string;
}

export const pages: Page[] = [
  {
    name: "home",
    link: "/",
    page: "home",
  },
  {
    name: "user",
    link: "/user",
    page: "user",
  },

  {
    name: "post",
    link: "/post",
    page: "post",
  },

  {
    name: "counter",
    link: "/counter",
    page: "counter",
  },

  {
    name: "photos",
    link: "/photos",
    page: "photos",
  },

  {
    name: "documents",
    link: "/documents",
    page: "documents",
  },

  {
    name: "grid2",
    link: "/grid2",
    page: "grid2",
  },
];

export const AVTTAR_BG_COLOR_DARK = "#c7bfbf";
export const AVTTAR_BG_COLOR_LIGHT = "#164367";

export const CARD_HEADER_COLOR_DARK = "#121212";
export const CARD_HEADER_COLOR_LIGHT = "#e3f2d0a1";

export const BOTTOM_APP_BAR_COLOR_DARK = "#121212";
export const BOTTOM_APP_BAR_COLOR_LIGHT = "#f6f9e0";
