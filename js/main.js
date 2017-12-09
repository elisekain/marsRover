document.addEventListener("DOMContentLoaded", function() {
	const API_BASE = "https://api.nasa.gov/mars-photos/api/v1",
		API_KEY = `api_key=${window.config ? window.config.API_KEY : "DEMO_KEY"}`;

	let rovers = {
		curiosity: null,
		opportunity: null,
		spirit: null
	};

	requestManifests();

	let today = new Date();
	let calendar = flatpickr("#earthDate", {
		altInput: true,
		minDate: new Date("January 1, 2004 0:0:00"),
		maxDate: today
	});

	document.getElementById("searchForPhotos").addEventListener("submit", requestPhotos);
	document.getElementById("rovers").addEventListener("change", setDateRange);

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
				spinnerOff();
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
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

	function constructTable(photos, rover, earthDate) {
		// If no photos found, show error message
		if (!photos.length) {
			rover = rover.replace(/\w\S*/g, capitalizeWord);

			let errorMsg = `
				No Photos Found for 
				<span>${rover}</span> on 
				<span>${earthDate}</span>
			`;

			return showErrorMsg(errorMsg);
		}

		// Otherwise, construct table of photos
		let table = document.getElementById("photoTable");
		let tableBody = document.getElementById("photoTableBody");
		let blankState = document.getElementById("blankState");
		tableBody.innerHTML = "";

		photos.map(function(photo) {
			tableBody.innerHTML += `
			<tr>
				<td class="col-4">${photo.id}</td>
				<td class="col-4">${photo.sol}</td>
				<td class="col-4">
					<a href=${photo.img_src} target="_blank">
						<img src=${photo.img_src} alt="${rover} rover picture ${photo.id}"/>
					</a>
				</td>
			</tr>
			`;
		});

		table.style.display = "table";
		blankState.style.display = "none";
	}

	function capitalizeWord(w) {
		return w.charAt(0).toUpperCase() + w.substr(1);
	}

	function showErrorMsg(error) {
		let errorMsg = document.getElementById("errorMsg");
		errorMsg.innerHTML = error;
		errorMsg.style.display = "block";
	}

	function hideErrorMsg() {
		let errorMsg = document.getElementById("errorMsg");
		errorMsg.style.display = "none";
	}

	function clearTable() {
		hideErrorMsg();
		let table = document.getElementById("photoTable");
		let blankState = document.getElementById("blankState");

		table.style.display = "none";
		blankState.style.display = "block";
	}

	function requestManifests() {
		Object.keys(rovers).map(function(rover) {
			// Call Mars Rover API for manifests
			fetch(`${API_BASE}/manifests/${rover}/?${API_KEY}`)
				.then(function(response) {
					if (response.ok) {
						return response.json();
					}
					throw new Error("Network response was not ok.");
				})
				.then(function(response) {
					let info = response.photo_manifest;
					rovers[rover] = {
						minDate: info.landing_date,
						maxDate: info.max_date
					};

					if (rover === document.getElementById("rovers").value) {
						setDateRange(null, rover);
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
	}

	function setDateRange(e, roverName) {
		if (e) roverName = e.target.value;
		if (!roverName) return;

		// Based on rover manifest, set minDate, maxDate and date selected
		calendar.set("minDate", new Date(rovers[roverName].minDate).fp_incr(1));
		calendar.set("maxDate", new Date(rovers[roverName].maxDate).fp_incr(1));
		calendar.setDate(new Date(rovers[roverName].maxDate).fp_incr(1));
	}

	function spinnerOn() {
		document.getElementById("searchIcon").style.display = "none";
		document.getElementById("loadIcon").style.display = "inline-block";
	}

	function spinnerOff() {
		document.getElementById("searchIcon").style.display = "inline-block";
		document.getElementById("loadIcon").style.display = "none";
	}
});
