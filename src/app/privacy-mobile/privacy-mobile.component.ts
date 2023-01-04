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
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-privacy-mobile',
  templateUrl: './privacy-mobile.component.html',
  styleUrls: ['./privacy-mobile.component.css']
})
export class PrivacyMobileComponent implements OnInit {
  option:any;
  constructor(private api: ApiService, private spinnerService: Ng4LoadingSpinnerService, private popup: PopupService, private router: Router,private formBuilder: FormBuilder, public variable: VariableService, private activatedRoute: ActivatedRoute,private vps: ViewportScroller) { 
    this.activatedRoute.params.subscribe(paramsId => {
      console.log(paramsId)
      this.option=paramsId.options
      this.scroll(this.option)
      // if(paramsId.option=='courier'){
      //   console.log("dj")

      //   // this.vps.scrollToAnchor('courier');

      //   paramsId.option.scrollIntoView();

      // }else if(paramsId.option=='shopping'){

      // }else{

      // }

      // this.ship_travel_id = paramsId.id;
    });
  }
  scroll(id) {
    this.vps.scrollToAnchor(id);
  }


  ngOnInit() {
    this.variable.isHeader=false
    // $("html, body").animate({ scrollTop: 0 });
  }
  ngAfterViewInit() {
    // Scroll (Anchor) Function to Order History
    if(this.option){
      console.log(this.option)
      this.scroll(this.option)
      // this.vps.scrollToAnchor(this.option);
      // paramsId.option.scrollIntoView();
      // this.scroll('orderhistory');
     }
  }

}
