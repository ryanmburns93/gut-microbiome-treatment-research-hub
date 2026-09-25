// Evidence Map: draws topics (treatments, conditions, mechanisms) as nodes
// and links every pair of topics that appear in the same study. Data comes
// from _data/topics.csv and _data/studies.csv, embedded in the page at build
// time as JSON (#map-data). Multi-value cells are separated by semicolons.
(function () {
	'use strict';

	var dataEl = document.getElementById('map-data');
	if (!dataEl || typeof cytoscape === 'undefined') return;

	var data = JSON.parse(dataEl.textContent);
	var baseurl = data.baseurl || '';
	var panel = document.getElementById('map-panel');
	var TYPES = ['treatment', 'condition', 'mechanism'];
	var TYPE_LABELS = { treatment: 'Treatment', condition: 'Condition', mechanism: 'Mechanism', other: 'Other' };
	var FINDING_LABELS = {
		'benefit': 'Benefit',
		'no-effect': 'No effect',
		'mixed': 'Mixed',
		'harm': 'Harm',
		'n/a': 'Not applicable'
	};

	// ---- Build the graph model ------------------------------------------

	function clean(value) { return (value || '').toString().trim(); }
	function splitIds(value) {
		return clean(value).split(';').map(function (s) { return s.trim(); }).filter(Boolean);
	}

	var topics = {};
	(data.topics || []).forEach(function (t) {
		var id = clean(t.id);
		if (!id) return;
		var type = clean(t.type).toLowerCase();
		topics[id] = {
			id: id,
			name: clean(t.name) || id,
			type: TYPES.indexOf(type) === -1 ? 'other' : type,
			summary: clean(t.summary),
			entry: clean(t.entry),
			studies: []
		};
	});

	var unknownIds = {};
	var studies = [];
	var edges = {};

	(data.studies || []).forEach(function (row) {
		var status = clean(row.status).toLowerCase();
		if (status === 'hidden') return;

		var study = {
			id: clean(row.id),
			title: clean(row.title) || 'Untitled study',
			authors: clean(row.authors),
			year: clean(row.year),
			journal: clean(row.journal),
			url: clean(row.url),
			studyType: clean(row.study_type),
			sampleSize: clean(row.sample_size),
			finding: clean(row.finding).toLowerCase(),
			conclusion: clean(row.conclusion),
			relevance: clean(row.relevance),
			status: status,
			topicIds: []
		};

		['treatments', 'conditions', 'other_topics'].forEach(function (col) {
			splitIds(row[col]).forEach(function (id) {
				if (!topics[id]) {
					unknownIds[id] = true;
					topics[id] = { id: id, name: id, type: 'other', summary: '', entry: '', studies: [] };
				}
				if (study.topicIds.indexOf(id) === -1) study.topicIds.push(id);
			});
		});

		study.topicIds.forEach(function (id) { topics[id].studies.push(study); });

		// Link every pair of topics in the study.
		for (var i = 0; i < study.topicIds.length; i++) {
			for (var j = i + 1; j < study.topicIds.length; j++) {
				var pair = [study.topicIds[i], study.topicIds[j]].sort();
				var key = pair[0] + '__' + pair[1];
				if (!edges[key]) edges[key] = { id: key, source: pair[0], target: pair[1], studies: [] };
				edges[key].studies.push(study);
			}
		}
		studies.push(study);
	});

	var unknownList = Object.keys(unknownIds);
	if (unknownList.length) {
		var warn = document.getElementById('map-warnings');
		warn.textContent = 'Data check: these topic ids appear in studies.csv but not in topics.csv: ' +
			unknownList.join(', ') + '. Add them to topics.csv (or fix the spelling) so they get a name and type.';
		warn.hidden = false;
	}

	var topicList = Object.keys(topics).map(function (id) { return topics[id]; });
	topicList.sort(function (a, b) { return a.name.localeCompare(b.name); });

	// ---- Helpers --------------------------------------------------------

	function el(tag, attrs, children) {
		var node = document.createElement(tag);
		Object.keys(attrs || {}).forEach(function (k) {
			if (k === 'text') node.textContent = attrs[k];
			else if (k === 'className') node.className = attrs[k];
			else node.setAttribute(k, attrs[k]);
		});
		(children || []).forEach(function (c) { if (c) node.appendChild(c); });
		return node;
	}

	function cssVar(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}

	function entryUrl(topic) {
		return topic.entry ? baseurl + '/knowledge/' + topic.entry + '/' : '';
	}

	function sortStudies(list) {
		return list.slice().sort(function (a, b) { return (b.year || '').localeCompare(a.year || ''); });
	}

	function findingBadge(finding) {
		if (!finding || !FINDING_LABELS[finding]) return null;
		return el('span', { className: 'badge finding-' + finding.replace('/', ''), text: FINDING_LABELS[finding] });
	}

	function topicChip(topic) {
		var button = el('button', { type: 'button', className: 'topic-chip type-' + topic.type, text: topic.name });
		button.addEventListener('click', function () { selectTopic(topic.id, true); });
		return button;
	}

	function studyCard(study, contextTopicId) {
		var meta = [study.authors, study.year, study.journal].filter(Boolean).join(' · ');
		var design = [study.studyType, study.sampleSize ? 'n = ' + study.sampleSize : ''].filter(Boolean).join(', ');
		var titleNode = study.url
			? el('a', { href: study.url, rel: 'noopener', target: '_blank', text: study.title })
			: document.createTextNode(study.title);

		var badges = el('p', { className: 'study-badges' }, [
			findingBadge(study.finding),
			study.status === 'draft' ? el('span', { className: 'badge badge-draft', text: 'Draft' }) : null,
			study.status === 'example' ? el('span', { className: 'badge badge-draft', text: 'Sample' }) : null,
			design ? el('span', { className: 'study-design', text: design }) : null
		]);

		var others = study.topicIds.filter(function (id) { return id !== contextTopicId; });
		var related = others.length
			? el('p', { className: 'study-topics' }, [el('span', { text: 'Topics: ' })].concat(others.map(function (id) { return topicChip(topics[id]); })))
			: null;

		return el('li', { className: 'study-card' }, [
			el('h4', {}, [titleNode]),
			meta ? el('p', { className: 'study-meta', text: meta }) : null,
			badges,
			study.conclusion ? el('p', {}, [el('strong', { text: 'Conclusion: ' }), document.createTextNode(study.conclusion)]) : null,
			study.relevance ? el('p', {}, [el('strong', { text: 'Why it matters: ' }), document.createTextNode(study.relevance)]) : null,
			related
		]);
	}

	function studyList(list, contextTopicId) {
		if (!list.length) return el('p', { className: 'empty', text: 'No studies recorded yet.' });
		return el('ul', { className: 'study-list' }, sortStudies(list).map(function (s) { return studyCard(s, contextTopicId); }));
	}

	// ---- Detail panel ---------------------------------------------------

	// Like replaceChildren, but skips optional (null) sections.
	function setPanel() {
		var nodes = Array.prototype.filter.call(arguments, Boolean);
		panel.replaceChildren.apply(panel, nodes);
	}

	function showOverview() {
		var counts = {};
		topicList.forEach(function (t) { counts[t.type] = (counts[t.type] || 0) + 1; });
		setPanel(
			el('h2', { text: 'How to use the map' }),
			el('p', { text: 'Each circle is a topic. Lines connect topics that were examined together in at least one study.' }),
			el('ul', {}, [
				el('li', { text: 'Select a topic to see a summary and its studies.' }),
				el('li', { text: 'Select a line to see the studies linking two topics.' }),
				el('li', { text: 'Use the List view for a text version of the whole map.' })
			]),
			el('dl', { className: 'map-stats' }, [
				el('dt', { text: 'Studies' }), el('dd', { text: String(studies.length) }),
				el('dt', { text: 'Treatments' }), el('dd', { text: String(counts.treatment || 0) }),
				el('dt', { text: 'Conditions' }), el('dd', { text: String(counts.condition || 0) }),
				el('dt', { text: 'Mechanisms' }), el('dd', { text: String(counts.mechanism || 0) })
			])
		);
	}

	function showTopic(topic) {
		var neighbors = {};
		topic.studies.forEach(function (s) {
			s.topicIds.forEach(function (id) { if (id !== topic.id) neighbors[id] = topics[id]; });
		});
		var neighborList = Object.keys(neighbors).map(function (id) { return neighbors[id]; })
			.sort(function (a, b) { return a.name.localeCompare(b.name); });
		var url = entryUrl(topic);

		setPanel(
			el('p', { className: 'panel-type type-' + topic.type, text: TYPE_LABELS[topic.type] }),
			el('h2', { text: topic.name }),
			topic.summary ? el('p', { text: topic.summary }) : null,
			url ? el('p', {}, [el('a', { href: url, className: 'panel-link', text: 'Read the Knowledge Base entry ›' })]) : null,
			neighborList.length ? el('h3', { text: 'Connected topics' }) : null,
			neighborList.length ? el('p', { className: 'chip-row' }, neighborList.map(topicChip)) : null,
			el('h3', { text: 'Studies (' + topic.studies.length + ')' }),
			studyList(topic.studies, topic.id),
			el('p', {}, [backButton()])
		);
	}

	function showEdge(edge) {
		var a = topics[edge.source], b = topics[edge.target];
		setPanel(
			el('p', { className: 'panel-type', text: 'Connection' }),
			el('h2', {}, [topicChip(a), el('span', { className: 'edge-join', text: ' and ' }), topicChip(b)]),
			el('h3', { text: 'Studies linking these topics (' + edge.studies.length + ')' }),
			studyList(edge.studies, null),
			el('p', {}, [backButton()])
		);
	}

	function backButton() {
		var button = el('button', { type: 'button', className: 'link-button', text: '‹ Back to overview' });
		button.addEventListener('click', function () { clearSelection(true); });
		return button;
	}

	// ---- Graph ----------------------------------------------------------

	var maxStudies = Math.max.apply(null, [1].concat(topicList.map(function (t) { return t.studies.length; })));

	var elements = topicList.map(function (t) {
		return { group: 'nodes', data: { id: t.id, label: t.name, type: t.type, weight: t.studies.length } };
	}).concat(Object.keys(edges).map(function (key) {
		var e = edges[key];
		return { group: 'edges', data: { id: e.id, source: e.source, target: e.target, weight: e.studies.length } };
	}));

	function graphStyle() {
		return [
			{ selector: 'node', style: {
				'label': 'data(label)',
				'width': 'mapData(weight, 0, ' + maxStudies + ', 22, 60)',
				'height': 'mapData(weight, 0, ' + maxStudies + ', 22, 60)',
				'background-color': cssVar('--map-other'),
				'border-width': 2, 'border-color': cssVar('--bg'),
				'color': cssVar('--text'),
				'font-family': cssVar('--font-sans'), 'font-size': 12, 'font-weight': 600,
				'text-wrap': 'wrap', 'text-max-width': 130,
				'text-valign': 'bottom', 'text-margin-y': 6,
				'text-background-color': cssVar('--bg'), 'text-background-opacity': 0.85, 'text-background-padding': 2
			} },
			{ selector: 'node[type = "treatment"]', style: { 'background-color': cssVar('--map-treatment'), 'shape': 'round-rectangle' } },
			{ selector: 'node[type = "condition"]', style: { 'background-color': cssVar('--map-condition'), 'shape': 'ellipse' } },
			{ selector: 'node[type = "mechanism"]', style: { 'background-color': cssVar('--map-mechanism'), 'shape': 'diamond' } },
			{ selector: 'edge', style: {
				'width': 'mapData(weight, 1, 6, 2, 8)',
				'line-color': cssVar('--border-strong'),
				'curve-style': 'bezier', 'opacity': 0.8
			} },
			{ selector: '.faded', style: { 'opacity': 0.15 } },
			{ selector: 'node:selected', style: { 'border-color': cssVar('--text'), 'border-width': 4 } },
			{ selector: 'edge:selected', style: { 'line-color': cssVar('--primary'), 'opacity': 1 } },
			{ selector: 'node.hover', style: { 'border-color': cssVar('--primary'), 'border-width': 3 } }
		];
	}

	var container = document.getElementById('map-canvas');

	// Deterministic starting positions (topics spread around a circle, grouped
	// by type) so the force layout settles the same way on every visit.
	topicList.slice().sort(function (a, b) {
		return TYPES.indexOf(a.type) - TYPES.indexOf(b.type) || a.name.localeCompare(b.name);
	}).forEach(function (t, i, all) {
		var angle = (2 * Math.PI * i) / all.length;
		elements.filter(function (e) { return e.group === 'nodes' && e.data.id === t.id; })[0].position =
			{ x: 300 * Math.cos(angle), y: 300 * Math.sin(angle) };
	});

	var cy = cytoscape({
		container: container,
		elements: elements,
		style: graphStyle(),
		layout: { name: 'preset' },
		minZoom: 0.3, maxZoom: 2.5,
		wheelSensitivity: 0.3,
		selectionType: 'single',
		boxSelectionEnabled: false
	});

	function runLayout() {
		// Fit the layout to the container's shape (wide on desktop, tall on phones).
		var w = container.clientWidth, h = container.clientHeight;
		cy.layout({
			name: 'cose',
			animate: false,
			randomize: false,
			fit: true,
			padding: 30,
			boundingBox: { x1: 0, y1: 0, w: w, h: h },
			nodeRepulsion: function () { return 20000; },
			idealEdgeLength: function () { return Math.max(70, Math.min(w, h) / 5); },
			nodeOverlap: 40,
			componentSpacing: 60,
			gravity: 0.6,
			numIter: 2000
		}).run();
	}
	runLayout();

	function highlight(collection) {
		cy.elements().addClass('faded');
		collection.removeClass('faded');
	}

	function selectTopic(id, animate) {
		var topic = topics[id];
		if (!topic) return;
		setView('map', true);
		var node = cy.getElementById(id);
		cy.elements().unselect();
		if (node.length && node.visible()) {
			node.select();
			highlight(node.closedNeighborhood());
			if (animate) cy.animate({ center: { eles: node }, duration: 300 });
		}
		showTopic(topic);
		setHash('topic=' + encodeURIComponent(id));
	}

	function selectEdge(id) {
		var edge = edges[id];
		if (!edge) return;
		var e = cy.getElementById(id);
		cy.elements().unselect();
		e.select();
		highlight(e.union(e.connectedNodes()));
		showEdge(edge);
		setHash('link=' + encodeURIComponent(id));
	}

	function clearSelection(updateHash) {
		cy.elements().unselect().removeClass('faded');
		showOverview();
		if (updateHash) setHash('');
	}

	function setHash(value) {
		var url = window.location.pathname + window.location.search + (value ? '#' + value : '');
		history.replaceState(null, '', url);
	}

	function revealPanel() {
		if (window.innerWidth < 960) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	cy.on('tap', 'node', function (evt) { selectTopic(evt.target.id(), false); revealPanel(); });
	cy.on('tap', 'edge', function (evt) { selectEdge(evt.target.id()); revealPanel(); });
	cy.on('tap', function (evt) { if (evt.target === cy) clearSelection(true); });
	cy.on('mouseover', 'node', function (evt) { evt.target.addClass('hover'); cy.container().style.cursor = 'pointer'; });
	cy.on('mouseout', 'node', function (evt) { evt.target.removeClass('hover'); cy.container().style.cursor = ''; });
	cy.on('mouseover', 'edge', function () { cy.container().style.cursor = 'pointer'; });
	cy.on('mouseout', 'edge', function () { cy.container().style.cursor = ''; });

	document.getElementById('map-fit').addEventListener('click', function () {
		cy.animate({ fit: { eles: cy.elements(':visible'), padding: 40 }, duration: 300 });
	});

	// Re-color when the system switches between light and dark mode.
	if (window.matchMedia) {
		var mq = window.matchMedia('(prefers-color-scheme: dark)');
		var restyle = function () { cy.style(graphStyle()); };
		if (mq.addEventListener) mq.addEventListener('change', restyle);
	}

	// ---- Type filters ---------------------------------------------------

	var typeInputs = Array.prototype.slice.call(document.querySelectorAll('.map-types input'));
	function applyTypeFilter() {
		var shown = typeInputs.filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
		cy.nodes().forEach(function (n) {
			var type = n.data('type');
			n.style('display', type === 'other' || shown.indexOf(type) !== -1 ? 'element' : 'none');
		});
		renderList(shown);
	}
	typeInputs.forEach(function (i) { i.addEventListener('change', applyTypeFilter); });

	// ---- Search ---------------------------------------------------------

	var searchInput = document.getElementById('map-search');
	var datalist = document.getElementById('map-topic-names');
	topicList.forEach(function (t) { datalist.appendChild(el('option', { value: t.name })); });

	function runSearch() {
		var q = searchInput.value.trim().toLowerCase();
		if (!q) return;
		var match = topicList.filter(function (t) { return t.name.toLowerCase() === q; })[0] ||
			topicList.filter(function (t) { return t.name.toLowerCase().indexOf(q) !== -1 || t.id === q; })[0];
		if (match) selectTopic(match.id, true);
	}
	searchInput.addEventListener('change', runSearch);
	searchInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); runSearch(); } });

	// ---- List view ------------------------------------------------------

	var listView = document.getElementById('list-view');
	var mapView = document.getElementById('map-view');
	var viewButtons = Array.prototype.slice.call(document.querySelectorAll('.view-button'));

	function renderList(shownTypes) {
		shownTypes = shownTypes || TYPES;
		var groups = TYPES.filter(function (type) { return shownTypes.indexOf(type) !== -1; }).map(function (type) {
			var items = topicList.filter(function (t) { return t.type === type; });
			if (!items.length) return null;
			return el('section', { className: 'list-group' }, [
				el('h2', { text: TYPE_LABELS[type] + 's' }),
				el('ul', { className: 'list-topics' }, items.map(function (t) {
					var url = entryUrl(t);
					var summaryLine = el('summary', {}, [
						el('span', { className: 'list-topic-name', text: t.name }),
						el('span', { className: 'count', text: String(t.studies.length) })
					]);
					return el('li', {}, [el('details', {}, [
						summaryLine,
						t.summary ? el('p', { text: t.summary }) : null,
						url ? el('p', {}, [el('a', { href: url, text: 'Read the Knowledge Base entry ›' })]) : null,
						studyList(t.studies, t.id)
					])]);
				}))
			]);
		});
		listView.replaceChildren.apply(listView, groups.filter(Boolean));
	}

	function setView(view, silent) {
		var isList = view === 'list';
		listView.hidden = !isList;
		mapView.hidden = isList;
		viewButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === view)); });
		if (!isList) { cy.resize(); if (!silent) cy.fit(cy.elements(':visible'), 40); }
	}
	viewButtons.forEach(function (b) {
		b.addEventListener('click', function () { setView(b.getAttribute('data-view')); });
	});

	// ---- Start ----------------------------------------------------------

	renderList();
	showOverview();

	// Deep links: #topic=fmt or #link=fmt__rcdi (used by Knowledge Base entries).
	var hash = window.location.hash.slice(1);
	var m = /^(topic|link)=(.+)$/.exec(hash);
	if (m) {
		var id = decodeURIComponent(m[2]);
		if (m[1] === 'topic') selectTopic(id, false);
		else selectEdge(id);
	}
})();
