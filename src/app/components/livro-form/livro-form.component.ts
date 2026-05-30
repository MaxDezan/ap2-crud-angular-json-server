import { Component, inject, Output, EventEmitter, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livro } from '../../models/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-form',
  imports: [FormsModule],
  templateUrl: './livro-form.component.html',
  styleUrl: './livro-form.component.css'
})
export class LivroFormComponent implements OnChanges {

  private readonly livroService = inject(LivroService);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Livro recebido para edição (null = modo cadastro) */
  @Input() livroParaEditar: Livro | null = null;

  /** Evento emitido após salvar com sucesso */
  @Output() livroSalvo = new EventEmitter<void>();

  /** Evento emitido ao cancelar a edição */
  @Output() edicaoCancelada = new EventEmitter<void>();

  livro: Livro = this.criarLivroVazio();
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' = 'sucesso';
  editando = false;

  /** Mapa de controle para erros individuais por campo */
  camposComErro: { [key: string]: boolean } = {};

  /** Mensagem específica de erro do ISBN */
  erroIsbn = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['livroParaEditar'] && this.livroParaEditar) {
      this.livro = { ...this.livroParaEditar };
      this.editando = true;
      this.camposComErro = {};
      this.erroIsbn = '';
      this.limparMensagem();
    }
  }

  /** Remove o destaque de erro de um campo específico quando o usuário digita */
  onInput(campo: string): void {
    this.camposComErro[campo] = false;
    if (campo === 'isbn') {
      this.erroIsbn = '';
    }
    this.cdr.detectChanges();
  }

  /** Salva (POST) ou atualiza (PUT) o livro com validações completas */
  salvar(): void {
    this.camposComErro = {};
    this.erroIsbn = '';

    let formInvalido = false;

    // Validação de presença dos campos
    if (!this.livro.isbn?.trim()) {
      this.camposComErro['isbn'] = true;
      formInvalido = true;
    }
    if (!this.livro.tituloOriginal?.trim()) {
      this.camposComErro['tituloOriginal'] = true;
      formInvalido = true;
    }
    if (!this.livro.editora?.trim()) {
      this.camposComErro['editora'] = true;
      formInvalido = true;
    }
    if (!this.livro.numeroPaginas || this.livro.numeroPaginas <= 0) {
      this.camposComErro['numeroPaginas'] = true;
      formInvalido = true;
    }
    if (!this.livro.idioma?.trim()) {
      this.camposComErro['idioma'] = true;
      formInvalido = true;
    }

    if (formInvalido) {
      this.exibirMensagem('Preencha todos os campos obrigatórios corretamente.', 'erro');
      this.cdr.detectChanges();
      return;
    }

    // Validação de formato do ISBN (apenas dígitos e hífens)
    if (!/^[\d-]+$/.test(this.livro.isbn.trim())) {
      this.erroIsbn = 'ISBN deve conter apenas números e hífens.';
      this.camposComErro['isbn'] = true;
      this.exibirMensagem('ISBN inválido.', 'erro');
      this.cdr.detectChanges();
      return;
    }

    // Validação de duplicidade na API para garantir estado atualizado
    this.livroService.getAll().subscribe({
      next: (livros) => {
        const isbnNormalizado = this.livro.isbn.trim();
        const duplicado = livros.some(
          (l) => l.isbn.trim() === isbnNormalizado && l.id !== this.livro.id
        );

        if (duplicado) {
          this.erroIsbn = 'Este ISBN já está cadastrado.';
          this.camposComErro['isbn'] = true;
          this.exibirMensagem('ISBN duplicado.', 'erro');
          this.cdr.detectChanges();
          return;
        }

        // Se passar por todas as validações, realiza a persistência
        if (this.editando) {
          this.livroService.update(this.livro).subscribe({
            next: () => {
              this.exibirMensagem('Livro atualizado com sucesso!', 'sucesso');
              this.resetarFormulario();
              this.livroSalvo.emit();
            },
            error: () => this.exibirMensagem('Erro ao atualizar o livro.', 'erro')
          });
        } else {
          this.livroService.create(this.livro).subscribe({
            next: () => {
              this.exibirMensagem('Livro cadastrado com sucesso!', 'sucesso');
              this.resetarFormulario();
              this.livroSalvo.emit();
            },
            error: () => this.exibirMensagem('Erro ao cadastrar o livro.', 'erro')
          });
        }
      },
      error: () => {
        this.exibirMensagem('Erro ao verificar ISBN duplicado.', 'erro');
        this.cdr.detectChanges();
      }
    });
  }

  /** Cancela a edição e limpa o formulário */
  cancelar(): void {
    this.resetarFormulario();
    this.edicaoCancelada.emit();
  }

  private resetarFormulario(): void {
    this.livro = this.criarLivroVazio();
    this.editando = false;
    this.camposComErro = {};
    this.erroIsbn = '';
    this.cdr.detectChanges();
  }

  private criarLivroVazio(): Livro {
    return {
      isbn: '',
      tituloOriginal: '',
      editora: '',
      numeroPaginas: 0,
      idioma: '',
      formatoFisico: true
    };
  }

  private exibirMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.limparMensagem();
      this.cdr.detectChanges();
    }, 4000);
  }

  private limparMensagem(): void {
    this.mensagem = '';
  }
}
