// Mobile menu toggle.
(function () {
	'use strict';
	var toggle = document.querySelector('.nav-toggle');
	var nav = document.getElementById('site-nav');
	if (!toggle || !nav) return;

	function setOpen(open) {
		toggle.setAttribute('aria-expanded', String(open));
		nav.classList.toggle('is-open', open);
	}

	toggle.addEventListener('click', function () {
		setOpen(toggle.getAttribute('aria-expanded') !== 'true');
	});

	// Escape closes the open menu and returns focus to the Menu button.
	document.addEventListener('keydown', function (e) {
		if (e.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
		setOpen(false);
		toggle.focus();
	});
})();
