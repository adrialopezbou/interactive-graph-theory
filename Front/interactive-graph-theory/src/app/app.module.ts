import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component'
import { InteractiveGraphComponent } from './components/interactive-graph/interactive-graph.component';
import { GraphCanvasComponent } from './components/graph-canvas/graph-canvas.component';
import { SaveGraphDialogComponent } from './components/dialogs/save-graph-dialog/save-graph-dialog.component';
import { LoadGraphDialogComponent } from './components/dialogs/load-graph-dialog/load-graph-dialog.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SlickCarouselModule } from 'ngx-slick-carousel'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';
import { NewGraphDialogComponent } from './components/dialogs/new-graph-dialog/new-graph-dialog.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SigninDialogComponent } from './components/dialogs/signin-dialog/signin-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    InteractiveGraphComponent,
    GraphCanvasComponent,
    MainComponent,
    SaveGraphDialogComponent,
    LoadGraphDialogComponent,
    LoginDialogComponent,
    NewGraphDialogComponent,
    SigninDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    SlickCarouselModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {  }
