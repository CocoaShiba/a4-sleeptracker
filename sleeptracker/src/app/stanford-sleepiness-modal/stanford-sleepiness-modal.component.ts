import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonRange, IonDatetime, IonDatetimeButton} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-stanford-sleepiness-modal',
  templateUrl: './stanford-sleepiness-modal.component.html',
  styleUrls: ['./stanford-sleepiness-modal.component.scss'],
  imports: [IonPicker, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonRange, IonDatetime, IonDatetimeButton],
})
export class StanfordSleepinessModalComponent  implements OnInit {

  stanfordSleepinessValue:number = 0;
  dateValue:Date;

  stanfordSleepinessScales: string[] = [""];

  constructor(public modalController:ModalController, public sleepService:SleepService) {
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
    this.dateValue = event.detail.value;
  }
  
  onSaveSleepiness() {
    var stanfordSleepinessData:StanfordSleepinessData = new StanfordSleepinessData(this.stanfordSleepinessValue, this.dateValue);
    this.sleepService.logSleepinessData(stanfordSleepinessData);

    this.modalController.dismiss();
  }

  onCancel() {
    this.modalController.dismiss();
  }

}
