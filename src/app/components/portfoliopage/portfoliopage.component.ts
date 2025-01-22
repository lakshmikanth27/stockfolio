import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from "ag-grid-angular";
import {  
  ColDef,
  ClientSideRowModelModule,
  ModuleRegistry,
  ITextCellEditorParams,
  INumberCellEditorParams,
  TextEditorModule,
  NumberEditorModule,
  CellValueChangedEvent,
  GridReadyEvent,
} from "ag-grid-community";

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { StockserviceService } from '../../services/stockservice.service';
import { ClickstockComponent } from '../clickstock/clickstock.component';
import { MatButtonModule } from '@angular/material/button';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextEditorModule,
  NumberEditorModule
]);

interface IRow {
  symbol: string;
  name: string;
  price: number;
  exchange: string;
}
@Component({
  selector: 'app-portfoliopage',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular, 
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './portfoliopage.component.html',
  styleUrl: './portfoliopage.component.scss'
})
export class PortfoliopageComponent {

  rowData: IRow[] =[];
  colDefs: ColDef[] = [
    { 
      headerName: 'Symbol',
      field: "symbol",
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        maxLength: 5,
      } as ITextCellEditorParams,
    },
    { 
      headerName: 'Stock Name',
      field: "name",
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        maxLength: 20,
      } as ITextCellEditorParams,
     },
    {
      headerName: "Stock Price",
      field: "price",
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
        max: 10000,
      } as INumberCellEditorParams,
      valueFormatter: (p) => "$" + (p.value).toLocaleString(),
      flex: 1,
    },
    { 
      headerName: 'Exchange',
      field: "exchange",
      cellEditor: "agTextCellEditor",
      cellEditorParams: {
        maxLength: 20,
      } as ITextCellEditorParams,
    },
    { 
      headerName: 'Action',
      editable: false,
      field: "button", 
      cellRenderer: ClickstockComponent,
      flex: 1 },

  ];

  defaultColDef: ColDef = {
    flex: 1,
    editable: true,
  };
  stockForm: FormGroup;

  constructor( private stockSRV: StockserviceService) {
    this.stockForm = new FormGroup({
      stockSymbol: new FormControl('', [Validators.required]),
      stockName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      stockPrice: new FormControl('', [
          Validators.required,
          this.numberValidator // Use custom validator for phone number
        ]),
      stockExchange: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  onGridReady = (params: GridReadyEvent) => {
    this.stockSRV.getListedStocks().subscribe((res: any) => {
      this.rowData = res.data;
      console.log(this.rowData);
    });  }
  onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log('New Cell Value:', event)
  }

  addStock() {
    console.log('Add Stock:', this.stockForm.value);
    this.rowData.push(
      {
      symbol: this.stockForm.value.stockSymbol,
      name: this.stockForm.value.stockName,
      price: this.stockForm.value.stockPrice,
      exchange: this.stockForm.value.stockExchange,
    }
  );
    this.rowData = [...this.rowData];
    this.stockForm.reset();
    this.stockForm.markAsPristine();
    this.stockForm.markAsUntouched();
  }

  numberValidator(control: any) {
    const value = control.value;
    const isNumber = !isNaN(value); // Check if value is a number
    return isNumber ? null : { 'notNumber': { value: control.value } }; // Return error if not a number
  }
}
