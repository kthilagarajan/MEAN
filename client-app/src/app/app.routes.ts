import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component'
import { AddTaskComponent } from './add-task/add-task.component'
import { EditTaskComponent } from './edit-task/edit-task.component'
import { LoginSignupComponent } from './login-signup/login-signup.component'
import { AuthGuard } from './auth/auth.guard';
// Route Configuration
export const routes: Routes = [
  { path: '', component: ViewTaskComponent },
  { path: 'login', component: LoginSignupComponent },
  { path: 'tasks', component: ViewTaskComponent,canActivate:[AuthGuard] },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'edittask/:id', component: EditTaskComponent }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
