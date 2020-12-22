import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Sale{
  transactionId:any;
  customerId:any;
  itemId:any;
  amountPaid:any;


 }
@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private http:HttpClient) { }
  getSales(){
    return this.http.get<Sale[]>('https://raw.githubusercontent.com/yuya373/spark-tutorial/master/src/main/resources/sales.json')
  }
}
