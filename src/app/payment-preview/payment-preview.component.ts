import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { PopupService } from '../popup.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CountriesService } from '../countries.service';
import * as shajs from 'sha.js';
import { MustMatch } from '../helpers/must-match.validator';
import * as $ from 'jquery';
import { VariableService } from '../variable.service'
import { DatePipe } from '@angular/common';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2'
import { WindowRef } from './WindowRef';
import { ActivatedRoute } from '@angular/router';

declare var Razorpay: any;
@Component({
  selector: 'app-payment-preview',
  templateUrl: './payment-preview.component.html',
  styleUrls: ['./payment-preview.component.css']
})
export class PaymentPreviewComponent implements OnInit {
  paymentData: any = [];
  packageClass: any = [];
  isDisplay: any;
  showButton: boolean = true
  currencyData: any;
  currency: any;
  orderDetails: any;
  key: any;
  amount: any;
  propIdVal: any;
  propIdValPack: any;
  off_type: boolean;
  options: any;
  temp: boolean;
  partial: boolean;
  fullAmount: boolean;
  partialAmount: boolean = false;
  propertiesId: any;
  isStatus: boolean = false;
  newState:any;
  termsValue:any;
  isValid:boolean=true;
  isPack:boolean=false;
  constructor(private api: ApiService, private spinnerService: Ng4LoadingSpinnerService, private popup: PopupService, private router: Router, private country: CountriesService, private formBuilder: FormBuilder, public variable: VariableService, private datePipe: DatePipe, private winRef: WindowRef, private activatedRoute: ActivatedRoute) {
    

  }
  paymentForm: FormGroup;
  submitted = false;
  title = 'client';
  //  orderDetails=(JSON.parse(localStorage.getItem('orderData')))
  //     this.key=this.orderDetails.data_key
  //     this.amount=this.orderDetails.data_amount

