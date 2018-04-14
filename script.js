$(document).ready(function() {
  var random = [];
  var tweetArr = [];
  var quoteString = "";
  var authorString = "";
  var authorArr = [];
  var quoteArrWhole = [];
  var tweetPieces = 0;
  function twitterFormat(quoteString, authorString) {
    tweetArr = [];
    quoteArrWhole = [];
    var quoteArrParts = [0];
    var loopCount = 0;
    var charCount = 0;
    var j = 0; /* array place counter*/
    var k = 0;
    var shiftedWord = "";
    quoteString = quoteString + " -" + authorString;

    if (quoteString.length < 139) {
      tweetArr[0] = quoteString;
      tweetPieces = 1;
      return tweetArr;
    } else {
      quoteArrWhole = quoteString.split(" ");
      loopCount = quoteArrWhole.length;
    }
    for (i = 0; i < loopCount; i++) {
      shiftedWord = quoteArrWhole.shift();
      charCount =
        charCount +
        (shiftedWord.length +
          1); /*counting up to 130 chars going into quoteArrParts*/
      if (i == 0) {
        quoteArrParts[
          j
        ] = []; /*if the first time through the loop it initiates the first section of the quoteArrParts array*/
      }
      if (charCount >= 130) {
        /*if over char limit shift word back to quoteArrWhole, reset char counter, reset k (2nd demention array position marker), move up j (1st dimension array position marker), increase the loopCount for the word that was shifted back to the array, initiate the next section of the quoteArrParts*/
        charCount = charCount - (shiftedWord.length - 1);
        quoteArrWhole.unshift(shiftedWord);
        charCount = 0;
        k = 0;
        j++;
        loopCount++;
        quoteArrParts[j] = [];
      } else {
        /* adds the next word to the quoteArrParts, and moves up the k (the 2nd dimenson array postition marker)*/
        quoteArrParts[j][k] = shiftedWord;
        k++;
      }
    }

    loopCount =
      quoteArrParts.length; /*sets loopCount to the number of tweets needed for the quote*/

    for (i = 0; i < loopCount; i++) {
      quoteString = quoteArrParts[i].join(" ");
      if (i == loopCount - 1) {
        tweetArr[i] = "Pt " + (i + 1) + "/" + loopCount + " " + quoteString;
      } else {
        tweetArr[i] =
          "Pt " + (i + 1) + "/" + loopCount + " " + quoteString + "...";
      }
    }
    tweetPieces = loopCount;
    return tweetArr;
  }

  /*quote box fade in and out*/
  var opacityInterval;
  function boxFadeIn() {
    var opacity = 0.02;
    /*var opacityCounter = 0;*/
    opacityInterval = setInterval(function() {
      opacity = opacity + opacity * 0.2;
      if (opacity >= 1) {
        clearInterval(opacityInterval);
      }
      $(".quoteBox").css("opacity", opacity);
    }, 30);
  }

  function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  for (i = 0; i < 3; i++) {
    random[i] = getRandom(100, 200);
  }
  /*change background color*/
  $("body").css(
    "background",
    "rgb(" + random[0] + "," + random[1] + "," + random[2] + ")"
  );
  /*console.log(random);*/
  /*change font color*/
  $(".textColor").css(
    "color",
    "rgb(" +
      (random[0] - 25) +
      "," +
      (random[1] - 25) +
      "," +
      (random[2] - 25) +
      ")"
  );
  $(".textColor").css("font-family", "Helvetica");
  /*console.log(random);*/

  $("#tweetButton").click(function() {
    twitterFormat(quoteString, authorString);
    if (tweetPieces == 1) {
      window.open("https://twitter.com/intent/tweet?text=" + tweetArr[0]);
    } else {
      if (
        confirm(
          "This will be a " +
            tweetPieces +
            " part tweet. Multi-part tweets may be blocked as pop-ups. Do you want to continue?"
        )
      ) {
        for (i = 0; i < tweetPieces; i++) {
          if (i == 0) {
            window.open("https://twitter.com/intent/tweet?text=" + tweetArr[i]);
          } else {
            if (confirm("Post part " + tweetPieces + " of this quote?")) {
              window.open(
                "https://twitter.com/intent/tweet?text=" + tweetArr[i]
              );
            } else {
            }
          }
        }
      } else {
      }
    }
    /*
      console.log(tweetArr);
      console.log(tweetPieces);
      */
  });

  $.getJSON("https://talaikis.com/api/quotes/random/", function(quote) {
    quoteLength = quote.quote.length;
    authorLength = quote.author.length;
    quoteString = quote.quote;
    authorString = quote.author;
    boxFadeIn();
    $("#quote").replaceWith(
      "<p class='quoteText' id='quote'>" +
        "&quot" +
        quote.quote +
        "&quot" +
        "</p>"
    );
    $("#author").replaceWith(
      "<p class='quoteText' id='author'>— " + quote.author + "</p>"
    );
    twitterFormat(quoteString, authorString);
    console.log(tweetArr);
  });
  $("#quoteButton").on("click", function() {
    $.getJSON("https://talaikis.com/api/quotes/random/", function(quote) {
      quoteLength = quote.quote.length;
      authorLength = quote.author.length;
      quoteString = quote.quote;
      authorString = quote.author;
      boxFadeIn();
      /* Test of twitterFormat function*/
      twitterFormat(quoteString, authorString);

     /* console.log(tweetArr); */

      $("#quotebutton").addClass("animated shake");
      $("#quote").replaceWith(
        "<p class='quoteText' id='quote'>" +
          "&quot" +
          quote.quote +
          "&quot" +
          "</p>"
      );
      $("#author").replaceWith(
        "<p class='quoteText' id='author'>— " + quote.author + "</p>"
      );
    });

    /*random color changing background and text*/
    for (i = 0; i < 3; i++) {
      random[i] = getRandom(125, 225);
      /*console.log(random[i]);*/
    }
    $("body").css(
      "background",
      "rgb(" + random[0] + "," + random[1] + "," + random[2] + ")"
    );

    $(".textColor").css(
      "color",
      "rgb(" +
        (random[1] - 25) +
        "," +
        (random[2] - 25) +
        "," +
        (random[0] - 25) +
        ")"
    );
    $(".textColor").css("-webkit-text-stroke-color: black;");
  });
});
