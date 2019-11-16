(function($){
  $(function(){
    $('.sidenav').sidenav();

  }); // end of document ready


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/existante/sw.js', { scope: '/existante/' }).then(function(reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };

})(jQuery); // end of jQuery name space
