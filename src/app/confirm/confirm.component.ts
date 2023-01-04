import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { count } from 'rxjs/operator/count';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {PopupService} from '../popup.service'
import * as $ from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
declare var TextDecoder;
import { VariableService } from '../variable.service'
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
encr_email:any;
  constructor(public api:ApiService, public variable: VariableService,private router: Router, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService,public popup:PopupService) { 
    this.route.params.subscribe((params => {
      //console.log(params)
    this.encr_email=params.code;
    })
    )
  }
    


  ngOnInit() {
    // $("html, body").animate({ scrollTop: 0 });
    this.spinnerService.show()
    this.api.emailVerify(this.encr_email).subscribe((data:any)=>{
      this.spinnerService.hide()
      if(data.status=="Success"){
        this.popup.sucessMessage=data.message;
        this.popup.sucesspopup()
        this.variable.isScroll=true;
        this.router.navigate([''])

      }
      else{
        // if(data.message=="Email Already Verified"&& data.status=="Fail"){
        //   this.popup.infoMessage="Email Already Verified"
        //   this.popup.infopopup()
        //   this.router.navigate([''])
        // }
        // else{
          this.popup.failureMessage=data.message
          this.popup.failurepopup()
          this.variable.isScroll=true;
          this.router.navigate([''])
        

      }
    },
    (err :HttpErrorResponse)=>{
      this.popup.failureMessage="Internal Server Error"
          this.popup.failurepopup();
      this.spinnerService.hide()
    });
  }

}
