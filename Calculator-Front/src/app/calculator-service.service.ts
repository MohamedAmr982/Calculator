import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {

  private httpClient: HttpClient;

  private calcURL = "http://localhost:8080/calc";
  private addPath = "/add";
  private subtractPath = "/subtract";
  private multiplyPath = "/multiply";
  private dividePath = "/divide";
  private reciprocalPath = "/reciprocal";
  private sqrtPath = "/sqrt";
  private squarePath = "/square";
  private percent2paramPath = "/percent2param";
  private percent1paramPath = "/percent1param";

  private requestHeader = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };


  constructor(client: HttpClient) {
    this.httpClient = client;
  }

  add(x:string, y:string):any{
    let numX = Number(x);
    let numY = Number(y);
    if(x!=="" && y!=="" && !isNaN(numX) && !isNaN(numY) && isFinite(numX) && isFinite(numY)){
      let requestBody = {
        "x":numX,
        "y":numY
      };

      return this.httpClient.post<string>(this.calcURL+this.addPath, requestBody, this.requestHeader)
    }else{
      return "E";
    }
  }

  subtract(x:string, y:string, fn:(response:any)=>any){
    let numX = Number(x);
    let numY = Number(y);
    if(x!=="" && y!=="" && !isNaN(numX) && !isNaN(numY) && isFinite(numX) && isFinite(numY)){
      let requestBody = {
        "x":numX,
        "y":numY
      };

      this.httpClient.post(this.calcURL+this.subtractPath, requestBody, this.requestHeader)
      .subscribe(fn);
    }else{
      fn("E")
    }
  }

  multiply(x:string, y:string, fn:(response:any)=>any){
    let numX = Number(x);
    let numY = Number(y);
    if(x!=="" && y!=="" && !isNaN(numX) && !isNaN(numY) && isFinite(numX) && isFinite(numY)){
      let requestBody = {
        "x":numX,
        "y":numY
      };

      this.httpClient.post(this.calcURL+this.multiplyPath, requestBody, this.requestHeader)
      .subscribe(fn);
    }else{
      fn("E");
    }
  }

  divide(x:string, y:string, fn:(response:any)=>any){
    let numX = Number(x);
    let numY = Number(y);
    //divsion by zero is handled on server side
    if(x!=="" && y!=="" && !isNaN(numX) && !isNaN(numY) && isFinite(numX) && isFinite(numY)){
      let requestBody = {
        "x":numX,
        "y":numY
      };

      this.httpClient.post(this.calcURL+this.dividePath, requestBody, this.requestHeader)
      .subscribe(fn);
    }
    return "E";
  }

  reciprocal(x:string, fn:(response:any)=>any){
    let numX = Number(x);
    if(x!=="" &&!isNaN(numX) && isFinite(numX)){
      let requestBody = {
        "x":numX,
      };

      this.httpClient.post(this.calcURL+this.reciprocalPath, requestBody, this.requestHeader)
      .subscribe(fn);
    }else{
      fn("E");
    }
  }

  sqrt(x:string, fn:(response:any)=>any){
    let numX = Number(x);
    if(x!=="" && !isNaN(numX) && isFinite(numX)){
      let requestBody = {
        "x":numX,
      };

      this.httpClient.post(this.calcURL+this.sqrtPath, requestBody, this.requestHeader)
      .subscribe(fn);
    }else{
      fn("E");
    }
  }

  square(x:string, fn:(response:any)=>any){
    let numX = Number(x);
    if(x!=="" && !isNaN(numX) && isFinite(numX)){
      let requestBody = {
        "x":numX,
      };

      this.httpClient.post(this.calcURL+this.squarePath, requestBody, this.requestHeader)
      .subscribe(fn);
    }else{
      fn("E")
    }
  }

  percent2param(x:string, y:string, fn:(response:any)=>any){
    let numX = Number(x);
    let numY = Number(y);
    if(x!=="" && y!=="" && !isNaN(numX) && !isNaN(numY) && isFinite(numX) && isFinite(numY)){
      let requestBody = {
        "x":numX,
        "y":numY,
      };

      this.httpClient.post(this.calcURL+this.percent2paramPath, requestBody, this.requestHeader)
      .pipe(tap(fn));
    }else{
      fn("E")
    }
  }

  percent1param(x:string, fn:(response:any)=>any){
    let numX = Number(x);
    if(x!=="" && !isNaN(numX) && isFinite(numX)){
      let requestBody = {
        "x":numX,
      };

      this.httpClient.post(this.calcURL+this.percent1paramPath, requestBody, this.requestHeader)
      .subscribe(fn);
    }else{
      fn("E")
    }
  }

}
