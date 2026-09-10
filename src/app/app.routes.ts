import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro-component/cadastro-component';
import { TabelaComponent } from './tabela-component/tabela-component';

export const routes: Routes = [
{
    path:'',
    redirectTo:"/cadastro",
    pathMatch: 'full'
},
{
    path:"cadastro",
    component: CadastroComponent

},
{
  path:"cadastro/:id",
  component: CadastroComponent
},
{
  path:"tabela",
  component: TabelaComponent
}



];
