import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DelegatTakmicenjeComponent } from './delegat-takmicenje/delegat-takmicenje.component';
import { DelegatComponent } from './delegat/delegat.component';
import { NeregistrovanComponent } from './neregistrovan/neregistrovan.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { VodjaComponent } from './vodja/vodja.component';

const routes: Routes = [
  {path: 'reg', component: RegistracijaComponent},
  {path: 'delegat-takmicenje', component: DelegatTakmicenjeComponent},
  {path: 'neregistrovan', component: NeregistrovanComponent},
  {path: '', component: PrijavaComponent},
  {path: 'organizator', component: OrganizatorComponent},
  {path: 'delegat', component: DelegatComponent},
  {path: 'vodja', component: VodjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
