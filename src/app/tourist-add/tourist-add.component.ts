import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router';
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
import { CanComponentDeactivate } from "../can-deactivate-guard.service";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-tourist-add',
  templateUrl: './tourist-add.component.html',
  styleUrls: ['./tourist-add.component.css']
})
export class TouristAddComponent implements OnInit, CanComponentDeactivate {
  changesSaved = false;
  id: any;
  primaryDetails: any;
  secondaryDetails: any;
  fullname: any;
  mobileno: any;
  nationality: any;
  address: any;
  gender: any;
  dob: any;
  email: any
  foodpreference: any;
  onUpdateServer() {
    this.changesSaved = true;
  }
  canDeactivate() {
    if (this.changesSaved) {
      return true;
    } else {
      return confirm('Do you want to discard changes');
    }
  }

  constructor(private api: ApiService, private spinnerService: Ng4LoadingSpinnerService, private popup: PopupService, private router: Router, private country: CountriesService, private formBuilder: FormBuilder, public variable: VariableService, private datePipe: DatePipe, private route: ActivatedRoute) {

    this.spinnerService.show()
    this.route.params.subscribe((params => {
      //console.log(params.b_id)
      this.id = params.b_id
      // this.deptcode = params.deptid
      this.api.bookingDetails(localStorage.getItem('sessionid'), localStorage.getItem('uid'), this.id).subscribe((data: any) => {
        this.spinnerService.hide()
        //console.log(data)

        if (data.status == 'Success') {

          if (data.message != "No data") {
            this.primaryDetails = data.data[0].primary_users;
            this.secondaryDetails = data.data[0].secondary_users;
            this.fullname = this.primaryDetails.individual_booking_name;
            this.mobileno = this.primaryDetails.ibd_mobile;
            this.nationality = this.primaryDetails.ibd_nationality;
            this.address = this.primaryDetails.ibd_address;
            this.email = this.primaryDetails.ibd_email;
            this.gender = this.primaryDetails.ibd_gender;
            this.dob = this.primaryDetails.ibd_age;
            this.foodpreference = this.primaryDetails.ibd_food_pref;

            this.traveldetailForm.get('fullName').setValue(this.fullname)
            this.traveldetailForm.get('guardianName').setValue(this.primaryDetails.ibd_guardian_name)
            this.traveldetailForm.get('address').setValue(this.address)
            this.traveldetailForm.get('dob').setValue(this.dob)
            this.traveldetailForm.get('mobile').setValue(this.mobileno)
            this.traveldetailForm.get('nationality').setValue(this.nationality)
            if (this.nationality != 'Indian') {
              this.isPassport = true
            }
            else {
              this.isPassport = false
            }
            this.traveldetailForm.get('foodpreference').setValue(this.foodpreference)
            this.traveldetailForm.get('gender').setValue(this.gender)
            this.traveldetailForm.get('email').setValue(this.primaryDetails.ibd_email)
            if (this.primaryDetails.ibd_passport != null) {
              this.traveldetailForm.get('passportNo').setValue(this.primaryDetails.ibd_passport)
            }
            if (this.primaryDetails.city_id != null) {
              this.traveldetailForm.get('country').setValue(this.primaryDetails.country_id)


              this.spinnerService.show()

              this.api.getState(this.primaryDetails.country_id).subscribe((data: any) => {
                // this.spinnerService.hide()
                //console.log(data)
                this.stateInfo = data.data
                this.traveldetailForm.get('state').setValue(this.primaryDetails.state_id)
                this.api.getCity(this.primaryDetails.state_id).subscribe((data: any) => {
                  this.spinnerService.hide()
                  //console.log(data)
                  this.cityInfo = data.data
                  this.traveldetailForm.get('city').setValue(this.primaryDetails.city_id)
                  // this.traveldetailForm.reset()


                },
                  (err: HttpErrorResponse) => {
                    this.popup.failureMessage = "Internal Server Error"
                    this.popup.failurepopup();
                    this.spinnerService.hide()
                  });
              },
                (err: HttpErrorResponse) => {
                  this.popup.failureMessage = "Internal Server Error"
                  this.popup.failurepopup();
                  this.spinnerService.hide()
                });
            } else {
              this.traveldetailForm.get('city').setValue(null)
              this.traveldetailForm.get('state').setValue(null)
              this.traveldetailForm.get('country').setValue(null)
            }
            for (let i = 0; i < this.secondaryNumber - 1; i++) {
              this.countryCheck.push(0)
              this.addCategory()
              if (this.secondaryDetails.length > 0) {
                this.formArr.at(i).patchValue({ ibd_name: this.secondaryDetails[i].individual_booking_name });
                this.formArr.at(i).patchValue({ ibd_gender: this.secondaryDetails[i].ibd_gender });
                this.formArr.at(i).patchValue({ ibd_age: this.secondaryDetails[i].ibd_age });
                this.formArr.at(i).patchValue({ ibd_nationality: this.secondaryDetails[i].ibd_nationality });
                this.formArr.at(i).patchValue({ ibd_food_pref: this.secondaryDetails[i].ibd_food_pref });
                if (this.secondaryDetails[i].ibd_nationality != "Indian") {
                  this.countryCheck[i] = 1
                  this.formArr.at(i).patchValue({ ibd_passport: this.secondaryDetails[i].ibd_passport });
                } else {
                  this.formArr.at(i).patchValue({ ibd_passport: "null" });
                  this.countryCheck[i] = 0
                }

              }
              // this.formArr.at(i).patchValue({ s_passportNo: 0 });
              if (this.secondaryDetails[i].city_id == null) {


                this.formArr.at(i).patchValue({ s_country: null });
                this.formArr.at(i).patchValue({ s_state: null });
                this.formArr.at(i).patchValue({ city_id: null });
              }
              else {
                this.formArr.at(i).patchValue({ s_country: this.secondaryDetails[i].country_id });

                this.spinnerService.show()

                this.api.getState(this.secondaryDetails[i].country_id).subscribe((data: any) => {
                  // this.spinnerService.hide()
                  //console.log(data)
                  this.stateInfo = data.data
                  this.formArr.at(i).patchValue({ s_state: this.secondaryDetails[i].state_id });
                  this.api.getCity(this.secondaryDetails[i].state_id).subscribe((data: any) => {
                    this.spinnerService.hide()
                    //console.log(data)
                    this.cityInfo = data.data
                    this.formArr.at(i).patchValue({ city_id: this.secondaryDetails[i].city_id });
                    // this.traveldetailForm.reset()


                  },
                    (err: HttpErrorResponse) => {
                      this.popup.failureMessage = "Internal Server Error"
                      this.popup.failurepopup();
                      this.spinnerService.hide()
                    });
                },
                  (err: HttpErrorResponse) => {
                    this.popup.failureMessage = "Internal Server Error"
                    this.popup.failurepopup();
                    this.spinnerService.hide()
                  });
              }
            }

          } else {

            for (let i = 0; i < this.secondaryNumber - 1; i++) {
              this.countryCheck.push(0)
              this.addCategory()
              // if(this.secondaryDetails.length>0){
              //   this.formArr.at(i).patchValue({ ibd_name: this.secondaryDetails[i].ibd_name });
              // }else{
              //   this.traveldetailForm.reset()
              // }
              this.formArr.at(i).patchValue({ s_passportNo: 0 });
            }
            this.traveldetailForm.reset()
          }


        }
        else {
          this.spinnerService.hide()
          this.popup.failureMessage = "Server Error";
          this.popup.failurepopup();
        }
      },
        (err: HttpErrorResponse) => {
          this.spinnerService.hide()
          // this.isError = true;
          // this.popup.failureMessage = "Server Error";
          // this.popup.failurepopup();
          if (err.status == 403) {
            localStorage.clear()
            this.variable.isLogin = false
            this.variable.isScroll = true;
            this.router.navigate([''])
          }
        });

    })

    )
  }




