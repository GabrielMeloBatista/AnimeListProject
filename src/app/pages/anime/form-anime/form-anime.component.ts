import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {AnimeDto} from "../../../api/models/anime-dto";
import {
  ConfirmationDialog
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AnimeControllerService} from "../../../api/services/anime-controller.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-anime',
  templateUrl: './form-anime.component.html',
  styleUrls: ['./form-anime.component.scss']
})
export class FormAnimeComponent {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public animeService: AnimeControllerService,
    private dialog: MatDialog,
  ) {
    this.createForm();
    this._adapter.setLocale('pt-br');
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      dataDeLancamento: [new Date(), Validators.required],
      tipoAnime: [null, Validators.required],
      generoID: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log("Dados:",this.formGroup.value);
      this.animeService.incluir({body: this.formGroup.value})
        .subscribe( retorno =>{
          console.log("Retorno:",retorno);
        this.confirmarInclusao(retorno);
        this.router.navigate(["/anime"]);
      }, erro =>{
          console.log("Erro:"+erro);
          alert("Erro ao incluir!");
        })
    }
    console.log(this.formGroup.valid)
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarInclusao(animeDto: AnimeDto) {
    this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Inclusão de: ${animeDto.nome} (ID: ${animeDto.id}) realiza com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
  }
}
