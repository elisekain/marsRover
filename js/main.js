document.addEventListener("DOMContentLoaded", function() {
	flatpickr("#earthDate", {});

	document.getElementById("searchForPhotos").addEventListener("submit", requestPhotos);

	function requestPhotos(e) {
		e.preventDefault();
		const API_BASE = "https://api.nasa.gov/mars-photos/api/v1/rovers",
			API_KEY = `api_key=${config.API_KEY}`;

		let rover = e.target[0].value,
			earthDate = e.target[1].value;

		// Clear any previous error messages or photos
		hideErrorMsg();
		clearTable();

		// Call Mars Rover API
		fetch(`${API_BASE}/${rover}/photos?earth_date=${earthDate}&page=1&${API_KEY}`)
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(function(response) {
				constructTable(response.photos, rover, earthDate);
			})
			.catch(function(error) {
				showErrorMsg(`Error from API: ${error.message}`);
				console.log(`Error: ${error.message}`);
			});
	}

	function constructTable(photos, rover, earthDate) {
		// If no photos found, show error message
		if (!photos.length) {
			rover = rover.replace(/\w\S*/g, function(w) {
				return w.charAt(0).toUpperCase() + w.substr(1);
			});

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

		console.log(photos);
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
		let table = document.getElementById("photoTable");
		let blankState = document.getElementById("blankState");

		table.style.display = "none";
		blankState.style.display = "block";
	}
});
