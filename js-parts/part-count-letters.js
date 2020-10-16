// 🔤 Count letters from a txt file ----------------------------------------

fetch('../sources/demo-data/demotext.txt').then(function (response) {
  response.text().then(function (myText) {
    var letterCountArray = [];

    // run letter count function 
    charCountAlphabet(myText);

    // display your text
    console.log('My text 📕 ' + myText);

    // display whats inside "letterCountArray"
    console.log('Letter counter 🔤 👉 ' + letterCountArray);

    // display every single value in "letterCountArray"
    for (var i = 0; i < letterCountArray.length; ++i) {
      console.log(' 👉 ' + letterCountArray[i])
    }

    // letter count function 
    function charCountAlphabet(textInput) {
      var letterCount;
      var j = 0;
      var alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
      ];
      for (var i = 0; i < alphabet.length; ++i) {
        charCountAlphabet(alphabet[i]);
        if ((alphabet.length / 2) > i) {
          letterCountArray.push(letterCount);
        }
        if ((alphabet.length / 2) <= i) {
          letterCountArray[j] = letterCountArray[j] + letterCount;
          j++
        }
      }
      function charCountAlphabet(alphabetChar) {
        letterCount = 0;
        for (var position = 0; position < textInput.length; position++) {
          if (textInput.charAt(position) == alphabetChar) {
            letterCount += 1;
          }
        }
        return letterCount;
      }
      return letterCountArray;
    }
  });
});