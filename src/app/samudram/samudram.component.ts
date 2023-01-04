import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { Router, NavigationEnd, Route } from '@angular/router';
import { Slick } from "ngx-slickjs"
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {PopupService} from '../popup.service'
declare var jQuery: any;
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import { VariableService } from '../variable.service'

@Component({
  selector: 'app-samudram',
  templateUrl: './samudram.component.html',
  styleUrls: ['./samudram.component.css']
})
export class SamudramComponent implements OnInit {
  shipData: any;
  thumbpath: any;
  shipDetails: any = [];
  islandDetails: any = [];
  fareData: any = [];
  shipUrl: any;
  shipDesc: any;
  imageData: any = [];
  shipLocation: any;
  pkg_id:any;
  pkgName:any;
  myDate:any;
  packageClass:any=[];
  shipName:any;
  isSamudram:boolean=false;
  isSwaying:boolean=false;
  isSilver:boolean=false;
  isOther:boolean=false;
  isLand:boolean=false;
  availableDetails:any=[];
  provider:any;

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "arrows": true,
    "dots": true,
    "infinite": false,

    'responsive': [{ 'breakpoint': 1600, 'settings': { 'slidesToShow': 4, 'slidesToScroll': 1, } }, { 'breakpoint': 1000, 'settings': { 'slidesToShow': 2, 'slidesToScroll': 1, } }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }]
  };
  slickInit(e) {
    //console.log('slick initialized');
  }

  breakpoint(e) {
    //console.log('breakpoint');
  }

  afterChange(e) {
    //console.log('afterChange');
  }

  beforeChange(e) {
    //console.log('beforeChange');
  }
  constructor(public api: ApiService, private router: Router,public popup:PopupService, private sanitizer: DomSanitizer,private spinnerService: Ng4LoadingSpinnerService,private activatedRoute: ActivatedRoute,private datePipe: DatePipe, public variable: VariableService) {

     this.activatedRoute.params.subscribe(paramsId => {
      this.pkg_id = paramsId.id;
    });
   }
  // totalAdultAmount(val) {
  //   //console.log(val)
  //   let totalCost = 0;

  //   val.forEach((d) => {
  //     totalCost = (+d.spcm_adult_fare) + (+d.adultgstAmount);
  //   });

  //   return totalCost;
  // }
  // totalChildAmount(value) {
  //   //console.log(value)
  //   let totalCostChild = 0;

  //   value.forEach((d) => {
  //     totalCostChild = +d.spcm_child_fare + +d.childgstAmount;
  //   });
  //   //console.log(totalCostChild)
  //   return totalCostChild;
  // }
  ngOnInit() {
    if(this.variable.iSData){

      jQuery('#exampleModalCenter1').modal('show');
    } 
    this.isSamudram=false
    this.isSwaying=false;
    this.isSilver=false;
    this.isOther=false;
    // $("html, body").animate({ scrollTop: 0 });
    this.spinnerService.show()
    this.api.shipTravelDetails(this.pkg_id).subscribe((data: any) => {
      this.spinnerService.hide()
      // console.log(data)
      if(data.status=="Success" && data.data[0]){
       
      this.shipData = data.data[0];
      // this.shipUrl = this.shipData.url;
      // this.thumbpath = this.shipData.thumb_path_samudram;
      // this.shipLocation = this.shipData.thumb_path;
      this.shipDesc = this.shipData.pkg_desc;
      // this.imageData = data.data[0].ship[0].ship_img_url;
      // this.fareData = data.data[0].ship[0].package_class;
      this.pkgName=data.data[0].pkg_name
      this.provider=data.data[0].tourism_provider

      // for (var j = 0; j < this.fareData.length; j++) {
      //   this.fareData[j].adultgstAmount = (this.fareData[j].spcm_adult_fare * this.shipData.pkg_gst) / 100;
      //   this.fareData[j].childgstAmount = (this.fareData[j].spcm_child_fare * this.shipData.pkg_gst) / 100;
      //   this.fareData[j].totalAdultAmount = parseInt(this.fareData[j].spcm_adult_fare) + parseInt(this.fareData[j].adultgstAmount);
      //   this.fareData[j].totalChildAmount = parseInt(this.fareData[j].spcm_child_fare) + parseInt(this.fareData[j].childgstAmount);
      //   //console.log(this.fareData)

      // }
      if(this.provider=='Sports'){
        this.myDate = new Date();
      this.myDate.setDate(this.myDate.getDate()); 
      this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      }else{
        this.myDate = new Date();
        this.myDate.setDate(this.myDate.getDate() + 21); 
        this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
      }
      if(this.shipData.package_type_code!="150002"){
        this.shipDetails = data.data[0].ship;
        this.isLand=false;
      }else{
        this.isLand=true;
        this.shipDetails = data.data[0].land_details;
      }

     
      if(this.shipDetails.length==0){

      }else{

      
      for (var i = 0; i < this.shipDetails.length; i++) {
          if(this.shipDetails[i].ship_travel_dept_date>=this.myDate){
            this.shipDetails[i].isBook=true
            this.availableDetails.push(this.shipDetails[i])
          }
          else{
            this.shipDetails[i].isBook=false
          }
          if(!this.isLand){
            this.shipDetails[i].island_list.sort(function (a, b) {
              return a.sim_order - b.sim_order;
            });
          }
        
       
      }
    }
      //console.log(this.shipDetails)
      // if(this.pkgName=='Samudram'){
      //   this.isSamudram=true

      // }
      // else if(this.pkgName=='Swaying Palm'){
      //   this.isSwaying=true;
      // }
      // else if(this.pkgName=='Silver Sand/One Island'){
      //   this.isSilver=true;
        
      // }
      // else{
      //   this.isOther=true;

      // }
    }
    else{
      
    }
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });
  }
  showMessage(){
    Swal.fire({
      title: 'This package is currently unavailable',
      // text: "You won't be able to revert this!",
      type: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cancel',
      customClass: {       
        title: 'title-text'
          } 
    })
  }

  showClassInfo(name,value){
    //console.log(value)
    this.shipName=name;
    this.packageClass=value;
    for (var j = 0; j < this.packageClass.length; j++) {
      this.packageClass[j].adultgstAmount = (this.packageClass[j].spcm_adult_fare * this.shipData.pkg_gst) / 100;
      this.packageClass[j].childgstAmount = (this.packageClass[j].spcm_child_fare * this.shipData.pkg_gst) / 100;
      this.packageClass[j].totalAdultAmount = parseInt(this.packageClass[j].spcm_adult_fare) + parseInt(this.packageClass[j].adultgstAmount);
      this.packageClass[j].totalChildAmount = parseInt(this.packageClass[j].spcm_child_fare) + parseInt(this.packageClass[j].childgstAmount);
      //console.log(this.packageClass)

    }
  }
}
