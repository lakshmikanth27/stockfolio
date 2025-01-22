import { Component } from '@angular/core';
import { Router } from '@angular/router';
import type { ICellRendererAngularComp } from "ag-grid-angular";

import type {
  ICellRendererParams,
} from "ag-grid-community";

import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-clickstock',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './clickstock.component.html',
  styleUrl: './clickstock.component.scss'
})
export class ClickstockComponent implements ICellRendererAngularComp {
  params: any;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    return true;
  }
  constructor(private router: Router) { }
  onStockClick(): void {
    const { symbol, exchange, name } = this.params.data;
    this.router.navigateByUrl(`${symbol}/info`, { state: {
      symbol,
      exchange,
      name
    } });
  }
}
