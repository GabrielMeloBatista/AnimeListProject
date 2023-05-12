import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {animeRoutes} from "./pages/anime/anime-routing.module";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [...animeRoutes]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
