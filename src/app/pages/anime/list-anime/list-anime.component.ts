import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AnimeDto } from "../../../api/models/anime-dto";
import { AnimeControllerService } from "../../../api/services/anime-controller.service";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-list-anime",
  templateUrl: "./list-anime.component.html",
  styleUrls: ["./list-anime.component.scss"]
})
export class ListAnimeComponent implements OnInit {
  @ViewChild("final", { static: true }) final!: ElementRef;
  observer!: IntersectionObserver;

  animeListaDataSource: MatTableDataSource<AnimeDto> = new MatTableDataSource<AnimeDto>([]);
  isTableEmpty: boolean = true;
  offset = 0;
  limit = 10;
  gridSize = 0;

  constructor(
    public animeService: AnimeControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const options: IntersectionObserverInit = {
      root: null, // null para usar o viewport como área de observação
      rootMargin: "0px",
      threshold: 0.1// Quando 10% da div estiver visível na tela, a função será chamada
    };
    this.buscarDados();
    this.getGridSize();

    this.observer = new IntersectionObserver((entries) => {
      this.handleIntersection(entries);
    }, options);

    this.observer.observe(this.final.nativeElement);
  }

  handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // A div entrou na tela, execute a função aqui
        this.onScroll();
      }
    });
  }

  @HostListener("window:resize", ["$event"])
  private getGridSize() {
    let larguraPagina = window.innerWidth;
    this.gridSize = Math.round(larguraPagina / 350);

    console.log("Largura da página: " + larguraPagina + " pixels");
    console.log("Grid definida de: " + this.gridSize + " pixels");
  }

  private buscarDados() {
    this.animeService.getDados1({ offset: this.offset, limit: this.limit }).subscribe(data => {
      if (Array.isArray(data)) {
        // Se data for uma lista/array, adiciona os novos itens à lista existente
        data.forEach(item => this.animeListaDataSource.data.push(item));
      } else {
        // Caso contrário, trata data como um item único e o adiciona à lista existente
        this.animeListaDataSource.data.push(data);
      }
      this.isTableEmpty = this.animeListaDataSource.data.length === 0;
    });
  }

  remover(animeDto: AnimeDto) {
    console.log("Removido", animeDto.id);
    this.animeService.remover1({ id: animeDto.id || 0 })
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ", 5000);
          console.log("Exlcusão:", retorno);
        }, error => {
          if (error.status === 404) {
            this.showMensagemSimples("Anime não existe mais");
          } else {
            this.showMensagemSimples("Erro ao excluir");
            console.log("Erro:", error);
          }
        }
      );
  }

  confirmarExcluir(animeDto: AnimeDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: "Confirmar?",
        mensagem: `A exclusão de: ${animeDto.nome} (ID: ${animeDto.id})?`,
        textoBotoes: {
          ok: "Confirmar",
          cancel: "Cancelar"
        },
        dado: animeDto
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.remover(confirmed.dado);
      }
    });
  }

  showMensagemSimples(mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, "Fechar", {
      duration: duracao,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  onScroll(): void {
    console.log("Limit: ", this.limit,"offset:", this.offset);
    this.offset += this.limit; // Aumenta o limite para exibir mais itens
    this.buscarDados(); // Carrega mais itens
  }
}
