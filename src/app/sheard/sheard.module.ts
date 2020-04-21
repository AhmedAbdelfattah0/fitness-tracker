import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrialModule } from '../material.module';



@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    MatrialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatrialModule,
    ReactiveFormsModule,
  ]
})
export class SheardModule { }
