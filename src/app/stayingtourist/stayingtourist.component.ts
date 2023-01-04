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
  selector: 'app-stayingtourist',
  templateUrl: './stayingtourist.component.html',
  styleUrls: ['./stayingtourist.component.css']
})
export class StayingtouristComponent implements OnInit {
  filter:any;
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
  constructor(public api: ApiService, private router: Router,public popup:PopupService, public variable: VariableService, private formBuilder: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute) {
    // this.activatedRoute.params.subscribe(paramsId => {
    //   //console.log(paramsId)
    //   this.typename = paramsId.type;
    // });

    this.spinnerService.show();
    // if (this.typename == "staying") {
      this.pname="Island Stays"
      this.api.propertyFetch().subscribe((data: any) => {
        if (data.status = "Success" && data.data[0]) {
          // console.log(data)
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
    // }
    // else {
    //   this.pname="Private Property"
    //   //console.log(this.typename)
    //   this.api.privateListFetch().subscribe((data: any) => {
    //     if (data.status = "Success") {
    //       this.spinnerService.hide();
    //       this.propertyList = data.data[0].property_list;
    //       this.thumbpath = data.data[0].property_img_thumb_path
    //     }
    //     else {
    //       this.spinnerService.hide();
    //     }
    //   });
    // }
  }
  stayingForm: FormGroup;
  isSubmitted = false;

  roomdetailsForm: FormGroup;
  isSubmit = false;

  addItem() {
    if (this.amount < 6) {
      //console.log(this.stayingForm.controls.amount.value)
      this.amount = this.amount + 1;
      this.stayingForm.get('amount').setValue(this.amount);

      //console.log('plus is : ' + this.stayingForm.get('amount'))
    }


  }

  removeItem() {
    //console.log(this.stayingForm.get('amount').value)
    if (this.amount > 1) {
      this.amount = this.amount - 1;


      this.stayingForm.get('amount').setValue(this.amount);

      //console.log('plus is : ' + this.stayingForm.get('amount'))
    }

  }
  addItemChild() {
    if (this.amountChild < 6) {
      this.amountChild = this.amountChild + 1;

      this.stayingForm.get('amountChild').setValue(this.amountChild);

    }


  }

  removeItemChild() {
    if (this.amountChild > 0) {
      this.amountChild = this.amountChild - 1;

      this.stayingForm.get('amountChild').setValue(this.amountChild);

    }


  }
  ngOnInit() {
    if(this.variable.iSData){

      jQuery('#exampleModalCenter1').modal('show');
    } 
    // this.roomdetailsForm.controls['singleroom'].disable();
    // this.roomdetailsForm.controls['doubleroom'].disable();
    // this.roomdetailsForm.controls['extraroom'].disable();
    // this.roomdetailsForm.controls['totalcount'].disable();
    // this.roomdetailsForm.controls['amount'].disable();
    // this.roomdetailsForm.controls['amountChild'].disable();
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    // $(window).load(function() {
    //   this.equalheight('.lightbg hei');
    // });
   
    
    // $(window).resize(function(){
    //   this.equalheight('.lightbg hei');
    // });

    jQuery("#closediv").hide();
    this.islandInfo = [];
    this.totalcount = "A- " + this.amount + ", C- " + this.amountChild;


    this.stayingForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      amount: [''],
      amountChild: [''],
      island: ['', Validators.required],
      totalcount: ['']
    });
    this.roomdetailsForm = this.formBuilder.group({
      roomtype: ['', Validators.required],
      adultAmt: ['', Validators.required],
      childAmt: ['', Validators.required],
      singleroom: [''],
      doubleroom: [''],
      extraroom: [''],
    });
    

    this.api.islandFetch().subscribe((data: any) => {
      this.islandInfo = data.data[0].Islands;
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });

    this.stayingForm.get('amount').setValue(this.amount);
    this.stayingForm.get('amountChild').setValue(this.amountChild);
  }
  get f() { return this.stayingForm.controls; }
  get g() { return this.roomdetailsForm.controls; }


  onSubmit() {
    //console.log("haiii", this.stayingForm)
    this.isSubmitted = true;
    if (this.stayingForm.invalid) {
      return;
    }
    //console.log(this.stayingForm)
    this.startDate = this.stayingForm.value.startDate
    this.returnDate = this.stayingForm.value.returnDate
    //console.log(this.amount, this.amountChild)
    // this.amount = this.stayingForm.value.amount

    // this.amountChild = this.stayingForm.value.amountChild
    this.roomdetailsForm.get('adultAmt').setValue(this.amount);
    this.roomdetailsForm.get('childAmt').setValue(this.amountChild);
    this.roomdetailsForm.controls['adultAmt'].disable();
    this.roomdetailsForm.controls['childAmt'].disable();

    this.island = this.stayingForm.value.island
    this.spinnerService.show();
    this.imageUrl;
    this.propList = [];
    if (this.typename == "staying") {
      this.api.searchProperty(this.startDate, this.returnDate, this.amount, this.amountChild, this.island).subscribe((data: any) => {
        this.isList = false;
        if (data.status = "Success") {
          this.spinnerService.hide();
          this.isResult = true;
          this.imageUrl = data.data[0].property_img_thumb_path;
          this.propList = data.data[0].property_list;
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
    else {
      this.api.searchPrivateProperty(this.startDate, this.returnDate, this.amount, this.amountChild, this.island).subscribe((data: any) => {
        this.isList = false;
        if (data.status = "Success") {
          this.spinnerService.hide();
          this.isResult = true;
          this.imageUrl = data.data[0].property_img_thumb_path;
          this.propList = data.data[0].property_list;
          //console.log(this.isResult)
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

  }



  removeSingle() {
    //console.log(this.stayingForm.get('amount').value)
    if (this.singleroom > 1) {
      this.singleroom = this.singleroom - 1;


      this.roomdetailsForm.get('singleroom').setValue(this.singleroom);

      //console.log('plus is : ' + this.stayingForm.get('singleroom'))
    }

  }
  addSingle() {
    if (this.singleroom < 6) {
      this.singleroom = this.singleroom + 1;

      this.roomdetailsForm.get('singleroom').setValue(this.singleroom);

    }


  }
  removeDouble() {
    //console.log(this.stayingForm.get('amount').value)
    if (this.doubleroom > 0) {
      this.doubleroom = this.doubleroom - 1;


      this.roomdetailsForm.get('doubleroom').setValue(this.doubleroom);

      //console.log('plus is : ' + this.stayingForm.get('doubleroom'))
    }

  }
  addDouble() {
    if (this.doubleroom < 6) {
      this.doubleroom = this.doubleroom + 1;

      this.roomdetailsForm.get('doubleroom').setValue(this.doubleroom);

    }


  }
  removeExtra() {
    //console.log(this.stayingForm.get('amount').value)
    if (this.extraroom > 0) {
      this.extraroom = this.extraroom - 1;


      this.roomdetailsForm.get('extraroom').setValue(this.extraroom);

      //console.log('plus is : ' + this.stayingForm.get('extraroom'))
    }

  }
  addExtra() {
    if (this.extraroom < 6) {
      this.extraroom = this.extraroom + 1;

      this.roomdetailsForm.get('extraroom').setValue(this.extraroom);

    }


  }

  roomSubmit() {
    this.isSubmit = true;
    //console.log(this.roomdetailsForm)
    if (this.roomdetailsForm.invalid) {
      return;
    }
    //console.log(this.roomdetailsForm)

  }
  show() {
    jQuery("#closediv").show()


  }
  applybutton() {
    this.totalcount = "A- " + this.amount + ", C- " + this.amountChild;
    jQuery("#closediv").hide()
  }
  closebutton() {
    jQuery("#closediv").hide()
  }
  // equalheight = function(container){

  //   var currentTallest = 0,
  //        currentRowStart = 0,
  //        rowDivs = new Array(),
  //        $el,
  //        topPosition = 0;
  //    $(container).each(function() {
    
  //      $el = $(this);
  //      $($el).height('auto')
  //      let topPostion = $el.position().top;
    
  //      if (currentRowStart != topPostion) {
  //        for (let currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
  //          rowDivs[currentDiv].height(currentTallest);
  //        }
  //        rowDivs.length = 0; // empty the array
  //        currentRowStart = topPostion;
  //        currentTallest = $el.height();
  //        rowDivs.push($el);
  //      } else {
  //        rowDivs.push($el);
  //        currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  //     }
  //      for (let currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
  //        rowDivs[currentDiv].height(currentTallest);
  //      }
  //    });
     
  //   }
    
   
}
