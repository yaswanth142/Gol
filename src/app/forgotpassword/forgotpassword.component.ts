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
import { VariableService } from '../variable.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  errMsg: boolean = false;
  urlData: any;
  passwordnew: any;
  isError: boolean = false;
  msg: any;
  confirmpass:any;
  shownew: boolean;
  showconfirm:boolean;
  constructor(public api: ApiService, private router: Router, private spinnerService: Ng4LoadingSpinnerService,public popup:PopupService,private route: ActivatedRoute,private formBuilder: FormBuilder,private variable:VariableService) { 
    // this.variable.isHeader=false
    this.shownew = false;
    this.showconfirm=false;
  }

  ForgotForm: FormGroup;
  submitted = false;


  ngOnInit() {
    // $("html, body").animate({ scrollTop: 0 });
    this.route.paramMap.subscribe(params => {
      this.urlData = params.get("id");
      //console.log(this.urlData)

    })

    this.ForgotForm = this.formBuilder.group({
     
      password: ['', Validators.required],
      confirmPassword:['',Validators.required],
     
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });

  }
  get f() { return this.ForgotForm.controls; }
  passwordToggle() {
    this.shownew = !this.shownew;
  }
  passwordToggleConfirm(){
    this.showconfirm = !this.showconfirm
  }
  forgotSubmit(){
    this.submitted = true;
    if (this.ForgotForm.invalid) {
      return;
    }
    this.passwordnew = shajs('sha512').update(this.ForgotForm.value.password).digest('hex')
    
    // this.passwordnew=this.ForgotForm.value.password
    this.spinnerService.show()
    this.api.pwdNew(this.urlData, this.passwordnew).subscribe((data: any) => {
      this.spinnerService.hide()
      if (data.status == "Success") {
       
        this.ForgotForm.reset()
        this.popup.sucessMessage = data.message;
        this.popup.sucesspopup();
        this.variable.isHeader=true
        this.variable.isScroll=true;
        
        this.router.navigate(['']);
      }
      else {
        if (data.status == 'Fail') {
          this.popup.failureMessage =data.message;;
          this.popup.failurepopup();
          // this.ForgotForm.reset()
        }
        else {
          this.popup.failureMessage = "Server Error";
          this.popup.failurepopup();
        }
      }

    },
      (err: HttpErrorResponse) => {
        this.spinnerService.hide()
       
       
        this.popup.failureMessage = "Server Error";
        this.popup.failurepopup();

        this.ForgotForm.reset()
      });
  }

}
