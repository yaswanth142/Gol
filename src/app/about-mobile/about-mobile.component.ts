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
  selector: 'app-about-mobile',
  templateUrl: './about-mobile.component.html',
  styleUrls: ['./about-mobile.component.css']
})
export class AboutMobileComponent implements OnInit {

  constructor(private api: ApiService, private spinnerService: Ng4LoadingSpinnerService, private popup: PopupService, private router: Router,private formBuilder: FormBuilder, public variable: VariableService) {  
    this.variable.isHeader=false
    // $('#exampleModalCenter1').modal('hide');
  }

  ngOnInit() {
  }

}
