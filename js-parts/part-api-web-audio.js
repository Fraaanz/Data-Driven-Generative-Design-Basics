var yourObject;
var yourObjects = document.getElementsByTagName('p');

var soundAllowed = function (stream) {

  window.persistAudioStream = stream;
  var audioContent = new AudioContext();
  var audioStream = audioContent.createMediaStreamSource(stream);
  var analyser = audioContent.createAnalyser();
  audioStream.connect(analyser);
  analyser.fftSize = 1024;
  var frequencyArray = new Uint8Array(analyser.frequencyBinCount);

  // Through the frequencyArray has a length longer than 255, there seems to be no significant data after this point. Not worth visualizing.

  for (var i = 0; i < 255; i++) {

    yourObject = document.createElement("P");
    yourObject.innerText = "This is one of your Objects";
    document.body.appendChild(yourObject);

  }

  var animation = function () {

    // slow down fps for more performance
    var fps = 10;
    setTimeout(() => {
      requestAnimationFrame(animation);
    }, 1000 / fps);

    analyser.getByteFrequencyData(frequencyArray);
    var adjustedLength;

    // this loop modifies your objects
    for (var i = 0; i < 255; i++) {

      adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
      yourObjects[i].innerText = adjustedLength;
      yourObjects[i].style.backgroundColor = 'rgb(' + adjustedLength + ',122,' + adjustedLength + ')';

    }

  }

  animation();

}

var soundNotAllowed = function (error) {
  h.innerHTML = "You must allow your microphone.";
  console.log(error);
}
navigator.getUserMedia({ audio: true }, soundAllowed, soundNotAllowed);