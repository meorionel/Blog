import { defineNuxtPlugin } from "#app";
import mediumZoom from "medium-zoom";

<<<<<<< HEAD
export default defineNuxtPlugin((nuxtApp) => {
	const selector = ".prose img";

	let zoomInstance = mediumZoom(selector, {
		margin: 24,
		background: "rgba(0, 0, 0, 0.8)",
		scrollOffset: 40,
	});

	nuxtApp.hook("page:finish", () => {
		zoomInstance.detach().attach(selector);
=======
export default defineNuxtPlugin(() => {
	const zoom = mediumZoom({
		margin: 24,
		background: "rgba(0,0,0,0.6)",
>>>>>>> upstream/main
	});

	return {
		provide: {
<<<<<<< HEAD
			contentEnhancerZoom: zoomInstance,
=======
			zoom,
>>>>>>> upstream/main
		},
	};
});
