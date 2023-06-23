import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import {AnimeControllerService} from "../../../api/services/anime-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialog} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MessageResponse} from "../../../api/models/message-response";
import {AnimeListControllerService} from "../../../api/services/anime-list-controller.service";
import {AnimeListDto} from "../../../api/models/anime-list-dto";
import {AnimeDto} from "../../../api/models/anime-dto";

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss']
})
export class AnimeListComponent{
  formGroup!: FormGroup;
  scores = ['Obra Prima', "Otimo", "Muito Bom", "Bom", "Normal", "Ruim", "Muito Ruim", "Horrível", "Nojento"];
  anime?: AnimeDto;
  acao: string = "Marcar";
  id!: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public animeListService: AnimeListControllerService,
    public animeService: AnimeControllerService,
    private dialog: MatDialog,
  ) {
    this.animeService.obterPorId1({id: parseInt(this.route.snapshot.paramMap.get('codigo') + "")
    }).subscribe(retorno => {
      console.log("A", retorno);
      this.anime = retorno;
    })
    this.createForm();
    this._adapter.setLocale('pt-br');
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      anime: [this.anime],
      Watched: [null, Validators.required],
      Score: [null]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.realizarInclusao();
    }
    console.log(this.formGroup.valid)
  }

  private realizarInclusao() {
    console.log("Anime:", this.anime);
    console.log("Dados:", this.formGroup.value);
    this.animeListService.incluir1({body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.acao);
        this.router.navigate(["/anime"]);
      }, erro => {
        console.log("Erro:" + erro);
        //this.showError(erro.error, this.ACAO_INCLUIR)
      })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarAcao(animeDto: AnimeListDto, acao: string) {
    this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Ação de ${acao} dados: ${animeDto.anime?.[0].nome} (ID: ${animeDto.id}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
  }
}
