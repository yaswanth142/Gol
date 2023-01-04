import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import {VariableService} from '../variable.service'
import {PopupService} from '../popup.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery';
 
@Component({
  selector: 'app-myreservations',
  templateUrl: './myreservations.component.html',
  styleUrls: ['./myreservations.component.css']
})

export class MyreservationsComponent implements OnInit {
  imgpath:any;
  reservation_data:any;
  rating:any;
  constructor(public api: ApiService, private router: Router, private spinnerService: Ng4LoadingSpinnerService,public popup:PopupService,public variable: VariableService) { }

  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.rating=3.5
    this.spinnerService.show()
    this.api.myreservations(localStorage.getItem('sessionid'),localStorage.getItem('uid')).subscribe((data:any)=>{
      //console.log(data)
      if(data.status=="Success"){
        this.spinnerService.hide()
        this.imgpath=data.data[0].property_large_img_path
        this.reservation_data=data.data[0].reservations
      }
      else{
          this.popup.failureMessage = "Server Error";
      this.popup.failurepopup();
      }
     },
    (err: HttpErrorResponse) => {
      this.spinnerService.hide()
      // this.isError = true;
      // this.popup.failureMessage = "Server Error";
      // this.popup.failurepopup();
      if (err.status == 403) {
        localStorage.clear()
        this.variable.isLogin=false
        this.variable.isScroll=true;
        this.router.navigate([''])
      }
    });
  }

}
