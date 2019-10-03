const MS_IN_DAY = 1000 * 24 * 60 * 60;

const rootApp = document.getElementById('label');


rootApp.innerHTML = `${shift(modDays())}`


function modDays() {
	const referenceDate = new Date(2019, 7, 20);
	const diff = ((new Date() - referenceDate)/MS_IN_DAY) % 8;
	return Math.floor(diff);
}

function shift(modDay) {
	if (modDay > 3) {
		return "Joe does not work today";
	} else if (modDay > 1) {
		return "Joe is working a night shift today";
	} else if (modDay >= 0) {
		return "Joe is working a day shift today";
	} else {
		return "Joe is stretching";
	}
}

function buttonClick() {
	// rootApp.innerHTML = `${shift(modDays())}`
}