import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LivroFormComponent } from './components/livro-form/livro-form.component';
import { LivroListComponent } from './components/livro-list/livro-list.component';
import { Livro } from './models/livro';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, LivroFormComponent, LivroListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  @ViewChild(LivroListComponent) livroList!: LivroListComponent;

  livroParaEditar: Livro | null = null;

  /** Recebe o livro selecionado para edição na lista */
  onEditarLivro(livro: Livro): void {
    this.livroParaEditar = { ...livro };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /** Recarrega a lista após salvar */
  onLivroSalvo(): void {
    this.livroParaEditar = null;
    this.livroList.carregarLivros();
  }

  /** Limpa o estado de edição ao cancelar */
  onEdicaoCancelada(): void {
    this.livroParaEditar = null;
  }
}
