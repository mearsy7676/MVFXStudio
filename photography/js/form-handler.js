document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contact-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    var data = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      if (response.ok) {
        window.location.href = 'thank-you.html';
      } else {
        response.json().then(function(data) {
          if (Object.hasOwn(data, 'errors')) {
            alert(data["errors"].map(error => error["message"]).join(", "));
          } else {
            alert('Oops! There was a problem submitting your form');
          }
        })
      }
    }).catch(function(error) {
      alert('Oops! There was a problem submitting your form');
    });
  });
});