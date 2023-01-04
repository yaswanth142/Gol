import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import {PopupService} from '../popup.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CountriesService } from '../countries.service';
import * as shajs from 'sha.js';
import { MustMatch } from '../helpers/must-match.validator';

import { VariableService } from '../variable.service'
import { DatePipe } from '@angular/common';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  sessionid:string;
  uid:any; 
  countryjson:any;
  len:any
  tname:any;
  i:number;
  cname:any=[];
  sname:any=[];
  dname:any=[];
  mstate:any;
  mcity:any;
  mcountry:any;
  isDob:boolean=false;
  address:any;
  firstname:string;
  lastName:string;
  email:string;
  phone:any;
  dob:any;
  pincode;
  nationality;
  mcountry1;
  mstate1;
  Ndata:any;
  mcity1;
  changed:boolean=false;
  errMsg:boolean=false;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  offerData=[
    {
      "offername":"Hike",
      "offersmall":"hike"
    },
    {
      "offername":"Drop",
      "offersmall":"drop"
    }
  ]
  
  oldpassword: any;
    newpassword: any;
    msg: any;
    religion:any=[];
    confirmpassword:any;
  
  profileDetails:any;
    minDate:any;
    maxDate:any
    showpass:boolean;
    shownewpass:boolean;
    showconfirmpass:boolean;
  constructor(private api:ApiService,private spinnerService: Ng4LoadingSpinnerService,private popup:PopupService,private router:Router,private country:CountriesService,private formBuilder: FormBuilder, public variable: VariableService,private datePipe:DatePipe) { 
this.showpass=false;
this.shownewpass=false
this.showconfirmpass=false;

  }
  ChangePassForm: FormGroup;
   submitted = false;
  
  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.sessionid = localStorage.getItem('sessionid');
    this.uid = localStorage.getItem('uid');
    this.ChangePassForm = this.formBuilder.group({
      oldpassword:['',Validators.required],
      password: ['', Validators.required],
      confirmPassword:['',Validators.required],
     
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }
  get f() { return this.ChangePassForm.controls; }
  submit(){
    this.submitted = true;
    if (this.ChangePassForm.invalid) {
      return;
    }
    this.oldpassword = shajs('sha512').update(this.ChangePassForm.value.oldpassword).digest('hex')
    this.newpassword = shajs('sha512').update(this.ChangePassForm.value.password).digest('hex')
this.spinnerService.show()
    this.api.updatePassword(this.uid, this.sessionid, this.oldpassword, this.newpassword).subscribe((data: any) => {
      this.spinnerService.hide()
      if (data.status == "Success") {
        this.spinnerService.hide()
       this.ChangePassForm.reset();
       this.variable.isScroll=true;
        this.router.navigate(['']);
        this.variable.logout();
        this.popup.sucessMessage = "Password changed successfully. Please login!";
        this.popup.sucesspopup();
      }
      else {
        if (data.status == 'Fail') {
          // this.msg = data.message;
          this.popup.failureMessage = data.message;
          this.popup.failurepopup();
          // f.reset()
        }
        else {
          this.popup.failureMessage = "Server Error";
          this.popup.failurepopup();
        }
      }

    },
      (err: HttpErrorResponse) => {
        this.spinnerService.hide()
        // this.isError = true;
        // this.popup.failureMessage = "Server Error";
        // this.popup.failurepopup();
        // this.ChangePassForm.reset();
        if (err.status == 403) {
          localStorage.clear()
          this.variable.isLogin=false
          this.variable.isScroll=true;
           this.router.navigate([''])
        }
      });
  }
  passwordToggle(){
    this.showpass= !this.showpass;
  }
  passwordNewToggle() {
    this.shownewpass = !this.shownewpass;
  }
  passwordConfirmToggle() {
    this.showconfirmpass = !this.showconfirmpass;
  }
}
