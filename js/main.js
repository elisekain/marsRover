document.addEventListener("DOMContentLoaded", function() {
	// Initialize datepicker with default min/max dates
	let today = new Date();
	let calendar = flatpickr("#earthDate", {
		altInput: true,
		minDate: new Date("January 1, 2004 0:0:00"),
		maxDate: today
	});

	// Retrieve & store min/max dates for each rover
	let rovers = {
		curiosity: null,
		opportunity: null,
		spirit: null
	};

	rovers = requestManifests(rovers, calendar);

	// Set up event listeners
	document.getElementById("searchForPhotos").addEventListener("submit", requestPhotos);
	document.getElementById("marsRoverSVG").addEventListener("click", activateRover);
	document.getElementById("rovers").addEventListener("change", function(e) {
		setDateRange(e, null, calendar, rovers);
	});
});
