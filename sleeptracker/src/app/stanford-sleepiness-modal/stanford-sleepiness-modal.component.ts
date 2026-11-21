import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonRange, IonDatetime, IonDatetimeButton, IonLabel} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-stanford-sleepiness-modal',
  templateUrl: './stanford-sleepiness-modal.component.html',
  styleUrls: ['./stanford-sleepiness-modal.component.scss'],
  imports: [IonPicker, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonRange, IonDatetime, IonDatetimeButton, IonLabel],
})
export class StanfordSleepinessModalComponent  implements OnInit {

  stanfordSleepinessValue:number = 1;
  dateValue:Date;

  stanfordSleepinessScales: string[] = [""];

  constructor(public modalController:ModalController, public sleepService:SleepService, public alertController:AlertController) {
    this.dateValue = new Date();
    for (var i = 1; i < StanfordSleepinessData.ScaleValues.length; i++)
    {
      this.stanfordSleepinessScales.push(StanfordSleepinessData.ScaleValues[i]);
    }
  }

  ngOnInit() {}

  onSleepinessChange(event: CustomEvent) {
    this.stanfordSleepinessValue = event.detail.value;
  }

  onDateChange(event: CustomEvent) {
    var string:string = event.detail.value;

    var hour:number = Number(string.substring(string.length - 8, string.length - 6));
    var minute:number = Number(string.substring(string.length - 5, string.length - 3));

    this.dateValue.setHours(hour, minute);
    //console.log(string);
    //this.dateValue.setHours(string.substring(string.length - 8, string.length))
  }
  
  onSaveSleepiness() {
    //console.log(this.dateValue);
    var stanfordSleepinessData:StanfordSleepinessData = new StanfordSleepinessData(this.stanfordSleepinessValue, this.dateValue);

    var rightNow:Date = new Date();

    var difference = rightNow.getTime() - this.dateValue.getTime();
    difference /= (1000*60);

    if (difference < 0) //User input a time in the future
    {
      this.alertController.create({
        header: 'Are you sure?',
        //subHeader: 'Subtitle',
        message: 'You have input a time in the future. Is this correct?',
        buttons: [
        {
          text: 'Cancel',
          role : 'cancel',
          handler: () => {
            // console.log('Cancel!');
            //this.sleepDate.setDate(this.sleepDate.getDate() + 1);
            // this.sleepService.logOvernightData(overnightSleepData);
            // this.modalController.dismiss();
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            //console.log('Confirmed!');
            this.sleepService.logSleepinessData(stanfordSleepinessData);

            this.modalController.dismiss();
          },
        },
        ],
      }).then((alert) => {
        alert.present();
      });
    }
    else if (difference > 720) //User input a time that was more than 12 hours ago
    {
      this.alertController.create({
        header: 'Are you sure?',
        //subHeader: 'Subtitle',
        message: 'You have input a time more than 12 hours ago. Is this correct?',
        buttons: [
        {
          text: 'Cancel',
          role : 'cancel',
          handler: () => {
            // console.log('Cancel!');
            //this.sleepDate.setDate(this.sleepDate.getDate() + 1);
            // this.sleepService.logOvernightData(overnightSleepData);
            // this.modalController.dismiss();
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            //console.log('Confirmed!');
            this.sleepService.logSleepinessData(stanfordSleepinessData);

            this.modalController.dismiss();
          },
        },
        ],
      }).then((alert) => {
        alert.present();
      });
    }
    else //No detected error with user input; dont show alert message
    {
      this.sleepService.logSleepinessData(stanfordSleepinessData);
      this.modalController.dismiss();
    }

    // this.sleepService.logSleepinessData(stanfordSleepinessData);

    // this.modalController.dismiss();
  }

  onCancel() {
    this.modalController.dismiss();
  }

}
