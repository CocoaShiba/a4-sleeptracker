import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonDatetime, IonDatetimeButton, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-dialogue-modal',
  templateUrl: './dialogue-modal.component.html',
  styleUrls: ['./dialogue-modal.component.scss'],
  imports: [IonPicker, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonDatetime, IonDatetimeButton, IonLabel],
})
export class DialogueModalComponent  implements OnInit {

  twelveHoursInMs:number = 12 * 60 * 60 * 1000; 
  
  sleepDate: Date;
  wakeDate: Date;

  constructor(public modalController:ModalController, public sleepService:SleepService, public alertController:AlertController) {
    this.sleepDate = new Date();
    this.sleepDate.setHours(22);
    this.sleepDate.setMinutes(0);
    this.wakeDate = new Date();
  }

  ngOnInit() {}

  onSleepChange(event: CustomEvent) { //When user changes sleep time
    var string:string = event.detail.value;

    var hour:number = Number(string.substring(0, 2));
    var minute:number = Number(string.substring(3, 5));

    this.sleepDate.setHours(hour, minute);
  }

  onWakeChange(event: CustomEvent) { //When user changes wake time
    var string:string = event.detail.value;

    var hour:number = Number(string.substring(string.length - 8, string.length - 6));
    var minute:number = Number(string.substring(string.length - 5, string.length - 3));

    this.wakeDate.setHours(hour, minute);
  }

	onSaveOvernightSleep() { //When user clicks "save log"

    var yesterdayFlag:boolean = false;

    if (this.sleepDate.getHours() >= 12) //User slept at PM yesterday; set day to yesterday
    {
      this.sleepDate.setDate(this.sleepDate.getDate() - 1);
      yesterdayFlag = true;
    }

    var overnightSleepData:OvernightSleepData = new OvernightSleepData(this.sleepDate, this.wakeDate)
    
    if (overnightSleepData.totalTimeSleptMinutes > 960) { //Are you sure you slept for over 16 hours?

        this.alertController.create({
        header: 'Are you sure?',
        message: 'You have slept for over 16 hours. Is this correct?',
        buttons: [
          {
            text: 'Cancel',
            role : 'cancel',
            handler: () => {
              if (yesterdayFlag)
              {
                this.sleepDate.setDate(this.sleepDate.getDate() + 1);
              }
              
            },
          },
          {
            text: 'Confirm',
            handler: () => {
              this.sleepService.logOvernightData(overnightSleepData);
              this.modalController.dismiss();
            },
          },
        ],
        }).then((alert) => {
          alert.present();
        });
    }
    else //No errors found in user input; save as normal
    {
      this.sleepService.logOvernightData(overnightSleepData);
      this.modalController.dismiss();
    }
	}

  onCancel() { //When user clicks "cancel"
    this.modalController.dismiss();
  }

}
