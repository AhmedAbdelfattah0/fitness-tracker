import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 import { Store } from '@ngrx/store';
import * as formTraining from '../training.reducer'
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state']
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort, { static: true }) sort: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
   constructor(private trainingService: TrainingService,
    private store: Store<formTraining.State>
  ) { }


  ngOnInit(): void {
    this.trainingService.fitchCompletedOrCancelledExercises()


     this.store.select(formTraining.getFinishedExercises).subscribe(ex=>{
      this.dataSource.data =ex
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


}
