import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist';
@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  pathBase: string = environment.pathBase;

  constructor(private http: HttpClient) {}

  getArtists() {
    return this.http.get<Artist[]>(this.pathBase);
  }

  getArtistId(id: any) {
    return this.http.get<Artist>(`${this.pathBase}/${id}`);
  }

  agregarArtist(artist: Artist) {
    return this.http.post<Artist>(this.pathBase, artist);
  }

  actualizarArtist(id: any, artist: Artist) {
    return this.http.put<Artist>(`${this.pathBase}/${id}`, artist);
  }

  eliminarArtist(id: any) {
    return this.http.delete<Artist>(`${this.pathBase}/${id}`);
  }
}
