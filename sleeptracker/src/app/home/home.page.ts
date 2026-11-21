import { Component, inject } from '@angular/core';
import { IonHeader, IonFooter, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, 
		 IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';
import { FormsModule } from '@angular/forms';

import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

import { DialogueModalComponent } from '../dialogue-modal/dialogue-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonPicker, IonFooter, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, 
	        IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, DialogueModalComponent],
})
export class HomePage {

	name:string = "";
	
	// hourNumbers: number[] = [];
	// minuteNumbers: number[] = [];

	// hourStart:number = 0;
	// minuteStart:number = 0;

	// hourEnd:number = 0;
	// minuteEnd:number = 0;

  	constructor(public sleepService:SleepService, public modalController:ModalController) {
	

		// for (var i = 1; i < 13; i++)
		// {
		// 	this.hourNumbers.push(i);
		// }

		// for (var i = 0; i < 60; i++)
		// {
		// 	this.minuteNumbers.push(i);
		// }

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

	// onHourStartChange(event: CustomEvent) {
    // 	this.hourStart = event.detail.value;
    // // this.setDecorativeText();
    // // this.storage.set(this.seasonKey, this.pickerValue);
  	// }

	// onMinuteStartChange(event: CustomEvent) {
	// 	this.minuteStart = event.detail.value;
	// }

	// onHourEndChange(event: CustomEvent) {
	// 	this.hourEnd = event.detail.value;
	// }

	// onMinuteEndChange(event: CustomEvent) {
	// 	this.minuteEnd = event.detail.value;
	// }

	// onSaveOvernightSleep() {
	// 	console.log(this.hourStart + this.minuteStart + ", " + this.hourEnd + this.minuteEnd);
	// }


	presentModal() {
		this.modalController.create({
			component: DialogueModalComponent,
			componentProps: {name: "IN4MATX 133"}
		}).then((modal) => {
			modal.present();
			modal.onDidDismiss().then(()=>{
				console.log(this.allSleepData);
				// “Hello from modal!”
			})
		});
	}
}
