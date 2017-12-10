const API_BASE = "https://api.nasa.gov/mars-photos/api/v1",
	API_KEY = `api_key=${window.API_KEY ? window.API_KEY : "DEMO_KEY"}`;

function requestPhotos(e) {
	e.preventDefault();
	clearTable();
	let rover = e.target[0].value,
		earthDate = e.target[1].value;

	if (!earthDate) return showErrorMsg("No Earth Date Selected");
	spinnerOn();

	// Call Mars Rover API for photos
	fetch(`${API_BASE}/rovers/${rover}/photos?earth_date=${earthDate}&page=1&${API_KEY}`)
		.then(function(response) {
			return response.json();
		})
		.then(function(response) {
			spinnerOff();
			if (response.photos) {
				return response;
			}

			throw new Error(
				response.error ? response.error.message : "Network response was not ok"
			);
		})
		.then(function(response) {
			constructTable(response.photos, rover, earthDate);
		})
		.catch(function(error) {
			spinnerOff();
			showErrorMsg(`Error from Mars Rover API: <span>${error.message}</span>`);
			console.log(`Error: ${error.message}`);
		});
}

function requestManifests(rovers, calendar) {
	Object.keys(rovers).map(function(rover) {
		// Call Mars Rover API for manifests
		fetch(`${API_BASE}/manifests/${rover}/?${API_KEY}`)
			.then(function(response) {
				return response.json();
			})
			.then(function(response) {
				if (response.photo_manifest) {
					return response;
				}

				throw new Error(
					response.error ? response.error.message : "Network response was not ok"
				);
			})
			.then(function(response) {
				let info = response.photo_manifest;
				rovers[rover] = {
					minDate: info.landing_date,
					maxDate: info.max_date
				};

				if (rover === document.getElementById("rovers").value) {
					setDateRange(null, rover, calendar, rovers);
					let roverName = rover.replace(/\w\S*/g, capitalizeWord),
						formattedDate = calendar.formatDate(
							calendar.parseDate(rovers[rover].maxDate),
							"F j, Y"
						);

					document.getElementById("suggestedSearch").innerHTML = `
						Try searching for
						<span>${roverName}</span> on 
						<span>${formattedDate}</span>
					`;
				}
			})
			.catch(function(error) {
				showErrorMsg(`Error from Mars Rover API: <span>${error.message}</span>`);
				console.log(`Error: ${error.message}`);
			});
	});

	return rovers;
}
