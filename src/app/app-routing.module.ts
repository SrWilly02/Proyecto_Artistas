import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListArtistComponent } from './components/list-artist/list-artist.component';
import { NewArtistComponent } from './components/new-artist/new-artist.component';
import { EditArtistComponent } from './components/edit-artist/edit-artist.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'business/artists', component: ListArtistComponent},
  {path: 'admin/artists/new', component: NewArtistComponent},
  {path: 'admin/artists/edit/:id', component: EditArtistComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
