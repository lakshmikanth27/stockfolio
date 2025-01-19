import { Routes } from '@angular/router';
import { StockpageComponent } from './components/stockpage/stockpage.component';
import { PortfoliopageComponent } from './components/portfoliopage/portfoliopage.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { StockdetailsComponent } from './components/stockdetails/stockdetails.component';

export const routes: Routes = [
    {
        path: 'stockpage',
        component: StockpageComponent
    },
    {
        path: 'portfoliopage',
        component: PortfoliopageComponent
    },
    {
        path: ':stock/info',
        component: StockdetailsComponent
    },
    {
        path: '',
        redirectTo: '/stockpage',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PagenotfoundComponent
    }
];
