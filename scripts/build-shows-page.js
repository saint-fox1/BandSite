const initialShowData = [
  {
    date: new Date("September 6, 2021"),
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Tue Sept 21 2021"),
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Fri Oct 15 2021"),
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Sat Nov 06 2021"),
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Fri Nov 26 2021"),
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: new Date("Wed Dec 15 2021"),
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

// Hold the currently selected show row
let selectedShowRow = null;

/*  addShowRow adds a show row into the show section in the DOM
    ex. HTML below:

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
  const formattedDate = show.date.toDateString();

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
  venueText.innerHTML = show.venue;

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

  // Add to DOM
  const detailsWrapper = document.createElement("div");
  detailsWrapper.classList.add("shows-section__details-wrapper");
  detailsWrapper.appendChild(dateContainer);
  detailsWrapper.appendChild(venueContainer);
  detailsWrapper.appendChild(locationContainer);
  detailsWrapper.appendChild(buttonContainer);

  return detailsWrapper;
}

// handleShowOnClick toggles the row between active and inactive highlighting
function handleShowOnClick(event) {
  if (selectedShowRow !== null) {
    selectedShowRow.classList.remove("active");
  }

  selectedShowRow = event.currentTarget;
  selectedShowRow.classList.add("active");
}

// onload populate page with data and attatch click listeners
document.addEventListener("DOMContentLoaded", (event) => {
  const showContainer = document.getElementById("shows-container");

  for (let i = 0; i < initialShowData.length; i++) {
    const newShow = createShowRow(initialShowData[i]);
    newShow.addEventListener("click", handleShowOnClick);
    showContainer.appendChild(newShow);
  }
});
