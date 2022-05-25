import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistDetailedComponent } from './playlist-detailed/playlist-detailed.component';
import { PlaylistUpdateComponent } from './playlist-update/playlist-update.component';
import { PlaylistAddComponent } from './playlist-add/playlist-add.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    PlaylistAddComponent,
    PlaylistUpdateComponent,
    PlaylistDetailedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    SharedModule,
    MatSnackBarModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class PlaylistModule { }
