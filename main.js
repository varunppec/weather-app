(()=>{"use strict";const e=async function(e,i){try{const o=await fetch("http://api.openweathermap.org/data/2.5/weather?q="+e+"&APPID=c6d173aa27f915a5ce2336f7f0768442",{mode:"cors"}),c=await o.json();if(console.log(c),c.cod>300)throw"error";if(localStorage.setItem("name",c.name),"celsius"==i)return{description:c.weather[0].description,name:c.name,country:c.sys.country,temp:t(c.main.temp)+" °C",feelslike:t(c.main.feels_like)+" °C",humidity:c.main.humidity,wind:c.wind.speed,id:c.weather[0].icon};if("fahr"==i)return{description:c.weather[0].description,name:c.name,country:c.sys.country,temp:n(t(c.main.temp))+" °F",feelslike:n(t(c.main.feels_like))+" °F",humidity:c.main.humidity,wind:c.wind.speed,id:c.weather[0].icon}}catch{return window.alert("error"),"error"}},t=function(e){return Math.round(10*(e-273.15))/10},n=function(e){return Math.round(10*(1.8*e+32))/10},i=function(e){const t=document.querySelector("#container"),n=document.createElement("div");n.id="info";const i=document.createElement("div");i.id="general";const o=document.createElement("div");o.id="description",o.innerText=e.description;const c=document.createElement("div");c.id="location",c.innerText=e.name+", "+e.country,i.append(o,c);const d=document.createElement("div");d.id="advanced";const r=document.createElement("div");r.id="temp",r.innerText=e.temp;const a=document.createElement("div");a.id="details";const m=document.createElement("div");m.innerText="Feels like: "+e.feelslike;const s=document.createElement("div");s.innerText="Humidity: "+e.humidity;const l=document.createElement("div");l.innerText="Wind: "+e.wind;const u=document.createElement("img");u.src="http://openweathermap.org/img/wn/"+e.id+"@2x.png",u.id="image",o.append(u),a.append(m,s,l),d.append(r,a),n.append(i,d),n.style.opacity="0",setTimeout((function(){n.style.opacity="1"}),0),t.append(n)},o=function(){const e=document.querySelector("#info");e&&e.parentElement.removeChild(e)};!async function(t){const n=document.querySelector("#header"),c=document.createElement("div");c.id="heading",c.innerText="Weather App";const d=document.createElement("input");d.id="input",d.addEventListener("keydown",(function(t){!async function(t,n){if(n&&"Enter"==t.key){const t=document.querySelector(".toggled").id;let c=await e(n,t);"error"!=c&&c&&(o(),i(c))}}(t,d.value)}));const r=document.createElement("button");r.id="toggle";const a=document.createElement("span"),m=document.createElement("span");a.id="celsius",a.classList.add("toggled"),m.id="fahr",a.innerText="°C",m.innerText="°F",r.onclick=async function(){a.classList.toggle("toggled"),m.classList.toggle("toggled"),o();const t=document.querySelector(".toggled").id;let n=await e(localStorage.getItem("name"),t);"error"!=n&&n&&i(n)};const s=await e("London","celsius");i(s),r.prepend(a,m),n.append(c,d,r)}()})();