import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import viteTsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools({
    //   /* features options - all disabled by default */
    //   autoname: true, // e.g. enable autoname
    // }),
    solid(),
    viteTsconfigPaths(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
