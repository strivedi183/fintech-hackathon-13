$(function() {

    $("#error").hide();

// Triggers a chart refresh when you press enter in a text field
$('#input input').bind("enterKey", function(e){

    // do stuff here - this just detects a trigger
    $('#content').css("background-color", '#444');
    setTimeout(function(){
        $('#content').css("background-color", '#555');
    }, 500);

    if ($(this).val() != "JACK") {
        $(this).trigger( "errorevent", [ "Custom", "Event" ] );
    }

    /* throwing an error for invalid stock symbols
    if ($(this).val() == "JACK") {
        $("#error").fadeIn(100);
        setTimeout(function(){
            $("#error").fadeOut(1000);
        }, 500);
    } */

});
$('#input input').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

// handles errors for invalid stocks
$("#input input").on( "errorevent", function( event ) {
    $("#errorsymbol").html($(this).val());
    $("#error").fadeIn(100);
    setTimeout(function(){
        $("#error").fadeOut(1000);
    }, 500);
    // More complex error handling here, if time
});

// Toggle on/off showing of lines
$("#chartsettings>.control").click(function(){
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
        // Show this line on the graph
    } else {
        // Hide this line on the graph
    }
});

// Toggle which date range is showed
$("#datesettings>.control").click(function(){
    console.log("click");
    $("#datesettings>.control").removeClass("selected");
    $(this).addClass("selected");

    // Change the date range to match the date range clicked
});

});