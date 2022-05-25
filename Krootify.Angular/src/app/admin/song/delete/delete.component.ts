import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { SongService } from 'src/app/_services/song.service';
import { ISong } from 'src/app/_models/Song/song';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  id!: number;
  constructor(private songService: SongService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: ISong) { }

  ngOnInit(): void {
    this.id = this.data.id;
  }

  deleteSong(id: number) {
    this.songService.deleteSong(id).subscribe(() => {
      this.songService.setRefresh(true);
      this.dialog.closeAll();
    }, error => {
      console.log(error);
    });
  }

  close(){
    this.dialog.closeAll();
  }

}
