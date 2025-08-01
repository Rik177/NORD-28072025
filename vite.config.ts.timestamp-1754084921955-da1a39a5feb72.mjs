// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      jsxImportSource: "react"
    })
  ],
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "lucide-react"]
  },
  build: {
    target: "es2015",
    cssMinify: "esbuild",
    minify: "esbuild",
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          icons: ["lucide-react"],
          swiper: ["swiper"],
          helmet: ["react-helmet-async"]
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".");
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash].${ext}`;
          }
          return `assets/[ext]/[name]-[hash].${ext}`;
        }
      }
    },
    chunkSizeWarningLimit: 1e3
  },
  server: {
    port: 3100,
    headers: {
      "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' https://images.pexels.com https://upload.wikimedia.org data: https://*.google.com https://*.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' https://*.google.com",
        "frame-src 'self' https://www.google.com",
        "frame-ancestors 'none'",
        "form-action 'self'",
        "base-uri 'self'"
      ].join("; "),
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "Cache-Control": "public, max-age=31536000"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCh7XG4gICAgICBqc3hSdW50aW1lOiAnYXV0b21hdGljJyxcbiAgICAgIGpzeEltcG9ydFNvdXJjZTogJ3JlYWN0J1xuICAgIH0pXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nLCAnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXMyMDE1JyxcbiAgICBjc3NNaW5pZnk6ICdlc2J1aWxkJyxcbiAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgIHJvdXRlcjogWydyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgaWNvbnM6IFsnbHVjaWRlLXJlYWN0J10sXG4gICAgICAgICAgc3dpcGVyOiBbJ3N3aXBlciddLFxuICAgICAgICAgIGhlbG1ldDogWydyZWFjdC1oZWxtZXQtYXN5bmMnXVxuICAgICAgICB9LFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgaW5mbyA9IGFzc2V0SW5mby5uYW1lLnNwbGl0KCcuJyk7XG4gICAgICAgICAgY29uc3QgZXh0ID0gaW5mb1tpbmZvLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIGlmICgvXFwuKHBuZ3xqcGU/Z3xzdmd8Z2lmfHRpZmZ8Ym1wfGljbykkL2kudGVzdChhc3NldEluZm8ubmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL2ltYWdlcy9bbmFtZV0tW2hhc2hdLiR7ZXh0fWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvXFwuKHdvZmYyP3xlb3R8dHRmfG90ZikkL2kudGVzdChhc3NldEluZm8ubmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBgYXNzZXRzL2ZvbnRzL1tuYW1lXS1baGFzaF0uJHtleHR9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGBhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS4ke2V4dH1gO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxMDAwLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMTAwLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVNlY3VyaXR5LVBvbGljeSc6IFtcbiAgICAgICAgXCJkZWZhdWx0LXNyYyAnc2VsZidcIixcbiAgICAgICAgXCJzY3JpcHQtc3JjICdzZWxmJyAndW5zYWZlLWlubGluZScgJ3Vuc2FmZS1ldmFsJ1wiLFxuICAgICAgICBcInN0eWxlLXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnIGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb21cIixcbiAgICAgICAgXCJpbWctc3JjICdzZWxmJyBodHRwczovL2ltYWdlcy5wZXhlbHMuY29tIGh0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcgZGF0YTogaHR0cHM6Ly8qLmdvb2dsZS5jb20gaHR0cHM6Ly8qLmdvb2dsZWFwaXMuY29tXCIsXG4gICAgICAgIFwiZm9udC1zcmMgJ3NlbGYnIGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb21cIixcbiAgICAgICAgXCJjb25uZWN0LXNyYyAnc2VsZicgaHR0cHM6Ly8qLmdvb2dsZS5jb21cIixcbiAgICAgICAgXCJmcmFtZS1zcmMgJ3NlbGYnIGh0dHBzOi8vd3d3Lmdvb2dsZS5jb21cIixcbiAgICAgICAgXCJmcmFtZS1hbmNlc3RvcnMgJ25vbmUnXCIsXG4gICAgICAgIFwiZm9ybS1hY3Rpb24gJ3NlbGYnXCIsXG4gICAgICAgIFwiYmFzZS11cmkgJ3NlbGYnXCJcbiAgICAgIF0uam9pbignOyAnKSxcbiAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgJ1gtRnJhbWUtT3B0aW9ucyc6ICdERU5ZJyxcbiAgICAgICdYLVhTUy1Qcm90ZWN0aW9uJzogJzE7IG1vZGU9YmxvY2snLFxuICAgICAgJ1JlZmVycmVyLVBvbGljeSc6ICdzdHJpY3Qtb3JpZ2luLXdoZW4tY3Jvc3Mtb3JpZ2luJyxcbiAgICAgICdTdHJpY3QtVHJhbnNwb3J0LVNlY3VyaXR5JzogJ21heC1hZ2U9MzE1MzYwMDA7IGluY2x1ZGVTdWJEb21haW5zJyxcbiAgICAgICdDYWNoZS1Db250cm9sJzogJ3B1YmxpYywgbWF4LWFnZT0zMTUzNjAwMCdcbiAgICB9XG4gIH1cbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBeU4sU0FBUyxvQkFBb0I7QUFDdFAsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsU0FBUyxhQUFhLG9CQUFvQixjQUFjO0FBQUEsRUFDcEU7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxJQUNkLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM3QixRQUFRLENBQUMsa0JBQWtCO0FBQUEsVUFDM0IsT0FBTyxDQUFDLGNBQWM7QUFBQSxVQUN0QixRQUFRLENBQUMsUUFBUTtBQUFBLFVBQ2pCLFFBQVEsQ0FBQyxvQkFBb0I7QUFBQSxRQUMvQjtBQUFBLFFBQ0EsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixnQkFBTSxPQUFPLFVBQVUsS0FBSyxNQUFNLEdBQUc7QUFDckMsZ0JBQU0sTUFBTSxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQ2hDLGNBQUksdUNBQXVDLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDL0QsbUJBQU8sK0JBQStCLEdBQUc7QUFBQSxVQUMzQztBQUNBLGNBQUksMkJBQTJCLEtBQUssVUFBVSxJQUFJLEdBQUc7QUFDbkQsbUJBQU8sOEJBQThCLEdBQUc7QUFBQSxVQUMxQztBQUNBLGlCQUFPLDhCQUE4QixHQUFHO0FBQUEsUUFDMUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsRUFDekI7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLDJCQUEyQjtBQUFBLFFBQ3pCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRixFQUFFLEtBQUssSUFBSTtBQUFBLE1BQ1gsMEJBQTBCO0FBQUEsTUFDMUIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsbUJBQW1CO0FBQUEsTUFDbkIsNkJBQTZCO0FBQUEsTUFDN0IsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
