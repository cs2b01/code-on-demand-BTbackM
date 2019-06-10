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
