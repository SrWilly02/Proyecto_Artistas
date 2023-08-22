import { Artist } from './../../models/artist';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ArtistService } from 'src/app/services/artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-artist',
  templateUrl: './list-artist.component.html',
  styleUrls: ['./list-artist.component.css']
})
export class ListArtistComponent implements OnInit {
  desplegarColumnas: string[] = [
    'id', 'name', 'photo', 'favoritesports', 'points', 'groupId', 'actions'
  ];
  dataSource = new MatTableDataSource<Artist>();
  artists!: Artist[];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  
  constructor(private artistService: ArtistService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {this.getArtists();}

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getArtists() {
    this.artistService.getArtists().subscribe((data: Artist[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  eliminarArtist(id:number) {
    this.artistService.eliminarArtist(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((e: Artist) => {
        return e.id !== id ? e : false;
      });
      this.snackBar.open('Artista eliminado con éxito', '', {
        duration: 6000,
      })
    })
  }
}
