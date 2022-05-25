import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { PlayBarComponent } from './play-bar/play-bar.component';
import { NavTopBarComponent } from './nav-top-bar/nav-top-bar.component';

@NgModule({
  declarations: [
    NavSideBarComponent,
    PlayBarComponent,
    NavTopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule
  ],
  exports: [
    NavSideBarComponent,
    PlayBarComponent,
    NavTopBarComponent
  ]
})
export class LayoutModule { }
