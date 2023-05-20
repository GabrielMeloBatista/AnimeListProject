import { Routes } from '@angular/router';
import {HomeAnimeComponent} from "./home-anime/home-anime.component";
import {ListAnimeComponent} from "./list-anime/list-anime.component";
import {FormAnimeComponent} from "./form-anime/form-anime.component";
import {CommunityComponent} from "../community/community.component";
import {HelpComponent} from "../help/help.component";
import {IndustryComponent} from "../industry/industry.component";
import {MangaComponent} from "../manga/manga.component";
import {ReadComponent} from "../read/read.component";
import {WatchComponent} from "../watch/watch.component";

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
    path: "community",
    component: CommunityComponent
  },
  {
    path: "help",
    component: HelpComponent
  },
  {
    path: "industry",
    component: IndustryComponent
  },
  {
    path: "manga",
    component: MangaComponent
  },
  {
    path: "read",
    component: ReadComponent
  },
  {
    path: "watch",
    component: WatchComponent
  }
];

