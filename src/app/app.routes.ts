import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro-component/cadastro-component';

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

];
