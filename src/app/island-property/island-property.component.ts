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
  selector: 'app-island-property',
  templateUrl: './island-property.component.html',
  styleUrls: ['./island-property.component.css']
})
export class IslandPropertyComponent implements OnInit {
  amount = 1;
  amountChild = 0;
  islandInfo: any = [];
  startDate: any;
  returnDate: any;
  island: any;
  totalcount: any;
  roomtype: any;
  singleroom = 1;
  doubleroom = 0;
  extraroom = 0;
  propertyList: any = [];
  isResult: boolean = false;
  isList: boolean = true;
  imageUrl: any;
  propList: any = [];
  typename: any;
  thumbpath: any;
  pname:any;
  constructor(public api: ApiService, private router: Router, public variable: VariableService, private formBuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute,public popup:PopupService) { 
    this.activatedRoute.params.subscribe(paramsId => {
      this.typename = paramsId.id;
    });

    this.spinnerService.show();
    // if (this.typename == "staying") {
      this.pname="Island Stays"
      this.api.islandProperty(this.typename).subscribe((data: any) => {
        if (data.status = "Success") {
          //console.log(data)
          this.spinnerService.hide();
          this.propertyList = data.data[0].properties;
          this.thumbpath = data.data[0].property_img_thumb_path;
          for (let i = 0; i < this.propertyList.length; i++) {
            var mydiv = document.createElement("div");                 
            mydiv.innerHTML = this.propertyList[i].property_address;         
            this.propertyList[i].property_address=mydiv.textContent || mydiv.innerText;         
            this.propertyList[i].property_address=this.propertyList[i].property_address.trim(); 
          }
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
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
  }

}
