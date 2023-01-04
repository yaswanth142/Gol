import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { PopupService } from '../popup.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import * as shajs from 'sha.js';
import * as $ from 'jquery';
import { VariableService } from '../variable.service'

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit {
  id: any;
  primaryDetails: any;
  secondaryDetails: any = [];
  fullname: any;
  mobileno: any;
  nationality: any;
  address: any;
  gender: any;
  dob: any;
  entryPermitStatus
  foodpreference: any;
  email: any;
  guardian: any;
  p_age: any;
  p_passport: any;

  b_status: any;
  b_date: any;
  isPackage: boolean;
  p_name: any;
  s_date: any;
  e_date: any;
  b_entryPermitStatus: any;
  bookingClass:any=[];

  constructor(public api: ApiService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, public popup: PopupService, private route: ActivatedRoute, private formBuilder: FormBuilder, public variable: VariableService) {
    this.spinnerService.show()
    this.route.params.subscribe((params => {
      //console.log(params.id)
      this.id = params.id
      // this.deptcode = params.deptid
      this.api.bookingDetails(localStorage.getItem('sessionid'), localStorage.getItem('uid'), this.id).subscribe((data: any) => {

        //console.log(data)

        if (data.status == 'Success') {
          if (data.message != "No data") {
            this.primaryDetails = data.data[0].primary_users;
            this.secondaryDetails = data.data[0].secondary_users;
            this.bookingClass = data.data[0].class_list
            this.fullname = this.primaryDetails.individual_booking_name;
            this.mobileno = this.primaryDetails.ibd_mobile;
            this.nationality = this.primaryDetails.ibd_nationality;
            this.entryPermitStatus = this.primaryDetails.entry_permit_status;
            this.email = this.primaryDetails.ibd_email;
            // this.email=this.primaryDetails.;
            this.gender = this.primaryDetails.ibd_gender;
            // this.dob = this.primaryDetails.;
            this.guardian = this.primaryDetails.ibd_guardian_name;
            this.p_age = this.primaryDetails.ibd_age;
            this.p_passport = this.primaryDetails.ibd_passport;
            this.foodpreference = this.primaryDetails.ibd_food_pref;
            this.b_status = data.data[0].booking_details.booking_status;
            this.b_date = data.data[0].booking_details.booked_date;
            this.isPackage = data.data[0].booking_details.is_package;
            this.p_name = data.data[0].booking_details.pkg_name;
            this.s_date = data.data[0].booking_details.journey_start_date;
            this.e_date = data.data[0].booking_details.journey_end_date;
            this.b_entryPermitStatus = data.data[0].booking_details.entry_permit_status;
            this.spinnerService.hide()
          }
          else {
            this.spinnerService.hide()
          }

        }
        else {
          this.spinnerService.hide()
        }
      },
        (err: HttpErrorResponse) => {
          // this.spinnerService.hide()
          // // this.isError = true;
          // this.popup.failureMessage = "Server Error";
          // this.popup.failurepopup();
          if (err.status == 403) {
            localStorage.clear()
            this.variable.isLogin = false
            this.variable.isScroll=true;
            this.router.navigate([''])
          }
        });

    })

    )
  }

  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
  }

}
