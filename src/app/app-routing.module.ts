import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component'; 
import { HomeComponent } from './app/home/home.component';
import { ListComponent } from './list/list.component'
import { CreateComponent } from './create/create.component';
import { EditReviewComponent } from './edit-review/edit-review.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'resenas', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditReviewComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

