window.http = function(){
  var h = null;
  var createRequestObject = function() {
    if (typeof XMLHttpRequest === 'undefined') {
      XMLHttpRequest = function() {
        try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
          catch(e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
          catch(e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP"); }
          catch(e) {}
        try { return new ActiveXObject("Microsoft.XMLHTTP"); }
          catch(e) {}
        throw new Error("This browser does not support XMLHttpRequest.");
      };
    }
    return new XMLHttpRequest();
  };

  var successFn = function(){};
  var errorFn = function(){};
  var request = function(type, url, data, sinc){
    if(!type) throw new Error('No TYPE in request');
    if(!url) throw new Error('No URL in '+type);

    h = createRequestObject();
    if(h){
      h.open(type, url, sinc);
      h.onreadystatechange = onStateChange;
      h.send(data);
    }
    return {
      success:setSuccess,
      error:setError
    };
  };
  var setError = function(fn){
    errorFn = fn;
    return {
      success: setSuccess
    }
  };
  var setSuccess = function(fn){
    successFn = fn;
    return {
      error: setError
    }
  };
  var onStateChange = function(){
    try {
      if (h.readyState == 4) {
        if (h.status == 200) {
          successFn(h);
        } else {
          errorFn(h.status, h.statusText);
        }
      }
    } catch( e ) {
      errorFn(-1, e);
    }
  };

  return {
    get:function(url, data, sinc){
      var data = (data || {});
      url+='?'
      for(var i in data){
        url+=i+'='+data[i]+'&';
      }
      return request('GET', url, null, !(sinc));
    },
    post:function(url, data, sinc){
      return request('POST', url, JSON.stringify(data || {}), !(sinc));
    }
  }
}()

/*console.log(http.get('http://google.com', {})
            .success(function(){console.log('success', arguments)})
            .error(function(){console.log('error', arguments)}));*/
