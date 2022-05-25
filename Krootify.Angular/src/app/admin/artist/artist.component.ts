import { ArtistService } from './../../_services/artist.service';
import { SongService } from 'src/app/_services/song.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IArtist } from 'src/app/_models/Song/artists';
import { MatDialog } from '@angular/material/dialog';
import { Params } from 'src/app/_models/Params/Params';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import { DeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm!: ElementRef;
  artists!: IArtist[];
  params: Params = new Params();
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'scenename', 'photourl', 'birthdate', 'actions'];
  totalCount: number = 0;

  constructor(private artistService: ArtistService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.artistService.getRefresh().subscribe((value: boolean) => {
      this.getArtists();
    });
  }

  getArtists(){
    this.artistService.getArtists(this.params).subscribe(response => {
      if(response != undefined && response != null){
        this.artists = response?.data;
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

  deleteArtist(id: number){
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
    this.getArtists();
  }

  onSearch(){
    this.params.search = this.searchTerm?.nativeElement.value;
    this.getArtists();
  } 
}