  changestaus(event) {
    //console.log(event.target.checked)
    if (event.target.checked) {
      this.showButton = false;
    }
    else {
      this.showButton = true;
    }

  }
  modify() {
    this.variable.isScroll = true;
    this.router.navigate(['touristAdd', this.propertiesId])
  }
  modifyPackage() {
    this.variable.isScroll = true;
    this.router.navigate(['info', this.propIdVal])
  }
  ngOnInit() {
    // if(!this.variable.isPay){
    //   this.router.navigate([''])
    //   // $("html, body").animate({ scrollTop: 0 });
    //   // this.variable.isScroll=false;
    // }
    // this.isDisplay=localStorage.getItem("cast");
    this.activatedRoute.params.subscribe(paramsId => {
       if (paramsId.mid) {
        this.propertiesId = paramsId.mid;
      }
    });
    // this.activatedRoute.queryParamMap
    //   .subscribe(params => {
    //     this.newState=params.get('state')
    //     if(this.newState=='true'){
    //       this.isStatus=true;
    //     }
        
    //   });

    this.paymentForm = this.formBuilder.group({
      payMode: ['', [Validators.required]],
      termsValue: ['']
    })
    this.paymentForm.reset();
    this.isDisplay = localStorage.getItem("cast")
    console.log(this.isDisplay)
    this.propIdVal = localStorage.getItem("bid")
    this.propIdValPack = localStorage.getItem("bidPkd")
    // this.api.currencyFetch().subscribe((data:any)=>{
    //   //console.log(data)
    //   this.currencyData=data.data
    //   this.currency='IND'
    // })
     if (localStorage.getItem("cast") == 'true') {
      this.spinnerService.show()
      this.api.paymentSamudramFetch(+localStorage.getItem('uid'), localStorage.getItem('sessionid'), +this.propertiesId).subscribe((data: any) => {
        if (data.status == "Success" && data.data[0]) {
          this.isPack=true
          //console.log(data)
          this.spinnerService.hide()
          this.paymentData = data.data[0];
          this.packageClass = data.data.package_class
          this.paymentData.offer_amount = this.paymentData.offer_amount
          this.off_type = this.paymentData.offer_hike;
          this.temp = this.paymentData.partially_paid;
          if (this.temp == false) {
            this.partial = false;
            this.paymentForm.get('payMode').setValidators(null);
            this.paymentForm.get('payMode').setErrors(null)
          }
          else {
            if(this.temp==true && this.paymentData.paid_amount=='0.00'){
              this.partial = true;
              this.paymentForm.get('payMode').setValidators([Validators.required]);
            }
            else{
              this.partial = false;
              this.paymentForm.get('payMode').setValidators(null);
              this.paymentForm.get('payMode').setErrors(null)
            }

          }
          if(this.paymentData.paid_amount=='0.00'){
            this.isStatus=false
          }
          else{
            this.isStatus=true
          }

        }
        else {
          this.spinnerService.hide()
          if (data.status == 'Fail' && data.message =='Payment process already completed for this booking id') {
            this.router.navigate([''])
          }
          else {
            this.popup.failureMessage = "Something went wrong please try again"
            this.popup.failurepopup();
            this.router.navigate([''])
          }

        }
      },
        (err: HttpErrorResponse) => {
          // this.popup.failureMessage = "Internal Server Error"
          // this.popup.failurepopup();
          this.spinnerService.hide()
          if (err.status == 403) {
            localStorage.clear()
            this.variable.isLogin = false
            this.variable.isScroll = true;
            this.router.navigate([''])
          }
        });
    }
    else {
      this.spinnerService.show()
      this.api.paymentPropertyFetch(+localStorage.getItem('uid'), localStorage.getItem('sessionid'), +this.propertiesId).subscribe((data: any) => {
        if (data.status == "Success" && data.data[0]) {
          //console.log(data)
          this.isPack=false
           this.paymentData = data.data[0];
          this.paymentData.offer_amount = this.paymentData.offer_amount
          this.off_type = this.paymentData.offer_hike;
          this.temp = this.paymentData.partially_paid;
          if (this.temp == false) {
            this.partial = false;
            this.paymentForm.get('payMode').setValidators(null);
            this.paymentForm.get('payMode').setErrors(null)
          }
          else {
            if(this.temp==true && this.paymentData.paid_amount=='0.00'){
              this.partial = true;
              this.paymentForm.get('payMode').setValidators([Validators.required]);
            }
            else{
              this.partial = false;
              this.paymentForm.get('payMode').setValidators(null);
              this.paymentForm.get('payMode').setErrors(null)
            }
           

          }
          if(this.paymentData.paid_amount=='0.00'){
            this.isStatus=false
          }
          else{
            this.isStatus=true
          }
          this.spinnerService.hide()
        }
        else {
          this.spinnerService.hide()
          if (data.status == 'Fail') {
            this.popup.failureMessage = data.message
            this.popup.failurepopup();
          }
          else {
            this.popup.failureMessage = "Something went wrong please try again"
            this.popup.failurepopup();
            this.router.navigate([''])
          }

        }
      },
        (err: HttpErrorResponse) => {
          // this.popup.failureMessage = "Internal Server Error"
          // this.popup.failurepopup();
          this.spinnerService.hide()
          if (err.status == 403) {
            localStorage.clear()
            this.variable.isLogin = false
            this.variable.isScroll = true;
            this.router.navigate([''])
          }
        });
    }
  }

  get f() { return this.paymentForm.controls; }
  selectcurrency(data) {
    //console.log(data)
    //console.log(this.currency)
  }

