const getData = async function (name, e) {
  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        name +
        "&APPID=c6d173aa27f915a5ce2336f7f0768442",
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    if (data.cod > 300) {
      throw "error";
    }
    localStorage.setItem("name", data.name);
    if (e == "celsius")
      return {
        description: data.weather[0].description,
        name: data.name,
        country: data.sys.country,
        temp: convertTempToC(data.main.temp) + " \xB0C",
        feelslike: convertTempToC(data.main.feels_like) + " \xB0C",
        humidity: data.main.humidity,
        wind: data.wind.speed,
        id: data.weather[0].icon
      };
    if (e == "fahr")
      return {
        description: data.weather[0].description,
        name: data.name,
        country: data.sys.country,
        temp: convertTempToF(convertTempToC(data.main.temp)) + " \xB0F",
        feelslike:
          convertTempToF(convertTempToC(data.main.feels_like)) + " \xB0F",
        humidity: data.main.humidity,
        wind: data.wind.speed,
        id: data.weather[0].icon
      };
  } catch {
    window.alert("error");
    return "error";
  }
};

const convertTempToC = function (temp) {
  return Math.round((temp - 273.15) * 10) / 10;
};

const convertTempToF = function (temp) {
  return Math.round((temp * 1.8 + 32) * 10) / 10;
};
export { getData };
