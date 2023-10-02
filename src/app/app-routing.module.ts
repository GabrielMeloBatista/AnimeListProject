import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { pageRoutes } from "./pages/pages-routing.module";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import {AutenticacaoRoutes} from "./arquiteture/autenticacao/autenticacao.routing";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [...pageRoutes]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  },
  {
    path: "acesso",
    children: [
      ...AutenticacaoRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
