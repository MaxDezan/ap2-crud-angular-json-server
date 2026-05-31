import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/livros';

  /** Retorna todos os livros cadastrados */
  getAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiUrl);
  }

  /** Retorna um livro pelo ID */
  getById(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/${id}`);
  }

  /** Cadastra um novo livro */
  create(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.apiUrl, livro);
  }

  /** Atualiza um livro existente via PUT */
  update(livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/${livro.id}`, livro);
  }

  /** Remove um livro pelo ID */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
