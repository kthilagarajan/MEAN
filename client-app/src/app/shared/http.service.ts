import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { Constants } from "./constants";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class HTTPService {
  headers: Headers;
  httpParams: HttpParams;

  constructor(private http: Http, private httpClient: HttpClient) {
  }

  optionsBuilder(params: Object) {
    let paramObj = {}
    for (let pKey in params) {
      paramObj[pKey] = params[pKey]
    }
    return {
      params: paramObj
    }
  }

  login(params: Object, data: any): Observable<any> {
    return this.httpClient.post(Constants.LOGIN, data, this.optionsBuilder(params))
      .pipe(map(res => res))
      .pipe(catchError(this.handleError))
  }

  register(params: Object, data: any): Observable<any> {
    return this.httpClient.post(Constants.REGISTER, data, this.optionsBuilder(params))
      .pipe(map(res => res))
      .pipe(catchError(this.handleError))
  }

  getAllTasks(params: Object): Observable<any> {
    return this.httpClient.get(Constants.GET_ALL_TASKS, this.optionsBuilder(params))
      .pipe(map(res => res))
      .pipe(catchError(this.handleError))
  }

  getTask(params: any): Observable<any> {
    return this.httpClient.get(Constants.GET_TASK + "/" + params.id, this.optionsBuilder(params))
      .pipe(map(res => res))
      .pipe(catchError(this.handleError))
  }

  addTask(params: Object, data: any): Observable<any> {
    return this.httpClient.post(Constants.ADD_TASK, data, this.optionsBuilder(params))
      .pipe(map(res => res))
      .pipe(catchError(this.handleError))
  }

  updateTask(params: Object, data: any): Observable<any> {
    return this.httpClient.put(Constants.UPDATE_TASK, data, this.optionsBuilder(params))
      .pipe(map(res => res))
      .pipe(catchError(this.handleError))
  }

  deleteTask(params: Object): Observable<any> {
    return this.httpClient.delete(Constants.DELETE_TASK, this.optionsBuilder(params))
      .pipe(map(res => res))
      .pipe(catchError(this.handleError))
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(errMsg);
  }

}
