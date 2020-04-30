import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
 import { AngularFirestore } from '@angular/fire/firestore';

import {  Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UiService } from '../sheard/ui.service';
import { Store } from '@ngrx/store';
import * as UI from '../sheard/ui.actions'
import * as Training from './training.action';

import * as formTraining from './training.reducer'
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
 
  private fbSubs: Subscription[] = []
   constructor(
    private db: AngularFirestore,
    private uiService: UiService,
    private store: Store<formTraining.State>


  ) { }
  fitchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading())

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
          this.store.dispatch(new UI.StopLoading())
          this.store.dispatch(new Training.SetAvailableTraining(exercises))


        }, error => {
          this.store.dispatch(new UI.StopLoading());

          this.uiService.showSnackBar('Fetching Trainings fails, please try agin later', "Close", 4000)
        }))
  }

  startExercise(selectedId: string) {
 

    this.store.dispatch(new Training.StartTraining(selectedId))
    this.uiService.showSnackBar('New Training Started', 'Close', 4000)

  }

  completeExercise() {

    this.store.select(formTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {

      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
    })

    this.store.dispatch(new Training.StopTraining())

    this.uiService.showSnackBar('Training Completed', 'Close', 4000)

  }

  cancelExercise(progress: number) {

    this.store.select(formTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {

      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });



      this.store.dispatch(new Training.StopTraining())

      this.uiService.showSnackBar('Training Cancelled Successfully', 'Close', 4000)
    })


  }


  fitchCompletedOrCancelledExercises() {
    return this.fbSubs.push(
      this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedTraining(exercises))

      })
    );
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }


  cancelSubscriptions() {
    if (this.fbSubs)
      this.fbSubs.forEach(sub => sub.unsubscribe())
  }
}
