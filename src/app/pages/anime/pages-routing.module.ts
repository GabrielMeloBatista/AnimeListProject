import { Routes } from '@angular/router';
import {HomeAnimeComponent} from "./home-anime/home-anime.component";
import {ListAnimeComponent} from "./list-anime/list-anime.component";
import {FormAnimeComponent} from "./form-anime/form-anime.component";
import {HelpComponent} from "../help/help.component";

export const animeRoutes: Routes = [
  {
    path: "anime",
    component: HomeAnimeComponent,
    children: [
      {
        path: "",
        component: ListAnimeComponent
      },
      {
        path: "novo",
        component: FormAnimeComponent
      },
      {
        path: ":codigo",
        component: FormAnimeComponent
      }
    ]
  },
  {
    path: "help",
    component: HelpComponent
  }
];

