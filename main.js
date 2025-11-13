const input = document.querySelector("input");
const output = document.querySelector("#output");

input.addEventListener("change", async () => {
  output.innerHTML = "";
  const inputValue = input.value.trim();
  
    const fetchData = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${inputValue}&aqi=no`
    );
    const res = await fetchData.json();
   

    if (res?.error?.message) {
      output.innerHTML = "no location found";
    }
  

  const temp = document.createElement("p");
  temp.setAttribute("class", "temp");
  temp.textContent = ` ${res.current.temp_c}°C`;
  const feelLike = document.createElement("p");
  feelLike.setAttribute("class", "feel");
  feelLike.textContent = `feels like ${res.current.feelslike_c}°C`;
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  h1.textContent = res.location.name;
  div.append(h1, temp, feelLike);
  const img = document.createElement("img");
  img.setAttribute("class", "logo");

  if (res.current.temp_c < 10) {
    img.src = "animated/snowy-1.svg";
  }

  if (res.current.temp_c > 20) {
    img.src = "animated/day.svg";
  }

  if (
    res.current?.condition.text === "Mist" ||
    res.current?.condition.text === "Cloudy" ||
    res.current?.condition.text.includes("cloudy")
  ) {
    img.src = "animated/cloudy-day-1.svg";
  }

  if (res.current?.condition.text === "Clear") {
    img.src = "animated/night.svg";
  }

  output.append(img, div);
  input.value = "";
});
