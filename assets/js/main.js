var imagenes=[{
  "imagen":"assets/img/kepler.jpe"
}];

function getJSON(url) {
  return new Promise(function(resolve, reject) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", url);
    ajax.send();
    ajax.onreadystatechange = function(data) {
      if (ajax.readyState == 4) {
        resolve(JSON.parse(ajax.responseText));
      }
    }
  })
}

getJSON("data/earth-like-results.json")
  .then(function(mensaje) {
    var arregloPlanetas = (mensaje.results.map(function(url) {
      return getJSON(url)
    }));

    return Promise.all(arregloPlanetas);

  })

  .then(function(resultado) {
    console.log(resultado);
    resultado.forEach(function(planeta) {
      var espacioVacio = document.getElementById('espacioVacio');
      var parrafo = '<div class="card card-space col s5">'+
        '<div class="card-image circle waves-effect waves-block waves-light">'+
          "<img src='static/img/__imagen__.jpe'>"+
        '</div>'+
        '<div class="card-content content-card">'+
          '<span class="card-title grey-text text-darken-4">__title__</span>'+
          '<p>__discover__</p>'+
        '</div>'+
      '</div>';

       var vacio = parrafo.replace("__title__","Nombre:" + " " +planeta.pl_name)
      .replace("__discover__","descubierto en el año:"+ " " +planeta.pl_disc)
      .replace("__imagen__",planeta.pl_name)
      espacioVacio.innerHTML+=vacio;

    })

  })
