import {Component, OnInit} from '@angular/core';
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
  scores:number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  anime?: AnimeDto;
  public readonly ACAO_INCLUIR = "Incluir";
  public readonly ACAO_EDITAR = "Editar";

  acao: string = this.ACAO_INCLUIR;
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
    this.animeService.obterPorId1({id: parseInt(this.route.snapshot.paramMap.get('codigoAnime') + "")
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
      watched: [0, Validators.required],
      score: [null]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      if (!this.id) {
        this.realizarInclusao();
      } else {
        this.realizarEdicao();
      }
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

  showError(erro: MessageResponse, acao: string) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: `Erro ao ${acao}`,
        mensagem: erro.message,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
  }

  confirmarAcao(animeDto: AnimeListDto, acao: string) {
    this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Ação de ${acao} dados (ID: ${animeDto.id}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
  }

  private prepararEdicao() {
    const paramId = this.route.snapshot.paramMap.get('codigo');
    if (paramId){
      const codigo = parseInt(paramId);
      console.log("codigo",paramId);
      this.animeService.obterPorId1({id: codigo}).subscribe(
        retorno => {
          this.acao = this.ACAO_EDITAR;
          console.log("retorno", retorno);
          this.id = retorno.id;
          retorno.dataCriacao = `${retorno.dataCriacao}T03:00:00.000Z`;
          this.formGroup.patchValue(retorno);
        }
      )
    }
  }

  private realizarEdicao() {
    console.log("Dados:", this.formGroup.value);
    this.animeService.alterar1({id: this.id, body: this.formGroup.value})
      .subscribe(retorno => {
        console.log("Retorno:", retorno);
        this.confirmarAcao(retorno, this.ACAO_EDITAR);
        this.router.navigate(["/anime"]);
      }, erro => {
        console.log("Erro:", erro.error);
        this.showError(erro.error, this.ACAO_EDITAR);
      })
  }
}
