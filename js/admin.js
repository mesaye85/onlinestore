/*AJAX
http://restclass.azurewebsites.net/api/points
postL create.send data
GET:
get info
PUTL update par of an existing element
PATCHL update part of an existing element
DELETEL remove an existing element

//object contructor for item
*/
class Item {
  constructor(code, title, price, catagory, image) {
    this.code = code;
    this.title = title;
    this.price = price;
    this.catagory = catagory;
    this.image = image;
    this.user = "Mesaye"
  }
}

function register() {
  var code = $('#code').val();
  var title = $('#title').val();
  var price = $('#price').val();
  var catagory = $('#catagory').val();
  var img = $('#img').val();

  if (code != "" && title != "" && price != "") {
    $.ajax({
      url: 'http://restclass.azurewebsites.net/api/points',
      type: 'POST',
      data: JSON.stringify(item),
      contentType: 'application/json',
      success: function(response) {
        console.log('yeee', response);
        $("#alert-box").removeClass('hidden');
        setTimeout(function() {
          $("#alert-box").addClass("hidden");

        }, 3000);
      },
      error: function(errorDetails) {
        console.log('ouch', errorDetails);

      }
    });
  } else {
    alert("Add a code, title and price");
  }
  clearForm();
  var item = new Item(code, title, price, catagory, img);
  console.log(item);
  console.log(JSON.stringify(item));

  //create ajax request


  function clearForm() {
    $("code").val("");
    $("title").val("");
    $("price").val("");
    $("catagory").val("");
    $("images").val("");
  }

  function init() {
    console.log('Admin page');
    $('#btn-register').on('click', register);
  }
}

ListStore = {

  getItems: function() {
    return items
  },

  loadItems: function() {
    var loadRequest = $.ajax({
      type: 'GET',
      url: "http://restclass.azurewebsites.net/api/points"
    })

    loadRequest.done(function(dataFromServer) {
      items = dataFromServer.items
      notifyComponents()
    })
  },

  addItem: function(itemDescription) {
    var creationRequest = $.ajax({
      type: 'POST',
      url: "http://restclass.azurewebsites.net/api/points",
      data: { description: itemDescription, completed: false }
    })

    creationRequest.done(function(itemDataFromServer) {
      items.push(itemDataFromServer)
      notifyComponents()
    })
  },
  toggleCompleteness: function(itemId) {}
}


window.onload = init;
