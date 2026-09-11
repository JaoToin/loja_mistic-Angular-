import { Component, OnInit } from '@angular/core';
import { Pessoa,  } from '../models/pessoa';
import { Service } from '../service/pessoa-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  imports: [FormsModule],
  selector: 'app-cadastro-component',
  styleUrl: './cadastro-component.css',
  templateUrl: './cadastro-component.html',
})
export class CadastroComponent {

id = 0
nome = ''
cpf = ''
data_nascimento = new Date()
sexo = ''
telefone = ''
email = ''
senha = ''
editar = false
idPessoa = 0

constructor(private service: Service, private router: Router, private route: ActivatedRoute) {}

ngOnInit() {

  const idParam = this.route.snapshot.paramMap.get('id');
  if (idParam) {
    this.idPessoa = Number(idParam);
    this.editar = true;
    this.service.listarPessoa(this.idPessoa).subscribe({
      next: (pessoa) => {
        this.nome = pessoa.nome;
        this.cpf = pessoa.cpf;
        this.data_nascimento = pessoa.data_nascimento;
        this.sexo = pessoa.sexo;
        this.telefone = pessoa.telefone;
        this.email = pessoa.email;
        this.senha = pessoa.senha;
      },
      error: (err) => console.error('Erro ao buscar pessoa:', err)
    });
  }
}

exibeDados(){
console.log(this.nome, this.cpf, this.data_nascimento, this.sexo, this.telefone, this.email, this.senha )
}
enviaDadosPessoa() {
  const pessoa = new Pessoa();
  pessoa.nome = this.nome;
  pessoa.cpf = this.cpf;
  pessoa.sexo = this.sexo;
  pessoa.data_nascimento = this.data_nascimento;
  pessoa.telefone = this.telefone;
  pessoa.email = this.email;
  pessoa.senha = this.senha;

  if (this.editar) {

    pessoa.idpessoa = this.idPessoa;
    this.service.editarPessoa(pessoa).subscribe({
      next: (response) => {
        console.log('Pessoa atualizada com sucesso:', response);
        this.direcao();
      },
      error: (error) => console.error('Erro ao atualizar pessoa:', error)
    });
  } else {

    this.service.cadastroPessoa(pessoa).subscribe({
      next: (response) => {
        console.log('Pessoa cadastrada com sucesso:', response);
        this.direcao();
      },
      error: (error) => console.error('Erro ao cadastrar pessoa:', error)
    });
  }

  this.exibeDados();
  this.limpar();
}


limpar() {
  this.nome = ''
  this.cpf = ''
  this.sexo = ''
  this.data_nascimento = new Date()
  this.telefone = ''
  this.email = ''
  this.senha = ''
}

direcao(){
  this.router.navigate(['/tabela']);
}

}


