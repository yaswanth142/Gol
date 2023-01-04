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
import { PopupService } from '../popup.service';
declare var jQuery: any;

@Component({
  selector: 'app-samudramdetailspage',
  templateUrl: './samudramdetailspage.component.html',
  styleUrls: ['./samudramdetailspage.component.css']
})
export class SamudramdetailspageComponent implements OnInit {
  uid: any;
  sessionid: any;
  shipId: any=0;
  pId:any=0;
  shipClass: any = [];
  thumpUrl: any;
  shipImages: any;
  startdate: any;
  setStartDate: any;
  setReturnDate: any;
  singleroom: any = [];
  doubleroom: any = [];
  extraroom: any = [];
  adult: any = [];
  child: any = [];
  shipType: any = [];
  singleAvail: any = [];
  startingDate: any;
  endDate: any;
  propertyName: any;
  review: any;
  datepick: any;
  propertyType: any;
  ship_travel_id: any;
  isAdult: boolean = false;
  pkg_desc: any;
  showTotal: boolean;
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
  package_id:any;
  countAdult: any = 0;
  countChild: any = 0;
  isTransport:boolean=false;
  packageTypeCode:any;
  isLandCruise:boolean=false;
  isLand:boolean=false;
  isSamudram:boolean=false;
  roomThumbPath:any
  roomDetails:any;
  roomTypeProperty:any=[];
  bedRulesProperty:any=[];
  roomTypeNameProperty:any=[];
  singleroomProperty:any=[];
  doubleroomProperty:any=[];
  extraroomProperty:any=[];
  adultProperty:any=[];
  childProperty:any=[];
  tentProperty:any=[];
  deptLocation:any;
  deptDate:any;
  shipName:any;
  destLocation:any;
  destDate:any;
  returnShipName:any;
  returnLocation:any;
  returnDate:any;
  arrivalLocation:any;
  arrivalDate:any;

  departureTime:any;
  destinationTime:any;
  returnTime:any;
  arrivalTime:any;

  isSearch:boolean=false


  pkgId:any
  propertyId:any;
  pkgChidAge:any;
  pkgAdultAge:any;
  pkgInfantAge:any;
  infant:any=[];


  proChidAge:any;
  proAdultAge:any;
  proToddlerAge:any;
  toddler:any=[];
  tmode:any;
  pType:any;
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

  bookingDetails:any=[];
  propertyDetails:any=[];
  transAdult:any;
  transChild:any;

