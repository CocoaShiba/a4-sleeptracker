import { Component, inject } from '@angular/core';
import { IonHeader, IonFooter, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, 
		 IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon} from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';

import { FormsModule } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { sunnyOutline } from 'ionicons/icons';
import { moonOutline } from 'ionicons/icons';
import { bookOutline } from 'ionicons/icons'

import { DialogueModalComponent } from '../dialogue-modal/dialogue-modal.component';
import { StanfordSleepinessModalComponent } from '../stanford-sleepiness-modal/stanford-sleepiness-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonPicker, IonFooter, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, 
	        IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon, DialogueModalComponent, StanfordSleepinessModalComponent],
})
export class HomePage {

	welcomeString:string = "";
	welcomeIcon:string = "";
	currentTime:Date;

  	constructor(public sleepService:SleepService, public modalController:ModalController, public alertController:AlertController) {
		this.currentTime = new Date();

		if (this.currentTime.getHours() < 12) { //6:00AM-12:00PM (morning)
			this.welcomeString = "Good Morning.";
			this.welcomeIcon = "sunny-outline";
		}
		if (this.currentTime.getHours() < 6) { //12:00AM-6:00PM (night)
			this.welcomeString = "Good Night.";
			this.welcomeIcon = "moon-outline";
		}
		if (this.currentTime.getHours() >= 12) { //12:00PM-5:00PM (afternoon)
			this.welcomeString = "Good Afternoon.";
			this.welcomeIcon = "sunny-outline";
		}
		if (this.currentTime.getHours() >= 17) { //5:00PM-5:00PM (evening)
			this.welcomeString = "Good Evening.";
			this.welcomeIcon = "moon-outline";
		}
		if (this.currentTime.getHours() >= 20) { //8:00PM-12:00AM (night)
			this.welcomeString = "Good Night.";
			this.welcomeIcon = "moon-outline";
		}

		addIcons({ sunnyOutline, moonOutline, bookOutline });
	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	presentOvernightSleepModal() {
		this.modalController.create({
			component: DialogueModalComponent,
			componentProps: {name: "IN4MATX 133"}
		}).then((modal) => {
			modal.present();
			modal.onDidDismiss().then(()=>{
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
			})
		});
	}
}
