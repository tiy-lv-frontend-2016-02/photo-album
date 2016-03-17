$(document).ready(function(){
  var $app = $("#app");
  var defaultTemplate = $("#defaultTemplate").text();
  var albumTemplate = $("#albumTemplate").text();
  var overlayTemplate = $("#overlayTemplate").text();
  var $overlay = $("#overlay");

  $app.on('click', '.default .album', function(e) {
    var albumTitle = $(this).find('.title').text().trim();
    renderAlbum(albumTitle);
  });

  $app.on('click', '.sidebar a', function(e){
    var albumTitle = $(this).text().trim();
    renderAlbum(albumTitle);
  });

  $app.on('click', '.imagesContainer .image', function(e){
    var albumName = $(".results h2").text().trim();
    var imageTitle = $(this).find('.title').text().trim();
    var imageUrl = $(this).find('img').attr("data-url");
    var overlayData = {
      albumName: albumName,
      name: imageTitle,
      url: imageUrl
    }

    $overlay.html(Mustache.render(overlayTemplate, overlayData));
    $overlay.show()
  });

  $overlay.on('click', function(e){
    if ($(e.target).is('div, button')) {
      $overlay.hide();
    }
  });

  renderDefault();

  function renderDefault() {
    $app.html(Mustache.render(defaultTemplate, data));
  }

  function renderAlbum(albumTitle) {
    var albumData = data.albums.filter(function(value){
      return value.name === albumTitle ? true : false;
    })[0];
    
    albumData.albums = data.albums.map(function(value){
      return value.name;
    });

    $app.html(Mustache.render(albumTemplate, albumData));
  }
});