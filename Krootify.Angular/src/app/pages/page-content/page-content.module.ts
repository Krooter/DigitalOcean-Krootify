import { PlaylistModule } from './playlist/playlist.module';
import { LayoutModule } from './../../layout/layout.module';
import { MatFormFieldModule } from '@angular/material/form-field/';
import { LibraryComponent } from './library/library.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PageContentRoutingModule } from './page-content-routing.module';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    MainComponent,
    LibraryComponent
  ],
  imports: [
    PageContentRoutingModule,
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatDialogModule,
    PlaylistModule
  ],
  exports: [
  ]
})
export class PageContentModule { }
