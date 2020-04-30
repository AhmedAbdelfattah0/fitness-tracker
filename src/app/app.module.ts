import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
 import { AuthenticationModule } from './auth/authentication.module';
 import { StoreModule } from '@ngrx/store';
 import { SheardModule } from './sheard/sheard.module';


import { LocationStrategy, HashLocationStrategy, Location } from '@angular/common';
import { HeaderComponent } from './navigation/header/header.component';
import { SideNavListComponent } from './navigation/side-nav-list/side-nav-list.component';
 import { environment } from 'src/environments/environment';
import { reducers } from './app.reducer';

  

@NgModule({
  declarations: [
    AppComponent,


    HeaderComponent,
    SideNavListComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthenticationModule,
    SheardModule,
    StoreModule.forRoot(reducers),
    ],
  providers: [
    Location,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
 })
export class AppModule { }
