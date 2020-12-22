import { Component, OnInit } from '@angular/core';
import { SalesService, Sale } from '../sales.service';


@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit {
  rowGroupMetadata: any;
  sales: Sale[] = [];
  cols :any;
  multiSortMeta: any[];
  slantedColumnHeaders:boolean=false
  
  constructor(private salesService:SalesService) { }


  handleChange(e:any) {
    this.slantedColumnHeaders = e.checked;
}

  ngOnInit() {
    this.cols=[
      {field :"transactionId", header :'transactionId'},
      {field :"customerId", header :'customerId'},
      {field :"itemId", header :'itemId'},
      {field :"amountPaid", header :'amountPaid'}


    ];
  //   this.sales = [
  //     { brand: 'Apple', lastYearSale: '51%', thisYearSale: '40%', lastYearProfit: '$54,406.00', thisYearProfit: '$43,342' },
  //     { brand: 'Samsung', lastYearSale: '83%', thisYearSale: '96%', lastYearProfit: '$423,132', thisYearProfit: '$312,122' },
  //     { brand: 'Microsoft', lastYearSale: '38%', thisYearSale: '5%', lastYearProfit: '$12,321', thisYearProfit: '$8,500' },
  //     { brand: 'Philips', lastYearSale: '49%', thisYearSale: '22%', lastYearProfit: '$745,232', thisYearProfit: '$650,323,' },
  //     { brand: 'Song', lastYearSale: '17%', thisYearSale: '79%', lastYearProfit: '$643,242', thisYearProfit: '500,332' },
  //     { brand: 'LG', lastYearSale: '52%', thisYearSale: ' 65%', lastYearProfit: '$421,132', thisYearProfit: '$150,005' },
  //     { brand: 'Sharp', lastYearSale: '82%', thisYearSale: '12%', lastYearProfit: '$131,211', thisYearProfit: '$100,214' },
  //     { brand: 'Panasonic', lastYearSale: '44%', thisYearSale: '45%', lastYearProfit: '$66,442', thisYearProfit: '$53,322' },
  //     { brand: 'HTC', lastYearSale: '90%', thisYearSale: '56%', lastYearProfit: '$765,442', thisYearProfit: '$296,232' },
  //     { brand: 'Toshiba', lastYearSale: '75%', thisYearSale: '54%', lastYearProfit: '$21,212', thisYearProfit: '$12,533' }
  // ];

  //   this.updateRowGroupMetaData();

    this.salesService.getSales().subscribe((result)=>{
     this.sales=result
    this.updateRowGroupMetaData();
    })
  }
  onSort() {
    this.updateRowGroupMetaData();
    this.multiSortMeta = [];
this.multiSortMeta.push({field: 'transactionId', order: 1});
this.multiSortMeta.push({field: 'customerId', order: -1});
}
updateRowGroupMetaData() {
  this.rowGroupMetadata = {};
  if (this.sales) {
      for (let i = 0; i < this.sales.length; i++) {
          let rowData = this.sales[i];
          let transactionId = rowData.transactionId;
          if (i == 0) {
              this.rowGroupMetadata[transactionId] = { index: 0, size: 1 };
          }
          else {
              let previousRowData = this.sales[i - 1];
              let previousRowGroup = previousRowData.transactionId;
              if (transactionId === previousRowGroup)
                  this.rowGroupMetadata[transactionId].size++;
              else
                  this.rowGroupMetadata[transactionId] = { index: i, size: 1 };
          }
      }
  }
}

}
