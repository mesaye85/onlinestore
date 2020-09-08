var catalog = [];

function fetchData() {
  /*catalog=[
      {code: '001',
       title: 'Iphone 11',
        price: '1000.00',
      catagory: 'Phone',
      img: src='img/iphone.jpg'}

  ,

      {code: '002',
      title: 'Samsung TV',
       price: '1000.00',
     catagory: 'Electronincs',
      img: src='img/tv.jpeg'}

  ,

  {code: '003',
      title: 'speakers',
       price: '1000.00',
     catagory: 'Sound',
      img: src='img/speakers.jpeg'}

  ]*/

  $.ajax({
    url: 'http://restclass.azurewebsites.net/api/points',
    type: 'GET',
    success: function(allitems) {
      console.log(allitems);

      for (var i = 0; i < allitems.length; i++) {
        var item = allitems[i];

        if (item.user === "Mesaye") {
          catalog.push(item);
          // push the catagories
          // item.catagory
        }
      }
      displayCatalog();
    },

    error: function() {
      console.log('Error getting data', details);
    }

  });
}

function displayCatagories() {
  //travel the catagories array
  //get each catagory from the array
  //create the syntax for li
  //append the syntax to the#catagories
  for (var i = 0; i < allitems.length; i++) {
    var cats = catagories[i];
    var syntax =
      `<li class="catagory" id=${cats}><li>`;
    $('.catagories').append(syntax);

    if (item.user === "Mesaye") {
      catalog.push(item);

    }

  }
}


function displayCatalog() {
  for (var i = 0; i < catalog.length; i++) {
    var item = catalog[i];
    var syntax =
      `<div class="item" id=${item.code}">
         <img src=${item.img}">
        <h4> ${item.title}</h4>
        <h6> class="price" ${item.price}</h6>
        <p>${item.catagory}</p>
        <button class="btn btn-primary"> Add to Cart </button>
        </div>
        `;
    $('#catalog').append(syntax);

  }
}

function drawItem(item) {
  var syntax =
    `<div class="item" id=${item.code}">
         <img src=${item.img}">
        <h4> ${item.title}</h4>
        <h6> class="price" ${item.price}</h6>
        <p>${item.catagory}</p>
        <button class="btn btn-primary"> Add to Cart </button>
        </div>
        `;
  $('#catalog').append(syntax);
}

function search(text) {
  console.log(text);
  //cear the previous results
  //travel the array
  //get each item
  //if the item title contains the text
  //display the item
  $('#catalog').html("");
  for (var i = 0; i < catalog.length; i++)
    var item = catalog[i];
  if (item.title.toLowerCase().includes(text.toLowerCase()) || item.catagory.toLowerCase().includes(text.toLowerCase()) || item.code.toLowerCase().includes(text.toLowerCase())) {
    drawItem(item);
  }
}

function init() {
  console.log('Catalog page');
  //hook events
  $('#btn-search').click(function() {
    var text = $('#txt-search').val();
    search(text);
  });
  fetchData();
  displayCatalog();
}

filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    filterRemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) filterAddClass(x[i], "show");
  }
}

function filterAddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function filterRemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
window.onload = init;
