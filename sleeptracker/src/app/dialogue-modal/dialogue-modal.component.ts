import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonPicker, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dialogue-modal',
  templateUrl: './dialogue-modal.component.html',
  styleUrls: ['./dialogue-modal.component.scss'],
  imports: [IonPicker, IonButton, IonInput, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, FormsModule, IonPickerColumn, IonPickerColumnOption, IonGrid, IonRow, IonCol, IonModal, IonButtons, DialogueModalComponent],
})
export class DialogueModalComponent  implements OnInit {

  hourNumbers: number[] = [];
	minuteNumbers: number[] = [];

	hourStart:number = 0;
	minuteStart:number = 0;

	hourEnd:number = 0;
	minuteEnd:number = 0;


  constructor(public modalController:ModalController) {
    for (var i = 1; i < 13; i++)
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

	onHourEndChange(event: CustomEvent) {
		this.hourEnd = event.detail.value;
	}

	onMinuteEndChange(event: CustomEvent) {
		this.minuteEnd = event.detail.value;
	}

	onSaveOvernightSleep() {
		console.log(this.hourStart + this.minuteStart + ", " + this.hourEnd + this.minuteEnd);
	}


  dismiss() {
    this.modalController.dismiss();
  }

}
