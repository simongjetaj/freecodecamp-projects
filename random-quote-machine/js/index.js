$(document).ready(function() {
  getQuote();
  function getQuote() {
    const url =
      "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    $.getJSON(url, function(data) {
      $(".quote").html(data.quoteText);
      $(".author").html(data.quoteAuthor);
    });
  }

  $("#tweet").on("click", function() {
    let tweetQuote = $(".quote").text();
    let tweetAuthor = " - " + $(".author").text();
    window.open(
      "https://twitter.com/intent/tweet?hashtags=quotes&text=" +
        encodeURIComponent('"' + tweetQuote + '"' + tweetAuthor)
    );
  });
  $("#newQuote").on("click", function() {
    getQuote();
  });
});