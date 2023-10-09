import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { pageRoutes } from "./pages/pages-routing.module";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import {AuthenticationRoutes} from "./arquiteture/authentication/authentication.routing";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [...pageRoutes]
  },
  {
    path: "access",
    children: [
      ...AuthenticationRoutes
    ]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
