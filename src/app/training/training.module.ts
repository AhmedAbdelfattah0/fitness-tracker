import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { FormsModule } from '@angular/forms';
import { MatrialModule } from '../material.module';
import { StopTrainingComponent } from './current-training/stop-training/stop-training.component';
import { FirestoreDatePipe } from './firestore-date.pipe';
import { SheardModule } from '../sheard/sheard.module';



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
    
    SheardModule
  ],
  entryComponents: [StopTrainingComponent]

})
export class TrainingModule { }
