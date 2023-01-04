import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { PopupService } from '../popup.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
import { VariableService } from '../variable.service'
@Component({
  selector: 'app-aboutlakshadweep',
  templateUrl: './aboutlakshadweep.component.html',
  styleUrls: ['./aboutlakshadweep.component.css']
})
export class AboutlakshadweepComponent implements OnInit {

  constructor(private api: ApiService, private spinnerService: Ng4LoadingSpinnerService, private popup: PopupService, private router: Router,private formBuilder: FormBuilder, public variable: VariableService) { }
  backIsland(){
    this.variable.isScroll=true;
     this.router.navigate(['islandList'])

  }
  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    
  }

}
