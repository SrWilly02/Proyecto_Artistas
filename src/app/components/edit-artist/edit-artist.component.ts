import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Artist } from '../../models/artist';
import { ArtistService } from '../../services/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {
  miForm!: FormGroup;
  artist!: Artist;
  idArtist: any;

  constructor(private fb: FormBuilder,
    private artistService: ArtistService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {this.cargarArtist();}

  cargarArtist() {
    this.idArtist = this.route.snapshot.paramMap.get('id');
    this.artistService.getArtistId(this.idArtist).subscribe((data) => {
      this.artist = data;
      this.miForm = this.fb.group({
        id: this.idArtist,
        name: [this.artist.name, [Validators.required, Validators.maxLength(60)]],
        photo: [this.artist.photo],
        favoritesports: [this.artist.favoritesports],
        points: [this.artist.points, [Validators.required, Validators.maxLength(3)]],
        groupId: [this.artist.groupId]
      });
    });
  }

  actualizarArtist(): void {
    const artist: Artist = {
      id: this.idArtist,
      name: this.miForm.get('name')!.value,
      photo: this.miForm.get('photo')!.value,
      favoritesports: this.miForm.get('favoritesports')!.value,
      points: this.miForm.get('favoritesports')!.value,
      groupId: this.miForm.get('groupId')!.value
    };
    this.artistService
      .actualizarArtist(this.idArtist, artist)
      .subscribe({
        next: (data) => {
          this.snackBar.open('El knowledge fue actualizado con exito!', '', {
            duration: 6000,
          });
          this.router.navigate(['/business/artists']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}