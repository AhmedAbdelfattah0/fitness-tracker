import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining = false;
  currentExercise: Exercise;
  exerciseSubscription: Subscription
  constructor(private trainingService: TrainingService) { }


  ngOnInit(): void {
    
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if (exercise) {
        this.onGoingTraining = true;
      } else {
        this.onGoingTraining = false;
      }
    })
  }
  getRunningExercise(trainingId) {

    // this.currentExercise = this.trainingService.getAvailableExercises().find(ex => ex.id = trainingId)
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe()
  }
}
