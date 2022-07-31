

/*  createShowRow builds a show row node and returns
    ex. HTML below:
    // I would like to keep this comment for my reference

    <div class="shows-section__details-wrapper">
        <div class="shows-section__details-container">
            <p class="shows-section__sub-title">DATE</p>
            <p class="shows-section__date shows-section__text">
            Mon Sept 06 2021
            </p>
        </div>

        <div class="shows-section__details-container">
            <p class="shows-section__sub-title">VENUE</p>
            <p class="shows-section__venue shows-section__text">
            Ronald Lane
            </p>
        </div>

        <div class="shows-section__details-container">
            <p class="shows-section__sub-title">LOCATION</p>
            <p class="shows-section__location shows-section__text">
            San Francisco, CA
            </p>
        </div>
        <div class="shows-section__details-container">
            <button class="button">BUY TICKETS</button>
        </div>
    </div> 
*/
function createShowRow(show) {
  const date = new Date(show.date / 1);
  const formattedDate = date.toDateString();

  // Create Date Column
  const dateSubtitle = document.createElement("p");
  dateSubtitle.classList.add("shows-section__sub-title");
  dateSubtitle.innerHTML = "DATE";

  const dateText = document.createElement("p");
  dateText.classList.add("shows-section__date", "shows-section__text");
  dateText.innerHTML = formattedDate;

  const dateContainer = document.createElement("div");
  dateContainer.classList.add("shows-section__details-container");
  dateContainer.appendChild(dateSubtitle);
  dateContainer.appendChild(dateText);

  // Create Venue Column
  const venueSubtitle = document.createElement("p");
  venueSubtitle.classList.add("shows-section__sub-title");
  venueSubtitle.innerHTML = "VENUE";

  const venueText = document.createElement("p");
  venueText.classList.add("shows-section__venue", "shows-section__text");
  venueText.innerHTML = show.place;

  const venueContainer = document.createElement("div");
  venueContainer.classList.add("shows-section__details-container");
  venueContainer.appendChild(venueSubtitle);
  venueContainer.appendChild(venueText);

  // Create Location Column
  const locationSubtitle = document.createElement("p");
  locationSubtitle.classList.add("shows-section__sub-title");
  locationSubtitle.innerHTML = "LOCATION";

  const locationText = document.createElement("p");
  locationText.classList.add("shows-section__location", "shows-section__text");
  locationText.innerHTML = show.location;

  const locationContainer = document.createElement("div");
  locationContainer.classList.add("shows-section__details-container");
  locationContainer.appendChild(locationSubtitle);
  locationContainer.appendChild(locationText);

  // Create Button Column
  const buyTicketsButton = document.createElement("button");
  buyTicketsButton.classList.add("button");
  buyTicketsButton.innerHTML = "BUY TICKETS";

  const buttonContainer = document.createElement("div");
  locationContainer.classList.add("shows-section__details-container");
  buttonContainer.appendChild(buyTicketsButton);

  // Generates final object
  const detailsWrapper = document.createElement("div");
  detailsWrapper.classList.add("shows-section__details-wrapper");
  detailsWrapper.appendChild(dateContainer);
  detailsWrapper.appendChild(venueContainer);
  detailsWrapper.appendChild(locationContainer);
  detailsWrapper.appendChild(buttonContainer);

  return detailsWrapper;
}

// Hold the currently selected show row
let selectedShowRow = null;

// handleShowOnClick selects the row
function handleShowOnClick(event) {
  if (selectedShowRow !== null) {
    selectedShowRow.classList.remove("active");
  }

  selectedShowRow = event.currentTarget;
  selectedShowRow.classList.add("active");
}

// Step 1: register api key

let apiKey;

document.addEventListener("DOMContentLoaded", (event) => {
  axios
    .get("https://project-1-api.herokuapp.com/register")
    .then((result) => {
      apiKey = result.data["api_key"];

      // step 2: GET request and append show data

      axios
        .get("https://project-1-api.herokuapp.com/showdates?api_key=" + apiKey)
        .then((result) => {
          showData = result.data;
          const showContainer = document.getElementById("shows-container");

          for (let i = 0; i < showData.length; i++) {
            const newShow = createShowRow(showData[i]);
            newShow.addEventListener("click", handleShowOnClick);
            showContainer.appendChild(newShow);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});
