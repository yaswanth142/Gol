import { Component, OnInit, ViewEncapsulation, SecurityContext } from '@angular/core';
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
import { IMyOptions, INgxMyDpOptions, IMyDate } from 'ngx-mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import { DatePipe } from '@angular/common';
import { PopupService } from '../popup.service'
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { constants } from '../constants'
import * as moment from 'moment';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';


declare var jQuery: any;
@Component({
  selector: 'app-individualproperty',
  templateUrl: './individualproperty.component.html',
  styleUrls: ['./individualproperty.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IndividualpropertyComponent implements OnInit {

  // slideConfig = {
  //   "slidesToShow": 1,
  //   "slidesToScroll": 1,
  //   "nextArrow": "<span class='nav-btn next-slide'></span>",
  //   "prevArrow": "<span class='nav-btn prev-slide'></span>",
  //   "arrows": true,
  //   "dots": true,
  //   'autoplay': true,
  //   "infinite": false,

  //   'responsive': [{
  //     'breakpoint': 1600, 'settings': {
  //       'slidesToShow': 1, 'slidesToScroll': 1,
  //     }
  //   }, {
  //     'breakpoint': 1000, 'settings': {
  //       'slidesToShow': 1, 'slidesToScroll': 1,
  //     }
  //   }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }]
  // };
  transData:boolean=false;
  uid: any;
  sessionid: any;
  startingDate: any;
  endDate: any;
  packageID: any;
  propertyId: any;
  id: any;
  propertyDetails: any;
  imageUrl: any;
  imageName: any;
  propertyName: any;
  roomDetails: any = [];
  review: any = [];
  singleroom: any = [];
  doubleroom: any = [];
  extraroom: any = [];
  adult: any = [];
  child: any = [];
  roomType: any = [];
  roomTypeName: any = [];
  tent: any = [];
  roomThumbPath: any;
  settab: any;
  singleInfo: any;
  bedRules: any = [];
  propertyType: any;
  isValid: boolean = false
  extraIsOr: boolean = false;
  isRule: boolean = false;
  extraRule: boolean = false;
  isTent: boolean = false;
  date1: any;
  pType: any;
  facility: any = [];
  amenity: any = [];
  islandName: any;
  propertyAddress: any;
  singleAvail: any = [];
  avgRating: any;
  counter: number = 1;
  childcounter: number = 0;
  adultcount: any;
  childcount: any;
  totalcount: any;
  isSearch: boolean = false
  travelOptions: any = []
  dateForActive: any;
  range: any;
  noData: boolean = true;
  disablebtn: boolean;
  dateEmpty: boolean;
  transportation: any = [];
  heritage_fee_adult: any = 0.00;
  heritage_fee_child: any = 0.00;
  transport_fee_adult: any = 0.00;
  transport_fee_child: any = 0.00;
  isFee: boolean = false;
  transportMode: any;
  isModeShow: boolean = false;
  isHeritageShow: boolean;
  isHeritageShowChild: boolean = false;
  isTransportPrice: boolean = false;
  heritage_adult: any;
  heritage_child: any;
  transport_adult: any;
  transport_child: any;


  proChidAge:any;
  proAdultAge:any;
  proToddlerAge:any;
  toddler:any=[];
  genChildAge:any;

  singleAndOr:any;
  doubleAndOr:any;
  extraAndOr:any;
  genSingleAdult:any;
  genSingleChild:any;
  genSingleExtra:any;

  genDoubleAdult:any;
  genDoubleChild:any;
  genExtraAdult:any;
  genExtraChild:any;
  genDoubleExtra:any;
  isTrans:boolean=false;

  transAdult:any;
  transChild:any;

  heritageAdult:any;
  heritageChild:any;

  slideConfigReview = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow": "<span class='nav-btn next-slide fa fa-angle-right rightarrow'></span>",
    "prevArrow": "<span class='nav-btn prev-slide fa fa-angle-left leftarrow1'></span>",
    // "dots": true,
    'autoplay': false,
    "infinite": false,

    'responsive': [{ 'breakpoint': 1600, 'settings': { 'slidesToShow': 4, 'slidesToScroll': 1, } }, { 'breakpoint': 1000, 'settings': { 'slidesToShow': 2, 'slidesToScroll': 1, } }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }]
  };

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<span class='nav-btn next-slide'></span>",
    "prevArrow": "<span class='nav-btn prev-slide'></span>",
    "arrows": true,
    "dots": true,
    'autoplay': true,
    "infinite": false,

    'responsive': [{
      'breakpoint': 1600, 'settings': {
        'slidesToShow': 1, 'slidesToScroll': 1,
      }
    }, {
      'breakpoint': 1000, 'settings': {
        'slidesToShow': 1, 'slidesToScroll': 1,
      }
    }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }]
  };
  date10: any = []

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: 0, month: 0, day: 0 },
    // disableDays: [],

  };
  //  disableDays(){
  //    console.log("disable")
  //   let copy = this.getCopyOfOptions();
  //   let data=[{year: 2020, month: 1, day: 21},
  //     {year: 2020, month: 1, day: 25},
  //     {year: 2020, month: 1, day: 30}]
  //   copy.disableDates=data;
  //   this.myDatePickerOptions = copy;
  //  }


  disableUntil() {

    let d = new Date();
    d.setDate(d.getDate() - 1);
    if (this.pType == 'Sports') {
      let copy = this.getCopyOfOptions();
      copy.disableUntil = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate() + 3,


      };


      copy.disableSince = {
        year: d.getFullYear(),
        month: d.getMonth() + 7,
        day: d.getDate() + 3
      };
      let data = [{ year: 2020, month: 1, day: 21 },
      { year: 2020, month: 1, day: 25 },
      { year: 2020, month: 1, day: 30 }]
      // copy.disableDays=data;
      this.myDatePickerOptions = copy;
    }

    else {
      let copy = this.getCopyOfOptions();
      copy.disableUntil = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate() + 21
      };
      copy.disableSince = {
        year: d.getFullYear(),
        month: d.getMonth() + 7,
        day: d.getDate() + 21
      };
      let data = [{ year: 2020, month: 1, day: 21 },
      { year: 2020, month: 1, day: 25 },
      { year: 2020, month: 1, day: 30 }]
      // copy.d=data;
      this.myDatePickerOptions = copy;
      //console.log(this.myDatePickerOptions)
    }
    //console.log(this.date1)


  }


  getCopyOfOptions(): INgxMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptions));
  }


  public myDatePickerOptionsSecond: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    showTodayBtn: false,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: 0, month: 0, day: 0 },

  };
  disableUntil1() {
    let d = new Date();
    d.setDate(d.getDate() - 1);

    if (this.pType == 'Sports') {
      let copy = this.getCopyOfOptions();
      copy.disableUntil = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate() + 3
      };
      copy.disableSince = {
        year: d.getFullYear(),
        month: d.getMonth() + 7,
        day: d.getDate() + 3
      };
      this.myDatePickerOptionsSecond = copy;
    }
    else {
      let copy = this.getCopyOfOptions();
      copy.disableUntil = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate() + 21
      };
      copy.disableSince = {
        year: d.getFullYear(),
        month: d.getMonth() + 7,
        day: d.getDate() + 21
      };
      this.myDatePickerOptionsSecond = copy;
    }


    // let copy = this.getCopyOfOptions();
    // copy.disableUntil = {year: d.getFullYear(), 
    //                      month: d.getMonth() + 1, 
    //                      day: d.getDate()};
    // copy.disableSince = {year: d.getFullYear(), 
    //                       month: d.getMonth() + 6, 
    //                       day: d.getDate()};
    // this.myDatePickerOptionsSecond = copy;
  }
  getCopyOfOptions1(): INgxMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptionsSecond));
  }

  startdate: any;
  setStartDate: any;
  setReturnDate: any;
  propType: any;
  property_id: any;
  countAdult: any = 0;
  countChild: any = 0;
  constructor(public api: ApiService, private router: Router, public variable: VariableService, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, public popup: PopupService, private sanitizer: DomSanitizer) { }
  searchForm: FormGroup;
  submitted = false;
  bookingDetails: any;
  isTransport: boolean = false
  tmode:any;
  ngOnInit() {
    this.transData=false;
    this.isTrans=false;
    this.totalcount = null;
    this.totalcount = "A- " + this.counter;
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.uid = localStorage.getItem('uid');
    this.sessionid = localStorage.getItem('sessionid')
    localStorage.removeItem("bid");
    this.spinner.show();

    this.searchForm = this.formBuilder.group({
      startdate: ['', Validators.required],
      returndate: ['', Validators.required],
      singleInfo: [''],
      transportType: [''],
      itemRows: this.formBuilder.array([this.initItemRows()]),
    });
    this.searchForm.get('transportType').reset();
    this.activatedRoute.params.subscribe(paramsId => {
       this.propType = paramsId.id;
      this.id = paramsId.id;
      localStorage.setItem("bid", this.id)
      if (paramsId.g_id && paramsId.j_id) {
        this.api.guestData(paramsId.g_id,paramsId.j_id).subscribe((data: any) => {
          if (data.status == "Success" && data.message != 'No data') {
            // this.isSearch=true
            // console.log(data)
            this.startdate = data.data[0].start_date
            this.endDate = data.data[0].end_date
            this.bookingDetails = data.data[0].property_booking_details

            this.tmode=data.data[0].transportation_mode

            let date = new Date(this.startdate);
            this.searchForm.patchValue({
              startdate: {
                date: {
                  year: date.getFullYear(),
                  month: date.getMonth() + 1,
                  day: date.getDate()
                },
                jsdate: date
              }
            });
            let date1 = new Date(this.endDate);
            this.searchForm.patchValue({
              returndate: {
                date: {
                  year: date1.getFullYear(),
                  month: date1.getMonth() + 1,
                  day: date1.getDate()
                },
                jsdate: date1
              }
            });
            this.spinner.show();
            this.api.individualPropertyDetails(+this.id).subscribe((data: any) => {
              if (data.status == "Success" && data.message != 'No data') {
                this.noData = true
                this.spinner.hide()
                this.disablebtn = data.data[0].disable;
                this.islandName = data.data[0].island_name;
                this.propertyDetails = data.data[0];
                this.roomDetails = data.data[0].room_category;
                this.review = data.data[0].Reviews;
                this.roomThumbPath = data.data[0].thumb_path;
                // this.bedRules=data.data[0].bed_rules;
                this.imageUrl = this.propertyDetails.property_large_image_path;
                this.imageName = this.propertyDetails.property_url;
                this.propertyName = this.propertyDetails.property_name;
                this.propertyType = data.data[0].pkg_id;
                this.property_id = data.data[0].property_id;
                this.dateForActive = data.data[0].dateList;
                // console.log(this.dateForActive)
                this.pType = data.data[0].property_type_name
                this.facility = data.data[0].facilities_list;
                this.amenity = data.data[0].amenities_list;

                this.proChidAge=data.data[0].child_label
                this.proAdultAge=data.data[0].adult_label
                this.proToddlerAge=data.data[0].toddler_label
                this.genChildAge=data.data[0].general_child_label


                this.genSingleAdult=data.data[0].bed_rules[0].single.bcd_adult;
                this.genSingleChild=data.data[0].bed_rules[0].single.bcd_child;
                this.genSingleExtra=data.data[0].bed_rules[0].single.bcd_extra;
                this.genDoubleAdult=data.data[0].bed_rules[0].double.bcd_adult;
                this.genDoubleChild=data.data[0].bed_rules[0].double.bcd_child;
                this.genDoubleExtra=data.data[0].bed_rules[0].double.bcd_extra;
                this.genExtraAdult=data.data[0].bed_rules[0].extra.bcd_adult;
                this.genExtraChild=data.data[0].bed_rules[0].extra.bcd_adult;
    
                if((+(data.data[0].bed_rules[0].single.bcd_adult) + +(data.data[0].bed_rules[0].single.bcd_child))==data.data[0].bed_rules[0].single.total_count){
                  this.singleAndOr='&'
                }else{
                  this.singleAndOr='or'
                }
    
                if((+(data.data[0].bed_rules[0].double.bcd_adult) + +(data.data[0].bed_rules[0].double.bcd_child))==data.data[0].bed_rules[0].double.total_count){
                  this.doubleAndOr='&'
                }else{
                  this.doubleAndOr='or'
                }
    
                if((+(data.data[0].bed_rules[0].extra.bcd_adult) + +(data.data[0].bed_rules[0].extra.bcd_child))==data.data[0].bed_rules[0].extra.total_count){
                  this.extraAndOr='&'
                }else{
                  this.extraAndOr='or'
                }

                this.propertyAddress = this.sanitizer.sanitize(SecurityContext.HTML, data.data[0].property_address);
                if (this.islandName == 'Kadmat') {
                  // let weekhide = this.getCopyOfOptions();
                  // //console.log(weekhide)
                  // weekhide.disableWeekdays= ['tu', 'th', 'sa', 'su']
                  // let weekhideSecond = this.getCopyOfOptions1();
                  // weekhideSecond.disableWeekdays= ['tu', 'th', 'sa', 'su']
                  this.myDatePickerOptions = {
                    disableWeekdays: ['tu', 'th', 'sa', 'su']
                  }
                  this.myDatePickerOptionsSecond = {
                    disableWeekdays: ['tu', 'th', 'sa', 'su']
                  }

                }
                else {
                  this.myDatePickerOptions = {
                    disableWeekdays: []
                  }
                  this.myDatePickerOptionsSecond = {
                    disableWeekdays: []
                  }
                }
                for (let i = 0; i < this.roomDetails.length; i++) {
                  // if (this.roomDetails[i].room_type == 'Tent') {
                  //   this.isTent = true
                  // }
                  this.roomType.push(this.roomDetails[i].property_room_type_id)
                  this.bedRules.push(this.roomDetails[i].bed_rules)
                  this.roomTypeName.push(this.roomDetails[i].room_type)
                  this.singleroom.splice(i, 0, 0);
                  this.doubleroom.splice(i, 0, 0);
                  this.extraroom.splice(i, 0, 0);
                  this.adult.splice(i, 0, 0);
                  this.child.splice(i, 0, 0);
                  this.tent.splice(i, 0, 0);
                  this.toddler.splice(i, 0, 0);
                  this.roomDetails[i].roomAmount = 0
                }
                for (let i = 0; i < this.bookingDetails.length; i++) {
                  for (let j = 0; j < this.roomDetails.length; j++) {
                    if (this.bookingDetails[i].room_type_name == this.roomDetails[j].room_type) {
                      this.singleroom[j] = this.bookingDetails[i].single
                      this.doubleroom[j] = this.bookingDetails[i].double
                      this.extraroom[j] = this.bookingDetails[i].extra
                      this.adult[j] = this.bookingDetails[i].no_of_adult
                      this.child[j] = this.bookingDetails[i].no_of_child
                      // this.tent[j] = this.bookingDetails[i].tent
                      // this.roomDetails[j].count=+this.bookingDetails[i].count
                      // if (this.roomDetails[j].room_type == 'Tent') {
                      //   this.roomDetails[j].roomAmount = this.roomDetails[i].tent * this.tent[j] + this.roomDetails[i].child * this.child[j]
                      // }
                      // else {
                        this.roomDetails[j].roomAmount = this.roomDetails[j].single * this.singleroom[j] + this.roomDetails[j].double * this.doubleroom[j] + this.roomDetails[j].extra * this.extraroom[j] + this.roomDetails[j].child * this.child[j]
                      // }
                    }


                  }

                }

                for (let i = 0; i < this.roomDetails.length; i++) {
                  this.totalAmount = this.totalAmount + (+this.roomDetails[i].roomAmount)
                }
                var diff = Math.floor((Date.parse(this.endDate) - Date.parse(this.startdate)) / 86400000);
                this.totalAmount = this.totalAmount * diff
                if (this.pType == 'Sports') {
                  let d = new Date();
                  d.setDate(d.getDate() - 1);


                  var newDate = this.addDays(new Date(), 2);
                  var startDate = newDate.toISOString().slice(0, 10);


                  // console.log(startDate)
                  var d1 = this.addMonths(new Date(startDate), 6);

                  var endDate = d1.toISOString().slice(0, 10);
                  // console.log(endDate)
                  let a = moment(new Date(startDate));
                  let b = moment(new Date(endDate));
                  let tempDate = a;
                  let daysCount = b.diff(a, 'days');


                  let dates: any = [];

                  for (let i = 1; i <= daysCount; i++) {
                    tempDate = tempDate.add(1, 'day');
                    var event = new Date(tempDate.toDate());

                    let date = JSON.stringify(event)
                    date = date.slice(1, 11)
                    dates.push(date);
                  }

                  // console.log(dates);
                  // console.log( this.dateForActive)
                  let missing = dates.filter(item => this.dateForActive.indexOf(item) < 0);
                  // console.log(missing);
                  let enableDays: Array<any> = [];
                  for (let i = 0; i < missing.length; i++) {
                    let d: Date = new Date(missing[i]);
                    //  d.setDate(d.getDate() + i);
                    enableDays.push({
                      year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
                    });
                  }
                  this.myDatePickerOptions = {
                    disableDays: enableDays
                  }
                  this.myDatePickerOptionsSecond = {
                    disableDays: enableDays
                  }
                  // console.log(enableDays)
                } else {
                  let d = new Date();
                  d.setDate(d.getDate() - 1);




                  var d2 = this.addDays(d, 21)
                  var startDate = d2.toISOString().slice(0, 10);

                  // console.log(startDate)
                  var d1 = this.addMonths(new Date(startDate), 6);

                  var endDate = d1.toISOString().slice(0, 10);
                  // console.log(endDate)

                  let a = moment(new Date(startDate));
                  let b = moment(new Date(endDate));
                  let tempDate = a;
                  let daysCount = b.diff(a, 'days');

                  let dates: any = [];

                  for (let i = 1; i <= daysCount; i++) {
                    tempDate = tempDate.add(1, 'day');
                    var event = new Date(tempDate.toDate());

                    let date = JSON.stringify(event)
                    date = date.slice(1, 11)
                    dates.push(date);
                  }

                  // console.log(dates);
                  // console.log( this.dateForActive)
                  let missing = dates.filter(item => this.dateForActive.indexOf(item) < 0);
                  // console.log(missing);
                  let enableDays: Array<any> = [];
                  for (let i = 0; i < missing.length; i++) {
                    let d: Date = new Date(missing[i]);
                    //  d.setDate(d.getDate() + i);
                    enableDays.push({
                      year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
                    });
                  }
                  this.myDatePickerOptions = {
                    disableDays: enableDays
                  }
                  this.myDatePickerOptionsSecond = {
                    disableDays: enableDays
                  }
                }



                this.disableUntil()
                this.disableUntil1()
                this.spinner.hide()
              }
              else {
                this.noData = false
                this.popup.failureMessage = data.message
                this.popup.failurepopup();
                this.spinner.hide()
              }
            },
              (err: HttpErrorResponse) => {
                this.noData = false
                this.popup.failureMessage = "Internal Server Error"
                this.popup.failurepopup();
                this.spinner.hide()
              });
          } else {
            this.popup.failureMessage = data.message
            this.popup.failurepopup();
            this.spinner.hide()
          }
        },
          (err: HttpErrorResponse) => {
            this.popup.failureMessage = "Internal Server Error"
            this.popup.failurepopup();
            this.spinner.hide()
          });

          this.api.newCostDetails(+this.id).subscribe((data: any) => {
            if (data.status == "Success" && data.message != 'No data') {
              this.spinner.hide()
              this.isFee = true;
  
  
              this.transportation = data.data[0].transportation;

              this.searchForm.get('transportType').setValue(this.tmode)
                     for(let trans of this.transportation){
                       if(trans.transport_id==this.tmode){
                         this.viewDetails(trans)
                       }
                     }
                     
                   
              this.heritageAdult= data.data[0].heritage_adult_label
              this.heritageChild= data.data[0].heritage_child_label       
              this.heritage_fee_adult = +data.data[0].heritage_fee_adult
              this.heritage_fee_child = +data.data[0].heritage_fee_child
              if (this.transportation[0]) {
                // this.searchForm.get('transportType').setValidators([Validators.required])
                this.isModeShow = true;
              }
              else {
  
                this.isModeShow = false;
  
              }
              if (this.heritage_fee_adult == '0.00' && this.heritage_fee_child == '0.00') {
                this.isHeritageShow = false
              }
              else {
                this.isHeritageShow = true
              }
  
            } else {
              this.isFee = false;
              this.spinner.hide()
            }
          },
            (err: HttpErrorResponse) => {
              this.popup.failureMessage = "Internal Server Error"
              this.popup.failurepopup();
              this.spinner.hide()
            });
        
      } else {

        this.spinner.show()
        this.api.individualPropertyDetails(+this.id).subscribe((data: any) => {
          if (data.status == "Success" && data.message != 'No data') {
            this.noData = true
            this.spinner.hide()
            this.disablebtn = data.data[0].disable;
            this.dateEmpty = data.data[0].datelist_empty;
            this.islandName = data.data[0].island_name;
            this.propertyDetails = data.data[0];
            this.roomDetails = data.data[0].room_category;
            this.review = data.data[0].Reviews;
            this.roomThumbPath = data.data[0].thumb_path;
            // this.bedRules=data.data[0].bed_rules;
            this.imageUrl = this.propertyDetails.property_large_image_path;
            this.imageName = this.propertyDetails.property_url;
            this.propertyName = this.propertyDetails.property_name;
            this.propertyType = data.data[0].pkg_id;
            this.property_id = data.data[0].property_id;
            this.dateForActive = data.data[0].dateList;
            // console.log(this.dateForActive)
            this.pType = data.data[0].property_type_name
            this.facility = data.data[0].facilities_list;
            this.amenity = data.data[0].amenities_list;
            this.travelOptions = data.data[0].isld_travel_option
            this.propertyAddress = data.data[0].property_address;
            this.proChidAge=data.data[0].child_label
            this.proAdultAge=data.data[0].adult_label
            this.proToddlerAge=data.data[0].toddler_label
            this.genChildAge=data.data[0].general_child_label
            
            this.genSingleAdult=data.data[0].bed_rules[0].single.bcd_adult;
            this.genSingleChild=data.data[0].bed_rules[0].single.bcd_child;
            this.genSingleExtra=data.data[0].bed_rules[0].single.bcd_extra;
            this.genDoubleAdult=data.data[0].bed_rules[0].double.bcd_adult;
            this.genDoubleChild=data.data[0].bed_rules[0].double.bcd_child;
            this.genDoubleExtra=data.data[0].bed_rules[0].double.bcd_extra;
            this.genExtraAdult=data.data[0].bed_rules[0].extra.bcd_adult;
            this.genExtraChild=data.data[0].bed_rules[0].extra.bcd_adult;

            if((+(data.data[0].bed_rules[0].single.bcd_adult) + +(data.data[0].bed_rules[0].single.bcd_child))==data.data[0].bed_rules[0].single.total_count){
              this.singleAndOr='&'
            }else{
              this.singleAndOr='or'
            }

            if((+(data.data[0].bed_rules[0].double.bcd_adult) + +(data.data[0].bed_rules[0].double.bcd_child))==data.data[0].bed_rules[0].double.total_count){
              this.doubleAndOr='&'
            }else{
              this.doubleAndOr='or'
            }

            if((+(data.data[0].bed_rules[0].extra.bcd_adult) + +(data.data[0].bed_rules[0].extra.bcd_child))==data.data[0].bed_rules[0].extra.total_count){
              this.extraAndOr='&'
            }else{
              this.extraAndOr='or'
            }

            if (this.islandName == 'Kadmat') {
              // let weekhide = this.getCopyOfOptions();
              // //console.log(weekhide)
              // weekhide.disableWeekdays= ['tu', 'th', 'sa', 'su']
              // let weekhideSecond = this.getCopyOfOptions1();
              // weekhideSecond.disableWeekdays= ['tu', 'th', 'sa', 'su']
              this.myDatePickerOptions = {
                disableWeekdays: ['tu', 'th', 'sa', 'su']
              }
              this.myDatePickerOptionsSecond = {
                disableWeekdays: ['tu', 'th', 'sa', 'su']
              }

            }
            else {
              this.myDatePickerOptions = {
                disableWeekdays: []
              }
              this.myDatePickerOptionsSecond = {
                disableWeekdays: []
              }
            }
            for (let i = 0; i < this.roomDetails.length; i++) {
              // if (this.roomDetails[i].room_type == 'Tent') {
              //   this.isTent = true
              // }
              this.roomType.push(this.roomDetails[i].property_room_type_id)
              this.bedRules.push(this.roomDetails[i].bed_rules)
              this.roomTypeName.push(this.roomDetails[i].room_type)
              this.singleroom.splice(i, 0, 0);
              this.doubleroom.splice(i, 0, 0);
              this.extraroom.splice(i, 0, 0);
              this.adult.splice(i, 0, 0);
              this.child.splice(i, 0, 0);
              this.tent.splice(i, 0, 0);
              this.toddler.splice(i, 0, 0);
              this.roomDetails[i].roomAmount = 0
            }


            if (this.pType == 'Sports') {
              let d = new Date();
              d.setDate(d.getDate() - 1);

              var newDate = this.addDays(new Date(), 2);
              var startDate = newDate.toISOString().slice(0, 10);
              // console.log(startDate)


              // console.log(startDate)
              var d1 = this.addMonths(new Date(startDate), 6);

              var endDate = d1.toISOString().slice(0, 10);
              // console.log(endDate)
              let a = moment(new Date(startDate));
              let b = moment(new Date(endDate));
              let tempDate = a;
              let daysCount = b.diff(a, 'days');


              let dates: any = [];

              for (let i = 1; i <= daysCount; i++) {
                tempDate = tempDate.add(1, 'day');
                var event = new Date(tempDate.toDate());

                let date = JSON.stringify(event)
                date = date.slice(1, 11)
                dates.push(date);
              }

              // console.log(dates);
              // console.log( this.dateForActive)
              let missing = dates.filter(item => this.dateForActive.indexOf(item) < 0);
              // console.log(missing);
              let enableDays: Array<any> = [];
              for (let i = 0; i < missing.length; i++) {
                let d: Date = new Date(missing[i]);
                //  d.setDate(d.getDate() + i);
                enableDays.push({
                  year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
                });
              }
              this.myDatePickerOptions = {
                disableDays: enableDays
              }
              this.myDatePickerOptionsSecond = {
                disableDays: enableDays
              }
              // console.log(enableDays)
            } else {
              let d = new Date();
              d.setDate(d.getDate() - 1);




              var newDate = this.addDays(new Date(), 20)
              var startDate = newDate.toISOString().slice(0, 10);

              // console.log(startDate)
              var d1 = this.addMonths(new Date(startDate), 6);

              var endDate = d1.toISOString().slice(0, 10);
              // console.log(endDate)

              let a = moment(new Date(startDate));
              let b = moment(new Date(endDate));
              let tempDate = a;
              let daysCount = b.diff(a, 'days');

              let dates: any = [];

              for (let i = 1; i <= daysCount; i++) {
                tempDate = tempDate.add(1, 'day');
                var event = new Date(tempDate.toDate());

                let date = JSON.stringify(event)
                date = date.slice(1, 11)
                dates.push(date);
              }

              // console.log(dates);
              // console.log( this.dateForActive)
              let missing = dates.filter(item => this.dateForActive.indexOf(item) < 0);
              // console.log(missing);
              let enableDays: Array<any> = [];
              for (let i = 0; i < missing.length; i++) {
                let d: Date = new Date(missing[i]);
                //  d.setDate(d.getDate() + i);
                enableDays.push({
                  year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
                });
              }
              this.myDatePickerOptions = {
                disableDays: enableDays
              }
              this.myDatePickerOptionsSecond = {
                disableDays: enableDays
              }
            }

            this.disableUntil()
            this.disableUntil1()
            this.spinner.hide()
          }
          else {
            this.noData = false
            this.spinner.hide()
          }
        },
          (err: HttpErrorResponse) => {
            this.noData = false
            this.popup.failureMessage = "Internal Server Error"
            this.popup.failurepopup();
            this.spinner.hide()
          });
        this.api.newCostDetails(+this.id).subscribe((data: any) => {
          if (data.status == "Success" && data.message != 'No data') {
            this.spinner.hide()
            this.isFee = true;


            this.transportation = data.data[0].transportation;
            this.heritageAdult= data.data[0].heritage_adult_label
            this.heritageChild= data.data[0].heritage_child_label 
            this.heritage_fee_adult = +data.data[0].heritage_fee_adult
            this.heritage_fee_child = +data.data[0].heritage_fee_child
            if (this.transportation[0]) {
              // this.searchForm.get('transportType').setValidators([Validators.required])
              this.isModeShow = true;
            }
            else {

              this.isModeShow = false;

            }
            if (this.heritage_fee_adult == '0.00' && this.heritage_fee_child == '0.00') {
              this.isHeritageShow = false
            }
            else {
              this.isHeritageShow = true
            }

          } else {
            this.isFee = false;
            this.spinner.hide()
          }
        },
          (err: HttpErrorResponse) => {
            this.popup.failureMessage = "Internal Server Error"
            this.popup.failurepopup();
            this.spinner.hide()
          });
      }
    });


  }

  addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

  get g() { return this.searchForm.controls; }
  datepick(val) {
    // console.log(this.searchForm.controls.returndate.valid)
    if (val.jsdate != null) {
      if (!this.searchForm.controls.returndate.valid) {
        let d = new Date(val.jsdate);
        // let copy = this.getCopyOfOptions1();
        // copy.disableUntil = {
        //   year: d.getFullYear(),
        //   month: d.getMonth() + 1,
        //   day: d.getDate()
        // };
        // copy.disableSince = {
        //   year: d.getFullYear(),
        //   month: d.getMonth() + 7,
        //   day: d.getDate()
        // };
        // this.myDatePickerOptionsSecond = copy;

        // console.log(val)
        var sdate = val.date
        var startDate = sdate.year + "-" + sdate.month + "-" + sdate.day;

        // console.log(startDate)
        var d3 = this.addMonths(new Date(startDate), 7);

        var endDate = d3.getFullYear() + "-" + (d3.getMonth()) + "-" + (d3.getDate());
        // console.log(endDate)
        let a = moment(new Date(startDate));
        let b = moment(new Date(endDate));
        let tempDate = a;
        let daysCount = b.diff(a, 'days');


        let dates: any = [];

        for (let i = 1; i <= daysCount; i++) {
          tempDate = tempDate.add(1, 'day');
          var event = new Date(tempDate.toDate());

          let date = JSON.stringify(event)
          date = date.slice(1, 11)
          dates.push(date);
        }

        // console.log(dates);
        // console.log( this.dateForActive)
        let missing = dates.filter(item => this.dateForActive.indexOf(item) < 0);
        // console.log(missing);
        let enableDays: Array<any> = [];
        for (let i = 0; i < missing.length; i++) {
          let d: Date = new Date(missing[i]);
          //  d.setDate(d.getDate() + i);
          enableDays.push({
            year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
          });
        }
        //  console.log(enableDays)
        var du = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        }
        var ds = {
          year: d.getFullYear(),
          month: d.getMonth() + 7,
          day: d.getDate()
        }
        this.myDatePickerOptionsSecond = {

          disableUntil: du,
          disableSince: ds,
          disableDays: enableDays,



        }




        //     var startDate =d.getFullYear()+"-"+ (d.getMonth() + 1)+"-"+(d.getDate());

        //     // console.log(startDate)
        //     var d1=this.addMonths(new Date(startDate), 6);

        //     var endDate = d1.getFullYear()+"-"+(d1.getMonth())+"-"+(d1.getDate());
        //     // console.log(endDate)
        //     let a = moment(new Date(startDate));
        //     let b = moment(new Date(endDate));
        //     let tempDate = a;
        //     let daysCount = b.diff(a, 'days');


        //     let dates:any = [];

        //     for(let i= 1;i<=daysCount ;i++){
        //       tempDate =tempDate.add(1, 'day');
        //       var event = new Date(tempDate.toDate());

        //       let date = JSON.stringify(event)
        //       date = date.slice(1,11)
        //       dates.push(date);
        //     }

        //   // console.log(dates);
        //   // console.log( this.dateForActive)
        //   let missing = dates.filter(item =>  this.dateForActive.indexOf(item) < 0);
        //   // console.log(missing);
        //   let enableDays: Array<any> = [];
        // for(let i = 0; i < missing.length; i++) {
        //      let d: Date = new Date(missing[i]);
        //     //  d.setDate(d.getDate() + i);
        //      enableDays.push({
        //          year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
        //      });
        // }

        // this.myDatePickerOptionsSecond ={ 
        //   disableDays:enableDays
        // }
      }
      else {
        let d1 = new Date(val.jsdate);
        let d2 = new Date(d1.getTime() + 86400000);
        if (val.jsdate >= this.searchForm.value.returndate.jsdate) {
          this.searchForm.patchValue({
            returndate: null

          });
        }
        // let copy = this.getCopyOfOptions1();
        // copy.disableUntil = {
        //   year: d1.getFullYear(),
        //   month: d1.getMonth() + 1,
        //   day: d1.getDate()
        // };
        // copy.disableSince = {
        //   year: d1.getFullYear(),
        //   month: d1.getMonth() + 7,
        //   day: d1.getDate()
        // };
        // this.myDatePickerOptionsSecond = copy;


        // console.log(val)
        var sdate = val.date
        var startDate = sdate.year + "-" + sdate.month + "-" + sdate.day;

        // console.log(startDate)
        var d3 = this.addMonths(new Date(startDate), 7);

        var endDate = d3.getFullYear() + "-" + (d3.getMonth()) + "-" + (d3.getDate());
        // console.log(endDate)
        let a = moment(new Date(startDate));
        let b = moment(new Date(endDate));
        let tempDate = a;
        let daysCount = b.diff(a, 'days');


        let dates: any = [];

        for (let i = 1; i <= daysCount; i++) {
          tempDate = tempDate.add(1, 'day');
          var event = new Date(tempDate.toDate());

          let date = JSON.stringify(event)
          date = date.slice(1, 11)
          dates.push(date);
        }

        // console.log(dates);
        // console.log( this.dateForActive)
        let missing = dates.filter(item => this.dateForActive.indexOf(item) < 0);
        // console.log(missing);
        let enableDays: Array<any> = [];
        for (let i = 0; i < missing.length; i++) {
          let d: Date = new Date(missing[i]);
          //  d.setDate(d.getDate() + i);
          enableDays.push({
            year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
          });
        }
        //  console.log(enableDays)
        var du = {
          year: d1.getFullYear(),
          month: d1.getMonth() + 1,
          day: d1.getDate()
        };
        var ds = {
          year: d1.getFullYear(),
          month: d1.getMonth() + 7,
          day: d1.getDate()
        };
        this.myDatePickerOptionsSecond = {

          disableUntil: du,
          disableSince: ds,
          disableDays: enableDays,



        }


        // this.startdate = this.searchForm.get('startdate').value;
        this.endDate = this.searchForm.get('returndate').value;
        this.startdate = val.jsdate;
        this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');
        this.endDate = this.endDate.jsdate;
        this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
        var amount = this.totalAmount
        var diff = Math.floor((Date.parse(this.startdate) - Date.parse(this.endDate)) / 86400000);
        this.totalAmount = 0
        // this.totalAmount=amount*diff
        this.spinner.show()
        this.api.bedAvailability(this.startdate, this.endDate, this.propertyType, this.property_id).subscribe((data: any) => {
          this.spinner.hide()
          // console.log(data)
          if (data.status == "Success") {
            this.roomTypeName = []
            this.roomType = []
            this.bedRules = []
            this.singleroom = []
            this.doubleroom = []
            this.extraroom = []
            this.adult = []
            this.child = []
            this.tent = []
            this.toddler=[]
            if (data.message != 'No data') {


              this.isSearch = true
              this.isData = false
              this.roomDetails = data.data[0].room_category;
              for (let i = 0; i < this.roomDetails.length; i++) {
                // if (this.roomDetails[i].room_type == 'Tent') {
                //   this.isTent = true
                // }
                this.roomType.push(this.roomDetails[i].property_room_type_id)
                this.bedRules.push(this.roomDetails[i].bed_rules)
                this.roomTypeName.push(this.roomDetails[i].room_type)
                this.singleroom.splice(i, 0, 0);
                this.doubleroom.splice(i, 0, 0);
                this.extraroom.splice(i, 0, 0);
                this.adult.splice(i, 0, 0);
                this.child.splice(i, 0, 0);
                this.tent.splice(i, 0, 0);
                this.toddler.splice(i, 0, 0);
                this.roomDetails[i].roomAmount = 0
                this.roomDetails[i].count = +this.roomDetails[i].count
              }
            } else {
              this.isData = true
            }
          }
          else {
            this.popup.failureMessage = data.message
            this.popup.failurepopup()
          }
        },
          (err: HttpErrorResponse) => {
            this.popup.failureMessage = "Internal Server Error"
            this.popup.failurepopup();
            this.spinner.hide()

          });

      }

    }

  }

  datepick2(val) {
    if (val.jsdate != null) {
       if (this.searchForm.controls.startdate.valid) {
         this.startdate = this.searchForm.get('startdate').value;
         // this.endDate = this.searchForm.get('returndate').value;
        this.startdate = this.startdate.jsdate;
         this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');
        this.endDate = val.jsdate;
        this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
        var amount = this.totalAmount
        var diff = Math.floor((Date.parse(this.endDate) - Date.parse(this.startdate)) / 86400000);
        this.totalAmount = 0
        // this.totalAmount=amount*diff
        this.spinner.show()
        this.api.bedAvailability(this.startdate, this.endDate, this.propertyType, this.property_id).subscribe((data: any) => {
          this.spinner.hide()
          this.spinner.hide()
          // console.log(data)
          if (data.status == "Success") {
            this.roomTypeName = []
            this.roomType = []
            this.bedRules = []
            this.singleroom = []
            this.doubleroom = []
            this.extraroom = []
            this.adult = []
            this.child = []
            this.tent = []
            this.toddler=[]
            if (data.message != 'No data') {


              this.isSearch = true
              this.isData = false
              this.roomDetails = data.data[0].room_category;
              for (let i = 0; i < this.roomDetails.length; i++) {
                // if (this.roomDetails[i].room_type == 'Tent') {
                //   this.isTent = true
                // }
                this.roomType.push(this.roomDetails[i].property_room_type_id)
                this.bedRules.push(this.roomDetails[i].bed_rules)
                this.roomTypeName.push(this.roomDetails[i].room_type)
                this.singleroom.splice(i, 0, 0);
                this.doubleroom.splice(i, 0, 0);
                this.extraroom.splice(i, 0, 0);
                this.adult.splice(i, 0, 0);
                this.child.splice(i, 0, 0);
                this.tent.splice(i, 0, 0);
                this.toddler.splice(i, 0, 0);
                this.roomDetails[i].roomAmount = 0
                this.roomDetails[i].count = +this.roomDetails[i].count
              }
            } else {
              this.isData = true
            }
          }
          else {
            this.popup.failureMessage = data.message
            this.popup.failurepopup()
          }
        },
          (err: HttpErrorResponse) => {
            this.popup.failureMessage = "Internal Server Error"
            this.popup.failurepopup();
            this.spinner.hide()

          });

      }
    }
  }

  //   keypress(){
  //     if (this.searchForm.controls.startdate.valid && this.searchForm.controls.returndate.valid){
  //       this.startdate = this.searchForm.get('startdate').value;
  //       this.endDate = this.searchForm.get('returndate').value;
  //       this.startdate = this.startdate.jsdate;
  //       this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');
  //       this.endDate = this.endDate.jsdate;
  //       this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
  //       var diff =  Math.floor((  Date.parse(this.endDate)-Date.parse(this.startdate)  ) / 86400000); 
  //       // this.totalAmount=this.totalAmount*diff
  //       this.spinner.show() 
  //      this.api.bedAvailability(this.startdate,this.endDate,this.propertyType,this.property_id).subscribe((data:any)=>{
  //       this.spinner.hide() 
  //       this.spinner.hide()
  //       // console.log(data)
  //       if (data.status == "Success" ) {
  //         this.roomTypeName=[]
  //         this.roomType=[]
  //         this.bedRules=[]
  //         this.singleroom=[]
  //         this.doubleroom=[]
  //         this.extraroom=[]
  //         this.adult=[]
  //         this.child=[]
  //         this.tent=[]
  //         if(data.message!='No data'){


  //       this.isSearch=true
  //       this.isData=false
  //       this.roomDetails = data.data[0].room_category;
  //       for (let i = 0; i < this.roomDetails.length; i++) {
  //         if (this.roomDetails[i].room_type == 'Tent') {
  //           this.isTent = true
  //         }
  //         this.roomType.push(this.roomDetails[i].property_room_type_id)
  //         this.bedRules.push(this.roomDetails[i].bed_rules)
  //         this.roomTypeName.push(this.roomDetails[i].room_type)
  //         this.singleroom.splice(i, 0, 0);
  //         this.doubleroom.splice(i, 0, 0);
  //         this.extraroom.splice(i, 0, 0);
  //         this.adult.splice(i, 0, 0);
  //         this.child.splice(i, 0, 0);
  //         this.tent.splice(i, 0, 0);
  //         this.roomDetails[i].roomAmount=0
  //       }
  //     }else{
  // this.isData=true
  //     }
  //     }
  //     else{
  //       this.popup.failureMessage = data.message
  //       this.popup.failurepopup()
  //     }
  //     },
  //     (err :HttpErrorResponse)=>{
  //       this.popup.failureMessage="Internal Server Error"
  //           this.popup.failurepopup();
  //       this.spinner.hide()
  //     });
  //     this.totalAmount=0
  //     for (let i = 0; i < this.roomDetails.length; i++) {
  //       this.totalAmount=this.totalAmount+(+this.roomDetails[i].roomAmount)
  //     }
  //     this.totalAmount=this.totalAmount*diff 
  //     }
  //     else{
  //       this.totalAmount=0
  //       for (let i = 0; i < this.roomDetails.length; i++) {
  //         this.totalAmount=this.totalAmount+(+this.roomDetails[i].roomAmount)
  //       }
  //     }

  //     if (!this.searchForm.controls.returndate.valid && this.searchForm.controls.startdate.valid) {
  //       var val= this.searchForm.get('startdate').value
  //       let d = new Date(val.jsdate);
  //       // let copy = this.getCopyOfOptions1();
  //       // copy.disableUntil = {
  //       //   year: d.getFullYear(),
  //       //   month: d.getMonth() + 1,
  //       //   day: d.getDate()
  //       // };
  //       // copy.disableSince = {
  //       //   year: d.getFullYear(),
  //       //   month: d.getMonth() + 7,
  //       //   day: d.getDate()
  //       // };
  //       // this.myDatePickerOptionsSecond = copy;

  //       // console.log(val)
  //       var sdate=val.date
  //        var startDate =sdate.year+"-"+ sdate.month+"-"+sdate.day;

  //             // console.log(startDate)
  //             var d3=this.addMonths(new Date(startDate), 7);

  //             var endDate = d3.getFullYear()+"-"+(d3.getMonth())+"-"+(d3.getDate());
  //             // console.log(endDate)
  //             let a = moment(new Date(startDate));
  //             let b = moment(new Date(endDate));
  //             let tempDate = a;
  //             let daysCount = b.diff(a, 'days');


  //             let dates:any = [];

  //             for(let i= 1;i<=daysCount ;i++){
  //               tempDate =tempDate.add(1, 'day');
  //               var event = new Date(tempDate.toDate());

  //               let date = JSON.stringify(event)
  //               date = date.slice(1,11)
  //               dates.push(date);
  //             }

  //           // console.log(dates);
  //           // console.log( this.dateForActive)
  //           let missing = dates.filter(item =>  this.dateForActive.indexOf(item) < 0);
  //           // console.log(missing);
  //           let enableDays: Array<any> = [];
  //         for(let i = 0; i < missing.length; i++) {
  //              let d: Date = new Date(missing[i]);
  //             //  d.setDate(d.getDate() + i);
  //              enableDays.push({
  //                  year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
  //              });
  //         }
  //       //  console.log(enableDays)
  //        var du={
  //         year: d.getFullYear(),
  //         month: d.getMonth() + 1,
  //         day: d.getDate()
  //       }
  //       var ds={
  //         year: d.getFullYear(),
  //         month: d.getMonth() + 7,
  //         day: d.getDate()
  //       }
  //         this.myDatePickerOptionsSecond ={ 

  //           disableUntil:du,
  //           disableSince:ds,
  //           disableDays:enableDays,



  //         }




  //       //     var startDate =d.getFullYear()+"-"+ (d.getMonth() + 1)+"-"+(d.getDate());

  //       //     // console.log(startDate)
  //       //     var d1=this.addMonths(new Date(startDate), 6);

  //       //     var endDate = d1.getFullYear()+"-"+(d1.getMonth())+"-"+(d1.getDate());
  //       //     // console.log(endDate)
  //       //     let a = moment(new Date(startDate));
  //       //     let b = moment(new Date(endDate));
  //       //     let tempDate = a;
  //       //     let daysCount = b.diff(a, 'days');


  //       //     let dates:any = [];

  //       //     for(let i= 1;i<=daysCount ;i++){
  //       //       tempDate =tempDate.add(1, 'day');
  //       //       var event = new Date(tempDate.toDate());

  //       //       let date = JSON.stringify(event)
  //       //       date = date.slice(1,11)
  //       //       dates.push(date);
  //       //     }

  //       //   // console.log(dates);
  //       //   // console.log( this.dateForActive)
  //       //   let missing = dates.filter(item =>  this.dateForActive.indexOf(item) < 0);
  //       //   // console.log(missing);
  //       //   let enableDays: Array<any> = [];
  //       // for(let i = 0; i < missing.length; i++) {
  //       //      let d: Date = new Date(missing[i]);
  //       //     //  d.setDate(d.getDate() + i);
  //       //      enableDays.push({
  //       //          year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
  //       //      });
  //       // }

  //       // this.myDatePickerOptionsSecond ={ 
  //       //   disableDays:enableDays
  //       // }
  //     }
  //     else if(this.searchForm.controls.returndate.valid && this.searchForm.controls.startdate.valid) {
  //       var val= this.searchForm.get('startdate').value
  //       console.log(val)
  //       let d1 = new Date(val.jsdate);
  //       let d2 = new Date(d1.getTime() + 86400000);
  //       if (val.jsdate >= this.searchForm.value.returndate.jsdate) {

  //         this.searchForm.patchValue({
  //           returndate: null

  //         });
  //       }
  //       // let copy = this.getCopyOfOptions1();
  //       // copy.disableUntil = {
  //       //   year: d1.getFullYear(),
  //       //   month: d1.getMonth() + 1,
  //       //   day: d1.getDate()
  //       // };
  //       // copy.disableSince = {
  //       //   year: d1.getFullYear(),
  //       //   month: d1.getMonth() + 7,
  //       //   day: d1.getDate()
  //       // };
  //       // this.myDatePickerOptionsSecond = copy;


  //       // console.log(val)
  //       var sdate=val.date
  //        var startDate =sdate.year+"-"+ sdate.month+"-"+sdate.day;

  //             // console.log(startDate)
  //             var d3=this.addMonths(new Date(startDate), 7);

  //             var endDate = d3.getFullYear()+"-"+(d3.getMonth())+"-"+(d3.getDate());
  //             // console.log(endDate)
  //             let a = moment(new Date(startDate));
  //             let b = moment(new Date(endDate));
  //             let tempDate = a;
  //             let daysCount = b.diff(a, 'days');


  //             let dates:any = [];

  //             for(let i= 1;i<=daysCount ;i++){
  //               tempDate =tempDate.add(1, 'day');
  //               var event = new Date(tempDate.toDate());

  //               let date = JSON.stringify(event)
  //               date = date.slice(1,11)
  //               dates.push(date);
  //             }

  //           // console.log(dates);
  //           // console.log( this.dateForActive)
  //           let missing = dates.filter(item =>  this.dateForActive.indexOf(item) < 0);
  //           // console.log(missing);
  //           let enableDays: Array<any> = [];
  //         for(let i = 0; i < missing.length; i++) {
  //              let d: Date = new Date(missing[i]);
  //             //  d.setDate(d.getDate() + i);
  //              enableDays.push({
  //                  year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()
  //              });
  //         }
  //       //  console.log(enableDays)
  //        var du={
  //         year: d1.getFullYear(),
  //         month: d1.getMonth() + 1,
  //         day: d1.getDate()
  //       };
  //       var ds={
  //         year: d1.getFullYear(),
  //         month: d1.getMonth() + 7,
  //         day: d1.getDate()
  //       };
  //         this.myDatePickerOptionsSecond ={ 

  //           disableUntil:du,
  //           disableSince:ds,
  //           disableDays:enableDays,



  //         }



  //     }
  //   }
  removeAdult(val) {

    if (this.adult[val] > 0) {
      var a = this.adult[val]
      a = a - 1
      this.adult.splice(val, 1, a)
      this.countAdult = 0;
      for (var p = 0; p < this.adult.length; p++) {
        this.countAdult += this.adult[p];
      }
      if (this.adult[val] == 0) {
        this.singleroom[val] = 0
        this.doubleroom[val] = 0
        this.child[val] = 0
        this.toddler[val]=0
        this.countChild = 0;
        for (var r = 0; r < this.child.length; r++) {
          this.countChild += this.child[r];
        }
        this.tent[val] = 0
        this.extraroom[val] = 0
        this.roomDetails[val].roomAmount = 0
        this.heritage_child = 0;
        this.transport_child = 0;
        this.totalamount()
      }
      this.totalamount()
    }
    this.totalamount()
  }
  addAdult(val) {
    if (this.adult[val] < 100) {
      var a = this.adult[val]
      a = a + 1
      this.countAdult = 0;

      this.adult.splice(val, 1, a)
      for (var t = 0; t < this.adult.length; t++) {
        this.countAdult += this.adult[t];
      }
    }
    this.totalamount()
  }
  removeChild(val) {
    if (this.child[val] > 0) {
      var a = this.child[val]
      a = a - 1
      this.countChild = 0;
      this.child.splice(val, 1, a)
      for (var r = 0; r < this.child.length; r++) {
        this.countChild += this.child[r];
      }
      if (this.child[val] == 0) {
        this.countChild = 0;
        this.heritage_child = 0;
        this.transport_child = 0;
        this.totalamount()
      }
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount - (+this.roomDetails[val].child)
      this.totalamount()
    }
    this.totalamount()
  }

  removeTent(val) {
    if (this.tent[val] > 0) {
      var j = this.tent[val]
      j = j - 1
      this.tent.splice(val, 1, j)
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount - (+this.roomDetails[val].tent)
      if (this.doubleroom[val] == 0 && this.singleroom[val] == 0 && this.tent[val] == 0) {
        this.extraroom[val] = 0
        this.roomDetails[val].roomAmount = (+this.roomDetails[val].child) * this.child[val]

      }

      this.totalamount()
    }
    this.totalamount()
  }

  addTent(val) {
    if (this.tent[val] < 100) {
      var j = this.tent[val]
      j = j + 1
      this.tent.splice(val, 1, j)
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount + (+this.roomDetails[val].tent)
      this.totalamount()
    }
  }

  addChild(val) {
    if (this.adult[val] > 0) {
      if (this.child[val] < 100) {
        var c = this.child[val]
        c = c + 1;
        this.countChild = 0

        this.child.splice(val, 1, c)
        for (var s = 0; s < this.child.length; s++) {
          this.countChild += this.child[s];
        }
        this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount + (+this.roomDetails[val].child)
      }
      this.totalamount()
    }

  }

  removeSingle(val) {
    if (this.singleroom[val] > 0) {
      var j = this.singleroom[val]
      j = j - 1
      this.singleroom.splice(val, 1, j)
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount - (+this.roomDetails[val].single)
      if (this.doubleroom[val] == 0 && this.singleroom[val] == 0 && this.tent[val] == 0) {
        this.extraroom[val] = 0
        this.roomDetails[val].roomAmount = (+this.roomDetails[val].child) * this.child[val]
      }

      this.totalamount()
    }
    this.totalamount()
  }
  addSingle(val) {
    if (this.singleroom[val] < 100) {
      var j = this.singleroom[val]
      j = j + 1
      this.singleroom.splice(val, 1, j)
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount + (+this.roomDetails[val].single)
      this.totalamount()
    }

  }

  removeDouble(value) {
    if (this.doubleroom[value] > 0) {
      var k = this.doubleroom[value]
      k = k - 1
      this.doubleroom.splice(value, 1, k)
      this.roomDetails[value].roomAmount = this.roomDetails[value].roomAmount - (+this.roomDetails[value].double)
      if (this.doubleroom[value] == 0 && this.singleroom[value] == 0 && this.tent[value] == 0) {
        this.extraroom[value] = 0
        this.roomDetails[value].roomAmount = (+this.roomDetails[value].child) * this.child[value]
      }
      this.totalamount()
    }
    this.totalamount()
  }
  addDouble(value) {


    if (this.doubleroom[value] < 100) {
      var k = this.doubleroom[value]
      k = k + 1
      this.doubleroom.splice(value, 1, k)
      this.roomDetails[value].roomAmount = this.roomDetails[value].roomAmount + (+this.roomDetails[value].double)
      this.totalamount()
    }
    // //console.log(this.doubleroom)
  }


  removeExtra(value) {

    if (this.extraroom[value] > 0) {
      var p = this.extraroom[value]
      p = p - 1
      this.extraroom.splice(value, 1, p)
      this.roomDetails[value].roomAmount = this.roomDetails[value].roomAmount - (+this.roomDetails[value].extra)
      this.totalamount()
    }
    this.totalamount()
    // //console.log(this.extraroom)

  }
  addExtra(value) {
    if ((this.doubleroom[value]) > 0 || (this.singleroom[value]) > 0 || (this.tent[value]) > 0) {
      if (this.extraroom[value] < 100) {
        var p = this.extraroom[value]
        p = p + 1
        this.extraroom.splice(value, 1, p)
        this.roomDetails[value].roomAmount = this.roomDetails[value].roomAmount + (+this.roomDetails[value].extra)
      }
      this.totalamount()
    }

    // //console.log(this.extraroom)

  }


  countToddlerProperty:any;
  addToddlerPro(val) {
    if (this.adult[val] > 0) {
      if (this.toddler[val] < 100) {
        var c = this.toddler[val]
        c = c + 1;
        this.countToddlerProperty = 0

        this.toddler.splice(val, 1, c)
        for (var s = 0; s < this.toddler.length; s++) {
          this.countToddlerProperty += this.toddler[s];
        }
        // this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount + (+this.roomDetails[val].child)
      }
      // this.totalamount()
    }

  }

  removeToddlerPro(val) {
    if (this.toddler[val] > 0) {
      var a = this.toddler[val]
      a = a - 1
      this.countToddlerProperty = 0;
      this.toddler.splice(val, 1, a)
      for (var r = 0; r < this.toddler.length; r++) {
        this.countToddlerProperty += this.toddler[r];
      }
      if (this.toddler[val] == 0) {
        this.countToddlerProperty = 0;
        // this.heritage_child = 0;
        // this.transport_child = 0;
        // this.totalamount()
      }
      // this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount - (+this.roomDetails[val].child)
      // this.totalamountPro()
    }
    // this.totalamount()
  }


  get formArr() {
    return this.searchForm.get('itemRows') as FormArray;
  }
  initItemRows() {
    return this.formBuilder.group({
      singleroom: [''],
      doubleroom: [''],
      extraroom: [''],
      adult: [''],
      child: [''],
      tent: [''],
    });
  }
  bookingDetailsData:any=[]
  onSubmit() {
    this.isValid = false
    this.extraIsOr = false
    this.isRule = false
    this.extraRule = false
    if (localStorage.getItem('uid') == null && localStorage.getItem('sessionid') == null) {

      this.variable.isSignin = 1
      jQuery('#exampleModalCenter').modal('show');


    }
    else {
      // console.log(this.searchForm.value.transportType)
    
      this.submitted = true;
      if(this.isModeShow){
        if(this.searchForm.value.transportType==null){
          this.isTrans=true
        }
        else{
          this.isTrans=false
        }
      }
      else{
        this.isTrans=false
      }
      
     
      // this.searchForm.get('transportType').setValidators([Validators.required])

      if (this.searchForm.invalid || this.isTrans) {
        // $('html, body').animate({
        //   scrollTop: parseInt($("#target").offset().top)
        // }, 1000);
        const firstElementWithErrorSec = document.querySelector('my-date-picker.ng-invalid,ng-select.ng-invalid');


        if (firstElementWithErrorSec) {
          firstElementWithErrorSec.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }


      // if (localStorage.getItem('startdate') != null && localStorage.getItem('returndate') != null) {
      //   this.startingDate = localStorage.getItem('startdate');
      //   this.endDate = localStorage.getItem('returndate');
      // }
      // else {
      this.startingDate = this.searchForm.value.startdate.formatted;
      this.endDate = this.searchForm.value.returndate.formatted;
      if (this.isModeShow) {
        this.transportMode = this.searchForm.value.transportType;
      }
      else {
        this.transportMode = 0;

      }
      // }

      const combined = this.singleroom.map((array1val, index) => [{ "packageclass_id": this.roomType[index], "no_of_adult": this.adult[index], "no_of_child": this.child[index], "single": array1val, "double": this.doubleroom[index], "extra": this.extraroom[index], "bed_rules": this.bedRules[index],  "room_type_name": this.roomTypeName[index], "ind_amt": 0,"no_of_toddler":this.toddler[index] }])

      var merged = Array.prototype.concat.apply([], combined);
      // console.log(merged)

      var adultCount = 0;
      var childCount = 0;
      var toddlerCount=0;
      var totalCount = 0;
      var singleCount = 0;
      var doubleCount = 0;
      var extraCount = 0;
      var roomCount = 0;
      var tentCount = 0;
      var single_adult_no = 0;
      var single_child_no = 0;
      var single_extra_no = 0;
      var single_total_no = 0;
      var double_adult_no = 0;
      var double_child_no = 0;
      var double_extra_no = 0;
      var double_total_no = 0;
      var extra_adult_no = 0;
      var extra_child_no = 0;
      var extra_total_no = 0;
      var single_no = 0;
      var double_no = 0;
      var adult_no = 0;
      var child_no = 0;
      var extra_no = 0;


      // var tent_adult_no = 0
      // var tent_child_no = 0
      // var tent_total_no = 0
      // var tent_extra_no = 0


      for (var m = 0; m < merged.length; m++) {
        // if(merged[m].room_type_name!='Tent'){



        if ((+merged[m].no_of_adult > 0) && (+merged[m].single == 0 && +merged[m].double == 0 && +merged[m].tent == 0)) {
          this.isValid = true
        }
        single_adult_no = merged[m].bed_rules.single.bcd_adult * merged[m].single
        single_child_no = merged[m].bed_rules.single.bcd_child * merged[m].single
        single_extra_no = merged[m].bed_rules.single.bcd_extra * merged[m].single
        single_total_no = merged[m].bed_rules.single.total_count * merged[m].single

        double_adult_no = merged[m].bed_rules.double.bcd_adult * merged[m].double
        double_child_no = merged[m].bed_rules.double.bcd_child * merged[m].double
        double_extra_no = merged[m].bed_rules.double.bcd_extra * merged[m].double
        double_total_no = merged[m].bed_rules.double.total_count * merged[m].double

        extra_adult_no = merged[m].bed_rules.extra.bcd_adult * merged[m].extra
        extra_child_no = merged[m].bed_rules.extra.bcd_child * merged[m].extra
        extra_total_no = merged[m].bed_rules.extra.total_count * merged[m].extra

        // tent_adult_no = merged[m].bed_rules.tent.bcd_adult * merged[m].tent
        // tent_child_no = merged[m].bed_rules.tent.bcd_child * merged[m].tent
        // tent_extra_no = merged[m].bed_rules.tent.bcd_extra * merged[m].tent
        // tent_total_no = merged[m].bed_rules.tent.total_count * merged[m].tent

        if (merged[m].bed_rules.extra.bcd_adult + merged[m].bed_rules.extra.bcd_child != merged[m].bed_rules.extra.total_count) {
          this.extraIsOr = true
        }
        else {
          this.extraIsOr = false
        }
        single_no = merged[m].single
        doubleCount = merged[m].double
        adult_no = merged[m].no_of_adult

        child_no = merged[m].no_of_child
        extra_no = merged[m].extra
        if (single_extra_no + double_extra_no  < extra_total_no) {
          this.extraRule = true

        }
        else {
          if (!this.extraIsOr) {
            if ((((single_adult_no + double_adult_no  + extra_total_no) >= adult_no) && ((single_child_no + double_child_no  + extra_child_no) >= child_no))) {

            }
            else {
              this.isRule = true
            }
          }
          else {

            // if ((((single_adult_no + double_adult_no + tent_adult_no + extra_adult_no) >= adult_no) && ((single_child_no + tent_child_no + double_child_no) >= child_no)) || (((single_adult_no + double_adult_no + tent_adult_no) >= adult_no) && ((single_child_no + double_child_no + tent_child_no + extra_total_no) >= child_no))) {
              if((single_total_no +double_total_no+extra_total_no)>=(adult_no+child_no)){

            }
            else {
              this.isRule = true
            }
          }

        }

        adultCount += merged[m].no_of_adult;
        childCount += merged[m].no_of_child;
        toddlerCount +=merged[m].no_of_toddler
        singleCount += merged[m].single;
        doubleCount += merged[m].double;
        // tentCount += merged[m].tent
        extraCount += merged[m].extra
        totalCount = +adultCount + +childCount + +toddlerCount;
        roomCount = +singleCount + +doubleCount + +extraCount
        // }
        // else{
        //   var tent_adult_no=0
        //   var tent_child_no=0
        //   var tent_adult_count=0
        //   var tent_child_count=0

        //   tent_adult_no=merged[m].no_of_adult*merged[m].tent
        //   tent_child_no=merged[m].no_of_child*merged[m].tent


        // }
      }

      if (this.isValid || totalCount == 0) {
        this.popup.failureMessage = "Kindly select any room to proceed"
        this.popup.failurepopup()
      }
      else {
        if (this.isRule || this.extraRule) {
          this.popup.failureMessage = "Kindly modify your selection as per the room policies. "
          this.popup.failurepopup()
        }
        else {
          this.startdate = this.searchForm.get('startdate').value
          this.endDate = this.searchForm.get('returndate').value
          this.startdate = this.startdate.jsdate
          this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');

          this.endDate = this.endDate.jsdate
          this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
          localStorage.setItem('adultcount', JSON.stringify(adultCount));
          localStorage.setItem('childcount', JSON.stringify(childCount));
          localStorage.setItem('totalcount', JSON.stringify(totalCount));
          // this.router.navigate(['touristAdd',331])
          // var merged1=merged
          // const combined = this.singleroom.map((array1val, index) => [{ "packageclass_id": this.roomType[index], "no_of_adult": this.adult[index], "no_of_child": this.child[index], "single": array1val, "double": this.doubleroom[index], "extra": this.extraroom[index], "tent": this.tent[index], "room_type_name": this.roomTypeName[index] }])

          // var merged = Array.prototype.concat.apply([], combined);
          // console.log(merged1)

          this.spinner.show()
          this.api.availabilityCheck(localStorage.getItem('uid'), localStorage.getItem('sessionid'), this.startdate, this.endDate, this.propertyType, this.property_id,0,this.bookingDetailsData, merged, this.transportMode).subscribe((data: any) => {
            this.spinner.hide()
            if (data.status == "Success") {
              localStorage.setItem('note', data.data[0].booking_id)
              this.variable.isScroll = true;
              this.router.navigate(['touristAdd', data.data[0].booking_id])

            }
            else if (data.status == "Fail" && data.message == "Please complete your profile before booking") {
              // jQuery('#exampleModalCenter').modal('show');
              this.variable.isScroll = true;
              this.popup.infoMessage = data.message
              this.popup.infopopup()
              localStorage.setItem("callback",'packagedetails')
              this.router.navigate(['profileupdate', this.id,data.data[0].booking_id, data.data[0].json_id])
            }
            else {
              this.popup.failureMessage = data.message
              this.popup.failurepopup()
            }
          },
            (err: HttpErrorResponse) => {
              // this.popup.failureMessage="Internal Server Error"
              //     this.popup.failurepopup();
              // this.spinner.hide()
              if (err.status == 403) {
                localStorage.clear()
                this.variable.isLogin = false
                this.variable.isScroll = true;
                this.router.navigate([''])
              }
            });
        }

        //  this.bedrule()




      }



    }


  }
  checkAvail(val) {
    this.isValid = false
    this.extraIsOr = false
    this.isRule = false
    this.extraRule = false
    this.singleAvail = []
    this.singleAvail.push(val)
    // console.log(this.roomTypeName)
    // if (localStorage.getItem('uid') == null && localStorage.getItem('sessionid') == null) {

    //   this.variable.isSignin = 1
    //   jQuery('#exampleModalCenter').modal('show');


    // }
    // else {
    this.submitted = true;
    if (this.searchForm.invalid) {
      // $('html, body').animate({
      //   scrollTop: parseInt($("#target").offset().top)
      // }, 1000);
      const firstElementWithError = document.querySelector('my-date-picker.ng-invalid,ng-select.ng-invalid');


      if (firstElementWithError) {
        firstElementWithError.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }


    this.startingDate = this.searchForm.value.startdate.formatted;
    this.endDate = this.searchForm.value.returndate.formatted;
    // }
    const combined = this.singleAvail.map((val1, index) => [{ "packageclass_id": this.roomType[val], "no_of_adult": this.adult[val], "no_of_child": this.child[val], "single": this.singleroom[val], "double": this.doubleroom[val], "extra": this.extraroom[val], "bed_rules": this.bedRules[val], "no_of_infant": 0, "room_type_name": this.roomTypeName[val] ,"no_of_toddler":this.toddler[index]}])
    // //console.log(combined)

    var merged = Array.prototype.concat.apply([], combined);
    // console.log(merged)

    var adultCount = 0;
    var childCount = 0;
    var totalCount = 0;
    var singleCount = 0;
    var doubleCount = 0;
    var extraCount = 0;
    var roomCount = 0;
    var tentCount = 0;
    var single_adult_no = 0;
    var single_child_no = 0;
    var single_extra_no = 0;
    var single_total_no = 0;
    var double_adult_no = 0;
    var double_child_no = 0;
    var double_extra_no = 0;
    var double_total_no = 0;
    var extra_adult_no = 0;
    var extra_child_no = 0;
    var extra_total_no = 0;
    var single_no = 0;
    var double_no = 0;
    var adult_no = 0;
    var child_no = 0;
    var extra_no = 0;


    // var tent_adult_no = 0
    // var tent_child_no = 0
    // var tent_total_no = 0
    // var tent_extra_no = 0

    for (var m = 0; m < merged.length; m++) {



      if ((+merged[m].no_of_adult > 0) && (+merged[m].single == 0 && +merged[m].double == 0 && +merged[m].tent == 0)) {
        this.isValid = true
      }
      single_adult_no = merged[m].bed_rules.single.bcd_adult * merged[m].single
      single_child_no = merged[m].bed_rules.single.bcd_child * merged[m].single
      single_extra_no = merged[m].bed_rules.single.bcd_extra * merged[m].single
      single_total_no = merged[m].bed_rules.single.total_count * merged[m].single

      double_adult_no = merged[m].bed_rules.double.bcd_adult * merged[m].double
      double_child_no = merged[m].bed_rules.double.bcd_child * merged[m].double
      double_extra_no = merged[m].bed_rules.double.bcd_extra * merged[m].double
      double_total_no = merged[m].bed_rules.double.total_count * merged[m].double

      extra_adult_no = merged[m].bed_rules.extra.bcd_adult * merged[m].extra
      extra_child_no = merged[m].bed_rules.extra.bcd_child * merged[m].extra
      extra_total_no = merged[m].bed_rules.extra.total_count * merged[m].extra

      // tent_adult_no = merged[m].bed_rules.tent.bcd_adult * merged[m].tent
      // tent_child_no = merged[m].bed_rules.tent.bcd_child * merged[m].tent
      // tent_extra_no = merged[m].bed_rules.tent.bcd_extra * merged[m].tent
      // tent_total_no = merged[m].bed_rules.tent.total_count * merged[m].tent

      if (merged[m].bed_rules.extra.bcd_adult + merged[m].bed_rules.extra.bcd_child != merged[m].bed_rules.extra.total_count) {
        this.extraIsOr = true
      }
      else {
        this.extraIsOr = false
      }
      single_no = merged[m].single
      doubleCount = merged[m].double
      adult_no = merged[m].no_of_adult

      child_no = merged[m].no_of_child
      extra_no = merged[m].extra
      if (single_extra_no + double_extra_no  < extra_total_no) {
        this.extraRule = true
      }
      else {
        if (!this.extraIsOr) {
          if ((((single_adult_no + double_adult_no  + extra_total_no) >= adult_no) && ((single_child_no + double_child_no  + extra_child_no) >= child_no))) {

          }
          else {

            this.isRule = true
          }
        }
        else {

          // if ((((single_adult_no + double_adult_no + tent_adult_no + extra_adult_no) >= adult_no) && ((single_child_no + tent_child_no + double_child_no) >= child_no)) || (((single_adult_no + double_adult_no + tent_adult_no) >= adult_no) && ((single_child_no + double_child_no + tent_child_no + extra_total_no) >= child_no))) {
            if((single_total_no +double_total_no+extra_total_no)>=(adult_no+child_no)){

          }
          else {
            this.isRule = true
          }

        }


      }

      adultCount += merged[m].no_of_adult;
      childCount += merged[m].no_of_child;
      singleCount += merged[m].single;
      doubleCount += merged[m].double;
      // tentCount += merged[m].tent
      extraCount += merged[m].extra
      totalCount = +adultCount + +childCount;
      roomCount = +singleCount + +doubleCount + +extraCount
      // }
      // else{
      //   var tent_adult_no=0
      //   var tent_child_no=0
      //   var tent_adult_count=0
      //   var tent_child_count=0

      //   tent_adult_no=merged[m].no_of_adult*merged[m].tent
      //   tent_child_no=merged[m].no_of_child*merged[m].tent


      // }
    }
    if (this.isValid || totalCount == 0) {
      this.popup.failureMessage = "Kindly select any room to proceed"
      this.popup.failurepopup()
    }
    else {
      if (this.isRule || this.extraRule) {
        this.popup.failureMessage = "Kindly modify your selection as per the room policies. "
        this.popup.failurepopup()
      }
      else {
        this.startdate = this.searchForm.get('startdate').value
        this.endDate = this.searchForm.get('returndate').value
        this.startdate = this.startdate.jsdate
        this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');

        this.endDate = this.endDate.jsdate
        this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

        // //console.log(merged)
        // //console.log('Your sum is ' + adultCount, childCount, totalCount);
        // localStorage.setItem('adultcount', JSON.stringify(adultCount));
        // localStorage.setItem('childcount', JSON.stringify(childCount));
        // localStorage.setItem('totalcount', JSON.stringify(totalCount));
        // // this.router.navigate(['touristAdd',331])

        this.spinner.show()
        this.api.individualAvailabilityCheck(localStorage.getItem('uid'), localStorage.getItem('sessionid'), this.startdate, this.endDate, this.propertyType,0, this.property_id, merged).subscribe((data: any) => {
          this.spinner.hide()
          if (data.status == "Success") {
            this.popup.sucessMessage = data.message
            this.popup.sucesspopup()
            // localStorage.setItem('note', data.data[0].booking_id)
            // this.router.navigate(['touristAdd', data.data[0].booking_id])

          }
          else {
            this.popup.failureMessage = data.message
            this.popup.failurepopup()
          }
        },
          (err: HttpErrorResponse) => {
            // this.popup.failureMessage="Internal Server Error"
            //     this.popup.failurepopup();
            this.spinner.hide()
            if (err.status == 403) {
              localStorage.clear()
              this.variable.isLogin = false
              this.variable.isScroll = true;
              this.router.navigate([''])
            }
          });


        //  this.bedrule()

      }
    }
    // }
  }
  totalAmount: any = 0;
  totalamount() {
    this.totalAmount = 0;

    if (this.searchForm.controls.startdate.invalid || this.searchForm.controls.returndate.invalid ) {
      for (let i = 0; i < this.roomDetails.length; i++) {
        this.totalAmount = this.totalAmount + (+this.roomDetails[i].roomAmount)
      }
      this.heritage_adult = 0;
      this.heritage_child = 0;
      this.transport_adult = 0;
      this.transport_child = 0;
      // console.log(this.countAdult,this.countChild)
      this.heritage_adult = +this.countAdult * this.heritage_fee_adult;
      this.heritage_child = +this.countChild * this.heritage_fee_child;
      // console.log(this.heritage_child)
      this.transport_adult = +this.countAdult * this.transport_fee_adult
      this.transport_child = +this.countChild * this.transport_fee_child;
      // console.log(this.heritage_adult, this.heritage_child, this.transport_adult, this.transport_child,this.totalAmount)
      // this.totalAmount = this.totalAmount + this.heritage_adult + this.heritage_child + this.transport_adult + this.transport_child;
      // console.log(this.totalAmount)
    } else {
      for (let i = 0; i < this.roomDetails.length; i++) {
        this.totalAmount = this.totalAmount + (+this.roomDetails[i].roomAmount)
      }
      var date1: any = new Date(this.searchForm.value.startdate.jsdate);
      var date2: any = new Date(this.searchForm.value.returndate.jsdate);
      var diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log(diffDays);
      // var diff =  Math.floor((  Date.parse(this.endDate)-Date.parse(this.startdate)  ) / 86400000); 
      this.totalAmount = this.totalAmount * diffDays;
      this.heritage_adult = 0;
      this.heritage_child = 0;
      this.transport_adult = 0;
      this.transport_child = 0;
      this.heritage_adult = +this.countAdult * this.heritage_fee_adult;
      this.heritage_child = +this.countChild * this.heritage_fee_child;
      this.transport_adult = +this.countAdult * this.transport_fee_adult
      this.transport_child = +this.countChild * this.transport_fee_child;
      // console.log(this.totalAmount)
      // this.totalAmount = this.totalAmount + this.heritage_adult + this.heritage_child + this.transport_adult + this.transport_child;
      // console.log(this.totalAmount)

    }
  }

  // bedrule(){

  // }
  addadult() {
    if (this.counter < 100) {
      this.counter = this.counter + 1;
      if (this.childcounter == 0) {
        this.totalcount = "A- " + this.counter;
      }
      else {
        this.totalcount = "A- " + this.counter + ", C- " + this.childcounter;
      }
      //  this.searchForm.get('startdate').setValue(this.counter);
    }
    // this.adultcount = this.counter + "  Adult(s), ";
  }
  subadult() {
    if (this.counter > 1) {
      this.counter = this.counter - 1;
      // this.searchForm.get('startdate').setValue(this.counter);
      if (this.childcounter == 0) {
        this.totalcount = "A- " + this.counter;
      }
      else {
        this.totalcount = "A- " + this.counter + ", C- " + this.childcounter;
      }
    }

  }
  addchild() {
    if (this.childcounter < 100) {
      this.childcounter = this.childcounter + 1;
    }
    this.childcount = this.childcounter + "Children";

    this.totalcount = "A- " + this.counter + ", C- " + this.childcounter;
  }
  subchild() {
    if (this.childcounter > 0) {
      this.childcounter = this.childcounter - 1;
      if (this.childcounter == 0) {
        this.totalcount = "A- " + this.counter;
      }
      else {
        this.totalcount = "A- " + this.counter + ", C- " + this.childcounter;
      }

    }
  }

  onApply() {
    // console.log(this.counter, this.childcounter)
    if (this.counter > 0 && this.childcounter == 0) {
      this.totalcount = "A- " + this.counter;
    }
    else {
      this.totalcount = "A- " + this.counter + ", C- " + this.childcounter;
    }

    // this.isApply = false
    jQuery("#closediv").hide()
    // this.isSubmitted = false
  }
  show() {
    jQuery("#closediv").show()

    // this.isApply = true
    // // this.isApply=true
    // console.log(this.isApply)
  }
  isData: boolean = false;
  filter() {
    this.searchForm.get('transportType').setErrors(null);
    // console.log(this.searchForm)
    this.submitted = true;
    if (this.searchForm.invalid) {

      return;
    }
    this.spinner.show()
    this.startdate = this.searchForm.get('startdate').value
    this.endDate = this.searchForm.get('returndate').value
    this.startdate = this.startdate.jsdate
    this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');

    this.endDate = this.endDate.jsdate
    this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

    this.api.availabilitySearch(this.startdate, this.endDate, this.propertyType, this.property_id, this.counter, this.childcounter).subscribe((data: any) => {
      this.spinner.hide()
      // console.log(data)
      if (data.status == "Success") {
        this.roomTypeName = []
        this.roomType = []
        this.bedRules = []
        this.singleroom = []
        this.doubleroom = []
        this.extraroom = []
        this.adult = []
        this.child = []
        this.tent = []
        if (data.message != 'No data') {
          this.totalAmount = 0

          this.isSearch = true
          this.isData = false
          this.roomDetails = data.data[0].room_category;
          for (let i = 0; i < this.roomDetails.length; i++) {
            // if (this.roomDetails[i].room_type == 'Tent') {
            //   this.isTent = true
            // }
            this.roomType.push(this.roomDetails[i].property_room_type_id)
            this.bedRules.push(this.roomDetails[i].bed_rules)
            this.roomTypeName.push(this.roomDetails[i].room_type)
            this.singleroom.splice(i, 0, 0);
            this.doubleroom.splice(i, 0, 0);
            this.extraroom.splice(i, 0, 0);
            this.adult.splice(i, 0, 0);
            this.child.splice(i, 0, 0);
            this.tent.splice(i, 0, 0);
            this.roomDetails[i].roomAmount = 0
            this.roomDetails[i].count = +this.roomDetails[i].count
            // console.log(this.roomDetails[i].count)
          }
        } else {
          this.isData = true
        }
      }
      else {
        this.popup.failureMessage = data.message
        this.popup.failurepopup()
      }
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinner.hide()
      });
  }
  viewDetails(event) {
    this.transData=true
    if(this.isModeShow){
    if(this.searchForm.value.transportType==null){
      this.isTrans=true
    }
    else{
      this.isTrans=false
    }
  }else{
    this.isTrans=false
  }
    this.transAdult = event.transport_adult_label
    this.transChild = event.transport_child_label
    this.transport_fee_adult = +event.transport_adult_fare
    this.transport_fee_child = +event.transport_child_fare
    if (this.transport_fee_adult == '0.00' && this.transport_fee_child == '0.00') {
      this.isTransport = false;
    }
    else {
      this.isTransport = true;
    }
    // this.totalamount()
  }

  

}
