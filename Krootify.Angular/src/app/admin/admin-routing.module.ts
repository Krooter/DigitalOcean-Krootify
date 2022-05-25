import { AlbumComponent } from './album/album.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongComponent } from './song/song.component';
import { ArtistComponent } from './artist/artist.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'song', component: SongComponent},
  {path: 'artist', component: ArtistComponent},
  {path: 'album', component: AlbumComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
