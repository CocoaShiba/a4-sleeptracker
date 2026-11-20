import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonPicker, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption],
})
export class HomePage {

	name:string = "";

  	constructor(public sleepService:SleepService) {
		Preferences.get({
		key: 'name'
		}).then((resultName) => {
			console.log(`name: ${resultName.value}`);
			// result value is a string | null,
			// so:
			// 1. ensure nameValue is not null
			// 2. use JavaScript String() fn to convert it to string
			if(resultName.value)
			{
				console.log(`${resultName.value} not null`);
				this.name = String(resultName.value);
				// this.namedSaved.set(true);
			}
		});
	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	async saveName() {
		console.log(`saved name: ${this.name}`);
		try {
		await Preferences.set({
			key: 'name',
			value: this.name,
		});
		} catch (e)
		{
		console.log(e);
		}
	}
}
