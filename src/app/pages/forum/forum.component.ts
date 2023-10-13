import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { AnimeControllerService } from '../../api/services/anime-controller.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageResponse } from '../../api/models/message-response';
import { ForumControllerService } from '../../api/services/forum-controller.service';
import { ForumDto } from '../../api/models/forum-dto';
import { AnimeDto } from '../../api/models/anime-dto';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../../message/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  formGroup!: FormGroup;
  anime?: AnimeDto;
  public readonly ACAO_INCLUIR = 'Incluir';
  public readonly ACAO_EDITAR = 'Editar';

  colunasMostrar = ['Review'];

  acao: string = this.ACAO_INCLUIR;
  id!: number;

  forumDtoMatTableDataSource: MatTableDataSource<ForumDto> =
    new MatTableDataSource<ForumDto>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public animeListService: ForumControllerService,
    public animeService: AnimeControllerService,
    private dialog: MatDialog
  ) {
    this.animeService
      .obterPorId1({
        id: parseInt(this.route.snapshot.paramMap.get('codigoAnime') + ''),
      })
      .subscribe((retorno) => {
        console.log('A', retorno);
        this.anime = retorno;
      });
    this.createForm();
    this._adapter.setLocale('pt-br');
    this.id = parseInt(this.route.snapshot.paramMap.get('codigoAnime')|| '');
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.animeListService.listAll().subscribe((data: ForumDto[]) => {
      this.forumDtoMatTableDataSource.data = data.filter(value => value.anime?.id === this.id)
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      anime: [null],
      shittyOpinions: ["", Validators.required],
    });
  }

  onSubmit() {
    this.formGroup.patchValue({ anime: this.anime });
    if (this.formGroup.valid) {
      if (!this.id) {
        this.realizarInclusao();
      } else {
        this.realizarEdicao();
      }
    }
    console.log(this.formGroup.valid);
  }

  private realizarInclusao() {
    console.log('Anime:', this.anime);
    console.log('Dados:', this.formGroup.value);
    this.animeListService.incluir({ body: this.formGroup.value }).subscribe(
      (retorno) => {
        console.log('Retorno:', retorno);
        this.confirmarAcao(retorno, this.acao);
      },
      (erro) => {
        //console.log('Erro:' + erro);
        this.showError(erro.error, this.ACAO_INCLUIR)
      }
    );
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  showError(erro: MessageResponse, acao: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: `Erro ao ${acao}`,
        mensagem: erro.message,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
  }

  confirmarAcao(animeDto: ForumDto, acao: string) {
    this.dialog.open(ConfirmDialogComponent, {
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
    if (paramId) {
      const codigo = this.id;
      console.log('codigo', paramId);
      this.animeService.obterPorId1({ id: codigo }).subscribe((retorno) => {
        this.acao = this.ACAO_EDITAR;
        console.log('retorno', retorno);
        this.id = retorno.id;
        retorno.dataCriacao = `${retorno.dataCriacao}T03:00:00.000Z`;
        this.formGroup.patchValue(retorno);
      });
    }
  }

  private realizarEdicao() {
    console.log('Dados:', this.formGroup.value);
    this.animeService
      .alterar1({ id: this.id, body: this.formGroup.value })
      .subscribe(
        (retorno) => {
          console.log('Retorno:', retorno);
          this.confirmarAcao(retorno, this.ACAO_EDITAR);
        },
        (erro) => {
          console.log('Erro:', erro.error);
          this.showError(erro.error, this.ACAO_EDITAR);
        }
      );
  }
}
