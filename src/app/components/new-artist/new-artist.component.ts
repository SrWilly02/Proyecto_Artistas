import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArtistService } from '../../services/artist.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Artist } from '../../models/artist';

@Component({
  selector: 'app-new-artist',
  templateUrl: './new-artist.component.html',
  styleUrls: ['./new-artist.component.css']
})

export class NewArtistComponent implements OnInit {
  miForm !: FormGroup;

  constructor(private fb: FormBuilder, 
    private artistService: ArtistService, 
    private snackBar: MatSnackBar, 
    private router: Router) { }

  ngOnInit(): void {this.reactivarForm();}

  reactivarForm() {
    this.miForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(60)]],
      photo: [''],
      favoritesports: [''],
      points: ['', Validators.required, Validators.maxLength(3)],
      groupId: ['']
    })
  }

  guardarArtist(): void {
    const artist: Artist = {
      id: 0,
      name: this.miForm.get('name')!.value,
      photo: this.miForm.get('photo')!.value,
      favoritesports: this.miForm.get('favoritesports')!.value,
      points: this.miForm.get('points')!.value,
      groupId: this.miForm.get('groupId')!.value
    };
    this.artistService.agregarArtist(artist).subscribe({
      next: (data) => {
        this.snackBar.open('Artista registrado con éxito', '', {
          duration: 6000
        });
        this.router.navigate(['/business/artists']);
      },
      error: (err) => {console.log(err)}
    })
  }
}
