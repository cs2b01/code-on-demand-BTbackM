var currentUserId = 0;

function whoami(){
        $.ajax({
            url:'/current',
            type:'GET',
            contentType: 'application/json',
            dataType:'json',
            success: function(response){
                //alert(JSON.stringify(response));
                $('#cu_username').html(response['username'])
                var name = response['name']+" "+response['fullname'];
                currentUserId = response['id'];
                $('#cu_name').html(name);
                allusers();
            },
            error: function(response){
                alert(JSON.stringify(response));
            }
        });
    }

    function allusers(){
            $.ajax({
                url:'/users',
                type:'GET',
                contentType: 'application/json',
                dataType:'json',
                success: function(response){
                    //alert(JSON.stringify(response));
                    var i = 0;
                    $.each(response, function(){
                        f = '<div class="alert alert-secondary" role="alert" onclick=loadMessages('+currentUserId+','+response[i].id+') >';
                        f = f + response[i].username;
                        f = f + '</div>';
                        i = i+1;
                        $('#allusers').append(f);
                    });
                },
                error: function(response){
                    alert(JSON.stringify(response));
                }
            });
    }

    function loadMessages(user_from_id, user_to_id){
            //alert(user_from_id);
            //alert(user_to_id);
            $('#messages').empty();
            $.ajax({
                url:'/messages/'+user_from_id+"/"+user_to_id,
                type:'GET',
                contentType: 'application/json',
                dataType:'json',
                success: function(response){
                  var size_array = response[0].length+response[1].length;
                  var sender = 0;
                  var recieveder = 0;
                  for(var i = 0; i < size_array; i++){
                      if(response[0].length > 0 && response[1].length > 0){
                          if(response[0][sender].id < response[1][recieveder].id){
                              f = '<div class="btn btn-success" style="float: right" >';
                              f = f + response[0][sender]['content'];
                              f = f + '</div>'+'<br/><br/>';
                              $('#messages').prepend(f);
                              sender = sender + 1;
                          }else if(response[0][sender].id > response[1][recieveder].id) {
                              f = '<div class="btn btn-warning" style="float: left" >';
                              f = f + response[1][recieveder]['content'];
                              f = f + '</div>'+'<br/><br/>';
                              $('#messages').prepend(f);
                              recieveder = recieveder + 1;
                          }else if(response[0].length < sender) {
                              f = '<div class="btn btn-success" style="float: right" >';
                              f = f + response[1][recieveder]['content'];
                              f = f + '</div>'+'<br/><br/>';
                              $('#messages').prepend(f);
                              recieveder = recieveder + 1
                          }else{
                              f = '<div class="btn btn-warning" style="float: left" >';
                              f = f + response[0][sender]['content'];
                              f = f + '</div>'+'<br/><br/>';
                              $('#messages').prepend(f);
                              sender = sender + 1;
                          }
                      }else{
                          if(response[0].length > 0){
                              f = '<div class="btn btn-success" style="float: right" >';
                              f = f + response[0][i]['content'];
                              f = f + '</div>'+'<br/><br/>';
                              $('#messages').prepend(f);
                          }
                          if(response[1].length > 0){
                              f = '<div class="btn btn-warning" style="float: left" >';
                              f = f + response[1][i]['content'];
                              f = f + '</div>'+'<br/><br/>';
                              $('#messages').prepend(f);
                          }
                      }
                  }
                },
                error: function(response){
                    alert(JSON.stringify(response));
                }
            });
    }

    function limpiar(){
       document.getElementById("messages").innerHTML="";
    }

    function sendMessage(){
            var content = $('#content').val();
            var user_from_id = $('#user_from_id').val();
            var user_to_id = $('#user_to_id').val();
            var message = JSON.stringify({
                    "content": content,
                    "user_from_id": user_from_id,
                    "user_to_id": user_to_id
                });
           $.ajax({
                     url:'/sendMessage',
                     type:'POST',
                     contentType: 'application/json',
                     data : message,
                     dataType:'json'
                   });
    }
