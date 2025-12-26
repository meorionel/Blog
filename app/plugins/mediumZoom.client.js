import { defineNuxtPlugin } from "#app";
import mediumZoom from "medium-zoom";

export default defineNuxtPlugin(() => {
	const zoom = mediumZoom({
		margin: 24,
		background: "rgba(0,0,0,0.6)",
	});

	return {
		provide: {
			zoom,
		},
	};
});
