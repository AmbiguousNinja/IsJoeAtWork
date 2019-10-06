// Constants
const MS_IN_DAY = 1000 * 24 * 60 * 60;
const referenceDate = new Date(2019, 7, 20);

function Duration(ms) {
	this.seconds = Math.floor(ms / 1000) % 60;
	this.minutes = Math.floor(ms / (1000 * 60)) % 60;
	this.hours = Math.floor(ms / (1000 * 60 * 60)) % 60;
}

const status = document.getElementById('work-status');
const timestamp = document.getElementById('timestamp');

var loop = setInterval(function () {
	const now = new Date();
	const cycleIndex = workCycleIndex(now);
 	const hours = now.getHours();

	if (cycleIndex > 4) {
		const offset = 8 - cycleIndex;

		const diffDate = offsetDate(now, offset);
		diffDate.setHours(7, 0, 0);
		updateLabels(false, diffDate - now);
	} else if (cycleIndex == 4) {
		if (hours < 7) {
			const diffDate = new Date(now);
			diffDate.setHours(7, 0, 0);
			updateLabels(true, diffDate - now);
		} else {
			const diffDate = offsetDate(now, 4);
			diffDate.setHours(7, 0, 0);
			updateLabels(false, diffDate - now);
		}
	} else if (cycleIndex == 3) {
		if (hours < 19 && hours >= 7) {
			const diffDate = new Date(now);
			diffDate.setHours(19, 0, 0);
			updateLabels(false, diffDate - now);
		} else if (hours >= 19) {
			const diffDate = offsetDate(now, 1);
			diffDate.setHours(7, 0, 0);
			updateLabels(true, diffDate - now);
		} else {
			const diffDate = new Date(now);
			diffDate.setHours(7, 0, 0);
			updateLabels(true, diffDate - now);
		}
	} else if (cycleIndex == 2) {
		if (hours >= 19) {
			const diffDate = offsetDate(now, 1);
			diffDate.setHours(7, 0, 0);
			updateLabels(true, diffDate - now);
		} else if (hours < 19  && hours >= 7) {
			const diffDate = new Date(now);
			diffDate.setHours(19, 0, 0);
			updateLabels(false, diffDate - now);
		} else {
			const diffDate = new Date(now);
			diffDate.setHours(7, 0, 0);
			updateLabels(true, diffDate - now);
		}
	} else if (cycleIndex == 1) {
		if (hours < 7) {
			const diffDate = new Date(now);
			diffDate.setHours(7, 0, 0);
			updateLabels(false, diffDate - now);
		} else if (hours >= 19) {
			const diffDate = new Date(now);
			diffDate.setHours(19, 0, 0);
			updateLabels(false, diffDate - now);
		} else {
			const diffDate = new Date(now);
			diffDate.setHours(19, 0, 0);
			updateLabels(true, diffDate - now);
		}
	} else {
		if (hours < 7) {
			const diffDate = new Date(now);
			diffDate.setHours(7, 0, 0);
			updateLabels(false, diffDate - now);
		} else if (hours >= 19) {
			const diffDate = offsetDate(now, 1);
			diffDate.setHours(7, 0, 0);
			updateLabels(false, diffDate - now);
		} else {
			const diffDate = new Date(now);
			diffDate.setHours(19, 0, 0);
			updateLabels(true, diffDate - now);
		}
	}
}, 1000);

// Methods =====================================================================
function updateLabels(isWorking, delta) {
	if (isWorking) {
		status.innerHTML = "Yes, Joe is at work!";
		timestamp.innerHTML = "He'll be done in " + durationString(delta);
	} else {
		status.innerHTML = "Nope, Joe isn't at work!";
		timestamp.innerHTML = "His next shift will be in " + durationString(delta);
	}
}

// Returns the date offset from today
function offsetDate(date, offsetDays) {
	var offsetDate = new Date(date);
	offsetDate.setDate(offsetDate.getDate() + offsetDays);
	return offsetDate;
}

// Returns the date in workCycle
function workCycleIndex(date) {
	var diffDate = new Date(date);
	diffDate.setHours(0, 0, 0, 0)	// Set to midnight
	const diff = Math.ceil(((diffDate - referenceDate)/MS_IN_DAY));
	return diff % 8;
}

// Converts a duration to a duration string
function durationString(ms) {
	const duration = new Duration(ms);
	return duration.hours + " hours " + duration.minutes + " minutes " + duration.seconds + " seconds";
}