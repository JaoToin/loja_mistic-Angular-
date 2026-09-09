import { Component } from '@angular/core';
import { Pessoa,  } from '../modelo/pessoa';
import { Service } from '../service/pessoa-service';
import { FormsModule } from '@angular/forms';

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

constructor(private service: Service) {}

exibeDados(){
console.log(this.nome, this.cpf, this.data_nascimento, this.sexo, this.telefone, this.email, this.senha )
}

enviaDadosPessoa() {
  const pessoa = new Pessoa();
  pessoa.idpessoa = this.id > 0 ? this.id : this.id;
  pessoa.nome = this.nome;
  pessoa.cpf = this.cpf;
  pessoa.sexo = this.sexo;
  pessoa.data_nascimento = this.data_nascimento;
  pessoa.telefone = this.telefone;
  pessoa.email = this.email;
  pessoa.senha = this.senha;

  this.service.cadastroPessoa(pessoa).subscribe(
    (response) => {
      console.log('Pessoa cadastrada com sucesso:', response);
      this.limpar();
    },
    (error) => {
      console.error('Erro ao cadastrar pessoa:', error);
    }
  );

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
}
}
