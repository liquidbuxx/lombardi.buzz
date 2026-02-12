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
      setTimeout(function(){alert("success! reloading");},3000)
      window.location.reload();
    })
  });
});
