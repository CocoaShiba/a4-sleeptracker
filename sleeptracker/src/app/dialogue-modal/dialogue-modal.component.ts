import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';

@Component({
  selector: 'app-dialogue-modal',
  templateUrl: './dialogue-modal.component.html',
  styleUrls: ['./dialogue-modal.component.scss'],
  imports: [IonPicker, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons],
})
export class DialogueModalComponent  implements OnInit {

  twelveHoursInMs:number = 12 * 60 * 60 * 1000; 
  
  hourNumbers: number[] = [];
	minuteNumbers: number[] = [];

	hourStart:number = 0;
	minuteStart:number = 0;
  startAMPM:string = "AM";

	hourEnd:number = 0;
	minuteEnd:number = 0;
  endAMPM:string = "AM";


  constructor(public modalController:ModalController, public sleepService:SleepService) {
    for (var i = 1; i < 12; i++)
    {
      this.hourNumbers.push(i);
    }

    for (var i = 0; i < 60; i++)
    {
      this.minuteNumbers.push(i);
    }
  }

  ngOnInit() {}

  onHourStartChange(event: CustomEvent) {
    	this.hourStart = event.detail.value;
    // this.setDecorativeText();
    // this.storage.set(this.seasonKey, this.pickerValue);
  	}

	onMinuteStartChange(event: CustomEvent) {
		this.minuteStart = event.detail.value;
	}

  onAMPMStartChange(event: CustomEvent) {
    this.startAMPM = event.detail.value;
  }

	onHourEndChange(event: CustomEvent) {
		this.hourEnd = event.detail.value;
	}

	onMinuteEndChange(event: CustomEvent) {
		this.minuteEnd = event.detail.value;
	}

  onAMPMEndChange(event: CustomEvent) {
    this.endAMPM = event.detail.value;
  }


	onSaveOvernightSleep() {
    var goToBed = new Date();
    if (this.startAMPM == "PM")
    {
      goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
    }
    else
    {
      goToBed.setDate(goToBed.getDate());
    }
		 
		goToBed.setHours(this.hourStart, this.minuteStart, 0); //1:03am
    if (this.startAMPM == "PM")
    {
      // console.log("ADDING 12 TO START");
      goToBed = new Date(goToBed.getTime() + this.twelveHoursInMs);
    }

		var wakeUp = new Date();
    wakeUp.setDate(wakeUp.getDate()); //set to today
		wakeUp.setHours(this.hourEnd, this.minuteEnd, 0); //1:03am
    if (this.endAMPM == "PM")
    {
      // console.log("ADDING 12 TO END");
      // console.log(this.endAMPM);
      wakeUp = new Date(wakeUp.getTime() + this.twelveHoursInMs);
    }

    var overnightSleepData:OvernightSleepData = new OvernightSleepData(goToBed, wakeUp)
    this.sleepService.logOvernightData(overnightSleepData);

    this.hourStart = 0;
    this.minuteStart = 0;
    this.startAMPM = "AM";

    this.hourEnd = 0;
    this.minuteEnd = 0;
    this.endAMPM = "AM";

    this.modalController.dismiss();
	}


  onCancel() {
    this.modalController.dismiss();
  }

}
