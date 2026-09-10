import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../modelo/pessoa';

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
  //LISTAR Pessoa
  listarPessoa(idPessoa: number):Observable<Pessoa>{
    const urlApi = `http://127.0.0.1:8000/pessoas/${idPessoa}`

    return this.http.get<Pessoa>(urlApi)
  }

  //EXCLUIR NA API
  excluirPessoa(Pessoa: Pessoa): Observable<Pessoa> {
    const urlApi = `http://127.0.0.1:8000/pessoas/${Pessoa.idpessoa}`

    return this.http.delete<Pessoa>(urlApi)
  }

  //ALTERAR NA API
  alterarPessoa(Pessoa: Pessoa):Observable<Pessoa>{
    const urlApi = `http://127.0.0.1:8000/pessoas/${Pessoa.idpessoa}`

    return this.http.put<Pessoa>(urlApi, Pessoa)
  }


calcularIdade(data_nascimento: Date | string): number {
  const dt_nascimento = new Date(data_nascimento);
  const hoje = new Date();

  let idade = hoje.getFullYear() - dt_nascimento.getFullYear();
  const resp_calc_mes = hoje.getMonth() - dt_nascimento.getMonth();

  if(resp_calc_mes < 0 || (resp_calc_mes === 0 && hoje.getDate() < dt_nascimento.getDate())){
    idade--;
  }

  return idade;
}}



