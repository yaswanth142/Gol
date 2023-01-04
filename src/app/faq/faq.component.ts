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
import { PopupService } from '../popup.service'
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { constants } from '../constants'
import { IMyDefaultMonth } from 'mydatepicker'; 
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
faqData:any;
isPrivacy:boolean=false;
isCancel:boolean=false;
  constructor(public api: ApiService, private router: Router, public variable: VariableService, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe, public popup: PopupService) { 
    this.isPrivacy=false;
    this.isCancel=false;
  }

  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.spinner.show()
    this.api.faqFetch().subscribe((data:any)=>{
      this.spinner.hide()
      this.faqData=data.data
      for (let i = 0; i < this.faqData.length; i++) {
        {
          this.faqData[i].isShow=false;
        }

        for(let j=0;j<this.faqData[i].faq_list.length;j++){
          this.faqData[i].faq_list[j].show=false;
        }
       
       
      }
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinner.hide()
    });
    
  }

  faqShow(det){
    for (let i = 0; i < this.faqData.length; i++){
      if(i!=det){
        this.faqData[i].isShow=false
      }
      for(let j=0;j<this.faqData[i].faq_list.length;j++){
        this.faqData[i].faq_list[j].show=false;
      }
      
    }
    

    this.faqData[det].isShow=!this.faqData[det].isShow
    // console.log(this.faqData[det].isShow)
  
  }

  Show(val,val1){
// console.log(val,val1)
for (let i = 0; i < this.faqData[val].faq_list.length; i++){
  if(i!=val1){
    this.faqData[val].faq_list[i].show=false
  }
  
}


this.faqData[val].faq_list[val1].show=!this.faqData[val].faq_list[val1].show
  }

  privacy(){
this.isPrivacy=!this.isPrivacy
this.isCancel=false
  }
  cancel(){
    this.isCancel=!this.isCancel
    this.isPrivacy=false 
  }
  policy(){
    this.router.navigate(['policy'])
  }

}
