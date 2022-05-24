// Select DOM Items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");

const clickevt = document.getElementById("quote1");
const doublevt = document.getElementById("quote2");
const longtouch = document.getElementById("quote3");
const responsive1 = document.getElementById("quote4");
const responsive2 = document.getElementById("quote5");

const msg = document.getElementById("msg");
msg.innerText = "dave";

let speechAvailable = false;

//var synth = window.speechSynthesis;

var inputForm = document.querySelector("form");

var voiceSelect = document.querySelector("select");

var pitch = document.querySelector("#pitch");
var volume = document.querySelector("#volume");
var pitchValue = document.querySelector(".pitch-value");
var volumeValue = document.querySelector(".volume-value");
var rate = document.querySelector("#rate");
var rateValue = document.querySelector(".rate-value");

var voices = [];
var synth = window.speechSynthesis;

pitch.onchange = function() {
  pitchValue.textContent = pitch.value;
};
volume.onchange = function() {
  volumeValue.textContent = volume.value;
};

rate.onchange = function() {
  rateValue.textContent = rate.value;
};
if ("speechSynthesis" in window) {
  // Synthesis support. Make your web apps talk!
  msg.innerText = "speech will work";
  speechAvailable = true;
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
} else {
  msg.innerText = "Speech not available";
}

// Set Initial State Of Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    // Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    // Set Menu State
    showMenu = false;
  }
}

// listen for the long-press event
// longtouch.addEventListener("long-press", function(e) {
//   // stop the event from bubbling up
//   e.preventDefault();
//   console.log("Long touch ..");
//   let q1 = longtouch.getElementsByTagName("p")[0].innerHTML;
//   console.log(q1);
//   speakText(q1);
// });

clickevt.addEventListener("click", function(e) {
  // stop the event from bubbling up
  e.preventDefault();
  // console.log("click event ..");
  let q1 = clickevt.getElementsByTagName("p")[0].innerHTML;
  // console.log(q1);
  speakText(q1);
});

doublevt.addEventListener("dblclick", function(e) {
  // stop the event from bubbling up
  e.preventDefault();
  console.log("double click event ..");
  let q1 = doublevt.getElementsByTagName("p")[0].innerHTML;
  console.log(q1);
  speakText(q1);
});

responsive1.addEventListener("click", function(e) {
  // stop the event from bubbling up
  e.preventDefault();
  console.log("Responsive 1 ..");
  let q1 = responsive1.getElementsByTagName("p")[0].innerHTML;
  console.log(q1);
  responsiveVoice.setDefaultVoice("US English Male");
  responsiveVoice.speak(q1);
  if (responsiveVoice.isPlaying()) {
    console.log("I hope you are listening");
  }
});
responsive2.addEventListener("click", function(e) {
  // stop the event from bubbling up
  e.preventDefault();
  console.log("Responsive 2 ..");
  let q1 = responsive2.getElementsByTagName("p")[0].innerHTML;
  console.log(q1);
  console.log(responsiveVoice.getVoices());
  responsiveVoice.setDefaultVoice("US English Female");
  responsiveVoice.speak(q1);
  if (responsiveVoice.isPlaying()) {
    console.log("I hope you are listening");
  }
});

function populateVoiceList() {
  voices = synth.getVoices();
  for (i = 0; i < voices.length; i++) {
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }
}

// speak text
function speak(textToSpeech) {
  var synUtterance = new SpeechSynthesisUtterance(textToSpeech);
  if (voiceSelect.value) {
    synUtterance.voice = speechSynthesis.getVoices().filter(function(voice) {
      return voice.name == voiceSelect.value;
    })[0];
  }
  synUtterance.lang = "en-US";
  synUtterance.volume = parseFloat(volume.value);
  synUtterance.rate = parseFloat(rate.value);
  synUtterance.pitch = parseFloat(pitch.value);

  const eventList = [
    "start",
    "end",
    "mark",
    "pause",
    "resume",
    "error",
    "boundary"
  ];
  eventList.forEach(event => {
    synUtterance.addEventListener(event, speechSynthesisEvent => {
      console.log(
        `Fired '${speechSynthesisEvent.type}' event at time '${
          speechSynthesisEvent.elapsedTime
        }' and character '${speechSynthesisEvent.charIndex}'.`
      );
    });
  });
  window.speechSynthesis.speak(synUtterance);
}

function speakText(msgTxt) {
  if (speechAvailable) {
    speechAvailable = false;
    console.log("Speak ... " + msgTxt);
    //synth.cancel();
    var utterThis = new SpeechSynthesisUtterance(msgTxt);
    utterThis.pitch = pitch.value;
    utterThis.rate = rate.value;
    utterThis.volume = volume.value;
    //utterThis.lang = "en-US";

    var selectedOption = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        utterThis.lang = voices[i].lang;
      }
    }
    utterThis.onend = function(event) {
      console.log("Finished in " + event.elapsedTime + " seconds.");
      speechAvailable = true;
      synth.cancel();
    };
    utterThis.onstart = function(event) {
      console.log("start in " + event.elapsedTime + " seconds.");
    };
    utterThis.onerror = function(event) {
      console.log("error ");
      console.log(event);
    };

    console.log(utterThis);
    synth.speak(utterThis);

    speechAvailable = true;
  }
}
var delay;

// Set number of milliseconds for longpress
var longpress = 1000;

var listItems = document.getElementsByClassName("long-item");
var listItem;

for (var i = 0, j = listItems.length; i < j; i++) {
  listItem = listItems[i];

  listItem.addEventListener(
    "mousedown",
    function(e) {
      var _this = this;
      delay = setTimeout(check, longpress);
      function check() {       
        let q1 = longtouch.getElementsByTagName("p")[0].innerHTML;
        console.log(q1);
        speakText(q1);
      }
    },
    true
  );

  listItem.addEventListener("mouseup", function(e) {
    // On mouse up, we know it is no longer a longpress
    clearTimeout(delay);
  });

  listItem.addEventListener("mouseout", function(e) {
    clearTimeout(delay);   
  });
}


