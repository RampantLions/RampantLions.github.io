"use strict";

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

var BACKGROUNDS = {
	impala:    'assets/images/03229_impala_1600x900.jpg',
	ocean:     'assets/images/00633_oceanhope_1680x1050.jpg',
	eagle:     'assets/images/03244_thedomainofthewhitetailedeagle_1600x900.jpg',
	astronaut: 'assets/images/wp13763896-aesthetic-astronaut-desktop-wallpapers.jpg',
	laptop:    'assets/images/wp15282314-astronaut-laptop-wallpapers.jpg',
	space:     'assets/images/wp15282362-astronaut-laptop-wallpapers.jpg'
};

function pickBackground() {
	var requested = getURLParameter('bg');
	if (requested && BACKGROUNDS[requested]) return BACKGROUNDS[requested];
	var keys = Object.keys(BACKGROUNDS);
	return BACKGROUNDS[keys[Math.floor(Math.random() * keys.length)]];
}

function demo() {
	var image = document.getElementById('background');
	var desiredSrc = pickBackground();

	// Swap to the chosen background so the static fallback (reduced-motion) and
	// the rainy canvas both reflect the same image.
	if (image.src.split('/').pop() !== desiredSrc.split('/').pop()) {
		image.src = desiredSrc;
	}

	var prefersReducedMotion = window.matchMedia &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return;

	var startRain = function() {
		var engine = new RainyDay('canvas','background', window.innerWidth, window.innerHeight, 1, getURLParameter("blur") || 20);
		var preset = getURLParameter("preset") || 2;
		if (preset == 1) {
			engine.gravity = engine.GRAVITY_NON_LINEAR;
			engine.trail = engine.TRAIL_DROPS;
			engine.rain([ engine.preset(3, 3, 0.88), engine.preset(5, 5, 0.9), engine.preset(6, 2, 1) ], 100);
		} else if (preset == 2) {
			engine.gravity = engine.GRAVITY_NON_LINEAR;
			engine.trail = engine.TRAIL_DROPS;
			engine.VARIABLE_GRAVITY_ANGLE = Math.PI / 8;
			engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
		} else if (preset == 3) {
			engine.gravity = engine.GRAVITY_NON_LINEAR;
			engine.trail = engine.TRAIL_SMUDGE;
			engine.rain([ engine.preset(0, 2, 0.5), engine.preset(4, 4, 1) ], 50);
		}
	};

	if (image.complete && image.naturalWidth > 0) {
		startRain();
	} else {
		image.addEventListener('load', startRain, { once: true });
	}
}
