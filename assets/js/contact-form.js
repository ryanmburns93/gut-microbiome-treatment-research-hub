/**
 * Sends the contact form to a Google Apps Script web app, which appends
 * each message as a row in a Google Sheet (GitHub Pages can't accept POSTs).
 * The endpoint comes from `contact_endpoint` in _config.yml via the form's
 * data-endpoint attribute. See google-apps-script/SETUP.md.
 */
(function () {
	'use strict';

	var form = document.getElementById('contact-form');
	if (!form) return;

	var ENDPOINT_URL = form.getAttribute('data-endpoint');
	var status = document.getElementById('contact-form-status');
	var submitButton = form.querySelector('[type="submit"]');

	function setStatus(message, kind) {
		status.textContent = message;
		status.className = 'contact-form-status' + (kind ? ' ' + kind : '');
	}

	// Show errors next to each field instead of the browser's validation
	// bubbles, which some screen readers announce poorly.
	form.noValidate = true;
	var fields = [
		{ input: document.getElementById('contact-name'), missing: 'Enter your name.' },
		{ input: document.getElementById('contact-email'), missing: 'Enter your email address.', invalid: 'Enter an email address like name@example.com.' },
		{ input: document.getElementById('contact-message'), missing: 'Enter a message.' }
	];

	function showError(field, message) {
		var error = document.getElementById(field.input.id + '-error');
		error.textContent = message || '';
		error.hidden = !message;
		if (message) field.input.setAttribute('aria-invalid', 'true');
		else field.input.removeAttribute('aria-invalid');
	}

	function validate() {
		var firstInvalid = null;
		fields.forEach(function (field) {
			var v = field.input.validity;
			var message = v.valueMissing || !field.input.value.trim() ? field.missing : (!v.valid ? field.invalid : '');
			showError(field, message);
			if (message && !firstInvalid) firstInvalid = field.input;
		});
		return firstInvalid;
	}

	fields.forEach(function (field) {
		// Clear a field's error once the person fixes it.
		field.input.addEventListener('input', function () {
			if (field.input.getAttribute('aria-invalid') === 'true') validate();
		});
	});

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		if (!ENDPOINT_URL) {
			setStatus('The contact form is not configured yet. Please check back soon.', 'error');
			return;
		}

		var firstInvalid = validate();
		if (firstInvalid) {
			setStatus('Please fix the highlighted fields and try again.', 'error');
			firstInvalid.focus();
			return;
		}

		var data = {
			name: document.getElementById('contact-name').value,
			email: document.getElementById('contact-email').value,
			message: document.getElementById('contact-message').value,
			company: document.getElementById('contact-company').value
		};

		var body = Object.keys(data)
			.map(function (key) {
				return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
			})
			.join('&');

		submitButton.disabled = true;
		setStatus('Sending…');

		// text/plain avoids a CORS preflight, which Apps Script can't answer.
		fetch(ENDPOINT_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain;charset=utf-8' },
			body: body
		})
			.then(function (response) { return response.json(); })
			.then(function (result) {
				if (result.ok) {
					setStatus("Thanks — we'll be in touch soon.", 'success');
					form.reset();
				} else {
					setStatus(result.error || 'Something went wrong. Please try again.', 'error');
				}
			})
			.catch(function () {
				setStatus('Something went wrong. Please try again later.', 'error');
			})
			.finally(function () {
				submitButton.disabled = false;
			});
	});
})();
