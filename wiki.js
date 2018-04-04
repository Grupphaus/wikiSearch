$(document).ready(() => {
	$("input").focus();
	let searchButton = $(".search-button");
	// wikimedia's API with custom data queries:
	let URL =
		"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&format=json&formatversion=2&exsentences=1&exintro=&explaintext=&generator=search&gsrlimit=20&gsrsearch=";

	searchButton.on("click", () => {
		let inputValue = $("input").val();
		// resets the results-container on each new search:
		$(".results-container").empty();
		// adds user's input to the gsrsearch string:
		let wiki = URL + inputValue;

		// checks if the <input> is currently empty. this prevents an unnecesary API call:
		if (inputValue == "") {
			$("input").attr("placeholder", "Type something!");
		} else {
			$.ajax({
				url: wiki,
				type: "GET",
				// json with padding prevents /CORS/ warning:
				dataType: "jsonp",
				success: data => {
					let wikiLink = "https://en.wikipedia.org/wiki/curid=";
					let results = data.query.pages;
					$.each(results, (key, value) => {
						$(".results-container").append(
							"<a href='" +
								wikiLink +
								value.pageid +
								"'target='_blank'><div class='result'><h3>" +
								value.title +
								"</h3><p class='extract'>" +
								value.extract +
								"</p></div>"
						);
            $(".result").fadeTo("slow", 1);
					});
				}
			});
		}
	});
	// executes the above function on 'Enter' key press:
	$("input").on("keydown", event => {
		if (event.keyCode == 13) {
			searchButton.click();
		}
	});
});
