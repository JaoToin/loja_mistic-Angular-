import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../models/pessoa';


@Injectable({
  providedIn: 'root',
})

export class Service{

  constructor(private http: HttpClient) { }

  cadastroPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const UrlApi = `http://127.0.0.1:8000/pessoas/`
    return this.http.post<Pessoa>(UrlApi, pessoa)
  }

  listarPessoas(): Observable<Pessoa[]> {
    const urlApi = `http://127.0.0.1:8000/pessoas/`

    return this.http.get<Pessoa[]>(urlApi)
  }

  listarPessoa(id: number): Observable<Pessoa> {
    const urlApi = `http://127.0.0.1:8000/pessoas/${id}`
    return this.http.get<Pessoa>(urlApi)
  }

  excluirPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const urlApi = `http://127.0.0.1:8000/pessoas/${pessoa.idpessoa}`
    return this.http.delete<Pessoa>(urlApi)
}

  editarPessoa(pessoa: Pessoa): Observable<Pessoa> {
    const urlApi = `http://127.0.0.1:8000/pessoas/${pessoa.idpessoa}`
    return this.http.put<Pessoa>(urlApi, pessoa)
  }

  calcularIdade(data_nascimento: Date): number {
    const hoje = new Date();
    const nascimento = new Date(data_nascimento + 'T00:00:00'); // Adiciona a hora para evitar problemas de fuso horário
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;

  }}


