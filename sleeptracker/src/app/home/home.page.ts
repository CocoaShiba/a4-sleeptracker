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
// import { alertController } from '@ionic/core';

import { DialogueModalComponent } from '../dialogue-modal/dialogue-modal.component';
import { StanfordSleepinessModalComponent } from '../stanford-sleepiness-modal/stanford-sleepiness-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonPicker, IonFooter, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, 
	        IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, DialogueModalComponent, StanfordSleepinessModalComponent],
})
export class HomePage {

	welcomeString:string = "";
	currentTime:Date;

  	constructor(public sleepService:SleepService, public modalController:ModalController, public alertController:AlertController) {
		this.currentTime = new Date();

		console.log(this.currentTime.getHours());

		if (this.currentTime.getHours() < 12) { //6:00AM-12:00PM (morning)
			this.welcomeString = "Good Morning.";
		}
		if (this.currentTime.getHours() < 6) { //12:00AM-6:00PM (night)
			this.welcomeString = "Good Night.";
		}
		if (this.currentTime.getHours() >= 12) { //12:00PM-5:00PM (afternoon)
			this.welcomeString = "Good Afternoon.";
		}
		if (this.currentTime.getHours() >= 17) { //5:00PM-5:00PM (evening)
			this.welcomeString = "Good Evening.";
		}
		if (this.currentTime.getHours() >= 20) { //8:00PM-12:00AM (night)
			this.welcomeString = "Good Night.";
		}
	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	get AllOvernightData() {
		return SleepService.AllOvernightData;
	}

	get AllSleepinessData() {
		return SleepService.AllSleepinessData;
	}

	async save() {
		console.log(this.AllSleepinessData[0].loggedAt.getHours().toString());
		try {
			await Preferences.set({
				key: '1',
				value: this.AllSleepinessData[0].loggedAt.getHours().toString()
			});
		} catch (e) {
			console.log(e);
		}
	}


	// async shareStuff () {
	// 	// try/catch because error is thrown if user cancells sharing operation
	// 	try {
	// 	await Share.share({
	// 		title: 'Share coordinates',
	// 		text: 'Just in case you wanted to know, these are my current coordinates. Perhaps this is an emergency location sharing app idk. My current coordinates are',
	// 		dialogTitle: 'Share my coordinates',
	// 	});
	// 	} catch (e) {
	// 	console.log(e);
	// 	}
	// }

	presentOvernightSleepModal() {
		this.modalController.create({
			component: DialogueModalComponent,
			componentProps: {name: "IN4MATX 133"}
		}).then((modal) => {
			modal.present();
			modal.onDidDismiss().then(()=>{
				//console.log(this.allSleepData);
				// “Hello from modal!”
			})
		});
	}

	presentSleepinessModal() {
		this.modalController.create({
			component: StanfordSleepinessModalComponent,
			componentProps: {name: "IN4MATX 133"}
		}).then((modal) => {
			modal.present();
			modal.onDidDismiss().then(()=>{
				//console.log(this.allSleepData);
				// “Hello from modal!”
			})
		});
	}
}
