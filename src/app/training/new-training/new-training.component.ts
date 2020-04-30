import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as formTraining from '../training.reducer'
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>
  isLoading$: Observable<boolean>
  constructor(
    private trainingService: TrainingService,
    private store: Store<formTraining.State>



  ) { }

  ngOnInit(): void {
    this.exercises$ = this.store.select(formTraining.getAvailableExercises)

    this.isLoading$ = this.store.select(fromRoot.getIsLoading)
    this.fitchExercises()
  }


  fitchExercises() {
    this.trainingService.fitchAvailableExercises()
  }
  onStartTraining(from: NgForm) {

    this.trainingService.startExercise(from.value.exercise)
}

  fitchAgin() {
    this.trainingService.fitchAvailableExercises()

  }




}
