import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	private sleepStart:Date;
	private sleepEnd:Date;

	override kind:string = "overnightSleep";

	constructor(sleepStart:Date, sleepEnd:Date) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes";
	}

	override dateString():string {
		return "Between " + this.sleepStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
		 + " and " + this.sleepEnd.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
	}

	get totalTimeSleptMinutes() {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;

		return Math.floor(difference_ms / (1000*60));
	}

	// override get overnightSleepStartTime() {
	// 	var line:string = "";

	// 	var hours:number = this.sleepStart.getHours();
	// 	var AMPM:string = "am";
	// 	if (hours > 12)
	// 	{
	// 		hours -= 12;
	// 		AMPM = "pm";
	// 	}
	// 	else if (hours == 0)
	// 	{
	// 		hours = 12;
	// 	}

	// 	if (this.sleepStart.getMinutes() < 10)
	// 	{
	// 		line = `${hours}:0${this.sleepStart.getMinutes().toString()}${AMPM}`
	// 	}
	// 	else
	// 	{
	// 		line = `${hours}:${this.sleepStart.getMinutes().toString()}${AMPM}`
	// 	}
		
	// 	return line;
	// }

	// override get overnightSleepEndTime() {
	// 	var line:string = "";

	// 	var hours:number = this.sleepEnd.getHours();
	// 	// console.log(hours);
	// 	var AMPM:string = "am";
	// 	if (hours > 12)
	// 	{
	// 		hours -= 12;
	// 		AMPM = "pm";
	// 	}
	// 	else if (hours == 12)
	// 	{
	// 		AMPM = "pm";
	// 	}

	// 	if (this.sleepEnd.getMinutes() < 10)
	// 	{
	// 		line = `${hours}:0${this.sleepEnd.getMinutes().toString()}${AMPM}`
	// 	}
	// 	else
	// 	{
	// 		line = `${hours}:${this.sleepEnd.getMinutes().toString()}${AMPM}`
	// 	}

	// 	return line;
	// }
}
