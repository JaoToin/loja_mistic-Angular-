import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../service/pessoa-service';
import { Pessoa } from '../models/pessoa';

@Component({
  imports: [],
  selector: 'app-tabela-component',
  styleUrl: './tabela-component.css',
  templateUrl: './tabela-component.html',
})
export class TabelaComponent {

  pessoas = signal<Pessoa[]>([]);

  constructor(private service: Service, private router: Router) { }

  ngOnInit() {
    this.listarPessoas();
  }

  listarPessoas() {
    this.service.listarPessoas()
      .subscribe({
        next: (response) => {
          this.pessoas.set(response);
        },
        error: (error) => {
          console.error('Erro ao listar pessoas:', error);
        }
      });
  }

  editarPessoa(id: number) {
    this.router.navigate(['/cadastro', id]);
  }

  excluirPessoa(pessoa: Pessoa) {
    if (confirm('Tem certeza que deseja excluir esta pessoa?')) {
      this.service.excluirPessoa(pessoa)
        .subscribe({
          next: () => {
            alert('Pessoa excluída com sucesso!');
            this.listarPessoas(); // Atualiza a lista após exclusão
            this.pessoas.update( elem => elem.filter((a) => a.idpessoa !== pessoa.idpessoa)); // Atualiza a lista após exclusão
          },
          error: (erro) => {
            console.error('Erro ao excluir pessoa:', erro);
          }
        });
    }
    this.ngOnInit();
  }

  buscarPessoaPorId(id: number) {
    this.router.navigate(['/cadastro', id]);
  }

    calcIdade(data_nascimento: Date): number {
    return this.service.calcularIdade(data_nascimento)
  }
}
