(function ($) {
  $(function () {
    console.log('v3')
    $('.sidenav').sidenav();

  }); // end of document ready

  $('#http-call').click((e) => {
    fetch(`/assets/images/apple-touch-icon.png?ts=${(new Date()).getTime()}`)
      .then(() => console.log('Récupération API FETCH de l\'image PWA'))
      .catch((e) => console.log(`Erreur lors de la récupération de l'image PWA : ${e}`))
  });

  $('#img-call').click((e) => {
    const myImage = new Image(100, 200);
    myImage.src = `/assets/images/apple-touch-icon.png?ts=${(new Date()).getTime()}`;
  });


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/nouvelle/sw.js', {
      scope: '/nouvelle/'
    }).then(function (reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };

})(jQuery); // end of jQuery name space