import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';

const routes: Routes = [
  { path: 'people', component: PeopleComponent },
  { path: 'details/:name', component: PersonDetailsComponent },
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