  handleChange(event) {
    if (event.target.value == "fullPayment") {
      this.partialAmount = false;
      this.isStatus = false;
    }
  }
  handleChangeSecond(part) {
    if (part.target.value == "partialPayment") {
      this.partialAmount = true;
      this.isStatus = true;
    }
  }
  initPay() {
    this.submitted = true;
    if(this.paymentForm.value.termsValue==true){
      this.isValid=true;
    }else{
      this.isValid=false;
    }
    if (this.paymentForm.invalid || !this.isValid ) {

      return;
    }
    // console.log(this.paymentForm)
    this.spinnerService.show()

    this.api.orderManagement(localStorage.getItem('sessionid'), +localStorage.getItem('uid'), +this.propertiesId, this.isStatus).subscribe((data: any) => {
      // this.spinnerService.hide()
      if (data.status == "Success" && data.data[0]) {
        //console.log(data)

        localStorage.setItem('data_key', (data.data[0].data_key))
        localStorage.setItem('data_amount', (data.data[0].data_amount))
        localStorage.setItem('data_currency', (data.data[0].data_currency))
        localStorage.setItem('data_order_id', (data.data[0].data_order_id))
        localStorage.setItem('data_prefill_email', (data.data[0].data_prefill_email))
        localStorage.setItem('data_prefill_name', (data.data[0].data_prefill_name))
        localStorage.setItem('description', (data.data[0].description))
        localStorage.setItem('name', (data.data[0].name))
        localStorage.setItem('user_mobile', (data.data[0].user_mobile))
        localStorage.setItem('callback_url', (data.data[0].callback_url))
        // this.onUpdateServer()
        this.variable.isScroll = true;
        this.options = {
          "order_id": localStorage.getItem('data_order_id'),
          "key": localStorage.getItem('data_key'), // Enter the Key ID generated from the Dashboard
          "amount": localStorage.getItem('data_amount'), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
          "currency": localStorage.getItem('data_currency'),
          "name": localStorage.getItem('data_prefill_name'),
          "description": localStorage.getItem('description'),
          "image": "../../assets/images/gol-logo.png",

          // callback_url: 'http://192.168.1.90:5000/api/v1/payment_management',
          // redirect: true,
          handler: this.paymentResponseHander.bind(this),

          // "handler": function (response) {
          //   //console.log(response)
          //   this.orderDetails=response
          //   this.successpayment(response)
          //     // alert(response.razorpay_payment_id);
          // },
          "prefill": {
            "name": localStorage.getItem('data_prefill_name'),
            "email": localStorage.getItem('data_prefill_email'),
            "contact": localStorage.getItem('user_mobile')
          },
          "notes": {
            "address": "note value"
          },
          "theme": {
            "color": "#3583D2"
          }
        };
        setTimeout(() => {
          this.spinnerService.hide()   //<<<---    using ()=> syntax
          var rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
          rzp1.open();
        }, 200);

      }
      else {
        this.spinnerService.hide()
        this.popup.failureMessage = data.message
        this.popup.failurepopup();
      }
    },
      (err: HttpErrorResponse) => {
        // this.popup.failureMessage="Internal Server Error"
        //     this.popup.failurepopup();
        this.spinnerService.hide()
        if (err.status == 403) {
          localStorage.clear()
          this.variable.isLogin = false
          this.variable.isScroll = true;
          this.router.navigate([''])
        }
      });

    // this.spinnerService.show()
    //console.log("works");
  }
  //   successpayment(response){
  //   this.spinnerService.show()
  //         this.api.paymentManagement(localStorage.getItem('sessionid'),localStorage.getItem('uid'),response.razorpay_payment_id,response.razorpay_signature,response.razorpay_order_id).subscribe((data:any)=>{
  //           if (data.status == "Success") {
  //             this.api.verifyPayment(localStorage.getItem('sessionid'),localStorage.getItem('uid'),localStorage.getItem('data_order_id')).subscribe((data:any)=>{
  //               this.spinnerService.hide()
  //               if (data.status == "Success") {
  //                 this.popup.sucessMessage=data.message
  //                 this.popup.sucesspopup();
  //                 this.router.navigate([''])
  //               }
  //               else{

  //               }
  //             })
  //           }
  //           else{

  //           }
  //         })
  // }
  paymentResponseHander(response) {
    // this.spinnerService.show()
    localStorage.setItem('response', JSON.stringify(response))
    this.variable.isScroll = true;
    this.router.navigate(['paymentSuccess'])

  }
  accept(event){
if(event.target.checked==true){
  this.isValid=true
}else{
  this.isValid=false
}
  }


  terms() {
    this.router.navigate(['terms'])
  }
}
