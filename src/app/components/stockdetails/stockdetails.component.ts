import { Component, OnInit } from '@angular/core';
import { AgCharts } from "ag-charts-angular";
import { AgChartOptions } from "ag-charts-community";
import { StockserviceService } from '../../services/stockservice.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-stockdetails',
  standalone: true,
  imports: [AgCharts, MatCardModule, MatButtonModule],
  templateUrl: './stockdetails.component.html',
  styleUrl: './stockdetails.component.scss'
})
export class StockdetailsComponent implements OnInit  {
  results: AgChartOptions = {
    title: { text: '' },
    data: [],
    series: [],
  };
  stockDetails: any;

  constructor (private stockSRV: StockserviceService) {
  }
  ngOnInit(): void {
    const stockDetails = history.state;
    this.subscribeStockDetails(stockDetails.symbol, stockDetails.exchange, stockDetails.name);
  }
  
  subscribeStockDetails(symbol: string, exchange: string, name: string) {
    this.stockSRV.getStockDetails(symbol, exchange).subscribe((data: any) => {
      const stockPrice = data.values[0].close;
      this.stockDetails = 
      {name, stockPrice, ...data.meta,};
      console.log(stockPrice);

      const stockResults = data.values.map((item: any) => ({
        datetime: item.datetime, 
        close: parseFloat(item.close), 
      }))
      this.results = {
        title: {
          text: 'Stock Price Movement',
        },
        data: stockResults,
        series: [
          {
            type: "line",
            xKey: "datetime",
            yKey: "close",
            yName: "Close Price",
          },
        ],
      };
    });
    }
  }