/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */
import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {

	public static ScaleValues = ["a",//Sleepiness scale starts at 1
	'Feeling active, vital, alert, or wide awake', //1
	'Functioning at high levels, but not at peak; able to concentrate', //2
	'Awake, but relaxed; responsive but not fully alert', //3
	'Somewhat foggy, let down', //4
	'Foggy; losing interest in remaining awake; slowed down', //5
	'Sleepy, woozy, fighting sleep; prefer to lie down', //6
	'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; //7

	private loggedValue:number;

	override kind:string = "stanfordSleepiness";

	constructor(loggedValue:number, loggedAt:Date = new Date()) {
		super();
		this.loggedValue = loggedValue;
		this.loggedAt = loggedAt;
	}
	
	// override get sleepinessTime() {
	// 	if (this.loggedAt == null)
	// 	{
	// 		console.log("sfsdfdssdfsd");
	// 	}
	// 	return this.loggedAt.getDay().toString();
	// }
	// override dateString():string {
	// 	return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric'});
	// }

	// override get sleepinessTime() {
	// 	var line:string = "";

	// 	var hours:number = this.loggedAt.getHours();
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

	// 	// if (this.sleepEnd.getMinutes() < 10)
	// 	// {
	// 	// 	line = `${hours}:0${this.sleepEnd.getMinutes().toString()}${AMPM}`
	// 	// }
	// 	// else
	// 	// {
	// 	// 	line = `${hours}:${this.sleepEnd.getMinutes().toString()}${AMPM}`
	// 	// }
	// 	line = `${hours}:${this.loggedAt.getMinutes().toString()}${AMPM}`
	// 	return line;
	// }

	override summaryString():string {
		return this.loggedValue + ": " + StanfordSleepinessData.ScaleValues[this.loggedValue];
	}
}
