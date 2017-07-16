$(function() {
  
  function sendRequest() {
  	changeButton();
  	$.get("http://BACKENDURL", {message:$("#messageBox").val()}, function(data){
  		console.log(data);
  	});
  	$("#messageBox").val("");  	
  }

  function changeButton() {
  	$("#sendButton").text(buttonText[Math.floor(Math.random() * buttonText.length)]);
  }
  
  var buttonText = ["HURT ME", "I CAME", "YEEEES!", "CRASH ME LIKE DIANA", "kek"];
  changeButton();

  $("#sendButton").click(function(){
  	sendRequest();
  });

  $("#messageBox").keypress(function (e) {
  	if(e.which == 13){
  		sendRequest();
  	}
  });

});