import { Component } from '@angular/core';
import { Pessoa,  } from '../models/pessoa';
import { Service } from '../service/pessoa-service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

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

constructor(private service: Service, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

exibeDados(){
console.log(this.nome, this.cpf, this.data_nascimento, this.sexo, this.telefone, this.email, this.senha )
}

ngOnInit() {
  this.idPessoa = Number(this.route.snapshot.paramMap.get('id'));

  if (this.idPessoa > 0) {
    this.editar = true;
    this.carregaCampo(this.idPessoa);
  }
}

 carregaCampo(idPessoa: number) {
      this.service.listarPessoa(idPessoa)
        .subscribe({
          next: (objAtleta) => {
            this.id = objAtleta.idpessoa
            this.nome = objAtleta.nome
            this.cpf = objAtleta.cpf
            this.sexo = objAtleta.sexo
            this.telefone = objAtleta.telefone
            this.email = objAtleta.email
            this.data_nascimento = objAtleta.data_nascimento


            this.cdr.detectChanges()
          }, error: (msgErro) => {
            console.log("Erro ao Listar  o atleta ", msgErro)
          }
        })
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
  this.service.cadastroPessoa(pessoa)
  .subscribe({
    next:(response) => {
      console.log('Pessoa cadastrada com sucesso:', response);
    },
    error:(error) => {
      console.error('Erro ao cadastrar pessoa:', error);
    }
})
  } else {
    pessoa.idpessoa = this.idPessoa;
    this.service.cadastroPessoa(pessoa)
    .subscribe({
      next:(response) => {
        console.log('Pessoa atualizada com sucesso:', response);
      },
      error:(error) => {
        console.error('Erro ao atualizar pessoa:', error);
      }
    })
  }



  this.exibeDados();
  this.limpar();
}

listarPessoa(idPessoa: number) {
  this.service.listarPessoa(idPessoa)
  .subscribe({
    next:(response) => {
      console.log('Pessoa listada com sucesso:', response);
    },
    error:(error) => {
      console.error('Erro ao listar pessoa:', error);
    }
  })
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
}

