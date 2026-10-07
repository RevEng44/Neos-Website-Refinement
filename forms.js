// Live site: the inquiry and careers forms send through FormSubmit, as the previous site's did, to the
// same addresses and with the same subjects, so existing mail rules and the careers@ intake keep working.
// Inquiries go to info@ by AJAX. Careers introductions go to careers@ as an ordinary form post into a
// hidden frame, because FormSubmit's AJAX endpoint drops file attachments (the resume).
// A review copy (<html data-forms="review">, set only on the partner link) shows the same confirmation
// without sending anything, and says where the message would go on neosadvisors.com.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var review = document.documentElement.dataset.forms === 'review';

  function show(result, ok, heading, detail, note) {
    result.replaceChildren();
    result.classList.toggle('is-error', !ok);
    var first = document.createElement('p');
    var strong = document.createElement('strong');
    strong.textContent = heading;
    first.append(strong);
    var second = document.createElement('p');
    second.textContent = detail;
    result.append(first, second);
    if (note) {
      var third = document.createElement('p');
      third.className = 'form-review-note';
      third.textContent = note;
      result.append(third);
    }
    result.hidden = false;
    result.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
  }

  // Review copy only: a short pause, then the confirmation, with nothing sent.
  function pretend(form, result, heading, detail, address) {
    var button = form.querySelector('button[type="submit"]');
    busy(button, true);
    result.hidden = true;
    setTimeout(function () {
      busy(button, false);
      form.reset();
      show(result, true, heading, detail, 'This review copy does not send forms. On neosadvisors.com this goes to ' + address + '.');
    }, 700);
  }

  function busy(button, on) {
    if (on) {
      button.dataset.label = button.innerHTML;
      button.textContent = 'Sending…';
      button.disabled = true;
    } else {
      if (button.dataset.label) button.innerHTML = button.dataset.label;
      button.disabled = false;
    }
  }

  // Inquiry: info@neosadvisors.ca
  var inquiry = document.getElementById('inquiry-form');
  inquiry.addEventListener('submit', function (event) {
    event.preventDefault();
    var form = inquiry;
    var button = form.querySelector('button[type="submit"]');
    var result = document.getElementById('inquiry-result');
    if (form.elements._honey.value) return;
    if (review) return pretend(form, result, 'Thank you. Your inquiry has been sent.', 'We will be in touch soon.', 'info@neosadvisors.ca');
    form.elements._replyto.value = form.elements.Email.value;
    var data = new FormData(form);
    busy(button, true);
    result.hidden = true;
    fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: data
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (json) {
          return response.ok && (json.success === true || json.success === 'true');
        });
      })
      .then(function (sent) {
        if (sent) {
          form.reset();
          show(result, true, 'Thank you. Your inquiry has been sent.', 'We will be in touch soon.');
        } else {
          show(result, false, 'Your inquiry did not send.', 'Please try again, or email us at info@neosadvisors.ca.');
        }
      })
      .catch(function () {
        show(result, false, 'Your inquiry did not send.', 'Please check your connection and try again, or email us at info@neosadvisors.ca.');
      })
      .then(function () { busy(button, false); });
  });

  // Careers: careers@neosadvisors.ca, with the resume attached
  var careers = document.getElementById('careers-form');
  var frame = document.querySelector('iframe[name="careers-frame"]');
  var waiting = false;
  var timer = 0;
  // Posting into the hidden frame keeps the visitor on the page. Without this script the form still
  // posts, and FormSubmit shows its own thank-you page.
  careers.target = 'careers-frame';

  function careersDone(ok) {
    waiting = false;
    clearTimeout(timer);
    busy(careers.querySelector('button[type="submit"]'), false);
    var result = document.getElementById('careers-result');
    if (ok) {
      careers.reset();
      show(result, true, 'Thank you. Your introduction has been sent.', 'Our team will review it and be in touch.');
    } else {
      show(result, false, 'We could not confirm that your introduction was sent.', 'Please try again, or email it to careers@neosadvisors.ca.');
    }
  }

  careers.addEventListener('submit', function (event) {
    var result = document.getElementById('careers-result');
    if (careers.elements._honey.value) { event.preventDefault(); return; }
    var file = careers.elements.attachment.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      event.preventDefault();
      show(result, false, 'Your resume is larger than 10 MB.', 'Please attach a smaller file, or email it to careers@neosadvisors.ca.');
      return;
    }
    if (review) {
      event.preventDefault();
      return pretend(careers, result, 'Thank you. Your introduction has been sent.', 'Our team will review it and be in touch.', 'careers@neosadvisors.ca, with the resume attached');
    }
    careers.elements._replyto.value = careers.elements.Email.value;
    result.hidden = true;
    busy(careers.querySelector('button[type="submit"]'), true);
    waiting = true;
    clearTimeout(timer);
    timer = setTimeout(function () { if (waiting) careersDone(false); }, 60000);
    // No preventDefault: the browser posts the form, attachment included, into the hidden frame.
  });

  frame.addEventListener('load', function () {
    if (waiting) careersDone(true);
  });
})();
