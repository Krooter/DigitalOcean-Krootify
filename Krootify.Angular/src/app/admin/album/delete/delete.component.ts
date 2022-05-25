import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlbum } from 'src/app/_models/Song/albums';
import { AlbumService } from 'src/app/_services/album.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  id!: number;

  constructor(private albumService: AlbumService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: IAlbum) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }

  deleteAlbum(id: number) {
    this.albumService.deleteAlbum(id).subscribe(() => {
      this.albumService.setRefresh(true);
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    });
  }

  close(){
    this.dialog.closeAll();
  }
}
