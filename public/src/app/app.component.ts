import { Component, OnInit} from '@angular/core';
import {HttpService} from './http.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  contact: Object;
  step = 0;
  data;

  constructor(private http:HttpClient){
    this.data = {
      name: "",
      email:"",
      message:"",
    };
  }

  setStep(index: number){
    this.step = index;
  }

  nextStep(){
    this.step++;
  }

  prevStep(){
    this.step--;
  }

  ngOnInit(){

  }

  onSubmit(){
    this.http.post('send', this.data)
    .subscribe(data => {
      console.log(data);
    });

  }
}