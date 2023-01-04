import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { PopupService } from '../popup.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var jQuery: any;
import * as $ from 'jquery';
import { VariableService } from '../variable.service';
import { ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-terms-mobile',
  templateUrl: './terms-mobile.component.html',
  styleUrls: ['./terms-mobile.component.css']
})
export class TermsMobileComponent implements OnInit {
  option:any;

  constructor(private api: ApiService, private spinnerService: Ng4LoadingSpinnerService, private popup: PopupService, private router: Router,private formBuilder: FormBuilder, public variable: VariableService, private activatedRoute: ActivatedRoute,private vps: ViewportScroller) { this.variable.isHeader=false
    jQuery('#exampleModalCenter1').modal('hide');
    this.activatedRoute.params.subscribe(paramsId => {
      console.log(paramsId)
      this.option=paramsId.option
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
