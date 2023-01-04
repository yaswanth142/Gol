import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { PopupService } from '../popup.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as shajs from 'sha.js';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import * as $ from 'jquery';
import { VariableService } from '../variable.service'
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  // enquiryType: any = [{ enq_type: "Tourist Enquiry", enq_type_id: 1 },
  // { enq_type: "Partner Enquiry", enq_type_id: 5 }
  // ];
  enquiryType: any = [];
  tabs: any = [];
  firstname: any;
  lastname: any;
  email: any;
  mobile: any;
  message: any;
   userType: any;
  firstnameSecond: any;
  lastnameSecond: any;
  emailSecond: any;
  mobileSecond: any;
  messageSecond: any;
  sourceInfo: any = [];
  source:any;
  isMessage:boolean=false;
  rem_char:any;
  constructor(public api: ApiService , public variable: VariableService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, public popup: PopupService, private formBuilder: FormBuilder) {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.api.getEnquiryType().subscribe((data: any) => {
      //console.log(data)
      this.enquiryType = data.data;
      //console.log(this.enquiryType)
      // this.userType = this.enquiryType[0].enq_type_id;
      // if (this.enquiryType.length != 0) {
      //   this.enquiryType[0].active = true;
      // }
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });
  }

  enquiryForm: FormGroup;
  isSubmitted = false;

  enquiryPartnerForm: FormGroup;
  isSubmit = false;


  ngOnInit() {
    this.isMessage=false
    this.api.getSourceQuestions().subscribe((data: any) => {
      this.sourceInfo = data.data;
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });

    this.enquiryForm = this.formBuilder.group({
      enquiryVal: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, RxwebValidators.email()]],
      mobile: ['', Validators.required],
      source: [''],
      message: ['', Validators.required],
    });
    this.enquiryPartnerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, RxwebValidators.email()]],
      mobile: ['', Validators.required],
      message: ['', Validators.required],
    });
    this.enquiryForm.reset()
    this.enquiryPartnerForm.reset()
    this.enquiryType = [];

  }
  get g() { return this.enquiryForm.controls; }
  get f() { return this.enquiryPartnerForm.controls; }

  // selectTab(tab) {
  //   //console.log(tab)
  //   this.enquiryForm.reset();
  //   this.isSubmitted = false;

  //   tab.active = true;
  //   this.enquiryType[0].active = false;
  //   this.userType = tab.enq_type_id;
  // }
  onSubmit() {
    this.isSubmitted = true;
    if (this.enquiryForm.invalid) {
      return;
    }

    this.spinnerService.show()
    this.userType = this.enquiryForm.value.enquiryVal
    this.firstname = this.enquiryForm.value.firstname
    this.lastname = this.enquiryForm.value.lastname
    this.email = this.enquiryForm.value.email
    this.mobile = this.enquiryForm.value.mobile
    this.message = this.enquiryForm.value.message
    this.source = this.enquiryForm.value.source


    this.api.enquiryTouristAdd(this.userType, this.firstname, this.lastname, this.email, this.mobile, this.message,this.source).subscribe((data: any) => {
      this.spinnerService.hide()
      if (data.status == "Success") {
        this.popup.sucessMessage = data.message
        this.popup.sucesspopup();
        this.enquiryForm.reset()
        this.isSubmitted = false;
        this.isMessage=false
      }
      else {

        if (data.status == 'Fail') {
          this.popup.failureMessage = data.message
          this.popup.failurepopup();


        }
        else {
          this.popup.failureMessage = "Internal Server Error"
          this.popup.failurepopup();
          this.enquiryForm.reset()
        }

      }
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });
  }
  reset() {
    this.enquiryForm.reset()
    this.isSubmitted = false;
  }
  // onSubmitSecond() {
  //   this.isSubmit = true;
  //   if (this.enquiryPartnerForm.invalid) {
  //     return;
  //   }

  //   this.spinnerService.show()
  //   this.firstnameSecond = this.enquiryPartnerForm.value.firstname
  //   this.lastnameSecond = this.enquiryPartnerForm.value.lastname
  //   this.emailSecond = this.enquiryPartnerForm.value.email
  //   this.mobileSecond = this.enquiryPartnerForm.value.mobile
  //   this.messageSecond = this.enquiryPartnerForm.value.message

  //   this.api.enquiryTouristAdd(this.userType, this.firstnameSecond, this.lastnameSecond, this.emailSecond, this.mobileSecond, this.messageSecond).subscribe((data: any) => {
  //     this.spinnerService.hide()
  //     if (data.status == "Success") {
  //       this.popup.sucessMessage = data.message
  //       this.popup.sucesspopup();
  //       this.enquiryPartnerForm.reset()
  //     }
  //     else {

  //       if (data.status == 'Fail') {
  //         this.popup.failureMessage = data.message
  //         this.popup.failurepopup();


  //       }
  //       else {
  //         this.popup.failureMessage = "Internal Server Error"
  //         this.popup.failurepopup();
  //         this.enquiryPartnerForm.reset()
  //       }

  //     }
  //   });
  // }

  charCout(event){
    if(event.target.value.length==0){
      this.isMessage=false
    }else{
      this.isMessage=true
    }
    this.rem_char=500-event.target.value.length
  }
}
