import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HTTPService } from "./shared/http.service";
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AppInterceptor } from './shared/app.interceptor';

import { ViewTaskComponent } from './view-task/view-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { routing } from './app.routes';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { MenuComponent } from './menu/menu.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { AppHeaderComponent } from './app-header/app-header.component';
@NgModule({
  declarations: [
    AppComponent,
    ViewTaskComponent,
    AddTaskComponent,
    EditTaskComponent,
    LoginSignupComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    MenuComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule
  ],
  providers: [HTTPService, AuthGuard, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
