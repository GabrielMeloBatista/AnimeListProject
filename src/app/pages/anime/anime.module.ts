import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from "@angular/common";

import { ListAnimeComponent } from './list-anime/list-anime.component';
import { HomeAnimeComponent } from './home-anime/home-anime.component';
import {RouterModule} from "@angular/router";
import {pageRoutes} from "../pages-routing.module";
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
import { AnimeListComponent } from './anime-list/anime-list.component';
import {MatRadioModule} from "@angular/material/radio";
import { MatGridListModule } from "@angular/material/grid-list";
@NgModule({
  declarations: [
    ListAnimeComponent,
    HomeAnimeComponent,
    FormAnimeComponent,
    AnimeListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pageRoutes),
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
    MatRadioModule,
    MatGridListModule,
    NgOptimizedImage,
  ],
})
export class AnimeModule {}
