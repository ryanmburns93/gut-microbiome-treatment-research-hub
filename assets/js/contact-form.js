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

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		if (!ENDPOINT_URL) {
			setStatus('The contact form is not configured yet. Please check back soon.', 'error');
			return;
		}

		if (!form.checkValidity()) {
			form.reportValidity();
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
