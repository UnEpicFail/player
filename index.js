$(function(){
  const _settings = require('./config.json');
  if (!_settings){
    return false;
  }

  app.init(_settings);
})

var app = {
  init: function(settings){

    $('input[type="hidden"][name="access_token"]', '#searchForm').val(settings.access_token);

    $('#searchForm').on('submit',function(e){
      e.preventDefault();
      var count = $('input[type="hidden"][name="count"]').val()
      $.get(settings.server_url+settings.actions.search.action+'?'+$(this).serialize())
      .success(function(res){
        // console.log('success',res);
        if(res.response.length - 1 === 100 ){
          var offset = parseInt($('input[type="hidden"][name="offset"]').val(), 10);
          $('input[type="hidden"][name="offset"]').val((offset+1) * count);
        }

        $('#list ul').append(Mustache.render($('#listTpl').html(), res));
      })
      .error(function(res){
        console.log('error',res);
      })
    })

    $('#list').on('click', 'li', function(){
      console.log($(this).attr('link'));
        var player = $('<embed>').attr({
          src: $(this).attr('link'),
          autostart: true
        });

        $('#player').html('').append(player);
        // this.son=document.createElement("embed");
        // this.son.setAttribute("src",this.source);
        // this.son.setAttribute("hidden","true");
        // this.son.setAttribute("volume",this.volume);
        // this.son.setAttribute("autostart","true");
        // this.son.setAttribute("loop",this.loop);
        // document.body.appendChild(this.son);
    })
  }
}
