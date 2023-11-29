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
import { ConfirmationDialog } from '../../core/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  formGroup!: FormGroup;
  forumDto?: ForumDto;
  anime?: AnimeDto;
  public readonly ACAO_INCLUIR = 'Incluir';

  colunasMostrar = ['Review'];

  id!: number;

  forumDtoMatTableDataSource: MatTableDataSource<ForumDto> =
    new MatTableDataSource<ForumDto>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public forumControllerService: ForumControllerService,
    public animeService: AnimeControllerService,
    private dialog: MatDialog
  ) {
    this._adapter.setLocale('pt-br');
    this.id = parseInt(this.route.snapshot.paramMap.get('codigoAnime') || '');
    this.createForm();
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.forumControllerService.listAll().subscribe((data: ForumDto[]) => {
      this.forumDtoMatTableDataSource.data = data.filter(
        (value) => value.anime?.id === this.id
      );
    });
    this.animeService
      .obterPorId1({
        id: parseInt(this.route.snapshot.paramMap.get('codigoAnime') + ''),
      })
      .subscribe((data: AnimeDto) => {
        console.log('gotted', data);
        this.anime = data;
      });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      anime: [null],
      shittyOpinions: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formGroup.patchValue({ forum: this.forumDto });
    if (this.formGroup.valid) {
      this.realizarInclusao();
      this.router.navigate(["anime/list/" + this.id]);
    }
    console.log(this.formGroup.valid);
  }

  private realizarInclusao() {
    this.formGroup.patchValue({anime: this.anime});
    console.log('Dados:', this.formGroup.value);
    this.forumControllerService
      .incluir({ body: this.formGroup.value })
      .subscribe(
        (retorno) => {
          console.log('Retorno:', retorno);
          retorno.anime = this.anime;
          this.confirmarAcao(retorno, this.ACAO_INCLUIR);
        },
        (erro) => {
          //console.log('Erro:' + erro);
          this.showError(erro.error, this.ACAO_INCLUIR);
        }
      );
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

  confirmarAcao(forumDto: ForumDto, acao: string) {
    this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Ação de ${acao} dados (ID: ${forumDto.id}) realizada com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
        dado: forumDto,
      },
    });
  }
}
