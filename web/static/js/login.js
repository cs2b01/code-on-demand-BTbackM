function getData(){
        $('#loading').show();
        var username = $('#username').val();
        var password = $('#password').val();
        var message = JSON.stringify({
                "username": username,
                "password": password
            });

        $.ajax({
            url:'/authenticate',
            type:'POST',
            contentType: 'application/json',
            data : message,
            dataType:'json',
            error: function(response){
                //alert(JSON.stringify(response));
                if(response['status']==401){
                  $('#loading').attr("src","/static/images/WRONG.png");
                }
                if(response['status']==200){
                  $('#loading').attr("src","/static/images/OK.png");
                  window.location.href = "/static/chat.html";
                }
            }
        });
    }
