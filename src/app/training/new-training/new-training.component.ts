import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[]
  exercisesSubscription: Subscription
  constructor(
    private trainingService: TrainingService,
   

  ) { }

  ngOnInit(): void {
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe((exercises)=>(this.exercises =exercises))
    this.trainingService.fitchAvailableExercises()
   }


  onStartTraining(from: NgForm) {

    this.trainingService.startExercise(from.value.exercise)
    // this.startTraining.emit()
    // this.selectedTrainingId.emit(selectedTraining)

  }
  ngOnDestroy(): void {
    this.exercisesSubscription.unsubscribe()

  }
}
