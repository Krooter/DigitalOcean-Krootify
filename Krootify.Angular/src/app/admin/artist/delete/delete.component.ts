import { IArtist } from './../../../_models/Song/artists';
import { ArtistService } from './../../../_services/artist.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  id!: number;

  constructor(private artistService: ArtistService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: IArtist) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }

  deleteArtist(id: number) {
    this.artistService.deleteArtist(id).subscribe(() => {
      this.artistService.setRefresh(true);
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    });
  }

  close(){
    this.dialog.closeAll();
  }

}
