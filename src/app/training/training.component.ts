import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';
import {  Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as formTraining from './training.reducer'


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$:Observable<boolean>;
  currentExercise: Exercise;
   constructor(private trainingService: TrainingService
    ,private store:Store<formTraining.State>
    ) { }


  ngOnInit(): void {
    
    this.onGoingTraining$= this.store.select(formTraining.getIsTrainings)
  }
  

  
}
