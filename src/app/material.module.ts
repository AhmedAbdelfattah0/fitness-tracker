import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule  } from '@angular/material/datepicker';
 import {MatFormFieldModule} from '@angular/material/form-field';
 import { MatNativeDateModule } from '@angular/material/core';
 import {  MatSidenavModule } from '@angular/material/sidenav';
 import {  MatListModule } from '@angular/material/list';
 import {  MatToolbarModule } from '@angular/material/toolbar';
 import {  MatTabsModule } from '@angular/material/tabs';
 import {  MatCardModule } from '@angular/material/card';
 import {  MatSelectModule } from '@angular/material/select';
 import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 import { MatDialogModule } from '@angular/material/dialog';
 import { MatTableModule} from '@angular/material/table';
 import { MatSortModule} from '@angular/material/sort';
 import { MatPaginatorModule} from '@angular/material/paginator';
 
@NgModule({
     imports:[
        MatSliderModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
    ],

     exports:[
        MatSliderModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatSelectModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,



    ]
})

export class MatrialModule{}