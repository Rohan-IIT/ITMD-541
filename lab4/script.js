function errorAlert(errorMessage) {
    document.getElementById('errorDisplay').classList.remove('hidden');
    document.getElementById('errorText').innerHTML = errorMessage;
    document.getElementById('dashboard').classList.add('hidden');
}


function getSunriseSunsetData(latitude, longitude) {
    var todaysDate = new Date();
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${todaysDate}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Update your dashboard with the sunrise/sunset data
            document.querySelector('#sunriseToday').innerHTML = data.results.sunrise;
            document.querySelector('#sunsetToday').innerHTML = data.results.sunset;
            // Add more elements as needed for dawn, dusk, day length, solar noon, and time zone

            document.querySelector('#sunriseToday').innerHTML = data.results.sunrise
            document.querySelector('#sunsetToday').innerHTML = data.results.sunset
            document.querySelector('#dawnToday').innerHTML = data.results.dawn
            document.querySelector('#duskToday').innerHTML = data.results.dusk
            document.querySelector('#dayLengthToday').innerHTML = data.results.day_length
            document.querySelector('#solarNoonToday').innerHTML = data.results.solar_noon
            document.querySelector('#timeZoneToday').innerHTML = data.results.timezone

            // Show the dashboard
            document.getElementById('dashboard').classList.remove('hidden');
            document.getElementById('errorDisplay').classList.add('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors and display a message to the user
            errorAlert('Error fetching sunrise/sunset data. Please try again.');
            // alert('Error fetching sunrise/sunset data. Please try again.');
        });

    function convertDate(date) {
        var yyyy = date.getFullYear().toString();
        var mm = (date.getMonth() + 1).toString();
        var dd = (date.getDate() + 2).toString();

        var mmChars = mm.split('');
        var ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
    }

    const tomorrowDate = convertDate(todaysDate)
    const url2 = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${tomorrowDate}`;

    fetch(url2)
        .then(response => response.json())
        .then(data2 => {
            // Update your dashboard with the sunrise/sunset data
            document.querySelector('#sunriseTomorrow').innerHTML = data2.results.sunrise;
            document.querySelector('#sunsetTomorrow').innerHTML = data2.results.sunset;
            // Add more elements as needed for dawn, dusk, day length, solar noon, and time zone

            document.querySelector('#sunriseTomorrow').innerHTML = data2.results.sunrise
            document.querySelector('#sunsetTomorrow').innerHTML = data2.results.sunset
            document.querySelector('#dawnTomorrow').innerHTML = data2.results.dawn
            document.querySelector('#duskTomorrow').innerHTML = data2.results.dusk
            document.querySelector('#dayLengthTomorrow').innerHTML = data2.results.day_length
            document.querySelector('#solarNoonTomorrow').innerHTML = data2.results.solar_noon
            document.querySelector('#timeZoneTomorrow').innerHTML = data2.results.timezone
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors and display a message to the user
            errorAlert('Error fetching sunrise/sunset data. Please try again.');
            // alert('Error fetching sunrise/sunset data. Please try again.');
        });
}

function getGeolocation() {
    const cityNameInput = document.getElementById('cityName');
    const cityName = cityNameInput.value.trim();

    if (cityName === '') {
        // Handle the case where the user didn't enter a city name
        errorAlert('Please enter a city name.');
        // alert('Please enter a city name.');
        return;
    }

    const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(cityName)}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                // Handle the case where there are no results for the entered city name
                let errorString = 'No location found for the entered city name. Please try entering a correct name.';
                errorAlert(errorString);
                document.getElementById('dashboard').classList.add('hidden');
                // alert('No location found for the entered city name. Please try entering a correct name.');
                // Reset the input field to be blank
                cityNameInput.value = '';
                return;
            }

            // Use the first result from the geocode API
            const firstResult = data[0];

            if (firstResult && firstResult.lat && firstResult.lon) {
                const latitude = firstResult.lat;
                const longitude = firstResult.lon;

                // Call the function to get sunrise/sunset data
                getSunriseSunsetData(latitude, longitude);
                addTextToParagraph(cityName)
                // Reset the input field to be blank
                cityNameInput.value = '';
            } else {
                // Handle the case where geocode API response is not as expected
                console.error('Invalid geocode API response');
                errorAlert('Error getting geolocation data. Please try again.');
                // alert('Error getting geolocation data. Please try again.');
            }
        })
        .catch(error => {
            console.error('Geocode API Error:', error);
            // Handle geocode API errors and display a message to the user
            errorAlert('Error getting geolocation data. Please try again.');
            document.getElementById('dashboard').classList.add('hidden');
            // alert('Error getting geolocation data. Please try again.');
        });
}


function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const cityName = "Chicago"
            // Call the function to get sunrise/sunset data
            getSunriseSunsetData(latitude, longitude);
            addTextToParagraph(cityName)
        }, error => {
            console.error('Geolocation error:', error);
            // Handle geolocation errors and display a message to the user
            errorAlert('Error getting current location. Please try again.')
            document.getElementById('dashboard').classList.add('hidden');
            // alert('Error getting current location. Please try again.');
        });
    } else {
        // Geolocation is not supported
        errorAlert('Geolocation is not supported by your browser.')
        document.getElementById('dashboard').classList.add('hidden');
        // alert('Geolocation is not supported by your browser.');
    }
}


function imagesCity() {

    const cityNameInput = document.getElementById('cityName');
    var cityName = cityNameInput.value.trim();

    if (cityName === '') {
        cityName = "Chicago"
    }
    const API_key = "1ujYwpIHKGdagzt9zZeRAhTbrf7v1HvCC8BiIB8Qd4m2678zdz21MhPr";

    var xhr = new XMLHttpRequest();
    var url = "https://api.pexels.com/v1/search?query=" + cityName + " city&orientation=landscape&per_page=9andpage=1";

    xhr.open("GET", url, true);

    xhr.setRequestHeader("Authorization", API_key);

    xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {
            // Check if the request was successful
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);

                var photoContainer = document.getElementById("photoContainer");

                // Clear existing images
                photoContainer.innerHTML = "";

                data.photos.forEach(photo => {
                    var imageElement = document.createElement("img");
                    imageElement.src = photo.src.original;
                    imageElement.alt = "Photo";

                    imageElement.style.width = "calc(33.33% - 20px)"; // Adjust this based on your layout
                    imageElement.style.height = "auto";
                    imageElement.style.borderRadius = "10px";

                    // Append each image to the container div
                    photoContainer.appendChild(imageElement);
                });

            } else {
                console.log("Error:", xhr.status, xhr.statusText);
            }
        }
    };

    xhr.send();
}


function addTextToParagraph(text) {
    // Get the paragraph element by its ID
    var myParagraph = document.getElementById("cityNameText");
  
    // Check if the paragraph element exists
    if (myParagraph) {
      // Add the provided text to the paragraph
      myParagraph.innerHTML = text;
    } else {
      console.error("Element with ID 'myParagraph' not found");
    }
  }
  