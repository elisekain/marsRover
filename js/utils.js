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

function setDateRange(e, roverName, calendar, rovers) {
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

function activateRover() {
	document.getElementById("marsRoverSVG").classList.add("hideRover");
	document.getElementById("marsRoverDupe").classList.add("moveIt");

	setTimeout(function() {
		document.getElementById("marsRoverSVG").classList.remove("hideRover");
		document.getElementById("marsRoverDupe").classList.remove("moveIt");
	}, 5000);
}
