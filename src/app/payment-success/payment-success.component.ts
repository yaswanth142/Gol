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
declare var Razorpay: any; 
@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
successData:any;
amount:any;
date:any;
bookingId:any;
tranId:any;
  constructor(private api: ApiService, private spinnerService: Ng4LoadingSpinnerService, private popup: PopupService, private router: Router, private country: CountriesService, private formBuilder: FormBuilder, public variable: VariableService, private datePipe: DatePipe) { }

  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    var response=JSON.parse(localStorage.getItem('response'))

    this.spinnerService.show()
    this.api.paymentManagement(localStorage.getItem('sessionid'),localStorage.getItem('uid'),response.razorpay_payment_id,response.razorpay_signature,response.razorpay_order_id).subscribe((data:any)=>{
      if (data.status == "Success") {
        //console.log(data)
        this.api.verifyPayment(localStorage.getItem('sessionid'),localStorage.getItem('uid'),localStorage.getItem('data_order_id')).subscribe((data:any)=>{
          this.spinnerService.hide()
          if (data.status == "Success") {
            //console.log(data)
            this.successData=data.data[0]
            this.date=this.successData.transaction_date
            this.amount=this.successData.amount
            this.bookingId=this.successData.booking_id
            this.tranId=this.successData.transaction_id
            // this.popup.sucessMessage=data.message
            // this.popup.sucesspopup();


        // localStorage.removeItem('data_key')
        // localStorage.removeItem('data_amount')
        // localStorage.removeItem('data_currency')
        // localStorage.removeItem('data_order_id')
        // localStorage.removeItem('data_prefill_email')
        // localStorage.removeItem('data_prefill_name')
        // localStorage.removeItem('description')
        // localStorage.removeItem('name')
        // localStorage.removeItem('user_mobile')
        // localStorage.removeItem('callback_url')
           
          }
          else{
            this.popup.failureMessage="Internal Server Error"
            this.popup.failurepopup();
        this.spinnerService.hide()
          }
        },
        (err :HttpErrorResponse)=>{
          // this.popup.failureMessage="Internal Server Error"
          //     this.popup.failurepopup();
          // this.spinnerService.hide()
          if (err.status == 403) {
            localStorage.clear()
            this.variable.isLogin=false
            this.variable.isScroll=true;
            this.router.navigate([''])
          }
        });
      }
      else{
        this.spinnerService.hide()
         this.popup.failureMessage="Internal Server Error"
        this.popup.failurepopup();
      }
    },
    (err :HttpErrorResponse)=>{
      // this.popup.failureMessage="Internal Server Error"
      //     this.popup.failurepopup();
      this.spinnerService.hide()
      if (err.status == 403) {
        localStorage.clear()
        this.variable.isLogin=false
        this.variable.isScroll=true;
         this.router.navigate([''])
      }
    });
  }

  goHome(){
    this.variable.isScroll=true;
    this.router.navigate(['bookingHistory']);
  }

}
