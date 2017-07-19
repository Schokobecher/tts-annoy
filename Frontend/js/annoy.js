$(function() {
	$.ajaxSetup({
		timeout: 5000,
		error: function(xhr, status, error) {
			console.log(error)
			$("#sendButton").addClass("btn-danger");
			$("#sendButton").text("There was a backend error");
		}
	});

	function sendRequest() {
		$.get("http://ddns.dennert.me:2888", {
			message: $("#messageBox").val()
		}, function(data) {
			console.log('Success!');
			changeButton();
		});
	}

	function changeButton() {
		$("#sendButton").removeClass("btn-danger");
		$("#sendButton").text(buttonText[Math.floor(Math.random() * buttonText.length)]);
	}
	var buttonText = ["HURT ME", "I CAME", "YEEEES!", "CRASH ME LIKE DIANA", "kek"];
	changeButton();
	$("#sendButton").click(function() {
		sendRequest();
	});
	$("#messageBox").keypress(function(e) {
		if (e.which == 13) {
			sendRequest();
		}
	});
});