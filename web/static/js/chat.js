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
            $.ajax({
                url:'/messages/'+user_from_id+"/"+user_to_id,
                type:'GET',
                contentType: 'application/json',
                dataType:'json',
                success: function(response){
                  limpiar();
                  var i = 0;
                  $.each(response, function(){
                      f = '<div id='+i+'>';
                      f = f + response[i].content;
                      f = f + '</div>';
                      i = i+1;
                      $('#messages').append(f);
                  });
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
