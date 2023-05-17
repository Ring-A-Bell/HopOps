import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/services/sales.service';
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.scss']
})
export class SalesPageComponent implements OnInit{

  private user: string = "000000000000000000021";

  public columnsToDisplay: string[] = ['SaleID', 'SaleDate', 'PaymentMethod'];
  public dataSource = new MatTableDataSource();

  public saleList: any;

  constructor(private router: Router, private $sales: SalesService){
      $sales.getSaleHistory(this.user).subscribe( (result: any) => {
        this.saleList = result;
        console.log("Sales page loaded")
      })
  };

  ngOnInit(): void {
    
  }

}
