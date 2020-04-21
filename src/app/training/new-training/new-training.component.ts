import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/sheard/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[]
  exercisesSubscription: Subscription
  loadingSubscription: Subscription
  isLoading: boolean = false
  constructor(
    private trainingService: TrainingService,
    private uiService: UiService


  ) { }

  ngOnInit(): void {
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe((exercises) => (this.exercises = exercises))
    this.trainingService.fitchAvailableExercises()
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
  }


  onStartTraining(from: NgForm) {

    this.trainingService.startExercise(from.value.exercise)
    // this.startTraining.emit()
    // this.selectedTrainingId.emit(selectedTraining)

  }

  fitchAgin() {
    this.trainingService.fitchAvailableExercises()

  }


  ngOnDestroy(): void {
    if (this.exercisesSubscription) {

      this.exercisesSubscription.unsubscribe()
    }
    
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe
    }
  }


}
