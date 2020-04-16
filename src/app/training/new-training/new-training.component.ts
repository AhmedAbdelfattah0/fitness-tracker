import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  // @Output('startTraining') startTraining = new EventEmitter();
  // @Output('selectedTrainingId') selectedTrainingId = new EventEmitter();
  constructor(private trainingService: TrainingService) { }
  exercises: Exercise[]
  ngOnInit(): void {
    this.exercises = this.trainingService.getAvailableExercises()
  }


  onStartTraining(from:NgForm) {
       
    this.trainingService.startExercise(from.value.exercise)
    // this.startTraining.emit()
    // this.selectedTrainingId.emit(selectedTraining)
  }
}
