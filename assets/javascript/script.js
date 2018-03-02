

// Initial array of movies
var countries = ["USA", "Canada", "Germany", "England", "Finland", "Denmark", "Sweden", "Norway", "Mexico", "Italy"];

// displayCountryinfo function re-renders the HTML to display the appropriate content
function displayCountryInfo() {
    // Deleting the country's images prior displaying new country images
    $("#countries-view").empty();
    var country = $(this).attr("data-name");

    // Constructing a queryURL using the country name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        country + "&api_key=dc6zaTOxFJmzC&limit=10";

    console.log("Country = " + country);

    // Creating an AJAX call for the specific country button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);

        // storing the data from the AJAX request in the results variable
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            console.log("i =" + i);

            var countryDiv = $('<div>');


                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating and storing an image tag
                var countryImage = $("<img>");


                // Setting the src attribute of the image to a still image
                countryImage.attr("src", results[i].images.fixed_height_still.url);
                console.log("images.original_still =" + results[i].images.fixed_height_still.url);
                // Setting the data-still attribute of the image to a still image, the property pulled off the response item
                countryImage.attr("data-still", results[i].images.fixed_height_still.url);
                // Setting the data-animate attribute of the image to a animated image
                countryImage.attr("data-animate", results[i].images.fixed_height.url);
                console.log("data-animate =" + results[i].images.fixed_height.url);

                countryImage.attr("data-state", "still");
                countryImage.attr("class", "country-image gif");
                //  countryImage.attr("class", "gif");

                // Appending the rating and the image tag to the countryDiv
                countryDiv.append(p);
                countryDiv.append(countryImage);
                //   console.log(countryDiv);

                // Prependng the countryDiv to the HTML page in the "#countries-view" div
                $("#countries-view").prepend(countryDiv);

        }

    });

}

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of countries
    for (var i = 0; i < countries.length; i++) {

        // Then dynamicaly generating buttons for each country in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of country-btn to our button
        a.addClass("country-btn");
        // Adding a data-attribute
        a.attr("data-name", countries[i]);
        // Providing the initial button text
        a.text(countries[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);

    }
}

// This function handles events where a country button is clicked
$("#add-country").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var country = $("#country-input").val().trim();

    // Adding country from the textbox to our array
    countries.push(country);

    // Calling renderButtons which handles the processing of our country array
    renderButtons();
    $("#country-input").val(" ");
});

// Adding a click event listener to all elements with a class of "country-btn"
$(document).on("click", ".country-btn", displayCountryInfo);

$(document).on("click", ".gif", function (event) {

    // $(".gif").on("click", function(event) {
    event.preventDefault();

    console.log("You clicked the image");
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// Calling the renderButtons function to display the intial buttons
renderButtons();
