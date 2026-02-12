window.addEventListener("load", function() {
  const form = document.getElementById('gameForm');
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("success! reloading");
      form.reset();
      setTimeout(function(){window.location.reload();},3000);
    })
  });
});
