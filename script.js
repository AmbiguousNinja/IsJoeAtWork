const shift = {
	NONE	: 0,
	DAY 	: 1,
	NIGHT 	: 2
};

// Constants
const MS_IN_DAY = 1000 * 24 * 60 * 60;
const referenceDate = new Date(2021, 0, 23);

const status = document.getElementById('work-status');
const timestamp = document.getElementById('timestamp');
const label1 = document.getElementById('label1');

doThing();

function doThing() {
    cycleIndex = cycleIndex(daysSinceStart());
    type = shiftType(cycleIndex);
    
    switch (type) {
        case shift.NONE:
            status.innerHTML = "Joe is not working today";
            break;
        case shift.DAY:
            status.innerHTML = "Joe is working a day shift today";
            break;
        case shift.NIGHT:
            status.innerHTML = "Joe is working a night shift today";
            break;
    }
}

function daysSinceStart() {
	ms = new Date() - referenceDate
	return Math.floor(ms/MS_IN_DAY);
}

function cycleIndex(days) {
	return days % 8;
}

function shiftType(cycleIndex) {
	if (cycleIndex > 3) {
		return shift.NONE;
	} else if (cycleIndex < 2) {
		return shift.DAY;
	} else {
		return shift.NIGHT;
	}
}
