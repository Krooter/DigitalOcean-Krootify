import { PlaylistDetailedComponent } from './playlist/playlist-detailed/playlist-detailed.component';
import { LibraryComponent } from './library/library.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'playlist/:id', component: PlaylistDetailedComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageContentRoutingModule {}
