import { Component, OnInit } from '@angular/core';
import { CalculatorServiceService } from '../calculator-service.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  private service: CalculatorServiceService;
  firstOperand: string;
  secondOperand: string;
  current="";
  states = {
    firstInput: "1",
    OpChoice: "2",
    secondInput: "3",
    error: "4,"
  };
  currentState:string;
  private currentOperation:any;
  private currentOneOperation:any;
  delay=500;

  constructor(service: CalculatorServiceService){
    this.service = service;
    this.current = "0";
    this.firstOperand="0";
    this.secondOperand = "0";
    this.currentState = this.states.firstInput;
    this.currentOperation = null; 
    this.currentOneOperation = null;
  }

  ngOnInit(): void {
    this.current = "0";
  }

  ngOnChanges():void{
    console.log("current= "+this.current);
  }

  public reset(){
    this.current = "0";
    this.firstOperand = "0";
    this.secondOperand = "";
    this.currentState = this.states.firstInput;
  }

  // public concatDigit(digit:string, operand:string){
  //   if(operand === "0"){
  //     operand = digit;
  //   }else{

  //   }
  // }

  public numberButton(digit:string){
    switch (this.currentState) {
      case this.states.firstInput:
        if(this.firstOperand === "0"){
          this.firstOperand = digit;
        }else{
          this.firstOperand += digit;
        }
        break;

      case this.states.OpChoice:
        this.currentState = this.states.secondInput;
        this.secondOperand = digit;
        break;

      case this.states.secondInput:
        if(this.secondOperand === ""){
          this.secondOperand = digit;
        }else{
          this.secondOperand += digit;
        }
        break;

      default:
        break;
    }
  }

  public decimalPointButton(){
    switch (this.currentState) {
      case this.states.firstInput:
        if(!this.firstOperand.includes('.')){
          this.firstOperand += '.';
        }
        break;

      case this.states.OpChoice:
        this.currentState = this.states.secondInput;
        this.secondOperand += "0.";
        break;

      case this.states.secondInput:
        if(!this.secondOperand.includes('.')){
          this.secondOperand += '.';
        }
        break;
    
      default:
        break;
    }
  }


  public async twoOpButton(fn:(x:string,y:string)=>void){
    switch (this.currentState) {
      case this.states.firstInput:
        this.currentState = this.states.OpChoice;
        this.currentOperation = fn;
        break;
      
      case this.states.OpChoice:
        this.currentOperation = fn;
        break;

      case this.states.secondInput:
        //console.log("current before:"+this.current);
        this.currentOperation(this.firstOperand, this.secondOperand);
        await new Promise(f => setTimeout(f, this.delay));
        console.log("current after"+this.current);
        this.secondOperand = "";
        this.firstOperand = this.current;
        this.currentOperation = fn
        this.currentState = this.states.OpChoice;
        break;
    
      default:
        break;
    }
  }

  public async oneOpButton(fn:(x:string)=>void){
    switch (this.currentState) {
      case this.states.firstInput:
        this.currentOneOperation = fn;
        this.currentOneOperation(this.firstOperand);
        await new Promise(f => setTimeout(f, this.delay));
        this.firstOperand = this.current;
        this.currentState = this.states.firstInput;
        this.currentOperation = fn;
        break;
      
      case this.states.OpChoice:
        this.currentOneOperation = fn;
        this.currentOneOperation(this.firstOperand);
        await new Promise(f => setTimeout(f, this.delay));
        this.secondOperand = this.current;
        this.currentState = this.states.secondInput;
        break;

      case this.states.secondInput:
        this.currentOneOperation = fn;
        this.currentOneOperation(this.secondOperand);
        await new Promise(f => setTimeout(f, this.delay));
        this.secondOperand = this.current;
        this.currentState = this.states.secondInput;
        break;
    
      default:
        break;
    }
  }

  public async equal(){
    switch (this.currentState) {
      case this.states.firstInput:
        this.current = this.firstOperand;
        this.currentState = this.states.firstInput;
        break;
      case this.states.OpChoice:
        this.secondOperand=this.firstOperand;
        this.currentOperation(this.firstOperand, this.secondOperand);
        await new Promise(f => setTimeout(f, this.delay));
        this.secondOperand = "";
        this.firstOperand = this.current;
        this.currentState = this.states.firstInput;
        break;
      case this.states.secondInput:
        this.currentOperation(this.firstOperand, this.secondOperand);
        await new Promise(f => setTimeout(f, this.delay));
        this.secondOperand = "";
        this.firstOperand = this.current;
        this.currentState = this.states.firstInput;
        break;
    
      default:
        break;
    }
  }

  

  public negate(){
    switch(this.currentState){
      case this.states.firstInput:
        this.firstOperand = this.firstOperand.toString();
        if(this.firstOperand.charAt(0) === "-"){
          this.firstOperand = this.firstOperand.replace('-',"");
        }else{
          this.firstOperand = "-"+this.firstOperand;
        }
        
        break;
      case this.states.secondInput:
        this.secondOperand = this.secondOperand.toString();
        if(this.secondOperand.charAt(0) === "-"){
          this.secondOperand = this.secondOperand.replace('-',"");
        }else{
          this.secondOperand = "-"+this.secondOperand;
        }
        break;
      default:
        break;
    }
  }

  public backspace(){
    this.firstOperand = this.firstOperand.toString();
    this.secondOperand = this.secondOperand.toString();
    switch (this.currentState) {
      case this.states.firstInput:
        if(this.firstOperand !== "0"){
          this.firstOperand = this.firstOperand.slice(0,-1);
        }else{
          this.firstOperand = "0";
        }
        break;

      case this.states.secondInput:
        if(this.secondOperand !== "0"){
          this.secondOperand = this.secondOperand.slice(0,-1);
        }else{
          this.secondOperand = "0";
        }
        break;
    
      default:
        break;
    }
  }


  public add(x:string, y:string):void{
    
    this.service.add(x, y).subscribe((response:string)=>{this.current=response;});
  }

  public subtract(x:string, y:string):void{
    this.service.subtract(x, y, (response)=>this.current=response);
  }

  public multiply(x:string, y:string):void{
    this.service.multiply(x, y, (response)=>this.current=response);
  }

  public divide(x:string, y:string):void{
    this.service.divide(x, y, (response)=>this.current=response);
  }

  public reciprocal(x:string):void{
    this.service.reciprocal(x, (response)=>this.current=response);
  }

  public sqrt(x:string):void{
    this.service.sqrt(x, (response)=>this.current=response);
  }

  public square(x:string):void{
    this.service.square(x, (response)=>this.current=response);
  }

  public percent2param(x:string, y:string):void{
    this.service.percent2param(x, y, (response)=>this.current=response);
  }

  public percent1param(x:string):void{
    this.service.percent1param(x, (response)=>this.current=response);
  }

  

}
