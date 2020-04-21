import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiService } from '../sheard/ui.service';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private fbSubs: Subscription[] = []
  private runningExercise: Exercise;
  constructor(
    private db: AngularFirestore,
    private uiService: UiService


  ) { }
  fitchAvailableExercises() {
    return this.fbSubs.push(this.db.collection('availableExercises').snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(
            doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories'],
              }

            }
          );
        })).subscribe((exercises: Exercise[]) => {
          this.uiService.loadingStateChanged.next(false)
          this.availableExercises = exercises
          this.exercisesChanged.next([...this.availableExercises])
        }, error => {
          this.uiService.loadingStateChanged.next(false)
          this.exercisesChanged.next(null)

          this.uiService.showSnackBar('Fetching Trainings fails, please try agin later', "Close", 4000)
        }))
  }

  startExercise(selectedId: string) {
    //  this.db.doc('availableExercises/'+selectedId).update({lastSelected:new Date()})
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    this.exerciseChanged.next({ ...this.runningExercise });
    this.uiService.showSnackBar('New Training Started', 'Close', 4000)


  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    this.uiService.showSnackBar('Training Completed', 'Close', 4000)

  }

  cancelExercise(progress: number) {

    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
    this.uiService.showSnackBar('Training Cancelled Successfully', 'Close', 4000)

  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fitchCompletedOrCancelledExercises() {
    return this.fbSubs.push(
      this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises)
      })
    );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }


  cancelSubscriptions() {
    if(this.fbSubs)
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }
}
