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

    ]
})

export class MatrialModule{}