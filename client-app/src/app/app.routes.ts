import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskComponent } from './view-task/view-task.component'
import { AddTaskComponent } from './add-task/add-task.component'
import { EditTaskComponent } from './edit-task/edit-task.component'
import { LoginSignupComponent } from './login-signup/login-signup.component'
import { AuthGuard } from './auth/auth.guard';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
// Route Configuration
const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ViewTaskComponent
      },
      {
        path: 'tasks',
        component: ViewTaskComponent
      },{
        path: 'addtask',
        component: AddTaskComponent
      },{
        path: 'edittask/:id',
        component: EditTaskComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginSignupComponent
      }
    ]
  },
  { path: '**', redirectTo: '' }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
