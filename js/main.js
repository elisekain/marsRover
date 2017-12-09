document.addEventListener("DOMContentLoaded", function() {
	flatpickr("#earthDate", {});

	document.getElementById("searchForPhotos").addEventListener("submit", function(e) {
		e.preventDefault();
		const API_BASE = "https://api.nasa.gov/mars-photos/api/v1/rovers",
			API_KEY = "api_key=DEMO_KEY";

		let rover = e.target[0].value,
			earthDate = e.target[1].value;

		// Call Mars Rover API
		fetch(`${API_BASE}/${rover}/photos?earth_date=2017-12-07&page=1&${API_KEY}`)
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(function(response) {
				constructTable(response.photos, rover);
			})
			.catch(function(error) {
				console.log(`Error: ${error.message}`);
			});
	});

	function constructTable(photos, rover) {
		let table = document.getElementById("photoTableBody");
		table.innerHTML = "";

		// Add row for each photo
		photos.map(function(photo) {
			table.innerHTML += `
			<tr>
				<td class="col-4">${photo.id}</td>
				<td class="col-4">${photo.sol}</td>
				<td class="col-4">
					<a href=${photo.img_src} target="_blank">
						<img src=${photo.img_src} alt="${rover} rover picture"/>
					</a>
				</td>
			</tr>
			`;
		});

		console.log(photos);
	}
});
