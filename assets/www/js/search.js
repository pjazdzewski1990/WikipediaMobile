function search()
{
	if (hasNetworkConnection())
	{
		var searchParam = $('#searchParam').val();
	
		if (searchParam == '')
		{
			hideOverlayDivs();
			return;
		}
		
		showProgressLoader("Loading", "Retrieving content from Wikipedia");
		
		var requestUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&";
		requestUrl += "search=" + encodeURIComponent(searchParam) + "&";
		requestUrl += "format=json";

		$.ajax({
			type:'Get',
			url:requestUrl,
			success:function(data) {
				displayResults(data);
			}
		});
	}
	else
	{
		noConnectionMsg();
		hideOverlayDivs();
	}
}

function displayResults(results)
{
	var formattedResults = "";
	
	if (results != null)
	{
		results = eval(results);
	
		if (results.length > 0)
		{
			var searchParam = results[0];
			var searchResults = results[1];
		
			for (var i=0;i<searchResults.length;i++)
			{
				var article = searchResults[i];
				
				if (article.toLowerCase() == $('#searchParam').val().toLowerCase())
				{
					goToResult(article);
					return;
				}
				
				formattedResults += "<div class='listItemContainer' onclick=\"javascript:goToResult(\'" + article + "\');\">";
				formattedResults += "<div class='listItem'>";
				formattedResults += "<span class='iconSearchResult'><img src='image/iconListItem.png'/></span>";
				formattedResults += "<span>" + article + "</span>";
				formattedResults += "</div>";
				formattedResults += "</div>";
			}
		}
	}
	else
	{
		formattedResults += "nothingness...";
	}
	
	formattedResults += "<div class='listItemContainer' onclick='javascript:hideSearchResults();'>";
	formattedResults += "<div class='listItem'>Close</div>";
	formattedResults += "</div>";
	
	$('#resultList').html(formattedResults);
		
	hideOverlayDivs();

	$('#searchresults').show('fast');
	$('#content').hide('fast');
	
	hideProgressLoader();
}

function goToResult(article)
{
	if (hasNetworkConnection())
	{
		showProgressLoader("Loading", "Retrieving content from Wikipedia");
		var url = "http://en.wikipedia.org/wiki/" + article;	
		$('#main').attr('src', url);
		hideOverlayDivs();
		showContent();
	}
	else
	{
		noConnectionMsg();
	}
}

function hideSearchResults()
{
	hideOverlayDivs();
	showContent();
}
