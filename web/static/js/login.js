function getData(){
        $('#action').html("Authenticating...");
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
            success: function(response){
                //alert(JSON.stringify(response));
                $('#action').html(response['statusText']);
            }.load(window.location.href = "/static/chat.html"),
            error: function(response){
                //alert(JSON.stringify(response));
                $('#action').html(response['statusText']);
            }
        });
    }
