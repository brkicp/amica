// uno.config.ts
import { defineConfig } from "unocss";

export default defineConfig({
  // ...UnoCSS options
  theme: {
    colors: { primary: "#2a6049", bsecondary: "#ff844c", tertiary: "#EBF0EE" },
  },
  safelist: ["text-red!", "font-bold!"],
});