  traveldetailForm: FormGroup;
  submitted = false;
  secondaryNumber: any;
  Ndata: any;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  countryCheck: any = [];
  isPassport: boolean = false;
  fullName: any;
  guardianName: any;
  // gender:any;
  // dob:any;
  // address:any;
  city_id: any;
  // nationality:any;
  foodType: any;
  mobileInfo: any;
  emailInfo: any;
  passportInfo: any;
  countryName: any;
  secondaryList: any = [];
  adultCount: any;
  childCount: any;
  t_adultCount: any;
  t_childCount: any;


  genderDetails = [
    { gname: 'Male' },
    { gname: 'Female' },
    { gname: 'Others' },
  ];

  foodpre = [
    { fname: 'Veg' },
    { fname: 'Non Veg' },
  ];


  ngOnInit() {
    // this.traveldetailForm.reset()
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    // this.adultCount = localStorage.getItem('adultcount')
    // this.childCount = localStorage.getItem('childcount')
    this.traveldetailForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      guardianName: [''],
      address: [''],
      country: [''],
      state: [''],
      city: [''],
      email: ['', [Validators.required, RxwebValidators.email()]],
      mobile: ['', Validators.required],
      nationality: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', [Validators.required, RxwebValidators.maxNumber({ value: 100 }), RxwebValidators.minNumber({ value: 2 })]],
      passportNo: ['', Validators.required],
      foodpreference: ['', Validators.required],
      itemRows: this.formBuilder.array([]),
    });
    this.secondaryNumber = localStorage.getItem('totalcount');

    this.traveldetailForm.get('passportNo').setValue(0);

    //console.log(this.countryCheck[1])



    // this.spinnerService.show()
    this.api.getNationality().subscribe((data: any) => {
      this.Ndata = data
      this.api.getCountry().subscribe((data: any) => {
        // this.spinnerService.hide()
        if (data.status == 'Success') {
          this.countryInfo = data.data
        }

      },
        (err: HttpErrorResponse) => {
          this.spinnerService.hide()
          // this.isError = true;
          this.popup.failureMessage = "Server Error";
          this.popup.failurepopup();
        });
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
      });

  }

  get formArr() {
    return this.traveldetailForm.get('itemRows') as FormArray;
  }

  delFormArry() {
    while (this.formArr.length !== 0) {
      this.formArr.removeAt(0)
    }
  }

  addCategory() {
    this.formArr.push(this.initItemRows());
  }

  initItemRows() {
    return this.formBuilder.group({
      ibd_name: ['', [Validators.required]],
      ibd_gender: ['', [Validators.required]],
      ibd_age: ['', [Validators.required, RxwebValidators.maxNumber({ value: 100 }), RxwebValidators.minNumber({ value: 2 })]],
      ibd_nationality: ['', [Validators.required]],
      ibd_food_pref: ['', [Validators.required]],
      ibd_passport: ["", [Validators.required]],
      s_country: ['',],
      s_state: [''],
      city_id: [''],
    });
  }

  reset() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.value) {
        this.traveldetailForm.reset()
        this.submitted = false
      }
    })
  }
  get f() { return this.traveldetailForm.controls; }
  onSubmit() {
    this.t_adultCount = 0;
    this.t_childCount = 0;
    //console.log(this.traveldetailForm)
    this.submitted = true
    if (this.traveldetailForm.invalid) {
      return;
    }
    //console.log(this.traveldetailForm)
    this.fullName = this.traveldetailForm.value.fullName
    this.guardianName = this.traveldetailForm.value.guardianName
    this.gender = this.traveldetailForm.value.gender
    this.dob = this.traveldetailForm.value.dob
    if (+this.dob > 11) {
      this.t_adultCount = this.t_adultCount + 1
    } else {
      this.t_childCount = this.t_childCount + 1
    }
    this.address = this.traveldetailForm.value.address
    this.city_id = this.traveldetailForm.value.city
    this.nationality = this.traveldetailForm.value.nationality
    // this.countryName = this.traveldetailForm.value.country
    this.foodType = this.traveldetailForm.value.foodpreference
    this.mobileInfo = this.traveldetailForm.value.mobile
    this.emailInfo = this.traveldetailForm.value.email
    this.passportInfo = this.traveldetailForm.value.passportNo;
    this.secondaryList = this.traveldetailForm.value.itemRows;
    //console.log( this.secondaryList.length)
    if (this.secondaryList.length > 0) {
      for (let list of this.secondaryList) {
        //console.log(list.ibd_age)
        if (+list.ibd_age > 11) {
          this.t_adultCount = this.t_adultCount + 1
        } else {
          this.t_childCount = this.t_childCount + 1
        }
      }
      //console.log(this.t_adultCount,this.adultCount)
      //console.log(this.t_childCount,this.childCount)
    }
    // if (this.t_adultCount != +this.adultCount && this.t_childCount != +this.childCount) {
    //   this.popup.failureMessage = "Adult,Child count mismatch"
    //   this.popup.failurepopup()
    // }
    // else {


      this.spinnerService.show()
      this.api.passengerAdd(localStorage.getItem('uid'), localStorage.getItem('sessionid'), localStorage.getItem('note'), this.fullName, this.guardianName, this.gender, this.dob, this.address, this.city_id, this.nationality, this.countryName, this.foodType, this.mobileInfo, this.emailInfo, this.passportInfo, this.secondaryList).subscribe((data: any) => {

        if (data.status == "Success") {
          localStorage.setItem("mat", data.data[0].booking_id)
          localStorage.setItem("cast", data.data[0].is_package)
          this.onUpdateServer()
          this.router.navigate(['payment', data.data[0].booking_id]);

        }
        else {
          if (data.status == 'Fail') {
            this.spinnerService.hide()
            this.popup.failureMessage = data.message
            this.popup.failurepopup();
            this.submitted = false
          }
          else {
            this.spinnerService.hide()
            this.popup.failureMessage = data.message
            this.popup.failurepopup();
          }

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
    // }
  }

  getState(data) {
    this.stateInfo = []
    this.cityInfo = []
    this.traveldetailForm.get('state').setValue(null)
    this.traveldetailForm.get('city').setValue(null)
    this.spinnerService.show()
    //console.log(data.country_id)
    var c_id = data.country_id
    this.api.getState(c_id).subscribe((data: any) => {
      this.spinnerService.hide()
      //console.log(data)
      this.stateInfo = data.data
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
      });
  }

  getCity(data) {
    this.cityInfo = []
    this.traveldetailForm.get('city').setValue(null)
    this.spinnerService.show()
    //console.log(data.state_id)
    var s_id = data.state_id
    this.api.getCity(s_id).subscribe((data: any) => {
      this.spinnerService.hide()
      //console.log(data)
      this.cityInfo = data.data
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
      });
  }


  getStateSec(data, i) {
    //console.log(this.formArr)
    this.stateInfo = []
    this.cityInfo = []

    this.formArr.at(i).patchValue({ s_state: null });
    this.formArr.at(i).patchValue({ city_id: null });
    this.spinnerService.show()
    //console.log(data.country_id)
    var c_id = data.country_id
    this.api.getState(c_id).subscribe((data: any) => {
      this.spinnerService.hide()
      //console.log(data)
      this.stateInfo = data.data
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
      });
  }

  getCitySec(data, i) {
    this.cityInfo = []
    this.formArr.at(i).patchValue({ city_id: null });
    this.spinnerService.show()
    //console.log(data.state_id)
    var s_id = data.state_id
    this.api.getCity(s_id).subscribe((data: any) => {
      this.spinnerService.hide()
      //console.log(data)
      this.cityInfo = data.data
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
      });
  }

  getNationality(data) {
    //console.log(data)
    if (data.nationality != "Indian") {
      this.isPassport = true
      this.traveldetailForm.get('passportNo').setValue(null)
      // this.traveldetailForm.get('passportNo').setValidators([Validators.required])
    }
    else {
      this.isPassport = false
      this.traveldetailForm.get('passportNo').setValue("null")
      // this.traveldetailForm.get('passportNo').setValidators(null)

    }
  }

  nationalityCheck(data, i) {
    //console.log(data)
    if (data.nationality == "Indian") {
      this.countryCheck[i] = 0
      this.formArr.at(i).patchValue({ ibd_passport: "null" });

    }
    else {
      this.countryCheck[i] = 1
      this.formArr.at(i).patchValue({ ibd_passport: null });
    }

  }

}
