import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListAnimeComponent } from './list-anime/list-anime.component';
import { HomeAnimeComponent } from './home-anime/home-anime.component';
import {RouterModule} from "@angular/router";
import {animeRoutes} from "./anime-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from '@angular/material/table';
import { FormAnimeComponent } from './form-anime/form-anime.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import { MangaComponent } from '../manga/manga.component';
@NgModule({
  declarations: [
    ListAnimeComponent,
    HomeAnimeComponent,
    FormAnimeComponent,
    MangaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(animeRoutes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class AnimeModule { }
