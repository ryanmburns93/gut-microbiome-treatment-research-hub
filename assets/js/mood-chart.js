/* Our Story mood chart: two small multiples (mood scores, hours of sleep)
   sharing one time axis, with FMT doses marked and a shared hover readout.
   Data comes from <script type="application/json"> blocks written by
   _includes/mood-chart.html. Plain SVG, no libraries. Marks also carry
   light-mode colors as attributes so the chart still reads if main.css is
   missing or stale; the CSS overrides them, including for dark mode. */
(function () {
	var root = document.getElementById('mood-chart');
	if (!root) return;

	var raw = JSON.parse(document.getElementById('mood-data').textContent);
	var doses = JSON.parse(document.getElementById('dose-data').textContent);
	var periods = JSON.parse(document.getElementById('period-data').textContent);
	var SVGNS = 'http://www.w3.org/2000/svg';
	var DAY = 86400000;

	function parseDate(s) { var p = s.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); }
	function fmt(t) { return new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }); }

	var days = raw.map(function (r) {
		return { t: parseDate(r.date), sleep: +r.sleep, depressed: +r.depressed, elevated: +r.elevated };
	});
	// Trailing 7-day averages smooth the 1-4 ratings, which jump day to day.
	['sleep', 'depressed', 'elevated'].forEach(function (k) {
		days.forEach(function (d, i) {
			var win = days.slice(Math.max(0, i - 6), i + 1);
			d[k + 'Avg'] = win.reduce(function (s, w) { return s + w[k]; }, 0) / win.length;
		});
	});
	var t0 = days[0].t, t1 = days[days.length - 1].t;
	// Doses after the last day of data (e.g. Aug 19) fall off the chart.
	var doseTimes = doses.map(function (d) { return parseDate(d.date); })
		.filter(function (t) { return t >= t0 && t <= t1; });

	var panels = [
		{
			id: 'mood', title: 'Mood ratings, 7-day average', min: 1, max: 4, height: 200,
			ticks: [[1, 'None'], [2, 'Mild'], [3, 'Moderate'], [4, 'Severe']],
			series: [
				{ key: 'depressedAvg', label: 'Depressed mood', cls: 'series-depressed', color: '#005ea2' },
				{ key: 'elevatedAvg', label: 'Elevated mood', cls: 'series-elevated', color: '#c05600' }
			]
		},
		{
			id: 'sleep', title: 'Hours of sleep per night', min: 0, max: 24, height: 170,
			ticks: [[0, '0'], [6, '6'], [12, '12'], [18, '18'], [24, '24 hrs']],
			// Daily values as faint dots behind the average, so long nights in bed stay visible.
			dots: { key: 'sleep', cls: 'series-sleep', color: '#00809a' },
			series: [{ key: 'sleepAvg', label: 'Sleep', cls: 'series-sleep', color: '#00809a' }]
		}
	];

	var M = { top: 26, right: 112, bottom: 8, left: 72 };
	var AXIS_H = 28;

	function el(name, attrs, parent) {
		var n = document.createElementNS(SVGNS, name);
		for (var a in attrs) n.setAttribute(a, attrs[a]);
		if (parent) parent.appendChild(n);
		return n;
	}

	function draw() {
		root.innerHTML = '';
		var width = Math.max(320, root.clientWidth);
		var narrow = width < 560;
		var m = { top: M.top, right: narrow ? 16 : M.right, bottom: M.bottom, left: narrow ? 56 : M.left };
		var plotW = width - m.left - m.right;
		var x = function (t) { return m.left + (t - t0) / (t1 - t0) * plotW; };
		var total = panels.reduce(function (s, p) { return s + p.height + m.top + m.bottom; }, 0) + AXIS_H;

		var svg = el('svg', { viewBox: '0 0 ' + width + ' ' + total, width: width, height: total, role: 'img',
			'aria-label': 'Line charts of Monica\'s daily mood ratings and hours of sleep from January to August 2026, with FMT doses marked. A table of monthly averages follows.' }, root);

		var y0 = 0, bands = [];
		panels.forEach(function (p) {
			var top = y0 + m.top, bottom = top + p.height;
			var y = function (v) { return bottom - (v - p.min) / (p.max - p.min) * p.height; };
			p.y = y; p.top = top; p.bottom = bottom;

			el('text', { x: m.left, y: y0 + 16, class: 'chart-title' }, svg).textContent = p.title;

			// Treatment periods as soft bands behind everything.
			periods.forEach(function (pr) {
				var a = x(Math.max(t0, parseDate(pr.start))), b = x(Math.min(t1, parseDate(pr.end) + DAY));
				if (b > a) bands.push(el('rect', { x: a, y: top, width: b - a, height: p.height, class: 'chart-band', fill: 'rgba(163, 59, 0, 0.08)' }, svg));
			});

			p.ticks.forEach(function (tk) {
				el('line', { x1: m.left, x2: m.left + plotW, y1: y(tk[0]), y2: y(tk[0]), class: 'chart-grid', stroke: '#e4e8ec' }, svg);
				var lbl = el('text', { x: m.left - 8, y: y(tk[0]) + 4, class: 'chart-tick', 'text-anchor': 'end' }, svg);
				lbl.textContent = tk[1];
			});

			doseTimes.forEach(function (t) {
				el('line', { x1: x(t), x2: x(t), y1: bottom - 6, y2: bottom, class: 'chart-dose', stroke: '#a33b00', 'stroke-width': 2 }, svg);
			});

			if (p.dots) {
				days.forEach(function (r) {
					el('circle', { cx: x(r.t), cy: y(r[p.dots.key]), r: 2.5, class: 'chart-dot ' + p.dots.cls, fill: p.dots.color, 'fill-opacity': 0.35 }, svg);
				});
			}

			p.series.forEach(function (s) {
				var d = days.map(function (r, i) { return (i ? 'L' : 'M') + x(r.t).toFixed(1) + ' ' + y(r[s.key]).toFixed(1); }).join('');
				el('path', { d: d, class: 'chart-line ' + s.cls, fill: 'none', stroke: s.color, 'stroke-width': 2 }, svg);
				var last = days[days.length - 1];
				el('circle', { cx: x(last.t), cy: y(last[s.key]), r: 4, class: 'chart-end ' + s.cls, fill: s.color }, svg);
				if (!narrow) {
					var lab = el('text', { x: x(last.t) + 10, y: y(last[s.key]) + 4, class: 'chart-label' }, svg);
					lab.textContent = s.label;
				}
			});
			y0 = bottom + m.bottom;
		});

		// Shared month axis under the bottom panel.
		for (var mo = 0; mo < 8; mo++) {
			var t = Date.UTC(2026, mo, 1);
			if (t < t0 || t > t1) continue;
			var tx = el('text', { x: x(t), y: y0 + 18, class: 'chart-tick', 'text-anchor': 'middle' }, svg);
			tx.textContent = new Date(t).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
		}

		// Hover: crosshair across both panels plus one readout.
		var cross = el('line', { y1: panels[0].top, y2: panels[1].bottom, class: 'chart-cross', stroke: '#a9aeb1', visibility: 'hidden' }, svg);
		var dots = [];
		panels.forEach(function (p) {
			p.series.forEach(function (s) {
				dots.push({ p: p, s: s, c: el('circle', { r: 4, class: 'chart-end ' + s.cls, fill: s.color, visibility: 'hidden' }, svg) });
			});
		});
		var tip = document.createElement('div');
		tip.className = 'chart-tip';
		tip.hidden = true;
		root.appendChild(tip);

		var hit = el('rect', { x: m.left, y: panels[0].top, width: plotW, height: panels[1].bottom - panels[0].top, class: 'chart-hit', fill: 'transparent' }, svg);
		function show(clientX) {
			var box = svg.getBoundingClientRect();
			var px = (clientX - box.left) * (width / box.width);
			var t = t0 + (px - m.left) / plotW * (t1 - t0);
			var i = Math.max(0, Math.min(days.length - 1, Math.round((t - t0) / DAY)));
			var d = days[i], cx = x(d.t);
			cross.setAttribute('x1', cx); cross.setAttribute('x2', cx); cross.setAttribute('visibility', 'visible');
			dots.forEach(function (o) { o.c.setAttribute('cx', cx); o.c.setAttribute('cy', o.p.y(d[o.s.key])); o.c.setAttribute('visibility', 'visible'); });
			var dose = doseTimes.indexOf(d.t) > -1;
			tip.innerHTML = '<strong>' + fmt(d.t) + '</strong>' + (dose ? ' <span class="tip-dose">FMT dose</span>' : '') +
				'<span><i class="key series-depressed"></i>Depressed ' + d.depressed + ' <em>(avg ' + d.depressedAvg.toFixed(1) + ')</em></span>' +
				'<span><i class="key series-elevated"></i>Elevated ' + d.elevated + ' <em>(avg ' + d.elevatedAvg.toFixed(1) + ')</em></span>' +
				'<span><i class="key series-sleep"></i>Sleep ' + d.sleep + ' hrs <em>(avg ' + d.sleepAvg.toFixed(1) + ')</em></span>';
			tip.hidden = false;
			var left = cx / width * box.width;
			tip.style.left = Math.min(box.width - tip.offsetWidth, Math.max(0, left + 12 > box.width / 2 ? left - tip.offsetWidth - 12 : left + 12)) + 'px';
			tip.style.top = (panels[0].top / total * box.height) + 'px';
		}
		function hide() {
			cross.setAttribute('visibility', 'hidden');
			dots.forEach(function (o) { o.c.setAttribute('visibility', 'hidden'); });
			tip.hidden = true;
		}
		hit.addEventListener('pointermove', function (e) { show(e.clientX); });
		hit.addEventListener('pointerdown', function (e) { show(e.clientX); });
		hit.addEventListener('pointerleave', hide);
	}

	draw();
	var last = root.clientWidth;
	window.addEventListener('resize', function () {
		if (root.clientWidth !== last) { last = root.clientWidth; draw(); }
	});
})();
