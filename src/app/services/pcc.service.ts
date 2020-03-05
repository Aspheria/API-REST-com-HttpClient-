import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pcc } from '../models/pcc';

@Injectable({
  providedIn: 'root'
})
export class PccService {

  url = 'http://localhost:3000/pccs'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os carros
  getPccs(): Observable<Pcc[]> {
    return this.httpClient.get<Pcc[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um carro pelo id
  getPccById(id: number): Observable<Pcc> {
    return this.httpClient.get<Pcc>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um carro
  savePcc(pcc: Pcc): Observable<Pcc> {
    return this.httpClient.post<Pcc>(this.url, JSON.stringify(pcc), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza 
  updatePcc(pcc: Pcc): Observable<Pcc> {
    return this.httpClient.put<Pcc>(this.url + '/' + pcc.id, JSON.stringify(pcc), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta PRECISA SER ASYNC
  deletePcc(pcc: Pcc) {
    return this.httpClient.delete<Pcc>(this.url + '/' + pcc.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}



// json-server --watch src/assets/data/db.json