import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    private http: HttpClient
  ) { }

  getData() {
    return localStorage.getItem("state") || "";
  }

  prototypeFunction(func: any, ...params: any[]): boolean {
    try {
      let storageValue = localStorage.getItem("state") || "";
      let state = JSON.parse(storageValue);
      state = func(state.slice(), ...params);
      let forSet = JSON.stringify(state);
      localStorage.setItem("state", forSet);
      return true;
    }
    catch {
      return false;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
