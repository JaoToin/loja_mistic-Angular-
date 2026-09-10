import { Component, OnInit, signal } from '@angular/core';
import {Router } from '@angular/router';
import { Service } from '../service/pessoa-service';
import { Pessoa } from '../modelo/pessoa';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-lista-oculta',
  styleUrl: './lista-oculta.css',
  templateUrl: './lista-oculta.html',
})
export class ListaOculta {

  listarPessoas = signal<Pessoa[]>([]);

  constructor(private router: Router, private http: Service) { }

  ngOnInit() {
    this.listarPesso();
  }

  listarPesso() {
    this.http.listarPessoas()
      .subscribe({
        next: (dados) => {
          console.log("Dados da Pessoa ", dados);
          this.listarPessoas.set(dados.sort((a, b) => a.nome.localeCompare(b.nome)));
        },
        error: (msgErro) => {
          console.log("Erro ao listar Pessoa ", msgErro);
        }
      });
  }



  excluirPessoa(pessoa: Pessoa) {
    if (confirm(`Deseja excluir ${pessoa.nome} da competição? `)) {
      this.http.excluirPessoa(pessoa)
        .subscribe({
          next: (dados) => {
            this.listarPessoas.update(elem =>
              elem.filter(a => a.idpessoa !== pessoa.idpessoa)
            );
            console.log('Pessoa excluída com Sucesso ', dados);
          },
          error: (msgErro) => {
            console.log("Erro ao Excluir a Pessoa ", msgErro);
          }
        });
    }
  }

  buscarPessoa(pessoa: Pessoa) {
    this.router.navigate(['/cadastro', pessoa.idpessoa]);
  }

 calcIdade(data_nascimento: Date) {
  return this.http.calcularIdade(data_nascimento);
}
}



