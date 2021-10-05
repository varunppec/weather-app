import { getData } from "./getdata";

const pageLoad = async function (initial) {
  const header = document.querySelector("#header");
  const heading = document.createElement("div");
  heading.id = "heading";
  heading.innerText = "Weather App";
  const input = document.createElement("input");
  input.id = "input";
  input.addEventListener("keydown", function (e) {
    onEnter(e, input.value);
  });

  const button = document.createElement("button");
  button.id = "toggle";
  //button.innerText = '\xB0C | \xB0F';
  const celsius = document.createElement("span");
  const fahr = document.createElement("span");
  celsius.id = "celsius";
  celsius.classList.add("toggled");
  fahr.id = "fahr";
  celsius.innerText = "\xB0C";
  fahr.innerText = "\xB0F";
  button.onclick = async function () {
    celsius.classList.toggle("toggled");
    fahr.classList.toggle("toggled");
    clearData();
    const toggle = document.querySelector(".toggled").id;
    let data = await getData(localStorage.getItem("name"), toggle);
    if (data != "error" && data) {
      fillData(data);
    }
  };
  const test = await getData(initial, "celsius");
  fillData(test);
  button.prepend(celsius, fahr);
  header.append(heading, input, button);
};

const onEnter = async function (e, name) {
  if (!name) return;
  if (e.key == "Enter") {
    const toggle = document.querySelector(".toggled").id;
    let data = await getData(name, toggle);
    if (data != "error" && data) {
      clearData();
      fillData(data);
    }
  }
};
const fillData = function (data) {
  const container = document.querySelector("#container");
  const div = document.createElement("div");
  div.id = "info";
  /*
  Object.values(data).forEach(function (x) {
    const field = document.createElement("div");
    field.innerText = x;
    div.append(field);
  });
  */
  const general = document.createElement("div");
  general.id = "general";
  const description = document.createElement("div");
  description.id = "description";
  description.innerText = data.description;
  const location = document.createElement("div");
  location.id = "location";
  location.innerText = data.name + ", " + data.country;
  general.append(description, location);

  const advanced = document.createElement("div");
  advanced.id = "advanced";
  const temp = document.createElement("div");
  temp.id = "temp";
  temp.innerText = data.temp;
  const details = document.createElement("div");
  details.id = "details";
  const feels = document.createElement("div");
  feels.innerText = "Feels like: " + data.feelslike;
  const humidity = document.createElement("div");
  humidity.innerText = "Humidity: " + data.humidity;
  const wind = document.createElement("div");
  wind.innerText = "Wind: " + data.wind;

  const img = document.createElement("img");
  img.src = "https://openweathermap.org/img/wn/" + data.id + "@2x.png";
  img.id = "image";
  description.append(img);

  details.append(feels, humidity, wind);
  advanced.append(temp, details);

  div.append(general, advanced);
  div.style.opacity = '0';
  setTimeout(function() {
    div.style.opacity = '1';
  }, 0);
  container.append(div);
};

const clearData = function () {
  const info = document.querySelector("#info");
  if (info) info.parentElement.removeChild(info);
};

pageLoad("London");
