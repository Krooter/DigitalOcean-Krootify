import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { SongModule } from './song/song.module';
import { LayoutModule } from './../layout/layout.module';
import { MatIconModule } from '@angular/material/icon';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AlbumComponent } from './album/album.component';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatSidenavModule,
    SharedModule,
    LayoutModule,
    MatIconModule,
    SongModule,
    ArtistModule,
    AlbumModule
  ]
})
export class AdminModule { }
