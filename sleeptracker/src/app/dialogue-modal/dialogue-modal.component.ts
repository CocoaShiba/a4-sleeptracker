import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonDatetime, IonDatetimeButton } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dialogue-modal',
  templateUrl: './dialogue-modal.component.html',
  styleUrls: ['./dialogue-modal.component.scss'],
  imports: [IonPicker, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonDatetime, IonDatetimeButton],
})
export class DialogueModalComponent  implements OnInit {

  twelveHoursInMs:number = 12 * 60 * 60 * 1000; 
  
  sleepDate: Date;
  wakeDate: Date;

  alreadySetToYesterdayFlag:boolean = false;
  // hourNumbers: number[] = [];
	// minuteNumbers: number[] = [];

	// hourStart:number = 0;
	// minuteStart:number = 0;
  // startAMPM:string = "AM";

	// hourEnd:number = 0;
	// minuteEnd:number = 0;
  // endAMPM:string = "AM";


  constructor(public modalController:ModalController, public sleepService:SleepService, public alertController:AlertController) {
    this.sleepDate = new Date();
    this.sleepDate.setHours(22);
    this.sleepDate.setMinutes(0);
    this.wakeDate = new Date();
    this.alreadySetToYesterdayFlag = true;
    // for (var i = 1; i < 12; i++)
    // {
    //   this.hourNumbers.push(i);
    // }

    // for (var i = 0; i < 60; i++)
    // {
    //   this.minuteNumbers.push(i);
    // }
  }

  ngOnInit() {}

  onSleepChange(event: CustomEvent) {
    var string:string = event.detail.value;

    var hour:number = Number(string.substring(0, 2));
    var minute:number = Number(string.substring(3, 5));

    console.log(hour);
    console.log(minute);
    // console.log(hour);
    // console.log(minute)

    this.sleepDate.setHours(hour, minute);
  }

  onWakeChange(event: CustomEvent) {
    var string:string = event.detail.value;

    var hour:number = Number(string.substring(string.length - 8, string.length - 6));
    var minute:number = Number(string.substring(string.length - 5, string.length - 3));

    console.log(hour);
    console.log(minute);

    this.wakeDate.setHours(hour, minute);
  }

  // onHourStartChange(event: CustomEvent) {
  //   	this.hourStart = event.detail.value;
  //   // this.setDecorativeText();
  //   // this.storage.set(this.seasonKey, this.pickerValue);
  // 	}

	// onMinuteStartChange(event: CustomEvent) {
	// 	this.minuteStart = event.detail.value;
	// }

  // onAMPMStartChange(event: CustomEvent) {
  //   this.startAMPM = event.detail.value;
  // }

	// onHourEndChange(event: CustomEvent) {
	// 	this.hourEnd = event.detail.value;
	// }

	// onMinuteEndChange(event: CustomEvent) {
	// 	this.minuteEnd = event.detail.value;
	// }

  // onAMPMEndChange(event: CustomEvent) {
  //   this.endAMPM = event.detail.value;
  // }


	onSaveOvernightSleep() {
    if (this.sleepDate.getHours() >= 12) //User slept at PM yesterday; set day to yesterday
    {
      this.sleepDate.setDate(this.sleepDate.getDate() - 1);
    }

    var overnightSleepData:OvernightSleepData = new OvernightSleepData(this.sleepDate, this.wakeDate)
    
    console.log("total slept time :" + overnightSleepData.totalTimeSleptMinutes);
    if (overnightSleepData.totalTimeSleptMinutes > 960) { //Are you sure you slept for over 16 hours?

        this.alertController.create({
        header: 'Super sleepy?',
        //subHeader: 'Subtitle',
        message: 'You have slept for over 16 hours. Is this correct?',
        buttons: [
        {
          text: 'Cancel',
          role : 'cancel',
          handler: () => {
            // console.log('Cancel!');
            this.sleepDate.setDate(this.sleepDate.getDate() + 1);
            // this.sleepService.logOvernightData(overnightSleepData);
            // this.modalController.dismiss();
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            //console.log('Confirmed!');
            this.sleepService.logOvernightData(overnightSleepData);
            this.modalController.dismiss();
          },
        },
        ],
        }).then((alert) => {
          alert.present();
        });
      
    }
    else
    {
      this.sleepService.logOvernightData(overnightSleepData);
      this.modalController.dismiss();
    }

    //this.sleepService.logOvernightData(overnightSleepData);

    // this.hourStart = 0;
    // this.minuteStart = 0;
    // this.startAMPM = "AM";

    // this.hourEnd = 0;
    // this.minuteEnd = 0;
    // this.endAMPM = "AM";

    //this.modalController.dismiss();
	}


  onCancel() {
    this.modalController.dismiss();
  }

}
