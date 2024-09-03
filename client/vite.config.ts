import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/",
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 3001,
		open: true,
		host: true,
		proxy: {
			"/auth": {
				target: "http://localhost:3000",
			},
			"/boards": {
				target: "http://localhost:3000",
			},
		},
	},
	plugins: [react()],
});
