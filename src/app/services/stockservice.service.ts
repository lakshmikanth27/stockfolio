import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockserviceService {
  private apiUrl: string = 'https://api.twelvedata.com/stocks?apikey=61eff100185b403ea884e250a7897a84';

  constructor(private http: HttpClient) { }

  getStocks() {
    return this.http.get(this.apiUrl);
  }

}
