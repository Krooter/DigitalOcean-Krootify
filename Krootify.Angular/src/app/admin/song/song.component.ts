import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Params } from 'src/app/_models/Params/Params';
import { ISong } from 'src/app/_models/Song/song';
import { SongService } from 'src/app/_services/song.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm!: ElementRef;
  songs!: ISong[];
  params: Params = new Params();
  displayedColumns: string[] = ['id', 'name', 'songUrl', 'artist', 'album', 'genre', 'category','actions'];
  totalCount: number = 0;

  constructor(private songService: SongService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.songService.getRefresh().subscribe((value: boolean) => {
      this.getSongs();
    });
  }

  getSongs(){
    this.songService.getSongs(this.params).subscribe(response => {
      if(response != undefined){
        this.songs = response?.data;
        this.params.pageNumber = response?.pageIndex;
        this.params.pageSize = response?.pageSize;
        this.totalCount = response.count;
      }
    });
  }

  update(id: number){
    this.dialog.open(EditComponent, {
      data: {
        id: id
      },
      backdropClass: 'backdropBackground'
    });
  }

  create(){
    this.dialog.open(CreateComponent, {
      backdropClass: 'backdropBackground'
    });
  }

  deleteSong(id: number){
    this.dialog.open(DeleteComponent, {
      data: {
        id: id
      },
      backdropClass: 'backdropBackground'
    });
  }

  onPageChanged(event: any){
    this.params.pageNumber = event.pageIndex;
    this.params.pageSize = event.pageSize;
    this.totalCount = event.length;
    this.getSongs();
  }

  onSearch(){
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getSongs();
  }
}
