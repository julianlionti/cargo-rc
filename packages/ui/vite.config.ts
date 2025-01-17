import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts(), react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Ui",
      // the proper extensions will be added
      fileName: "ui",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "dayjs",
        "react",
        "react-dom",
        "@mui/material",
        "@mui/x-date-pickers",
        "@emotion/react",
        "@emotion/styled",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          dayjs: "Dayjs",
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "MuiMaterial",
          "@mui/x-date-pickers":"MuiXDatePickers",
          "@emotion/react": "EmotionReact",
          "@emotion/styled": "EmotionStyled",
        },
      },
    },
  },
});
