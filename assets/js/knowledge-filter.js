// Client-side search and section filter for the Knowledge Base page.
// Each card carries data-search (lowercased title, summary, tags) and
// data-category; sections with no visible cards are hidden.
(function () {
	'use strict';

	var input = document.getElementById('kb-search');
	var chips = Array.prototype.slice.call(document.querySelectorAll('.kb-filters .chip'));
	var sections = Array.prototype.slice.call(document.querySelectorAll('.kb-section'));
	var noResults = document.getElementById('kb-no-results');
	if (!input) return;

	var activeFilter = 'all';

	function apply() {
		var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
		var searching = terms.length > 0;
		var anyVisible = false;

		sections.forEach(function (section) {
			var inFilter = activeFilter === 'all' || section.getAttribute('data-section') === activeFilter;
			var cards = Array.prototype.slice.call(section.querySelectorAll('.entry-card'));
			var visibleCards = 0;

			cards.forEach(function (card) {
				var text = card.getAttribute('data-search') || '';
				var match = inFilter && terms.every(function (t) { return text.indexOf(t) !== -1; });
				card.hidden = !match;
				if (match) visibleCards++;
			});

			// While searching, hide sections with no hits (including empty
			// "coming soon" sections); otherwise show every section in the filter.
			section.hidden = !inFilter || (searching && visibleCards === 0);
			if (!section.hidden) anyVisible = true;
		});

		noResults.hidden = anyVisible;
	}

	function setFilter(filter) {
		activeFilter = filter;
		chips.forEach(function (chip) {
			chip.setAttribute('aria-pressed', String(chip.getAttribute('data-filter') === filter));
		});
		apply();
	}

	chips.forEach(function (chip) {
		chip.addEventListener('click', function () { setFilter(chip.getAttribute('data-filter')); });
	});
	input.addEventListener('input', apply);

	// Links like /knowledge/#treatments (from the home page) preselect a section.
	var hash = window.location.hash.slice(1);
	if (hash && chips.some(function (c) { return c.getAttribute('data-filter') === hash; })) {
		setFilter(hash);
	}
})();
