import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Params } from 'src/app/_models/Params/Params';
import { IAlbum } from 'src/app/_models/Song/albums';
import { AlbumService } from 'src/app/_services/album.service';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm!: ElementRef;
  albums!: IAlbum[];
  params: Params = new Params();
  displayedColumns: string[] = ['id', 'name', 'description', 'releaseDate', 'actions'];
  totalCount: number = 0;

  constructor(private albumService: AlbumService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.albumService.getRefresh().subscribe((value: boolean) => {
      this.getAlbums();
    });
  }

  getAlbums(){
    this.albumService.getAlbums(this.params).subscribe(response => {
      if(response != undefined && response != null){
        this.albums = response?.data;
        this.params.pageNumber = response?.pageIndex;
        this.params.pageSize = response?.pageSize;
        this.totalCount = response.count;
      }
    }, error => {
      console.log(error);
    })
  }
  update(id: number){
    this.dialog.open(EditComponent, {
      data: {
        id: id
      }
    });
  }

  create(){
    this.dialog.open(CreateComponent);
  }

  deleteAlbum(id: number){
    this.dialog.open(DeleteComponent, {
      data: {
        id: id
      }
    });
  }

  onPageChanged(event: any){
    this.params.pageNumber = event.pageIndex;
    this.params.pageSize = event.pageSize;
    this.totalCount = event.length;
    this.getAlbums();
  }

  onSearch(){
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getAlbums();
  } 
}
