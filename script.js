import textToSpeech from "./voicerss-tts.min.js";
const button = document.querySelector("#btn");
export const audioElement = document.querySelector("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellJoke(joke) {
  textToSpeech.speech({
    key: "9e68d6f69f1a45ae8c129a66562a3c27",
    src: joke.trim().replace(/ /g, "%20"),
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
  });
}

async function getJoke() {
  let joke = "";
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist"
    );
    const data = await response.json();
    if (data.type === "twopart") {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellJoke(joke);
    toggleButton();
  } catch (error) {
    console.error("whoops", error);
  }
}

button.addEventListener("click", getJoke);
audioElement.addEventListener("ended", toggleButton);
