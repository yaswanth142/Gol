import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../api.service';
import { Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router';
import { Slick } from "ngx-slickjs"
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var jQuery: any;
import { HttpErrorResponse } from '@angular/common/http';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import Swal from 'sweetalert2'
import * as $ from 'jquery';
import {PopupService} from '../../popup.service'
import { VariableService } from '../../variable.service'

@Component({
  selector: 'app-single-island',
  templateUrl: './single-island.component.html',
  styleUrls: ['./single-island.component.css']
})
export class SingleIslandComponent implements OnInit {
  id: any;
  L_Path: any = ""
  T_Path: any = ""
  len: any;
  packages: any = [];
  activities: any = [];
  property_thump: any;
  activityPath: any;
  islandname: any;
  islandDesc: any;
  islandPath: any;
  islandImg: any;
  actImg:any;
  isProperty:boolean=false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages2: NgxGalleryImage[] = [];
  // slideConfig = {
  //   "slidesToShow": 1,
  //   "slidesToScroll": 1,
  //   "nextArrow": "<span class='nav-btn next-slide'></span>",
  //   "prevArrow": "<span class='nav-btn prev-slide'></span>",
  //   "arrows": true,
  //   "dots": true,
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

  slickInit(e) {
    // //console.log('slick initialized');
  }

  breakpoint(e) {
    // //console.log('breakpoint');
  }

  afterChange(e) {
    // //console.log('afterChange');
  }

  beforeChange(e) {
    // //console.log('beforeChange');
  }
  constructor(public api: ApiService, public variable: VariableService,public popup:PopupService, private router: Router, private sanitizer: DomSanitizer, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute) {
    this.spinnerService.show()
    this.galleryOptions = [
      {
        width: '400px', height: '600px', "thumbnailsPercent": 40, "imagePercent": 60, "thumbnailsColumns": 2, "thumbnailsMargin": 10, "imageAutoPlay": true, "imageAutoPlayPauseOnHover": true, "previewAutoPlay": true, "previewAutoPlayPauseOnHover": true, "previewCloseOnClick": true, "previewCloseOnEsc": true, "imageSwipe": true, "imageArrows": false, "thumbnailsSwipe": true, "imageAnimation": "zoom", "imageAutoPlayInterval": 3000, "preview": false
      },
      { "breakpoint": 500, "width": "100%", "height": "200px", "thumbnailsColumns": 3 },
      { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 },
    ];
    this.route.params.subscribe((params => {
      //console.log(params.id)
      this.id = params.id
      // this.deptcode = params.deptid
    }
    ));
    this.api.islandSingleFetch(this.id).subscribe((data: any) => {
      //console.log(data)
      this.spinnerService.hide();
      this.islandname = data.data[0].island_name;
      this.islandDesc = data.data[0].island_desc;
      this.islandPath = data.data[0].island_img_path;
      this.islandImg = data.data[0].island_image;
      this.activities = data.data[0].activities;
      this.packages = data.data[0].packages;
      this.activityPath = data.data[0].activity_img_path;
      this.property_thump = data.data[0].package_large_img;
      this.isProperty=data.data[0].island_stays
      // this.L_Path = data.data[0].galary_large_img_path;
      // this.T_Path = data.data[0].galary_img_thumb_path;

      this.L_Path = data.data[0].activity_img_path;
      this.T_Path = data.data[0].activity_img_path;
      this.len = data.data[0].activities.length;

      var i;
      for (i = 0; i < this.len; i++) {
        var mydiv = document.createElement("div"); 
        mydiv.innerHTML = this.activities[i].desc;         
        this.activities[i].desc=mydiv.textContent || mydiv.innerText;         
        this.activities[i].desc=this.activities[i].desc.trim(); 
        var a = {
          "small": this.T_Path + data.data[0].activities[i].activity_img_url,
          "medium": this.L_Path + data.data[0].activities[i].activity_img_url,
          "big": this.L_Path + data.data[0].activities[i].activity_img_url
        }

        this.galleryImages2.push(a);
        //console.log(this.galleryImages2)
      }
      var j;
      for (j = 0; j < this.packages.length; j++) {
        var mydiv = document.createElement("div"); 
        mydiv.innerHTML = this.packages[j].pkg_desc;         
        this.packages[j].pkg_desc=mydiv.textContent || mydiv.innerText;         
        this.packages[j].pkg_desc=this.packages[j].pkg_desc.trim(); 
      
        //console.log(this.galleryImages2)
      }

    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });
  }

  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }



  }

  knowMore(act) {
    //console.log(act)
    this.actImg = this.activityPath+act.activity_img_url
    //console.log(this.actImg)
    Swal.fire({
      title: act.activity_name,
      width: 800,
      imageUrl: this.actImg,
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
  package(val){
    this.router.navigate(['package',val])
  }
  islandProperty(val){
    this.router.navigate(['islandProperty',val])
  }
  attractions(val){
    this.router.navigate(['attractions',val])
  }
}
