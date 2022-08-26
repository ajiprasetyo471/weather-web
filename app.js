window.addEventListener('load', () => {
  let lon, lat;
  const temperatureDegree = document.querySelector('.temperature-degree');
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const locationTimezone = document.querySelector('.location-timezone');
  const temperatureSection = document.querySelector('.temperature-section');
  const temperatureSpan = document.querySelector('.temperature-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const API_KEY = 'U3ZA3QTB3WQRWMVVJEDMWUPKJ';
      const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat}%2C${lon}?unitGroup=metric&include=hours%2Ccurrent&key=${API_KEY}&contentType=json`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp, conditions, icon } = data.currentConditions;
          const timezone = data.timezone;

          temperatureDegree.textContent = temp;
          temperatureDescription.textContent = conditions;
          locationTimezone.textContent = timezone;

          let fahrenheit = temp * (9 / 5) + 32;

          setIcons(icon, document.querySelector('.icon'));

          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'C') {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = fahrenheit;
            } else {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = temp;
            }
          });
        });
    });
  }

  const setIcons = (icon, iconID) => {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  };
});
