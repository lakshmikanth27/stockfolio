import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StockserviceService } from '../../services/stockservice.service';

import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';



@Component({
  selector: 'app-stockpage',
  standalone: true,
  imports: [
    CommonModule, 
    MatInputModule,  
    MatProgressSpinnerModule, 
    MatCardModule,
    ReactiveFormsModule,
    MatListModule
  ],
  templateUrl: './stockpage.component.html',
  styleUrl: './stockpage.component.scss'
})
export class StockpageComponent implements OnInit {

  searchControl = new FormControl();
  searchResults: any[] = [];
  isLoading = false;
  allResults: any;
  stockResults: any[] = [];
  hideSearchResults = false;

  constructor(private stockSRV: StockserviceService, private router: Router) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => this.performSearch(query))
    ).subscribe(results => {
      this.allResults = results
      this.searchResults = this.allResults.data;
      this.isLoading = false;
    });
  }

  performSearch(query: string) {
    this.isLoading = true;
    return this.stockSRV.getStocks(query);
  }

  getStockResults(symbol: any, exchange: string, name: string) {
    const stockData = { symbol, exchange, name};
    this.router.navigateByUrl(`${symbol}/info`, { state: stockData });
  }
}

