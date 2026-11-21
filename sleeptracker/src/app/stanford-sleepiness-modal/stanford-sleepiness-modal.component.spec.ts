import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StanfordSleepinessModalComponent } from './stanford-sleepiness-modal.component';

describe('StanfordSleepinessModalComponent', () => {
  let component: StanfordSleepinessModalComponent;
  let fixture: ComponentFixture<StanfordSleepinessModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StanfordSleepinessModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StanfordSleepinessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
