import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { VariableService } from '../variable.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import { Slick } from "ngx-slickjs"
import * as $ from 'jquery';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import { DatePipe } from '@angular/common';
import { PopupService } from '../popup.service'
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { constants } from '../constants'



declare var jQuery: any;
@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  offerData:any;
  constructor(public api: ApiService, private router: Router, public variable: VariableService, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, public popup: PopupService) { }

  ngOnInit() {
    
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.spinner.show()
    this.api.offerFetch().subscribe((data:any)=>{
      this.spinner.hide()
      this.offerData=data.data
      // console.log(data)
    })
  }

}
