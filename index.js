const core = require('@actions/core');
const github = require('@actions/github');

try {
	const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	const today = new Date().getDay();
	
	const blockedDays = core.getInput('blocked_days', { required: false }).replace('-', '').trim().toLowerCase();
	
	for(const dayLine of blockedDays.split("\n")) {
		for(let day of dayLine.split(",")) {
			day = day.trim();
			if((day === today.toString() || day === days[today])) { // if day is blocked
				if(!(isNaN(day) && isNaN(parseFloat(day)))) {
					day = days[day]; // If day is a number, convert it to the name of the day.
				}
				throw new Error(`The current workflow will be cancelled as it is not allowed to be run on a ${day[0].toUpperCase() + day.slice(1)}.`);
			}
		}
	}
	
} catch(error) {
	core.setFailed(error.message);
	core.setOutput("cancellation_reason", error.message);
	process.exit(1);
}

console.log("The current workflow was not run on a blocked weekday, so it will not be cancelled.");
