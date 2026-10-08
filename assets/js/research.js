/* Research page: keyword search and filter sidebar for the study list.
   Each study <li> carries data-treatment / data-condition / data-topic
   (semicolon-separated topic ids) and data-type. Options within a group
   match any (OR); groups combine (AND). State lives in the URL query
   (?treatment=fmt,probiotics&type=Review&q=depression) so views can be
   shared, and #study-id opens that study. */
(function () {
	var list = document.getElementById('study-index');
	if (!list) return;

	var items = Array.prototype.slice.call(list.querySelectorAll('.study-item'));
	var names = JSON.parse(document.getElementById('topic-names').textContent);
	var facetsEl = document.getElementById('research-facets');
	var search = document.getElementById('research-q');
	var status = document.getElementById('research-status');
	var empty = document.getElementById('research-empty');
	var clearBtn = document.getElementById('research-clear');
	var toggle = document.querySelector('.research-filter-toggle');
	var filtersEl = document.getElementById('research-filters');

	var GROUPS = [
		{ key: 'treatment', label: 'Treatment' },
		{ key: 'condition', label: 'Condition' },
		{ key: 'topic', label: 'Topic' },
		{ key: 'type', label: 'Study type' }
	];

	function valuesOf(item, key) {
		var raw = item.getAttribute('data-' + key) || '';
		if (key === 'type') return raw ? [raw] : [];
		return raw.split(';').filter(Boolean);
	}
	function labelOf(key, value) {
		if (key === 'type') return value;
		if (names[value]) return names[value];
		var s = value.replace(/-/g, ' ');
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	// Collect every value used, per group.
	var options = {};
	GROUPS.forEach(function (g) {
		var seen = {};
		items.forEach(function (it) { valuesOf(it, g.key).forEach(function (v) { seen[v] = true; }); });
		options[g.key] = Object.keys(seen).sort(function (a, b) {
			return labelOf(g.key, a).localeCompare(labelOf(g.key, b));
		});
	});

	var selected = {};
	GROUPS.forEach(function (g) { selected[g.key] = []; });

	// Build the sidebar: one collapsible fieldset of checkboxes per group.
	var countEls = {};
	GROUPS.forEach(function (g) {
		if (!options[g.key].length) return;
		var det = document.createElement('details');
		det.className = 'facet';
		det.open = true;
		var sum = document.createElement('summary');
		sum.textContent = g.label;
		det.appendChild(sum);
		var fs = document.createElement('fieldset');
		var legend = document.createElement('legend');
		legend.className = 'visually-hidden';
		legend.textContent = 'Filter by ' + g.label.toLowerCase();
		fs.appendChild(legend);
		countEls[g.key] = {};
		options[g.key].forEach(function (v, i) {
			var id = 'f-' + g.key + '-' + i;
			var row = document.createElement('div');
			row.className = 'facet-option';
			var input = document.createElement('input');
			input.type = 'checkbox';
			input.id = id;
			input.value = v;
			input.setAttribute('data-group', g.key);
			var label = document.createElement('label');
			label.htmlFor = id;
			label.appendChild(document.createTextNode(labelOf(g.key, v) + ' '));
			var count = document.createElement('span');
			count.className = 'count';
			label.appendChild(count);
			countEls[g.key][v] = { count: count, row: row, input: input };
			row.appendChild(input);
			row.appendChild(label);
			fs.appendChild(row);
		});
		det.appendChild(fs);
		facetsEl.appendChild(det);
	});

	function matchesGroup(item, key) {
		var sel = selected[key];
		if (!sel.length) return true;
		var vals = valuesOf(item, key);
		return sel.some(function (v) { return vals.indexOf(v) > -1; });
	}
	function matchesSearch(item, terms) {
		var text = item.getAttribute('data-search');
		return terms.every(function (t) { return text.indexOf(t) > -1; });
	}

	function apply(skipUrl) {
		var terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
		var shown = 0;
		items.forEach(function (it) {
			var ok = matchesSearch(it, terms) && GROUPS.every(function (g) { return matchesGroup(it, g.key); });
			it.hidden = !ok;
			if (ok) shown++;
		});

		// Counts: how many studies each option would show, given the search
		// and the other groups' selections.
		GROUPS.forEach(function (g) {
			if (!countEls[g.key]) return;
			var base = items.filter(function (it) {
				return matchesSearch(it, terms) && GROUPS.every(function (o) { return o.key === g.key || matchesGroup(it, o.key); });
			});
			options[g.key].forEach(function (v) {
				var n = base.filter(function (it) { return valuesOf(it, g.key).indexOf(v) > -1; }).length;
				var c = countEls[g.key][v];
				c.count.textContent = n;
				c.row.classList.toggle('is-empty', n === 0 && !c.input.checked);
			});
		});

		var active = terms.length || GROUPS.some(function (g) { return selected[g.key].length; });
		status.textContent = active ? 'Showing ' + shown + ' of ' + items.length + ' studies' : items.length + ' studies';
		empty.hidden = shown > 0;
		clearBtn.hidden = !active;
		if (!skipUrl) writeUrl();
	}

	function writeUrl() {
		var params = [];
		GROUPS.forEach(function (g) {
			if (selected[g.key].length) params.push(g.key + '=' + selected[g.key].map(encodeURIComponent).join(','));
		});
		if (search.value.trim()) params.push('q=' + encodeURIComponent(search.value.trim()));
		var url = window.location.pathname + (params.length ? '?' + params.join('&') : '') + window.location.hash;
		window.history.replaceState(null, '', url);
	}

	function readUrl() {
		var query = window.location.search.slice(1);
		if (!query) return;
		query.split('&').forEach(function (pair) {
			var kv = pair.split('=');
			var key = decodeURIComponent(kv[0]);
			var val = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
			if (key === 'q') { search.value = val; return; }
			if (!selected[key]) return;
			val.split(',').forEach(function (v) {
				if (countEls[key] && countEls[key][v]) {
					countEls[key][v].input.checked = true;
					selected[key].push(v);
				}
			});
		});
	}

	function clearAll() {
		search.value = '';
		GROUPS.forEach(function (g) {
			selected[g.key] = [];
			if (countEls[g.key]) options[g.key].forEach(function (v) { countEls[g.key][v].input.checked = false; });
		});
		apply();
	}

	facetsEl.addEventListener('change', function (e) {
		var input = e.target;
		if (input.type !== 'checkbox') return;
		var key = input.getAttribute('data-group');
		var sel = selected[key];
		var i = sel.indexOf(input.value);
		if (input.checked && i === -1) sel.push(input.value);
		if (!input.checked && i > -1) sel.splice(i, 1);
		apply();
	});
	search.addEventListener('input', function () { apply(); });
	clearBtn.addEventListener('click', clearAll);
	Array.prototype.forEach.call(document.querySelectorAll('[data-clear]'), function (b) { b.addEventListener('click', clearAll); });

	// On narrow screens the sidebar collapses behind a Filters button.
	toggle.hidden = false;
	toggle.addEventListener('click', function () {
		var open = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!open));
		filtersEl.classList.toggle('is-open', !open);
	});

	// #study-id opens and scrolls to that study (e.g. links from the home page).
	function openFromHash() {
		var id = decodeURIComponent(window.location.hash.slice(1));
		var target = id && document.getElementById(id);
		if (target && target.classList.contains('study-item')) {
			target.hidden = false;
			var det = target.querySelector('details');
			if (det) det.open = true;
			target.scrollIntoView({ block: 'start' });
		}
	}

	readUrl();
	apply(true);
	openFromHash();
	window.addEventListener('hashchange', openFromHash);
})();
