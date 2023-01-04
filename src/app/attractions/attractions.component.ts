import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariableService } from '../variable.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import {PopupService} from '../popup.service'

declare var jQuery: any;
import * as $ from 'jquery';
@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css']
})
export class AttractionsComponent implements OnInit {
  actId:any;
  activityName:any;
  activityData:any;
  activityPath:any;
  activityImg:any;
  activityDesc:any;
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


  constructor(public api: ApiService, private router: Router, public variable: VariableService, private formBuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute,public popup:PopupService) {
    this.activatedRoute.params.subscribe(paramsId => {
      this.actId = paramsId.id;
    });
    this.spinnerService.show();
    // if (this.typename == "staying") {
      this.api.activitySingleFetch(this.actId).subscribe((data: any) => {
        if (data.status = "Success") {
          // console.log(data)
          this.spinnerService.hide();
          this.activityData=data.data[0]
          this.activityImg=data.data[0].activity_img_url
          this.activityPath=data.data[0].activity_path 
          this.activityName=data.data[0].activity_name
          this.activityDesc=data.data[0].desc

          // this.propertyList = data.data[0].properties;
          // this.thumbpath = data.data[0].property_img_thumb_path;
          // for (let i = 0; i < this.propertyList.length; i++) {
          //   var mydiv = document.createElement("div");                 
          //   mydiv.innerHTML = this.propertyList[i].property_address;         
          //   this.propertyList[i].property_address=mydiv.textContent || mydiv.innerText;         
          //   this.propertyList[i].property_address=this.propertyList[i].property_address.trim(); 
          // }
        }
        else {
          this.spinnerService.hide();
        }
        },
        (err :HttpErrorResponse)=>{
          this.popup.failureMessage="Internal Server Error"
              this.popup.failurepopup();
          this.spinnerService.hide()
        });
   }

  ngOnInit() {
    
  }

}
