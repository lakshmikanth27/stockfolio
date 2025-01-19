import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockserviceService {
  private api_key:string|number = '61eff100185b403ea884e250a7897a84';
  private apiUrl: string = 'https://api.twelvedata.com/';

  constructor(private http: HttpClient) { }
  getStocks(symbol: string=''): Observable<any[]> {
    if (!symbol.trim()) {
      return of([]);
    }

    return this.http.get<any[]>(`${this.apiUrl}stocks?symbol=${symbol}&apikey=${this.api_key}`).pipe(
      catchError(this.handleError<any[]>('search', []))
    );
  }

  getStockDetails(symbol:string, exchange:string) {
    if (!symbol.trim()) {
      return of([]);
    }
    return this.http.get<any[]>(`${this.apiUrl}time_series?apikey=${this.api_key}&interval=1h&symbol=${symbol}&exchange=${exchange}&outputsize=50&dp=1`)
    .pipe(catchError(this.handleError<any[]>('results', [])))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
