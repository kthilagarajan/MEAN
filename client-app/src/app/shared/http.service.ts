import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Constants } from "./constants";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class HTTPService {
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      // "Authorization" : "hello"
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  getAllTasks(params: Object): Observable<any> {
    this.options.params = <URLSearchParams>params;
    return this.http.get(Constants.GET_ALL_TASKS, this.options)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError))
  }

  getTask(params: any): Observable<any> {
    return this.http.get(Constants.GET_TASK+"/"+params.id)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError))
  }

  addTask(params: Object, data: any): Observable<any> {
    this.options.params = <URLSearchParams>params;
    return this.http.post(Constants.ADD_TASK, data, this.options)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError))
  }

  updateTask(params: Object, data: any): Observable<any> {
    this.options.params = <URLSearchParams>params;
    return this.http.put(Constants.UPDATE_TASK, data, this.options)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError))
  }

  deleteTask(params: Object): Observable<any> {
    this.options.params = <URLSearchParams>params;
    return this.http.delete(Constants.DELETE_TASK, this.options)
      .pipe(map(res => res.json()))
      .pipe(catchError(this.handleError))
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
