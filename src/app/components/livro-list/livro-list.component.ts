import { Component, inject, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Livro } from '../../models/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrl: './livro-list.component.css'
})
export class LivroListComponent implements OnInit {

  private readonly livroService = inject(LivroService);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Evento emitido ao clicar em "Editar" */
  @Output() editarLivro = new EventEmitter<Livro>();

  livros: Livro[] = [];
  carregando = true;
  expandedLivros: { [id: string]: boolean } = {};

  ngOnInit(): void {
    this.carregarLivros();
  }

  /** Carrega todos os livros da API */
  carregarLivros(): void {
    this.carregando = true;
    this.livroService.getAll().subscribe({
      next: (dados) => {
        this.livros = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.livros = [];
        this.carregando = false;
        this.cdr.detectChanges();
      }
    });
  }

  /** Emite o livro selecionado para edição */
  onEditar(livro: Livro): void {
    this.editarLivro.emit(livro);
  }

  /** Alterna a expansão de um livro */
  toggleExpand(id: any): void {
    if (!id) return;
    this.expandedLivros[id] = !this.expandedLivros[id];
    this.cdr.detectChanges();
  }

  exibirModalConfirmacao = false;
  livroParaExcluir: Livro | null = null;

  /** Aciona a abertura do modal de confirmação */
  onDeletar(livro: Livro): void {
    this.livroParaExcluir = livro;
    this.exibirModalConfirmacao = true;
    this.cdr.detectChanges();
  }

  /** Executa a exclusão definitiva do livro */
  confirmarExclusao(): void {
    if (!this.livroParaExcluir) return;

    this.livroService.delete(this.livroParaExcluir.id!).subscribe({
      next: () => {
        this.exibirModalConfirmacao = false;
        this.livroParaExcluir = null;
        this.cdr.detectChanges();
        this.carregarLivros();
      },
      error: () => {
        alert('Erro ao excluir o livro.');
        this.exibirModalConfirmacao = false;
        this.livroParaExcluir = null;
        this.cdr.detectChanges();
      }
    });
  }

  /** Cancela e fecha o modal de confirmação */
  cancelarExclusao(): void {
    this.exibirModalConfirmacao = false;
    this.livroParaExcluir = null;
    this.cdr.detectChanges();
  }
}
