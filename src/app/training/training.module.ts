import { NgModule } from '@angular/core';
 import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { FirestoreDatePipe } from './firestore-date.pipe';
import { SheardModule } from '../sheard/sheard.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';



@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    FirestoreDatePipe

  ],
  imports: [
    TrainingRoutingModule,
    SheardModule,
    StoreModule.forFeature('training',trainingReducer)
  ],
  entryComponents: [StopTrainingComponent]

})
export class TrainingModule { }
