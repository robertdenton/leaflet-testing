var cardswrap = document.getElementById("cardswrap");
var cards = "";
function addCard(id,status,name,address){
  cards += "<div id='" + id + "' class='flexy-item'>";
    cards += "<h3>" + status + "</h3>";
    cards += "<h1>" + name + "</h1>";
    cards += "<p>" + address + "</p>";
  cards += "</div>";
  cardswrap.innerHTML += cards;
  //console.log(cards);
}
