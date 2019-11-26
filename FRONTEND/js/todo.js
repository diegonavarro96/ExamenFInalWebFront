var todos=0;
var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

function refresh(){
  $('input[name$="todo"]').change(function() {
      if(this.checked) {
          $(this).next().addClass("done")
  
      }
      else{
          $(this).next().removeClass("done")
          
      }
  });
  }

var todos = document.querySelectorAll("input[type=checkbox]");

function loadTodos() {
  $.ajax({
    url: 'https://examen-final-web-diego.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        todos=data.length
        // aqui va su código para agregar los elementos de la lista
        //console.log(data[i].description)
        // algo asi:
        // addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
        var txt = data[i].description;
        console.log('text is =',txt)

        let newHtml = ''
        newHtml += 
        `
            <li><input type="checkbox" name="todo" value="${i}"><span>${txt}</span></li>
        `
        $('#todo-list').append(newHtml)
        refresh()
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");
input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://examen-final-web-diego.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        let newHtml = ''
        todos= todos + 1;
        console.log('value= ',input.value)
        newHtml += 
        `
            <li><input type="checkbox" name="todo" value="${todos}"><span>${input.value}</span></li>
        `
        $('#todo-list').append(newHtml)
        //refresh()
        //todos++;
        input.value = '';
        //loadTodos()
        location.reload(true);
        
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    
  }
})


function addTodo(id, todoText, completed) {
  
}