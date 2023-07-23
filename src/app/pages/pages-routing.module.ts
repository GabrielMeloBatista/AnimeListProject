import { Routes } from '@angular/router';
import {HomeAnimeComponent} from "./anime/home-anime/home-anime.component";
import {ListAnimeComponent} from "./anime/list-anime/list-anime.component";
import {FormAnimeComponent} from "./anime/form-anime/form-anime.component";
import {HelpComponent} from "./help/help.component";
import {AnimeListComponent} from "./anime/anime-list/anime-list.component";
import { WelcomeComponent } from "./welcome/welcome.component";

export const pageRoutes: Routes = [
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
      },
      {
        path: "list/:codigoAnime",
        component: AnimeListComponent
      },{
        path: "list/:codigoAnime/:codigo",
        component: AnimeListComponent
      }
    ]
  },
  {
    path: "home",
    component: WelcomeComponent
  },
  {
    path: "help",
    component: HelpComponent
  }
];

