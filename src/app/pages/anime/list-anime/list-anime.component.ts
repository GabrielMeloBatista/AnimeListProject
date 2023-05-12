import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AnimeDto} from "../../../api/models/anime-dto";
import {AnimeControllerService} from "../../../api/services/anime-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-list-anime',
  templateUrl: './list-anime.component.html',
  styleUrls: ['./list-anime.component.scss']
})
export class ListAnimeComponent implements OnInit {
  colunasMostrar = ['id', 'nome', 'dataDeLancamento', 'tipoAnime', 'generoID', "action"];
  animeListaDataSource: MatTableDataSource<AnimeDto> = new MatTableDataSource<AnimeDto>([]);

  constructor(
    public animeService: AnimeControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.animeService.listAll().subscribe(data => {
      this.animeListaDataSource.data = data;
    })
  }

  remover(animeDto: AnimeDto) {
    console.log("Removido", animeDto.id);
    this.animeService.remover({id: animeDto.id || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ",5000);
          console.log("Exlcusão:", retorno);
        }, error => {
          if (error.status === 404) {
            this.showMensagemSimples("Anime não existe mais")
          } else {
            this.showMensagemSimples("Erro ao excluir");
            console.log("Erro:", error);
          }
        }
      )
  }

  confirmarExcluir(animeDto: AnimeDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${animeDto.nome} (ID: ${animeDto.id})?`,
        textoBotoes: {
          ok: 'Confirmar',
          cancel: 'Cancelar',
        },
        dado: animeDto
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.remover(confirmed.dado);
      }
    });
  }
  showMensagemSimples( mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
