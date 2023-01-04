import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { PopupService } from '../popup.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import * as shajs from 'sha.js';
import * as $ from 'jquery';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-findreservations',
  templateUrl: './findreservations.component.html',
  styleUrls: ['./findreservations.component.css']
})
export class FindreservationsComponent implements OnInit {
email:any;
bookingNo:any;
reserveData:any;
imgPath:any;
  constructor(public api: ApiService, private router: Router, private spinnerService: Ng4LoadingSpinnerService,public popup:PopupService,private route: ActivatedRoute,private formBuilder: FormBuilder) { }
  reserveForm: FormGroup;
  submitted = false;

  ngOnInit() {
    // $("html, body").animate({ scrollTop: 0 });
    this.reserveForm = this.formBuilder.group({
     
      email: ['', [Validators.required,RxwebValidators.email()]],
      bookingNo:['',Validators.required],
     
    });
  }
  get f() { return this.reserveForm.controls; }

  findReservation(){
    this.submitted = true;
    if (this.reserveForm.invalid) {
      return;
    }
    this.spinnerService.show()
    this.email=this.reserveForm.value.email;
    this.bookingNo=this.reserveForm.value.bookingNo;
    this.api.findResevationFetch(this.email,this.bookingNo).subscribe((data:any)=>{
      this.spinnerService.hide()
      if(data.status=="Success"){
       //console.log(data)
       this.reserveData=data.data
       this.imgPath=data.data[0].thumb_path
        // this.popup.sucessMessage="Profile Successfully Updated"
        // this.popup.sucesspopup()
      }
      else{
        this.reserveData=[]
        this.popup.failureMessage=data.message
        this.popup.failurepopup()
      }
    },
    (err: HttpErrorResponse) => {
      this.spinnerService.hide()
      // this.isError = true;
      this.popup.failureMessage = "Server Error";
      this.popup.failurepopup();
    });

  }

  resetData(){
    this.reserveForm.reset();
    this.submitted=false;
    this.reserveData=null
  }
}
