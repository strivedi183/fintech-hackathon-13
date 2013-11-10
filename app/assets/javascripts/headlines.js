$( document ).ready(function() {
	var first_symbol = "AAPL"
	var second_symbol = "GOOG"

	$("#first_symbol").val(first_symbol);
	$("#second_symbol").val(second_symbol);

	$.ajax({
	  type: "POST",
	  url: "/welcome/get_info",
	  data: {
	    first_symbol: first_symbol,
	    second_symbol: second_symbol
	  },
	  success: function(data) {
	    return false;
	  },
	  error: function(data) {
	    return false;
	  }
	});



	console.log(first_symbol);

});