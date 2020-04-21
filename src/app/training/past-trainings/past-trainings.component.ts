import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit ,OnDestroy{
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state']
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  private finishedExercisesSubscription:Subscription
  constructor(private trainingService: TrainingService) { }
 

  ngOnInit(): void {
     this.trainingService.fitchCompletedOrCancelledExercises()
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe(exercises=>{
       
      this.dataSource.data =exercises 
     })
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator

  }

  ngAfterViewInit(): void {
    // this.dataSource.sort = this.sort

  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase()

  }

  ngOnDestroy(): void {
    if(this.finishedExercisesSubscription)
    this.finishedExercisesSubscription.unsubscribe()
  }

}
