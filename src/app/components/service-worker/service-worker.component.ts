import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-service-worker',
  templateUrl: './service-worker.component.html',
  styleUrls: ['./service-worker.component.css']
})
export class ServiceWorkerComponent implements OnInit {

  todoList!: any[];
  productList!: any[];

  constructor(private apiService: ApiService) {
    this.productList = [];
    this.todoList = [];
  }

  ngOnInit(): void {
    this.getTodoList();
    this.getProductList();
  }

  getTodoList(){
    this.apiService.getTodoList().subscribe((res) => {
      if(res){
        this.todoList = res;
        this.todoList = this.todoList.slice(0,5);
        console.log("=>(service-worker.component.ts:23) this.todoList", this.todoList);
      }
    });
  }

  getProductList(){
    this.apiService.getProductList().subscribe((res) => {
      if(res){
        this.productList = res.products;
        this.productList = this.productList.slice(0,5);
      }
    });
  }

}
