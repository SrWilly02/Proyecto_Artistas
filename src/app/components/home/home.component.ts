import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artists!: Artist[];

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
    this.artistService.getArtists().subscribe((resp: any) => {
      console.log(resp);
      this.artists = resp;
    });
  }
}
