import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariableService } from '../variable.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-privateproperty',
  templateUrl: './privateproperty.component.html',
  styleUrls: ['./privateproperty.component.css']
})
export class PrivatepropertyComponent implements OnInit {
  propertyList:any=[];
  constructor(public api: ApiService, private router: Router, public variable: VariableService, private formBuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.api.privateListFetch().subscribe((data: any) => {
      if (data.status = "Success") {
        this.spinnerService.hide();
        this.propertyList = data.data;
      }
      else {
        this.spinnerService.hide();
      }
    });
  }

}