  heritageAdult:any;
  heritageChild:any;
  transData:boolean=false;

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
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: 0, month: 0, day: 0 }
  };
  public myDatePickerOptionsSecond: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    showTodayBtn: false,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: 0, month: 0, day: 0 },

  };
  constructor(public api: ApiService, private router: Router, public variable: VariableService, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, public popup: PopupService) {

    this.activatedRoute.params.subscribe(paramsId => {
      this.ship_travel_id = paramsId.id;
    });
  }

  shipForm: FormGroup;
  submitted = false;

  get f() { return this.shipForm.controls; }


  ngOnInit() {
    // this.packageTypeCode=localStorage.getItem('package_type_code')
    
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.transData=false
    this.isAdult = false
    this.uid = localStorage.getItem('uid');
    this.sessionid = localStorage.getItem('sessionid')
    this.shipForm = this.formBuilder.group({
       transportType: [''],
      itemRows: this.formBuilder.array([this.initItemRows()]),
      itemRows1: this.formBuilder.array([this.initItemRows1()]),

    });
    this.shipForm.reset()
    this.spinner.show();
    this.activatedRoute.params.subscribe(paramsId => {
      this.shipId = paramsId.id;
      localStorage.setItem("bid", this.shipId)

      if (paramsId.g_id && paramsId.j_id) {
       
        this.api.guestData(paramsId.g_id,paramsId.j_id).subscribe((data: any) => {
          this.spinner.hide()
          // console.log(data)
          if (data.status == "Success" && data.message != 'No data') {
            this.tmode=data.data[0].transportation_mode
            this.bookingDetails=data.data[0].booking_details
            this.propertyDetails=data.data[0].property_booking_details

            this.api.individualShipDetails(+this.shipId).subscribe((data: any) => {
              if (data.status == "Success" && data.message != 'No data') {
                this.spinner.hide()
                this.shipClass = data.data[0].package_class;
                this.packageTypeCode=data.data[0].package_type_code
                this.roomDetails = data.data[0].room_category;
        
                this.pkgId=data.data[0].pkg_id
                this.propertyId=data.data[0].property_id
                this.pType=data.data[0].tourism_provider

                this.shipImages = data.data[0].ship_img_url;
                this.thumpUrl = data.data[0].thumb_path;
                this.propertyType = data.data[0].pkg_id;
                this.propertyName = data.data[0].pkg_name
                this.pkg_desc = data.data[0].pkg_desc
                //console.log(this.propertyName)
                for (let i = 0; i < this.shipClass.length; i++) {
                  this.singleroom.splice(i, 0, 0);
                  this.doubleroom.splice(i, 0, 0);
                  this.extraroom.splice(i, 0, 0);
                  this.adult.splice(i, 0, 0);
                  this.child.splice(i, 0, 0);
                  this.infant.splice(i,0,0);
                  this.shipType.push(this.shipClass[i].packageclass_id);
                  this.shipClass[i].roomAmount = 0
        
                }
                this.shipForm.addControl('single', new FormArray([]))
                this.shipForm.addControl('double', new FormArray([]));
                this.shipForm.addControl('extra', new FormArray([]));

                if(data.data[0].bed_rules.length!=0){
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
       
       
       
                 }
        
                if(this.packageTypeCode=='150003'){
                  this.isLandCruise=true
                  this.isLand=false
                  this.isSamudram=false
                  this.roomDetails = data.data[0].room_category;
                  this.roomThumbPath = data.data[0].thumb_path_room
        
                  this.deptLocation= data.data[0].departure_location;
                  this.deptDate= data.data[0].ship_travel_dept_date;
                  this.shipName= data.data[0].ship_name;
                  this.destLocation= data.data[0].destination_loc;
                  this.destDate= data.data[0].shp_destination_date;
                  this.returnShipName= data.data[0].return_ship_name;
                  this.returnLocation= data.data[0].return_loc;
                  this.returnDate= data.data[0].shp_td_return_date;
                  this.arrivalLocation= data.data[0].arrival_location;
                  this.arrivalDate= data.data[0].ship_travel_arr_date;
        
        
                  this.startdate = data.data[0].ship_travel_dept_date;
                  this.endDate = data.data[0].ship_travel_arr_date;
        
                  this.departureTime=data.data[0].ship_travel_dept_time;
                  this.destinationTime=data.data[0].shp_destination_time;
                  this.returnTime=data.data[0].shp_td_return_time;
                  this.arrivalTime=data.data[0].ship_travel_arrival_time;
        
                  this.pkgChidAge=data.data[0].child_label
                  this.pkgAdultAge=data.data[0].adult_label
                  this.pkgInfantAge=data.data[0].infants_label
        
        
                  this.proChidAge=data.data[0].child_label_property
                  this.proAdultAge=data.data[0].adult_label_property
                  this.proToddlerAge=data.data[0].toddler_label_property
                  this.genChildAge=data.data[0].general_child_label
        
        
                  for (let i = 0; i < this.roomDetails.length; i++) {
                    // if (this.roomDetails[i].room_type == 'Tent') {
                    //   this.isTent = true
                    // }
                    this.roomTypeProperty.push(this.roomDetails[i].property_room_type_id)
                    this.bedRulesProperty.push(this.roomDetails[i].bed_rules)
                    this.roomTypeNameProperty.push(this.roomDetails[i].room_type)
                    this.singleroomProperty.splice(i, 0, 0);
                    this.doubleroomProperty.splice(i, 0, 0);
                    this.extraroomProperty.splice(i, 0, 0);
                    this.adultProperty.splice(i, 0, 0);
                    this.childProperty.splice(i, 0, 0);
                    this.tentProperty.splice(i, 0, 0);
                    this.toddler.splice(i, 0, 0);
                    this.roomDetails[i].roomAmount = 0
                  }
                }else if(this.packageTypeCode=='150002'){
                  this.isLand=true
                  this.isLandCruise=false
                  this.isSamudram=false
                  this.roomDetails = data.data[0].room_category;
                  this.roomThumbPath = data.data[0].thumb_path_room
                  this.startdate = data.data[0].ship_travel_dept_date;
                  this.endDate = data.data[0].ship_travel_arr_date;
                  this.proChidAge=data.data[0].child_label
                  this.proAdultAge=data.data[0].adult_label
                  this.proToddlerAge=data.data[0].toddler_label
                  this.genChildAge=data.data[0].general_child_label_package
                  for (let i = 0; i < this.roomDetails.length; i++) {
                    // if (this.roomDetails[i].room_type == 'Tent') {
                    //   this.isTent = true
                    // }
                    this.roomTypeProperty.push(this.roomDetails[i].property_room_type_id)
                    this.bedRulesProperty.push(this.roomDetails[i].bed_rules)
                    this.roomTypeNameProperty.push(this.roomDetails[i].room_type)
                    this.singleroomProperty.splice(i, 0, 0);
                    this.doubleroomProperty.splice(i, 0, 0);
                    this.extraroomProperty.splice(i, 0, 0);
                    this.adultProperty.splice(i, 0, 0);
                    this.childProperty.splice(i, 0, 0);
                    this.tentProperty.splice(i, 0, 0);
                    this.toddler.splice(i, 0, 0);
                    this.roomDetails[i].roomAmount = 0
                  }
        
                }
                else{
                  this.isLandCruise=false
                  this.isLand=false
                  this.isSamudram=true
                  this.pkgChidAge=data.data[0].child_label
                  this.pkgAdultAge=data.data[0].adult_label
                  this.pkgInfantAge=data.data[0].infants_label
                }
            
             
                this.package_id=data.data[0].pkg_id;
                // this.spinner.show();
        
                // if(this.isSamudram ){


                if(this.propertyDetails.length>0){
                  for (let i = 0; i < this.propertyDetails.length; i++) {
                    for (let j = 0; j < this.roomDetails.length; j++) {
                      if (this.propertyDetails[i].packageclass_id == this.roomDetails[j].property_room_type_id) {
                        this.singleroomProperty[j] = this.propertyDetails[i].single
                        this.doubleroomProperty[j] = this.propertyDetails[i].double
                        this.extraroomProperty[j] = this.propertyDetails[i].extra
                        this.adultProperty[j] = this.propertyDetails[i].no_of_adult
                        this.childProperty[j] = this.propertyDetails[i].no_of_child
                        this.toddler[j]=this.propertyDetails[i].no_of_toddler
                        // this.tent[j] = this.bookingDetails[i].tent
                        // this.roomDetails[j].count=+this.bookingDetails[i].count
                        // if (this.roomDetails[j].room_type == 'Tent') {
                        //   this.roomDetails[j].roomAmount = this.roomDetails[i].tent * this.tent[j] + this.roomDetails[i].child * this.child[j]
                        // }
                        // else {
                          this.roomDetails[j].roomAmount = this.roomDetails[j].single * this.singleroomProperty[j] + this.roomDetails[j].double * this.doubleroomProperty[j] + this.roomDetails[j].extra * this.extraroomProperty[j] + this.roomDetails[j].child * this.childProperty[j]
                        // }
                      }
  
                      // console.log( this.roomDetails[j].roomAmount)
                    }
  
                  }
                
  
                  for (let i = 0; i < this.roomDetails.length; i++) {
                    this.totAmount=this.totAmount+(+this.roomDetails[i].roomAmount)
                    // this.totalAmount1 = this.totalAmount1 + (+this.roomDetails[i].roomAmount)
                  }
                }
              // console.log(this.totAmount)


                if(this.bookingDetails.length>0){
                  for (let i = 0; i < this.bookingDetails.length; i++) {
                    for (let j = 0; j < this.shipClass.length; j++) {
                      if (this.bookingDetails[i].packageclass_id == this.shipClass[j].packageclass_id) {
                        this.adult[j] = this.bookingDetails[i].no_of_adult
                        // console.log(this.adult[j])
                        // this.doubleroomProperty[j] = this.propertyDetails[i].double
                        // this.extraroomProperty[j] = this.propertyDetails[i].extra
                        // this.adultProperty[j] = this.propertyDetails[i].no_of_adult
                        this.child[j] = this.bookingDetails[i].no_of_child
                        // console.log(this.child[j])
                        this.infant[j]=this.bookingDetails[i].no_of_infant
                        // this.tent[j] = this.bookingDetails[i].tent
                        // this.roomDetails[j].count=+this.bookingDetails[i].count
                        // if (this.roomDetails[j].room_type == 'Tent') {
                        //   this.roomDetails[j].roomAmount = this.roomDetails[i].tent * this.tent[j] + this.roomDetails[i].child * this.child[j]
                        // }
                        // else {
                          this.shipClass[j].roomAmount = this.shipClass[j].spcm_adult_fare * this.adult[j] + this.shipClass[j].spcm_child_fare * this.child[j] 
                        // }
                        
                      }
  
                      
                    }
  
                  }
                
  
                  for (let i = 0; i < this.shipClass.length; i++) {
                    this.totAmount1=this.totAmount1+(+this.shipClass[i].roomAmount)
                    // this.totalAmount = this.totalAmount + (+this.shipClass[i].roomAmount)
                  }

                 
                }
                this.cal(this.totAmount,this.totAmount1)
        
              
                this.api.newCostDetailsPackage(+this.package_id).subscribe((data: any) => {
                  this.spinner.hide()
                  if (data.status == "Success" && data.message != 'No data') {
                    this.spinner.hide()
                    this.isFee = true;
                     this.transportation = data.data[0].transportation;
                     this.shipForm.get('transportType').setValue(this.tmode)
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
                      this.shipForm.get('transportType').setValidators([Validators.required])
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
                 
                // }
                // else if(this.isLand){
                //   this.spinner.hide()
                //   // this.shipClass = data.data[0].package_class;
                // }
                this.startingDate = data.data[0].ship_travel_dept_date;
                this.endDate = data.data[0].ship_travel_arr_date;
               
                // this.shipClass.forEach( (item, index) => {
                //   if(item.count == '0'){
                //     this.shipClass.splice(index,1);
                //   } 
                // });
        
                if (this.shipClass.length > 0 || this.isLand) {
                  this.showTotal = true;
                }
                else {
                  this.showTotal = false;
                }
               
              }
              else {
                this.spinner.hide()
              }
            },
              (err: HttpErrorResponse) => {
                this.popup.failureMessage = "Internal Server Error"
                this.popup.failurepopup();
                this.spinner.hide()
              });
          }
          else{
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

      }else{
      this.api.individualShipDetails(+this.shipId).subscribe((data: any) => {
        if (data.status == "Success") {
          this.spinner.hide()
          this.packageTypeCode=data.data[0].package_type_code
  
          this.pkgId=data.data[0].pkg_id
          this.propertyId=data.data[0].property_id
          this.pType=data.data[0].tourism_provider
          if(data.data[0].bed_rules.length!=0){
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



          }
  
          if(this.packageTypeCode=='150003'){
            this.isLandCruise=true
            this.isLand=false
            this.isSamudram=false
            this.roomDetails = data.data[0].room_category;
            this.roomThumbPath = data.data[0].thumb_path_room
  
            this.deptLocation= data.data[0].departure_location;
            this.deptDate= data.data[0].ship_travel_dept_date;
            this.shipName= data.data[0].ship_name;
            this.destLocation= data.data[0].destination_loc;
            this.destDate= data.data[0].shp_destination_date;
            this.returnShipName= data.data[0].return_ship_name;
            this.returnLocation= data.data[0].return_loc;
            this.returnDate= data.data[0].shp_td_return_date;
            this.arrivalLocation= data.data[0].arrival_location;
            this.arrivalDate= data.data[0].ship_travel_arr_date;
  
  
            this.startdate = data.data[0].ship_travel_dept_date;
            this.endDate = data.data[0].ship_travel_arr_date;
  
            this.departureTime=data.data[0].ship_travel_dept_time;
            this.destinationTime=data.data[0].shp_destination_time;
            this.returnTime=data.data[0].shp_td_return_time;
            this.arrivalTime=data.data[0].ship_travel_arrival_time;
  
            this.pkgChidAge=data.data[0].child_label
            this.pkgAdultAge=data.data[0].adult_label
            this.pkgInfantAge=data.data[0].infants_label
  
  
            this.proChidAge=data.data[0].child_label_property
            this.proAdultAge=data.data[0].adult_label_property
            this.proToddlerAge=data.data[0].toddler_label_property
            this.genChildAge=data.data[0].general_child_label
  
  
            for (let i = 0; i < this.roomDetails.length; i++) {
              // if (this.roomDetails[i].room_type == 'Tent') {
              //   this.isTent = true
              // }
              this.roomTypeProperty.push(this.roomDetails[i].property_room_type_id)
              this.bedRulesProperty.push(this.roomDetails[i].bed_rules)
              this.roomTypeNameProperty.push(this.roomDetails[i].room_type)
              this.singleroomProperty.splice(i, 0, 0);
              this.doubleroomProperty.splice(i, 0, 0);
              this.extraroomProperty.splice(i, 0, 0);
              this.adultProperty.splice(i, 0, 0);
              this.childProperty.splice(i, 0, 0);
              this.tentProperty.splice(i, 0, 0);
              this.toddler.splice(i, 0, 0);
              this.roomDetails[i].roomAmount = 0
            }
          }else if(this.packageTypeCode=='150002'){
            this.isLand=true
            this.isLandCruise=false
            this.isSamudram=false
            this.roomDetails = data.data[0].room_category;
            this.roomThumbPath = data.data[0].thumb_path_room
            this.startdate = data.data[0].ship_travel_dept_date;
            this.endDate = data.data[0].ship_travel_arr_date;
            this.proChidAge=data.data[0].child_label
            this.proAdultAge=data.data[0].adult_label
            this.proToddlerAge=data.data[0].toddler_label
            this.genChildAge=data.data[0].general_child_label_package
            for (let i = 0; i < this.roomDetails.length; i++) {
              // if (this.roomDetails[i].room_type == 'Tent') {
              //   this.isTent = true
              // }
              this.roomTypeProperty.push(this.roomDetails[i].property_room_type_id)
              this.bedRulesProperty.push(this.roomDetails[i].bed_rules)
              this.roomTypeNameProperty.push(this.roomDetails[i].room_type)
              this.singleroomProperty.splice(i, 0, 0);
              this.doubleroomProperty.splice(i, 0, 0);
              this.extraroomProperty.splice(i, 0, 0);
              this.adultProperty.splice(i, 0, 0);
              this.childProperty.splice(i, 0, 0);
              this.tentProperty.splice(i, 0, 0);
              this.toddler.splice(i, 0, 0);
              this.roomDetails[i].roomAmount = 0
            }
  
          }
          else{
            this.isLandCruise=false
            this.isLand=false
            this.isSamudram=true
            this.pkgChidAge=data.data[0].child_label
            this.pkgAdultAge=data.data[0].adult_label
            this.pkgInfantAge=data.data[0].infants_label
          }
      
       
          this.package_id=data.data[0].pkg_id;
          // this.spinner.show();
  
          // if(this.isSamudram ){
  
        
          this.api.newCostDetailsPackage(+this.package_id).subscribe((data: any) => {
            this.spinner.hide()
            if (data.status == "Success" && data.message != 'No data') {
              this.spinner.hide()
              this.isFee = true;
               this.transportation = data.data[0].transportation;
               this.heritageAdult= data.data[0].heritage_adult_label
              this.heritageChild= data.data[0].heritage_child_label 
              this.heritage_fee_adult = +data.data[0].heritage_fee_adult
              this.heritage_fee_child = +data.data[0].heritage_fee_child
              if (this.transportation[0]) {
                this.shipForm.get('transportType').setValidators([Validators.required])
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
            this.shipClass = data.data[0].package_class;
          // }
          // else if(this.isLand){
          //   this.spinner.hide()
          //   // this.shipClass = data.data[0].package_class;
          // }
          this.startingDate = data.data[0].ship_travel_dept_date;
          this.endDate = data.data[0].ship_travel_arr_date;
         
          // this.shipClass.forEach( (item, index) => {
          //   if(item.count == '0'){
          //     this.shipClass.splice(index,1);
          //   } 
          // });
  
          if (this.shipClass.length > 0 || this.isLand) {
            this.showTotal = true;
          }
          else {
            this.showTotal = false;
          }
          this.shipImages = data.data[0].ship_img_url;
          this.thumpUrl = data.data[0].thumb_path;
          this.propertyType = data.data[0].pkg_id;
          this.propertyName = data.data[0].pkg_name
          this.pkg_desc = data.data[0].pkg_desc
          //console.log(this.propertyName)
          for (let i = 0; i < this.shipClass.length; i++) {
            this.singleroom.splice(i, 0, 0);
            this.doubleroom.splice(i, 0, 0);
            this.extraroom.splice(i, 0, 0);
            this.adult.splice(i, 0, 0);
            this.child.splice(i, 0, 0);
            this.infant.splice(i,0,0);
            this.shipType.push(this.shipClass[i].packageclass_id);
            this.shipClass[i].roomAmount = 0
  
          }
          this.shipForm.addControl('single', new FormArray([]))
          this.shipForm.addControl('double', new FormArray([]));
          this.shipForm.addControl('extra', new FormArray([]));
        }
        else {
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


  removeAdult(val) {
    if (this.adult[val] > 0) {
      var a = this.adult[val]
      a = a - 1
      this.countAdult = 0;
       this.adult.splice(val, 1, a)
       for(var r=0; r<this.adult.length; r++){
        this.countAdult+= this.adult[r];
       }
      this.shipClass[val].roomAmount = this.shipClass[val].roomAmount - (+this.shipClass[val].spcm_adult_fare)
    }

    this.totalamount()

  }
  addAdult(val) {
    if (this.adult[val] < 100) {
      var a = this.adult[val]
      a = a + 1
      this.countAdult = 0;
       this.adult.splice(val, 1, a)
       for(var s=0; s<this.adult.length; s++){
        this.countAdult+= this.adult[s];
       }
      this.shipClass[val].roomAmount = this.shipClass[val].roomAmount + (+this.shipClass[val].spcm_adult_fare)
    }
    this.totalamount()
  }
  removeChild(val) {
    if (this.child[val] > 0) {
      var a = this.child[val]
      a = a - 1
      this.countChild = 0;
      
      this.child.splice(val, 1, a)
      for(var p=0; p<this.child.length; p++){
        this.countChild+= this.child[p];
        // console.log(this.child[p])
      }
      this.shipClass[val].roomAmount = this.shipClass[val].roomAmount - (+this.shipClass[val].spcm_child_fare)
    }
    this.totalamount()
  }
  addChild(val) {
    if (this.child[val] < 100) {
      var c = this.child[val]
      c = c + 1
      this.countChild = 0;
      
      this.child.splice(val, 1, c)
      for(var t=0; t<this.child.length; t++){
        this.countChild+= this.child[t];
       }
      this.shipClass[val].roomAmount = this.shipClass[val].roomAmount + (+this.shipClass[val].spcm_child_fare)

    }
    this.totalamount()
  }

infantCount:any;
  removeInfant(val) {
    if (this.infant[val] > 0) {
      var a = this.infant[val]
      a = a - 1
      this.infantCount = 0;
      
      this.infant.splice(val, 1, a)
      for(var p=0; p<this.infant.length; p++){
        this.infantCount+= this.infant[p];
        // console.log(this.child[p])
      }
      // this.shipClass[val].roomAmount = this.shipClass[val].roomAmount - (+this.shipClass[val].spcm_child_fare)
    }
    // this.totalamount()
  }
  addInfant(val) {
    if (this.infant[val] < 100) {
      var c = this.infant[val]
      c = c + 1
      this.infantCount = 0;
      
      this.infant.splice(val, 1, c)
      for(var t=0; t<this.infant.length; t++){
        this.infantCount+= this.infant[t];
       }
      // this.shipClass[val].roomAmount = this.shipClass[val].roomAmount + (+this.shipClass[val].spcm_child_fare)

    }
    // this.totalamount()
  }


  get formArr() {
    return this.shipForm.get('itemRows') as FormArray;
  }
  get formArr1() {
    return this.shipForm.get('itemRows1') as FormArray;
  }
  initItemRows() {
    return this.formBuilder.group({
      singleroom: [''],
      doubleroom: [''],
      extraroom: [''],
      adult: [''],
      child: [''],
    });
  }

  initItemRows1() {
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

    this.isAdult = false

    if (localStorage.getItem('uid') == null && localStorage.getItem('sessionid') == null) {

      this.variable.isSignin = 1
      jQuery('#exampleModalCenter').modal('show');


    }
    else {
      this.submitted = true;
      if (this.shipForm.invalid) {
        const firstElementWithError = document.querySelector('ng-select.ng-invalid');


        if (firstElementWithError) {
           firstElementWithError.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }



      // //console.log(this.singleroom, this.doubleroom, this.extraroom)

      if (this.isModeShow) {
        this.transportMode = this.shipForm.value.transportType;
      }
      else {
        this.transportMode = 0;

      }

      if(this.isSamudram){
        const combined = this.adult.map((array1val, index) => [{ "packageclass_id": this.shipType[index], "no_of_adult": array1val, "no_of_child": this.child[index],"no_of_infant":this.infant[index], "single": 0, "double": 0, "extra": 0 }])
        //console.log(combined)
  
        var merged = Array.prototype.concat.apply([], combined);
  
        var adultCount = 0;
        var childCount = 0;
        var totalCount;
        for (var m = 0; m < merged.length; m++) {
          //console.log(merged[m].no_of_adult)
          if (merged[m].no_of_adult > 0) {
            this.isAdult = true
          }
          adultCount += merged[m].no_of_adult;
  
          childCount += merged[m].no_of_child;
          totalCount = +adultCount + +childCount;
        }
  
        //console.log('Your sum is ' + adultCount, childCount, totalCount);
        localStorage.setItem('adultcount', JSON.stringify(adultCount));
        localStorage.setItem('childcount', JSON.stringify(childCount));
        localStorage.setItem('totalcount', JSON.stringify(totalCount));
        // this.router.navigate(['touristAdd'])
        if (this.isAdult) {
          // console.log(this.startingDate)
          // console.log(this.endDate)
          this.spinner.show()
          this.api.availabilityCheck(localStorage.getItem('uid'), localStorage.getItem('sessionid'), this.startingDate, this.endDate,this.propertyType,0, +this.ship_travel_id, merged,this.bookingDetailsData,this.transportMode).subscribe((data: any) => {
            this.spinner.hide()
            //console.log(data)
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
              localStorage.setItem("callback",'info')
              this.router.navigate(['profileupdate', this.ship_travel_id,data.data[0].booking_id, data.data[0].json_id])
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
        } else {
          this.popup.failureMessage = "Add Atleast one Adult to Book this Package"
          this.popup.failurepopup()
        }
      }
      else if(this.isLand){
        // console.log("land")
        this.isValid = false
        this.extraIsOr = false
        this.isRule = false
        this.extraRule = false


        const combined1 = this.singleroomProperty.map((val1, index) => [{ "packageclass_id": this.roomTypeProperty[index], "no_of_adult": this.adultProperty[index], "no_of_child": this.childProperty[index], "single": val1, "double": this.doubleroomProperty[index], "extra": this.extraroomProperty[index], "bed_rules": this.bedRulesProperty[index],"room_type_name": this.roomTypeNameProperty[index],"no_of_toddler":this.toddler[index]}])
        // console.log(combined)
    
        var merged1 = Array.prototype.concat.apply([], combined1);
        // console.log(merged1)
    
        var adultCount1 = 0;
        var childCount1 = 0;
        var toddlerCount =0;
        var totalCount1 = 0;
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
    
        for (var m = 0; m < merged1.length; m++) {
    
    
    
          if ((+merged1[m].no_of_adult > 0) && (+merged1[m].single == 0 && +merged1[m].double == 0 && +merged1[m].tent == 0)) {
            this.isValid = true
          }
          single_adult_no = merged1[m].bed_rules.single.bcd_adult * merged1[m].single
          single_child_no = merged1[m].bed_rules.single.bcd_child * merged1[m].single
          single_extra_no = merged1[m].bed_rules.single.bcd_extra * merged1[m].single
          single_total_no = merged1[m].bed_rules.single.total_count * merged1[m].single
    
          double_adult_no = merged1[m].bed_rules.double.bcd_adult * merged1[m].double
          double_child_no = merged1[m].bed_rules.double.bcd_child * merged1[m].double
          double_extra_no = merged1[m].bed_rules.double.bcd_extra * merged1[m].double
          double_total_no = merged1[m].bed_rules.double.total_count * merged1[m].double
    
          extra_adult_no = merged1[m].bed_rules.extra.bcd_adult * merged1[m].extra
          extra_child_no = merged1[m].bed_rules.extra.bcd_child * merged1[m].extra
          extra_total_no = merged1[m].bed_rules.extra.total_count * merged1[m].extra
    
          // tent_adult_no = merged1[m].bed_rules.tent.bcd_adult * merged1[m].tent
          // tent_child_no = merged1[m].bed_rules.tent.bcd_child * merged1[m].tent
          // tent_extra_no = merged1[m].bed_rules.tent.bcd_extra * merged1[m].tent
          // tent_total_no = merged1[m].bed_rules.tent.total_count * merged1[m].tent
    
          if (merged1[m].bed_rules.extra.bcd_adult + merged1[m].bed_rules.extra.bcd_child != merged1[m].bed_rules.extra.total_count) {
            this.extraIsOr = true
          }
          else {
            this.extraIsOr = false
          }
          single_no = merged1[m].single
          doubleCount = merged1[m].double
          adult_no = merged1[m].no_of_adult
    
          child_no = merged1[m].no_of_child
          extra_no = merged1[m].extra
          if (single_extra_no + double_extra_no < extra_total_no) {
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
              // console.log("Or")
              // console.log(single_adult_no)
              // console.log(double_adult_no)
              // console.log(tent_adult_no)
              // console.log(extra_adult_no)
              // console.log(adult_no)

              // if ((((single_adult_no + double_adult_no + tent_adult_no + extra_adult_no) >= adult_no) && ((single_child_no + tent_child_no + double_child_no) >= child_no)) || (((single_adult_no + double_adult_no + tent_adult_no) >= adult_no) && ((single_child_no + double_child_no + tent_child_no + extra_total_no) >= child_no))) {
    
                if((single_total_no +double_total_no+extra_total_no)>=(adult_no+child_no)){
              }
              else {
                this.isRule = true
              }
    
            }
    
    
          }
    
          adultCount1 += merged1[m].no_of_adult;
          childCount1 += merged1[m].no_of_child;
          toddlerCount +=merged1[m].no_of_toddler;
          singleCount += merged1[m].single;
          doubleCount += merged1[m].double;
          extraCount += merged1[m].extra
          totalCount1 = +adultCount1 + +childCount1 + +toddlerCount;
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
        if (this.isValid || totalCount1 == 0) {
          this.popup.failureMessage = "Kindly select any room to proceed"
          this.popup.failurepopup()
        }
        else {
          // console.log(this.isRule)
          // console.log(this.extraRule)
          if (this.isRule || this.extraRule) {
            this.popup.failureMessage = "Kindly modify your selection as per the room policies. "
            this.popup.failurepopup()
          }
          else {


            localStorage.setItem('adultcount', JSON.stringify(adultCount1));
          localStorage.setItem('childcount', JSON.stringify(childCount1));
          localStorage.setItem('totalcount', JSON.stringify(totalCount1));
          // this.router.navigate(['touristAdd',331])
          // var merged1=merged
          // const combined = this.singleroom.map((array1val, index) => [{ "packageclass_id": this.roomType[index], "no_of_adult": this.adult[index], "no_of_child": this.child[index], "single": array1val, "double": this.doubleroom[index], "extra": this.extraroom[index], "tent": this.tent[index], "room_type_name": this.roomTypeName[index] }])

          // var merged = Array.prototype.concat.apply([], combined);
          // console.log(merged1)

          this.spinner.show()
          this.api.availabilityCheck(localStorage.getItem('uid'), localStorage.getItem('sessionid'), this.startdate, this.endDate, this.propertyType, this.propertyId,+this.ship_travel_id,this.bookingDetailsData, merged1, this.transportMode).subscribe((data: any) => {
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
              localStorage.setItem("callback",'info')
              this.router.navigate(['profileupdate', this.ship_travel_id, data.data[0].booking_id, data.data[0].json_id])
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
        }
      }
      else{
        // console.log("land and cruse")



        const combined = this.adult.map((array1val, index) => [{ "packageclass_id": this.shipType[index], "no_of_adult": array1val, "no_of_child": this.child[index],"no_of_infant":this.infant[index], "single": 0, "double": 0, "extra": 0 }])
        //console.log(combined)
  
        var merged = Array.prototype.concat.apply([], combined);
  
        var adultCount = 0;
        var childCount = 0;
        var totalCount;
        for (var m = 0; m < merged.length; m++) {
          //console.log(merged[m].no_of_adult)
          if (merged[m].no_of_adult > 0) {
            this.isAdult = true
          }
          adultCount += merged[m].no_of_adult;
  
          childCount += merged[m].no_of_child;
          totalCount = +adultCount + +childCount;
        }
  
        //console.log('Your sum is ' + adultCount, childCount, totalCount);
        // localStorage.setItem('adultcount', JSON.stringify(adultCount));
        // localStorage.setItem('childcount', JSON.stringify(childCount));
        // localStorage.setItem('totalcount', JSON.stringify(totalCount));
        // this.router.navigate(['touristAdd'])
        if (this.isAdult) {
          
          this.isValid = false
          this.extraIsOr = false
          this.isRule = false
          this.extraRule = false
  
  
          const combined1 = this.singleroomProperty.map((val1, index) => [{ "packageclass_id": this.roomTypeProperty[index], "no_of_adult": this.adultProperty[index], "no_of_child": this.childProperty[index], "single": val1, "double": this.doubleroomProperty[index], "extra": this.extraroomProperty[index], "bed_rules": this.bedRulesProperty[index], "room_type_name": this.roomTypeNameProperty[index],"no_of_toddler":this.toddler[index]}])
          // console.log(combined)
      
          var merged1 = Array.prototype.concat.apply([], combined1);
          // console.log(merged1)
      
          var adultCount1 = 0;
          var childCount1 = 0;
          var totalCount1 = 0;
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
      
          for (var m = 0; m < merged1.length; m++) {
      
      
      
            if ((+merged1[m].no_of_adult > 0) && (+merged1[m].single == 0 && +merged1[m].double == 0 && +merged1[m].tent == 0)) {
              this.isValid = true
            }
            single_adult_no = merged1[m].bed_rules.single.bcd_adult * merged1[m].single
            single_child_no = merged1[m].bed_rules.single.bcd_child * merged1[m].single
            single_extra_no = merged1[m].bed_rules.single.bcd_extra * merged1[m].single
            single_total_no = merged1[m].bed_rules.single.total_count * merged1[m].single
      
            double_adult_no = merged1[m].bed_rules.double.bcd_adult * merged1[m].double
            double_child_no = merged1[m].bed_rules.double.bcd_child * merged1[m].double
            double_extra_no = merged1[m].bed_rules.double.bcd_extra * merged1[m].double
            double_total_no = merged1[m].bed_rules.double.total_count * merged1[m].double
      
            extra_adult_no = merged1[m].bed_rules.extra.bcd_adult * merged1[m].extra
            extra_child_no = merged1[m].bed_rules.extra.bcd_child * merged1[m].extra
            extra_total_no = merged1[m].bed_rules.extra.total_count * merged1[m].extra
      
            // tent_adult_no = merged1[m].bed_rules.tent.bcd_adult * merged1[m].tent
            // tent_child_no = merged1[m].bed_rules.tent.bcd_child * merged1[m].tent
            // tent_extra_no = merged1[m].bed_rules.tent.bcd_extra * merged1[m].tent
            // tent_total_no = merged1[m].bed_rules.tent.total_count * merged1[m].tent
      
            if (merged1[m].bed_rules.extra.bcd_adult + merged1[m].bed_rules.extra.bcd_child != merged1[m].bed_rules.extra.total_count) {
              this.extraIsOr = true
            }
            else {
              this.extraIsOr = false
            }
            single_no = merged1[m].single
            doubleCount = merged1[m].double
            adult_no = merged1[m].no_of_adult
      
            child_no = merged1[m].no_of_child
            extra_no = merged1[m].extra
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
                // console.log("Or")
                // console.log(single_adult_no)
                // console.log(double_adult_no)
                // console.log(tent_adult_no)
                // console.log(extra_adult_no)
                // console.log(adult_no)
  
                // if ((((single_adult_no + double_adult_no + tent_adult_no + extra_adult_no) >= adult_no) && ((single_child_no + tent_child_no + double_child_no) >= child_no)) || (((single_adult_no + double_adult_no + tent_adult_no) >= adult_no) && ((single_child_no + double_child_no + tent_child_no + extra_total_no) >= child_no))) {
                  if((single_total_no +double_total_no+extra_total_no)>=(adult_no+child_no)){
      
                }
                else {
                  this.isRule = true
                }
      
              }
      
      
            }
      
            adultCount1 += merged1[m].no_of_adult;
            childCount1 += merged1[m].no_of_child;
            singleCount += merged1[m].single;
            doubleCount += merged1[m].double;
            // tentCount += merged1[m].tent
            extraCount += merged1[m].extra
            totalCount1 = +adultCount1 + +childCount1;
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
          if (this.isValid || totalCount1 == 0) {
            this.popup.failureMessage = "Kindly select any room to proceed"
            this.popup.failurepopup()
          }
          else {
            // console.log(this.isRule)
            // console.log(this.extraRule)
            if (this.isRule || this.extraRule) {
              this.popup.failureMessage = "Kindly modify your selection as per the room policies. "
              this.popup.failurepopup()
            }
            else {
              // console.log(totalCount)
              // console.log(totalCount1)
              if(totalCount>totalCount1){
                localStorage.setItem('totalcount', JSON.stringify(totalCount));
              }
              else{
                localStorage.setItem('totalcount', JSON.stringify(totalCount1));
              }
              this.spinner.show()
              this.api.availabilityCheck(localStorage.getItem('uid'), localStorage.getItem('sessionid'), this.startingDate, this.endDate,this.propertyType, this.propertyId, +this.ship_travel_id, merged,merged1,this.transportMode).subscribe((data: any) => {
                this.spinner.hide()
                //console.log(data)
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
                  localStorage.setItem("callback",'info')
                  this.router.navigate(['profileupdate', this.ship_travel_id,data.data[0].booking_id, data.data[0].json_id])
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


            }
          }
        }
        else{
          this.popup.failureMessage = "Add Atleast one Adult to Book this Package"
          this.popup.failurepopup()
        }
      }

     
    }


  }


  checkAvail(val) {
    this.singleAvail = []
    this.singleAvail.push(val)
    this.isAdult = false

    // if (localStorage.getItem('uid') == null && localStorage.getItem('sessionid') == null) {

    //   this.variable.isSignin=1
    //   jQuery('#exampleModalCenter').modal('show');


    // }
    // else{
    // this.submitted = true;
    // if (this.shipForm.invalid) {
    //   const firstElementWithErrorSec = document.querySelector('ng-select.ng-invalid');


    //   if (firstElementWithErrorSec) {
    //      firstElementWithErrorSec.scrollIntoView({ behavior: 'smooth' });
    //   }
    //   return;
    // }



    // //console.log(this.singleroom, this.doubleroom, this.extraroom)


    const combined = this.singleAvail.map((array1val, index) => [{ "packageclass_id": this.shipType[val], "no_of_adult": this.adult[val], "no_of_child": this.child[val],"no_of_infant":this.infant[index], "single": 0, "double": 0, "extra": 0,"no_of_toddler": 0 }])
    //console.log(combined)

    var merged = Array.prototype.concat.apply([], combined);

    var adultCount = 0;
    var childCount = 0;
    var totalCount;
    for (var m = 0; m < merged.length; m++) {
      //console.log(merged[m].no_of_adult)
      if (merged[m].no_of_adult > 0) {
        this.isAdult = true
      }
      adultCount += merged[m].no_of_adult;

      childCount += merged[m].no_of_child;
      totalCount = +adultCount + +childCount;
    }

    // //console.log('Your sum is ' + adultCount, childCount, totalCount);
    // localStorage.setItem('adultcount', JSON.stringify(adultCount));
    // localStorage.setItem('childcount', JSON.stringify(childCount));
    // localStorage.setItem('totalcount', JSON.stringify(totalCount));
    // this.router.navigate(['touristAdd'])
    if (this.isAdult) {
      //console.log(this.startingDate)
      //console.log(this.endDate)
      this.spinner.show()
      this.api.individualAvailabilityCheck(localStorage.getItem('uid'), localStorage.getItem('sessionid'), this.startingDate, this.endDate, this.propertyType, this.ship_travel_id,0, merged).subscribe((data: any) => {
        this.spinner.hide()
        //console.log(data)
        if (data.status == "Success") {
          this.popup.sucessMessage = data.message
          this.popup.sucesspopup()
          // localStorage.setItem('note',data.data[0].booking_id)
          // this.router.navigate(['touristAdd',data.data[0].booking_id])

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
    } else {
      this.popup.failureMessage = "Add Atleast one Adult to Book this Package"
      this.popup.failurepopup()
    }
    // }
  }


  totalAmount: any = 0;
  totAmount1:any=0;
  totalamount() {
    this.totAmount1 = 0;
    // if(this.isLand){

    // }
    // else if(this.isSamudram){

    // }
    for (let i = 0; i < this.shipClass.length; i++) {
      this.totAmount1 = this.totAmount1 + (+this.shipClass[i].roomAmount)
    
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
  }
  this.cal(this.totAmount,this.totAmount1)
  // this.totalAmount=totalAmount1+this.totalAmount
  }
  viewDetails(event) {
    this.transData=true
    this.transAdult = event.transport_adult_label
    this.transChild = event.transport_child_label
    this.transport_fee_adult = +event.transport_adult_fare
    this.transport_fee_child = +event.transport_child_fare
    if(this.transport_fee_adult=='0.00' && this.transport_fee_child=='0.00'){
      this.isTransport=false;
     }
     else{
      this.isTransport=true;
     }
    this.totalamount()
  }

tent:any;
countAdultProperty:any;
countChildProperty:any;
  removeAdultPro(val) {

    if (this.adultProperty[val] > 0) {
      var a = this.adultProperty[val]
      a = a - 1
      this.adultProperty.splice(val, 1, a)
      this.countAdultProperty = 0;
      for (var p = 0; p < this.adultProperty.length; p++) {
        this.countAdultProperty += this.adultProperty[p];
      }
      if (this.adultProperty[val] == 0) {
        this.toddler[val]=0
        this.singleroomProperty[val] = 0
        this.doubleroomProperty[val] = 0
        this.childProperty[val] = 0
        this.countChildProperty = 0;
        for (var r = 0; r < this.childProperty.length; r++) {
          this.countChildProperty += this.childProperty[r];
        }
        this.tentProperty[val] = 0
        this.extraroomProperty[val] = 0
        this.roomDetails[val].roomAmount = 0
        this.heritage_child = 0;
        this.transport_child = 0;
        this.totalamountPro()
      }
      this.totalamountPro()
    }
    this.totalamountPro()
  }
  addAdultPro(val) {
    if (this.adultProperty[val] < 100) {
      var a = this.adultProperty[val]
      a = a + 1
      this.countAdultProperty = 0;

      this.adultProperty.splice(val, 1, a)
      for (var t = 0; t < this.adultProperty.length; t++) {
        this.countAdultProperty += this.adultProperty[t];
      }
    }
    this.totalamountPro()
  }
  removeChildPro(val) {
    if (this.childProperty[val] > 0) {
      var a = this.childProperty[val]
      a = a - 1
      this.countChildProperty = 0;
      this.childProperty.splice(val, 1, a)
      for (var r = 0; r < this.childProperty.length; r++) {
        this.countChildProperty += this.childProperty[r];
      }
      if (this.childProperty[val] == 0) {
        this.countChildProperty = 0;
        this.heritage_child = 0;
        this.transport_child = 0;
        this.totalamountPro()
      }
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount - (+this.roomDetails[val].child)
      this.totalamountPro()
    }
    this.totalamountPro()
  }

  removeTentPro(val) {
    if (this.tentProperty[val] > 0) {
      var j = this.tentProperty[val]
      j = j - 1
      this.tentProperty.splice(val, 1, j)
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount - (+this.roomDetails[val].tent)
      if (this.doubleroomProperty[val] == 0 && this.singleroomProperty[val] == 0 && this.tentProperty[val] == 0) {
        this.extraroomProperty[val] = 0
        this.roomDetails[val].roomAmount = (+this.roomDetails[val].child) * this.childProperty[val]

      }

      this.totalamount()
    }
    this.totalamount()
  }

  addTentPro(val) {
    if (this.tentProperty[val] < 100) {
      var j = this.tentProperty[val]
      j = j + 1
      this.tentProperty.splice(val, 1, j)
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount + (+this.roomDetails[val].tent)
      this.totalamount()
    }
  }

  addChildPro(val) {
    if (this.adultProperty[val] > 0) {
      if (this.childProperty[val] < 100) {
        var c = this.childProperty[val]
        c = c + 1;
        this.countChildProperty = 0

        this.childProperty.splice(val, 1, c)
        for (var s = 0; s < this.childProperty.length; s++) {
          this.countChildProperty += this.childProperty[s];
        }
        this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount + (+this.roomDetails[val].child)
      }
      this.totalamountPro()
    }

  }
  countToddlerProperty:any;
  addToddlerPro(val) {
    if (this.adultProperty[val] > 0) {
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

  removeSinglePro(val) {
    if (this.singleroomProperty[val] > 0) {
      var j = this.singleroomProperty[val]
      j = j - 1
      this.singleroomProperty.splice(val, 1, j)
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount - (+this.roomDetails[val].single)
      if (this.doubleroomProperty[val] == 0 && this.singleroomProperty[val] == 0 && this.tentProperty[val] == 0) {
        this.extraroomProperty[val] = 0
        this.roomDetails[val].roomAmount = (+this.roomDetails[val].child) * this.childProperty[val]
      }

      this.totalamountPro()
    }
    this.totalamountPro()
  }
  addSinglePro(val) {
    if (this.singleroomProperty[val] < 100) {
      var j = this.singleroomProperty[val]
      j = j + 1
      this.singleroomProperty.splice(val, 1, j)
      this.roomDetails[val].roomAmount = this.roomDetails[val].roomAmount + (+this.roomDetails[val].single)
      this.totalamountPro()
    }

  }

  removeDoublePro(value) {
    if (this.doubleroomProperty[value] > 0) {
      var k = this.doubleroomProperty[value]
      k = k - 1
      this.doubleroomProperty.splice(value, 1, k)
      this.roomDetails[value].roomAmount = this.roomDetails[value].roomAmount - (+this.roomDetails[value].double)
      if (this.doubleroomProperty[value] == 0 && this.singleroomProperty[value] == 0 && this.tentProperty[value] == 0) {
        this.extraroomProperty[value] = 0
        this.roomDetails[value].roomAmount = (+this.roomDetails[value].child) * this.childProperty[value]
      }
      this.totalamountPro()
    }
    this.totalamountPro()
  }
  addDoublePro(value) {


    if (this.doubleroomProperty[value] < 100) {
      var k = this.doubleroomProperty[value]
      k = k + 1
      this.doubleroomProperty.splice(value, 1, k)
      this.roomDetails[value].roomAmount = this.roomDetails[value].roomAmount + (+this.roomDetails[value].double)
      this.totalamountPro()
    }
    // //console.log(this.doubleroom)
  }


  removeExtraPro(value) {

    if (this.extraroomProperty[value] > 0) {
      var p = this.extraroomProperty[value]
      p = p - 1
      this.extraroomProperty.splice(value, 1, p)
      this.roomDetails[value].roomAmount = this.roomDetails[value].roomAmount - (+this.roomDetails[value].extra)
      this.totalamountPro()
    }
    this.totalamountPro()
    // //console.log(this.extraroom)

  }
  addExtraPro(value) {
    if ((this.doubleroomProperty[value]) > 0 || (this.singleroomProperty[value]) > 0 || (this.tentProperty[value]) > 0) {
      if (this.extraroomProperty[value] < 100) {
        var p = this.extraroomProperty[value]
        p = p + 1
        this.extraroomProperty.splice(value, 1, p)
        this.roomDetails[value].roomAmount = this.roomDetails[value].roomAmount + (+this.roomDetails[value].extra)
      }
      this.totalamountPro()
    }

    // //console.log(this.extraroom)

  }

  isValid:boolean;
  extraIsOr:boolean;
  isRule:boolean;
  extraRule:boolean;

  singleAvail1:any=[]
  checkAvailPro(val){
    this.isValid = false
    this.extraIsOr = false
    this.isRule = false
    this.extraRule = false
    this.singleAvail1 = []
    this.singleAvail1.push(val)

    // console.log(this.roomTypeNameProperty[val])
    // if (localStorage.getItem('uid') == null && localStorage.getItem('sessionid') == null) {

    //   this.variable.isSignin = 1
    //   jQuery('#exampleModalCenter').modal('show');


    // }
    // else {
    // this.submitted = true;
    // if (this.shipForm.invalid) {
    //   // $('html, body').animate({
    //   //   scrollTop: parseInt($("#target").offset().top)
    //   // }, 1000);
    //   const firstElementWithError = document.querySelector('my-date-picker.ng-invalid,ng-select.ng-invalid');


    //   if (firstElementWithError) {
    //     firstElementWithError.scrollIntoView({ behavior: 'smooth' });
    //   }
    //   return;
    // }


    // this.startingDate = this.searchForm.value.startdate.formatted;
    // this.endDate = this.searchForm.value.returndate.formatted;
    // }
    const combined = this.singleAvail1.map((val1, index) => [{ "packageclass_id": this.roomTypeProperty[val], "no_of_adult": this.adultProperty[val], "no_of_child": this.childProperty[val], "single": this.singleroomProperty[val], "double": this.doubleroomProperty[val], "extra": this.extraroomProperty[val], "bed_rules": this.bedRulesProperty[val], "room_type_name": this.roomTypeNameProperty[val],"no_of_toddler" :this.toddler[val],"no_of_infant": 0}])
    // console.log(combined)

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


    var tent_adult_no = 0
    var tent_child_no = 0
    var tent_total_no = 0
    var tent_extra_no = 0

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
          if ((((single_adult_no + double_adult_no  + extra_total_no) >= adult_no) && ((single_child_no + double_child_no + tent_child_no + extra_child_no) >= child_no))) {

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
        // this.startdate = this.searchForm.get('startdate').value
        // this.endDate = this.searchForm.get('returndate').value
        // this.startdate = this.startdate.jsdate
        // this.startdate = this.datePipe.transform(this.startdate, 'yyyy-MM-dd');

        // this.endDate = this.endDate.jsdate
        // this.endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');

        // //console.log(merged)
        // //console.log('Your sum is ' + adultCount, childCount, totalCount);
        // localStorage.setItem('adultcount', JSON.stringify(adultCount));
        // localStorage.setItem('childcount', JSON.stringify(childCount));
        // localStorage.setItem('totalcount', JSON.stringify(totalCount));
        // // this.router.navigate(['touristAdd',331])

        this.spinner.show()
        this.api.individualAvailabilityCheck(localStorage.getItem('uid'), localStorage.getItem('sessionid'), this.startdate, this.endDate,this.pkgId,0,this.propertyId, merged).subscribe((data: any) => {
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

totAmount:any=0;
  totalamountPro() {
    this.totAmount = 0;

   
      for (let i = 0; i < this.roomDetails.length; i++) {
        this.totAmount = this.totAmount + (+this.roomDetails[i].roomAmount)
      }
      // this.startdate = data.data[0].ship_travel_dept_date;
      // this.endDate = data.data[0].ship_travel_arr_date;
      // this.totalAmount=totalAmount1+this.totalAmount
      // var date1: any = new Date(this.searchForm.value.startdate.jsdate);
      // var date2: any = new Date(this.searchForm.value.returndate.jsdate);
      // var diffTime = Math.abs(this.endDate - this.startdate);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // console.log(diffDays);
      if(this.packageTypeCode=='150002'){
      var diff =  Math.floor((  Date.parse(this.endDate)-Date.parse(this.startdate)  ) / 86400000); 
      console.log(diff)
      this.totAmount = this.totAmount * diff;
      }
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

    this.cal(this.totAmount,this.totAmount1)
  }
  cal(tot,tot1){
    this.totalAmount=0
    this.totalAmount=this.totAmount+this.totAmount1
    // console.log(this.totalAmount)
  }

}
