import { Component, OnInit, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '../popup.service'

import { NgxSiemaService, NgxSiemaOptions } from 'ngx-siema';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import { Slick } from "ngx-slickjs";
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
declare var jQuery: any;
import * as $ from 'jquery';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { VariableService } from '../variable.service'
// import { PlatformLocation } from '@angular/common' 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @HostListener('window:unload', ['$event'])
  // unloadHandler(event) {
  //   localStorage.removeItem('myHome');
  // }
  slideConfigstaying = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<span class='nav-btn next-slide fa fa-angle-right rightarrowstaying'></span>",
    "prevArrow": "<span class='nav-btn prev-slide fa fa-angle-left leftarrow'></span>",
    "arrows": true,
    // "dots": true,
    "infinite": false,

    'responsive': [{
      'breakpoint': 1600, 'settings': {
        'slidesToShow': 3, 'slidesToScroll': 1,
      }
    }, {
      'breakpoint': 1000, 'settings': {
        'slidesToShow': 2, 'slidesToScroll': 1,
      }
    }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }]
  };

  slideConfigprivate = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<span class='nav-btn next-slide fa fa-angle-right rightarrowprivate'></span>",
    "prevArrow": "<span class='nav-btn prev-slide fa fa-angle-left leftarrow'></span>",
    "arrows": true,
    // "dots": true,
    "infinite": false,

    'responsive': [{
      'breakpoint': 1600, 'settings': {
        'slidesToShow': 3, 'slidesToScroll': 1,
      }
    }, {
      'breakpoint': 1000, 'settings': {
        'slidesToShow': 2, 'slidesToScroll': 1,
      }
    }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }]
  };


  slideConfigvideo = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    // "nextArrow": "<span class='nav-btn next-slide fa fa-angle-right rightarrowprivate'></span>",
    // "prevArrow": "<span class='nav-btn prev-slide fa fa-angle-left leftarrow'></span>",
    "arrows": false,
    "dots": true,
    "infinite": false,

    'responsive': [{
      'breakpoint': 1600, 'settings': {
        'slidesToShow': 3, 'slidesToScroll': 1,
      }
    }, {
      'breakpoint': 1000, 'settings': {
        'slidesToShow': 2, 'slidesToScroll': 1,
      }
    }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }]
  };

  slideConfigattractions = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "nextArrow": "<span class='nav-btn next-slide fa fa-angle-right rightarrowAttractions'></span>",
    "prevArrow": "<span class='nav-btn prev-slide fa fa-angle-left leftarrow'></span>",
    "arrows": true,
    // "dots": true,
    "infinite": false,

    'responsive': [{
      'breakpoint': 1600, 'settings': {
        'slidesToShow': 3, 'slidesToScroll': 1,
      }
    }, {
      'breakpoint': 1000, 'settings': {
        'slidesToShow': 2, 'slidesToScroll': 1,
      }
    }, { 'breakpoint': 600, 'settings': { 'slidesToShow': 1, 'slidesToScroll': 1, } }]
  };


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
  slickInit(e) {
    // console.log('slick initialized');
  }

  breakpoint(e) {
    // console.log('breakpoint');
  }

  afterChange(e) {
    // console.log('afterChange');
  }

  beforeChange(e) {
    // console.log('beforeChange');
  }
  // slickConfig: Slick.Config = {
  //   infinite: true,
  //   slidesToShow: 4,
  //   slidesToScroll: 1,
  //   dots: true,
  // };
  // options: DatepickerOptions = {
  //   minYear: 1970,
  //   maxYear: 2030,
  //   displayFormat: 'DD/MM/YYYY',
  //   barTitleFormat: 'MMMM YYYY',

  //   minDate: new Date(Date.now()),  
  //    barTitleIfEmpty: 'Click to select a date',
  //   placeholder: 'Start date',  
  //    addStyle: {}, 
  //   fieldId: 'my-date-picker',  
  //   useEmptyBarTitle: false, 
  // };
  // optionsDate: DatepickerOptions = {
  //   minYear: 1970,
  //   maxYear: 2030,
  //   displayFormat: 'DD/MM/YYYY',
  //   barTitleFormat: 'MMMM YYYY',

  //   minDate: new Date(Date.now()), 
  //   barTitleIfEmpty: 'Click to select a date',
  //   placeholder: 'Return date',  
  //   fieldId: 'my-date-picker',  
  //   useEmptyBarTitle: false,
  // };
  galleryOptions: NgxGalleryOptions[];
  galleryOptions2: NgxGalleryOptions[];
  galleryOptions5: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[]=[];
  galleryImages2: NgxGalleryImage[] = [];
  title = 'gallery';
  L_Path: any = ""
  T_Path: any = ""
  len: any;
  vediopath: any;
  url;
  stay_imagepath: any;
  propertyImages: any = [];
  property_imagepath: any;
  data: any = [];
  videodata:any;
  // options3: NgxSiemaOptions = {
  //   selector: '.siema3',
  //   perPage: {
  //     768: 2,
  //     1024: 4,
  //   },
  //   loop: true
  // };
  isApply: boolean = false;
  activity_imagepath: any;
  activityImages: any = [];
  activityDetails: any = [];
  samudram_desc: any;
  samudram_img: any;
  


  // options2: NgxSiemaOptions = {
  //   selector: '.siema2',
  //   perPage: {
  //     768: 2,
  //     1024: 4,
  //   },
  //   loop: true
  // };

  propDetails: any = [];
  stayingTourist_desc: any = [];
  getImg: any = [];
  // options1: NgxSiemaOptions = {
  //   selector: '.siema',
  //   perPage: {
  //     768: 2,
  //     1024: 4,
  //   },
  //   loop: true
  // };
  // options8: NgxSiemaOptions = {
  //   selector: '.siema8',
  //   perPage: {
  //     768: 1,
  //     1024: 3,
  //   },
  //   loop: true
  // };

  showbtn: boolean = false;
  hidebtn: boolean = false;
  actbtn: boolean = false;
  isData: any;
  counter: number = 1;
  childcounter: number = 0;
  adultcount: any;
  childcount: any;
  childcountvalue: any;
  totalcount: any;
  date: any;
  date1: any;
  propertySet: any = [];
  reviewDetails: any = [];
  actImg1: any;
  actImg2: any;
  actImg3: any;
  startdate: any;
  returndate: any;
  startingdate: any;
  returningdate: any;
  islandData: any = [];
  islandData1: any = [];
  islandInfo: any;
  islandName: any;
  islandImg: any;
  actImg: any;
  hike:any;
  imgpath:any;
  offerName:any;
  offerPercent:any;
  offerStart:any;
  offerEnd:any;
  imagelen:any;
  offerValue:any;
  isMore:boolean=false;
  star:any=5;
  alertMsg:any
  isOffer:boolean=false
    constructor(public api: ApiService, public popup: PopupService, private router: Router, private sanitizer: DomSanitizer, private ngxSiemaService: NgxSiemaService, private formBuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private datePipe: DatePipe, public variable: VariableService) {
      if(!this.variable.isShow &&  this.variable.iSData){
        jQuery('#exampleModalCenter1').modal('show');
        this.variable.isShow=true 
      }
      
    //   location.onPopState(() => {

    //     var r = confirm("You pressed a Back button! Are you sure?!");

    //     if (r == true) {
    //         // Call Back button programmatically as per user confirmation.
    //         history.back();
    //         // Uncomment below line to redirect to the previous page instead.
    //         // window.location = document.referrer // Note: IE11 is not supporting this.
    //     } else {
    //         // Stay on the current page.
    //         history.pushState(null, null, window.location.pathname);
    //     }

    //     history.pushState(null, null, window.location.pathname);
    // });
    
    this.isMore=false
    
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    // else{
    //   window.history.back();
    // }
    this.spinnerService.show()
   

    this.api.islandFetchAll().subscribe((data:any)=>{
      // this.spinnerService.hide()
      if(data.status=='Success'){
        this.isOffer=data.data[0].offer
        if( this.isOffer){
          this.offerName=data.data[0].offers.offer_name
          this.offerPercent=data.data[0].offers.offer_percentage
          this.offerStart=data.data[0].offers.offer_start_date
          this.offerEnd=data.data[0].offers.offer_end_date
          this.hike=data.data[0].offers.offer_type
        }
        
        this.imgpath=data.data[0].imagepath
        this.islandData=data.data[0].Islands
      
        for (let i = 0; i < this.islandData.length; i++) {
          var mydiv = document.createElement("div");                 
          mydiv.innerHTML = this.islandData[i].island_desc;         
          this.islandData[i].island_desc=mydiv.textContent || mydiv.innerText;         
          this.islandData[i].island_desc=this.islandData[i].island_desc.trim(); 
        
        //   if(this.islandData[i].island_name.toLowerCase()=='agatti'){
        //     this.islandData[i].sort_id=1;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='kavaratti'){
        //     this.islandData[i].sort_id=2;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='bangaram'){
        //     this.islandData[i].sort_id=3;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='thinnakkara'){
        //     this.islandData[i].sort_id=4;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='kadmat'){
        //     this.islandData[i].sort_id=5;
        //   }

        //   else if(this.islandData[i].island_name.toLowerCase()=='minicoy'){
        //     this.islandData[i].sort_id=6;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='kalpeni'){
        //     this.islandData[i].sort_id=7;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='androth'){
        //     this.islandData[i].sort_id=8;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='amini'){
        //     this.islandData[i].sort_id=9;
        //   }
        //   else{
        //     this.islandData[i].sort_id=10;
        //   }
        //   this.islandData.sort(function (a, b) {
        //   var nameA = a.sort_id; 
        //   var nameB = b.sort_id; 
        //   if (nameA < nameB) {
        //     return -1;
        //   }
        //   if (nameA > nameB) {
        //     return 1;
        //   }
        //   return 0;
        // });
      }
      }
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });
    // this.api.islandStays().subscribe((data:any)=>{
    //   // console.log(data)
    //   if(data.status=="Success"){
    //     // console.log(data)
    //     this.islandData=data.data[0].islands
    //     this.imgpath=data.data[0].island_img_path
    //   }
    // },
    // (err: HttpErrorResponse) => {
    //   this.spinnerService.hide()
    // });
    // this.api.islandFetchAll().subscribe((data: any) => {
    //   this.spinnerService.hide()
    //   // console.log(data)
    //   if (data.status == 'Success') {
    //     this.islandData = data.data[0].Islands
    //   }
    // },
    //   (err: HttpErrorResponse) => {
    //     this.spinnerService.hide()
    //   });
    localStorage.removeItem("startdate");
    localStorage.removeItem("returndate");
    localStorage.removeItem("adult");
    localStorage.removeItem("child");

    // this.api.samudram().subscribe((data: any) => {
    //   this.samudram_desc = data.data[0].Samudram[0].pkg_desc
    //   this.samudram_img = data.data[0].imagepath + data.data[0].Samudram[0].pkg_img_url
    // })
    localStorage.setItem("isData", "true")
    this.api.activity().subscribe((data: any) => {
      this.activity_imagepath = data.data[0].imagepath;

      this.activityImages = data.data[0].activities;

      for (let i = 0; i < this.activityImages.length; i++) {
        var mydiv = document.createElement("div");                
         mydiv.innerHTML = this.activityImages[i].desc;         
         this.activityImages[i].desc=mydiv.textContent || mydiv.innerText;         
         this.activityImages[i].desc=this.activityImages[i].desc.trim(); 
        this.activityImages[i].img = this.activity_imagepath + this.activityImages[i].activity_img_url[0]
      }

    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });

    // this.api.privateProperty().subscribe((data: any) => {
    //   this.property_imagepath = data.data[0].imagepath;
    //   this.propertySet = data.data[0].private_property
    //   this.propertyImages = data.data[0].private_property;
    //   for (let i = 0; i < this.propertyImages.length; i++) {
    //     this.propertyImages[i].img = this.property_imagepath + this.propertyImages[i].island_image
    //   }
    // });


    this.api.packageFetch().subscribe((data:any)=>{
      this.stay_imagepath = data.data[0].samudram_img_path;
      this.stayingTourist_desc = data.data[0].packages;
      for (let i = 0; i < this.stayingTourist_desc.length; i++) {
        var mydiv = document.createElement("div");                
        mydiv.innerHTML = this.stayingTourist_desc[i].pkg_desc;         
        this.stayingTourist_desc[i].pkg_desc=mydiv.textContent || mydiv.innerText;         
        this.stayingTourist_desc[i].pkg_desc=this.stayingTourist_desc[i].pkg_desc.trim(); 
        this.stayingTourist_desc[i].img = this.stay_imagepath + this.stayingTourist_desc[i].pkg_img_url;
        this.stayingTourist_desc[i].isShow=false;
      
      //   if(this.stayingTourist_desc[i].pkg_name=='Swaying Palm'){
      //     this.stayingTourist_desc[i].sort_id=2;
      //   }
      //   else if(this.stayingTourist_desc[i].pkg_name=='Samudram'){
      //     this.stayingTourist_desc[i].sort_id=1;
      //   }
      //   else if(this.stayingTourist_desc[i].pkg_name=='Silver Sand/One Island'){
      //     this.stayingTourist_desc[i].sort_id=3;
      //   }
      //   else{
      //     this.stayingTourist_desc[i].sort_id=4;
      //   }
      // this.stayingTourist_desc.sort(function (a, b) {
      //   var nameA = a.sort_id; 
      //   var nameB = b.sort_id; 
      //   if (nameA < nameB) {
      //     return -1;
      //   }
      //   if (nameA > nameB) {
      //     return 1;
      //   }
      //   return 0;
      // });
    }
      // console.log(this.stayingTourist_desc)
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });
    
//     this.api.packageFetch().subscribe((data:any)=>{
// console.log(data)
//     })
   

    this.galleryOptions = [
      {
        width: '400px', height: '600px', "thumbnailsPercent": 40, "imagePercent": 60, "thumbnailsColumns": 2, "thumbnailsMargin": 10, "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true, "previewCloseOnClick": true, "previewCloseOnEsc": true, "imageSwipe": true, "imageArrows": false, "thumbnailsSwipe": true, "imageAnimation": "zoom", "imageAutoPlayInterval": 3000, "preview": false
      },
      { "breakpoint": 500, "width": "100%", "height": "200px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 },
    ];
    this.galleryOptions2 = [
      {
        "thumbnailsPercent": 50, "imagePercent": 50, width: '100%',
        height: '755px', "thumbnailMargin": 10, "thumbnailsRows": 2, "thumbnailsColumns": 2, "layout": "thumbnails-top", "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true, "previewCloseOnClick": true, "previewCloseOnEsc": true, "imageSwipe": true, "imageArrows": false, "thumbnailsSwipe": true, "imageAnimation": "zoom", "imageAutoPlayInterval": 3000, "thumbnailSize": "cover","preview": false
      },
      { "breakpoint": 500, "width": "100%", "height": "200px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 },
    ];

    this.api.gallery().subscribe((data: any) => {
      this.spinnerService.hide()
      if (data.status == "Success") {
       
        this.videodata = data.data[0].video
        this.vediopath = data.data[0].video_path
         this.L_Path = data.data[0].large_img_path
        this.T_Path = data.data[0].thumb_path
        this.len = data.data[0].image.length
        this.imagelen = data.data[0].image_two.length
        if(this.len%4!=0){
          this.len=this.len-(this.len%4)
        }
        var i;
        for (i = 0; i < this.len; i++) {
          var a = {
            "small": this.T_Path + data.data[0].image[i].img_url,
            "medium": this.L_Path + data.data[0].image[i].img_url,
            "big": this.L_Path + data.data[0].image[i].img_url
          }
          this.galleryImages2.push(a);
        }

        if(this.imagelen%4!=0){
          this.imagelen=this.imagelen-(this.imagelen%4)
        }
        for (let j = 0; j < this.imagelen; j++) {
          var imgSecond = {
            "small": this.T_Path + data.data[0].image_two[j].img_url,
            "medium": this.L_Path + data.data[0].image_two[j].img_url,
            "big": this.L_Path + data.data[0].image_two[j].img_url
          }
          this.galleryImages.push(imgSecond);
        }
        // console.log(this.galleryImages)
      }
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });

    this.api.getReviews().subscribe((data: any) => {
      this.reviewDetails = data.data;
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });
  }
  searchForm: FormGroup;
  isSubmitted = false;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: false,
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: 0, month: 0, day: 0 }
  };
  disableUntil() {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let copy = this.getCopyOfOptions();
    copy.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    copy.disableSince = {
      year: d.getFullYear(),
      month: d.getMonth() + 4,
      day: d.getDate()
    };
    this.myDatePickerOptions = copy;
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
  disableUntilSecond() {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    let copy = this.getCopyOfOptionsSecond();
    copy.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
    copy.disableSince = {
      year: d.getFullYear(),
      month: d.getMonth() + 4,
      day: d.getDate()
    };
    this.myDatePickerOptionsSecond = copy;
  }
  getCopyOfOptionsSecond(): INgxMyDpOptions {
    return JSON.parse(JSON.stringify(this.myDatePickerOptionsSecond));
  }



  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  datepick(val) {
    if (val.jsdate != null) {
      if (this.searchForm.value.returndate == null) {
        let d = new Date(val.jsdate);
        // d.setDate(d.getDate() - 1);
        let copy = this.getCopyOfOptionsSecond();
        copy.disableUntil = {
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: d.getDate()
        };
        copy.disableSince = {
          year: d.getFullYear(),
          month: d.getMonth() + 3,
          day: d.getDate()
        };
        this.myDatePickerOptionsSecond = copy;
      }
      else {
        let d1 = new Date(val.jsdate);
        let d2 = new Date(val.jsdate + 1);
        // console.log((this.searchForm.value.returndate))
        if (val.jsdate >= this.searchForm.value.returndate.jsdate) {
          // console.log(d1.getDate() + 1)

          this.searchForm.patchValue({
            returndate: {
              date: {
                year: d1.getFullYear(),
                month: d1.getMonth() + 1,
                day: d1.getDate() + 1
              },
              jsdate: d2
            }
          });
        }

        // d.setDate(d.getDate() - 1);
        let copy = this.getCopyOfOptionsSecond();
        copy.disableUntil = {
          year: d1.getFullYear(),
          month: d1.getMonth() + 1,
          day: d1.getDate()
        };
        copy.disableSince = {
          year: d1.getFullYear(),
          month: d1.getMonth() + 3,
          day: d1.getDate()
        };
        this.myDatePickerOptionsSecond = copy;
      }
    }
  }

  addadult() {
    if (this.counter < 6) {
      this.counter = this.counter + 1;
      //  this.searchForm.get('startdate').setValue(this.counter);
    }
    this.adultcount = this.counter + "  Adult(s), ";
  }
  subadult() {
    if (this.counter > 1) {
      this.counter = this.counter - 1;
      // this.searchForm.get('startdate').setValue(this.counter);
      // console.log(this.searchForm)
    }

  }
  addchild() {
    if (this.childcounter < 6) {
      this.childcounter = this.childcounter + 1;
    }
    this.childcount = this.childcounter + "Children";

  }
  subchild() {
    if (this.childcounter > 0) {
      this.childcounter = this.childcounter - 1;

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

    this.isApply = false
    jQuery("#closediv").hide()
    this.isSubmitted = false
  }
  onClose() {
    this.isSubmitted = false
    jQuery("#closediv").hide()

  }
  get f() { return this.searchForm.controls; }

  // onSubmit() {
  //   console.log(this.searchForm)
  //   this.isSubmitted = true;
  //   if (this.searchForm.invalid) {
  //     return;
  //   }
  //   this.startdate = this.searchForm.get('startdate').value;
  //   this.returndate = this.searchForm.get('returndate').value;
  //   this.startingdate = this.datePipe.transform(this.startdate.jsdate, 'yyyy-MM-dd');
  //   this.returningdate = this.datePipe.transform(this.returndate.jsdate, 'yyyy-MM-dd');
  //   this.spinnerService.show();
  //   localStorage.setItem('startdate', this.startingdate);
  //   localStorage.setItem('returndate', this.returningdate);
  //   localStorage.setItem('adult', JSON.stringify(this.counter));
  //   localStorage.setItem('child', JSON.stringify(this.childcounter));
  //   this.router.navigate(['/result'])  }
  // show() {
  //   jQuery("#closediv").show()

  //   this.isApply = true
  //   // this.isApply=true
  //   console.log(this.isApply)
  // }
  onSearch() {
    // console.log(this.searchForm)
    this.isSubmitted = true;
    if (this.searchForm.invalid) {
      // console.log("dsfds")
      return;
    }
    this.spinnerService.show();
    this.islandInfo = this.searchForm.get('islandName').value;
    // localStorage.setItem('stock', JSON.stringify(this.islandInfo));
    this.variable.isScroll=true;
    this.router.navigate(['/singleIsland', this.islandInfo])
  }

  ngOnInit() {

    // $("html, body").animate({ scrollTop: 0 });
    this.totalcount = null;
    this.searchForm = this.formBuilder.group({
      islandName: ['', Validators.required],
    });

    this.searchForm.reset();
    this.totalcount = "A- " + this.counter;


    // this.disableUntil();
    // this.disableUntilSecond();

    // var isshow = localStorage.getItem('isshow');
    //   if (isshow== null) {
    //       localStorage.setItem('isshow', "1");
    //       // Show popup here
    //          Swal.fire({
    //     title: '<a><b>About Lakshadweep</b></a>',
        
    //     width: 700,
    //     imageUrl: '../assets/images/3.jpg',
    //     imageWidth: 400,
    //     imageHeight: 200,
    //     imageAlt: 'Custom image',
    //     animation: false,
    //     html:
    //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry standard dummy text ever.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry standard dummy text ever.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum has been the industry standard dummy text ever.',
         
    //     showCloseButton: true,
    //     confirmButtonText: 'Skip',
    //     customClass: {
    //       popup: 'animated tada',
    //       title: 'title-class',
    //       image: 'image-class',
    //       content: 'content-class',
 
    //     },
    //     allowOutsideClick: false,
    //     allowEscapeKey: false,
    //     allowEnterKey: false
    //   })
    //   }
    //   isshow=null;
    
    // console.log(this.searchForm)



  

  }
  islandlist(){
    this.variable.isScroll=true;
    this.router.navigate(['islandList'])
  }


  viewMore(values) {
    // console.log(values)
    this.islandImg = values.island_image
    // console.log(this.islandImg)
    Swal.fire({
      // type: 'success',
      title: values.island_name,
      width: 800,
      imageUrl: values.island_image,
      imageWidth: 300,
      imageHeight: 200,
      text: values.island_desc,
      showCloseButton: true,
      confirmButtonText: 'close',
      customClass: {
        popup: 'animated tada'
      }
      // footer: '<a href>Why do I have this issue?</a>'
    })
  }
  knowMore(act) {
    // console.log(act)
    this.actImg = act.activity_img_url
    // console.log(this.actImg)
    Swal.fire({
      title: act.activity_name,
      width: 800,
      imageUrl: act.activity_img_url[0],
      imageWidth: 300,
      imageHeight: 200,
      text: act.desc,
      showCloseButton: true,
      confirmButtonText: 'Close',       
      confirmButtonColor: '#24b7a9', 
      customClass: {
        popup: 'animated tada'
      }
     
    })
  }


  show(){
    this.isMore=true
  }
  hide(){
    this.isMore=false
  }
  show1(det){
    for (let i = 0; i < this.stayingTourist_desc.length; i++){
      this.stayingTourist_desc[i].isShow=false
    }

    this.stayingTourist_desc[det].isShow=true
  
  }
  hide1(det){
    this.stayingTourist_desc[det].isShow=false
  }

  Counter(i: number) {
    return new Array(i);
}

showImage(val){
   var url=val.target.style.backgroundImage
  url=( url.split(/"/)[1] );
   if(url){
    Swal.fire({
      width: 800,
      imageUrl: url,
      imageWidth: 300,
      imageHeight: 200,
      showCloseButton: true,
      confirmButtonText: 'Close',       
      confirmButtonColor: '#24b7a9', 
      customClass: {
        popup: 'animated tada',
        
      }
     
    })
  }
   // console.log(this.actImg)
  
}

offerDetails(){
  this.router.navigate(['offerDetails'])
}
packageCall(val){
  this.router.navigate(['package',val])
}
singleIsland(val){
  this.router.navigate(['singleIsland',val])
}
aboutlakshadweep(){
  this.router.navigate(['aboutlakshadweep'])
}

attractions(val){
  this.router.navigate(['attractions',val])
}

}



