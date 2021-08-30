import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, mergeMap, retryWhen, switchMap, tap } from 'rxjs/operators';
import { IQuestion } from '../modules/question';
import { IAppState } from 'src/app/store/state/app.state';

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

  prototypeFunction(question: IQuestion, func: any): boolean {
    //console.log("Он осенён римским крестом");
    try {
      let storageValue = localStorage.getItem("state") || "";
      let state = JSON.parse(storageValue);
      state = func(state.questionState.questions.slice(), question);
      state = {
        questionState: {
          questions: state
        }
      };
      let forSet = JSON.stringify(state);
      //console.log(forSet);
      //console.log(question);
      localStorage.setItem("state", forSet);
      let storageValue_ = localStorage.getItem("state") || "";
      //console.log(storageValue_);
      return true;
    }
    catch {
      //console.log("Но израненный король упал без сил");
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
