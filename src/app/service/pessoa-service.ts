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
}

