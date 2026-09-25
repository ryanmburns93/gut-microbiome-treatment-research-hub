// Client-side search and section filter for the Knowledge Base page.
// Each entry row carries data-search (lowercased title, summary, tags);
// sections with no visible rows are hidden while searching.
(function () {
	'use strict';

	var input = document.getElementById('kb-search');
	if (!input) return;

	var filters = Array.prototype.slice.call(document.querySelectorAll('.kb-filters .filter'));
	var sections = Array.prototype.slice.call(document.querySelectorAll('.kb-section'));
	var noResults = document.getElementById('kb-no-results');
	var status = document.getElementById('kb-status');
	var activeFilter = 'all';

	function apply() {
		var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
		var searching = terms.length > 0;
		var total = 0;
		var anyVisible = false;

		sections.forEach(function (section) {
			var inFilter = activeFilter === 'all' || section.getAttribute('data-section') === activeFilter;
			var visibleRows = 0;

			Array.prototype.forEach.call(section.querySelectorAll('.entry-row'), function (row) {
				var text = row.getAttribute('data-search') || '';
				var match = inFilter && terms.every(function (t) { return text.indexOf(t) !== -1; });
				row.hidden = !match;
				if (match) visibleRows++;
			});

			section.hidden = !inFilter || (searching && visibleRows === 0);
			if (!section.hidden) anyVisible = true;
			total += visibleRows;
		});

		noResults.hidden = anyVisible;
		status.textContent = searching
			? total + (total === 1 ? ' entry matches ' : ' entries match ') + '“' + input.value.trim() + '”'
			: '';
	}

	function setFilter(filter) {
		activeFilter = filter;
		filters.forEach(function (button) {
			button.setAttribute('aria-pressed', String(button.getAttribute('data-filter') === filter));
		});
		apply();
	}

	filters.forEach(function (button) {
		button.addEventListener('click', function () { setFilter(button.getAttribute('data-filter')); });
	});
	input.addEventListener('input', apply);

	// ?q=... comes from the header and home page search boxes;
	// #section-id preselects a section (links from the home page).
	var query = new URLSearchParams(window.location.search).get('q');
	if (query) input.value = query;

	var hash = window.location.hash.slice(1);
	var hashIsSection = filters.some(function (b) { return b.getAttribute('data-filter') === hash; });
	setFilter(hashIsSection ? hash : 'all');

	window.addEventListener('hashchange', function () {
		var h = window.location.hash.slice(1);
		if (filters.some(function (b) { return b.getAttribute('data-filter') === h; })) setFilter(h);
	});
})();
