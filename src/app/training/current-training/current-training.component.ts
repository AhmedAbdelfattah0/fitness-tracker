import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as formTraining from '../training.reducer'
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit ,OnDestroy{
  @Output('startTraining') startTraining = new EventEmitter();
   progress = 0;
  timer: number;
  currentRunningTraining:Exercise
  dialogRefSubscription:Subscription
  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<formTraining.State>

  ) { }
 
  ngOnInit(): void {
 
    this.startOrResumeTraining()
  }

  startOrResumeTraining() {

    this.store.select(formTraining.getActiveTraining).pipe(take(1)).subscribe(ex=>{
      
      const steps = ex.duration / 100 * 1000

      this.timer = +(setInterval(() => {
        this.progress = this.progress + 1;
  
        if (this.progress == 100){
          this.trainingService.completeExercise()
          clearInterval(this.timer)
        }
      }, steps))
    })
  
  }

  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    })

   this.dialogRefSubscription = dialogRef.afterClosed().subscribe(results => {
      if (results == true) {
        return this.trainingService.cancelExercise(this.progress)

      } else {
        return this.startOrResumeTraining()
      }
    })
  }

  ngOnDestroy(): void {
    this.dialogRefSubscription.unsubscribe()
  }


}
