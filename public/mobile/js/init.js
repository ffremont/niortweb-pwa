(function ($) {
  const ctx = {
    beforeInstallPromptEvent: null
  };

  $(function () {
    $('.sidenav').sidenav();

  }); // end of document ready

  window.addEventListener('beforeinstallprompt', function(e) {
    console.log('Can install PWA and call prompt()');
    e.preventDefault();

    // https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
    ctx.beforeInstallPromptEvent = e;
    $('#install-call').show();
    e.userChoice.then(function(choiceResult) {
      if (choiceResult.outcome == 'dismissed') {
        console.log('User cancelled homescreen install');
        
        $('#install-call').hide();
      } else {
        console.log('User added to homescreen');
      }
    });
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/Window/appinstalled_event
  window.addEventListener('appinstalled', (evt) => {
    $('#install-call').hide();
    $('#installed').show();
  });

  // installation de l'application 
  $('#install-call').click(e => {
    if(ctx.beforeInstallPromptEvent){
      ctx.beforeInstallPromptEvent.prompt();
    }
  });

  $('#notify-call').click((e) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        action: 'notify',
        message: 'Hello from mobile web app!'
      });
    }
  });

  $('#share-call').click((e) => {
    if (navigator.share) {
      navigator.share({
        title: 'NiortWeb',
        text: 'Présentation NiortWeb - PWA du 19.11.19',
        url: 'https://slides.com/florentfremont/deck-2',
      });
    }
  });

  Notification.requestPermission().then((result) => {
    if (result === 'denied') {
      alert('Permission wasn\'t granted. Allow a retry.');
      return;
    }
    if (result === 'default') {
      alert('The permission request was dismissed.');
      return;
    }
    // Do something with the granted permission.
    console.log('notification autorisée');
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/mobile/sw.js', {
      scope: '/mobile/'
    }).then(function (reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };

})(jQuery); // end of jQuery name space