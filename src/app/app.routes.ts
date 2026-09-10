import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro-component/cadastro-component';
import { ListaOculta } from './lista-oculta/lista-oculta';

export const routes: Routes = [
{
    path:'',
    redirectTo:"/listaoculta",
    pathMatch: 'full'
},
{
    path:"cadastro",
    component: CadastroComponent

},
{
  path:"cadastro/:id",
  component:CadastroComponent
},
{
  path:"listaoculta",
  component:ListaOculta
},



];
