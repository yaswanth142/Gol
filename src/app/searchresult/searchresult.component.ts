import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VariableService } from '../variable.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  startdate: any;
  returndate: any;
  adult: any;
  child: any;
  propertyData: any = [];
  thumbpath: any;
  samudramPath: any;
  p:number=1
  

  constructor(public api: ApiService, private router: Router, public variable: VariableService, private formBuilder: FormBuilder, private spinner: Ng4LoadingSpinnerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // $("html, body").animate({ scrollTop: 0 });
    this.startdate = localStorage.getItem('startdate');
    this.returndate = localStorage.getItem('returndate');
    this.adult = localStorage.getItem('adult');
    this.child = localStorage.getItem('child');
    this.api.searchResult(this.startdate, this.returndate, +this.adult, +this.child).subscribe((data: any) => {
      if (data.status == "Success") {
        this.propertyData = data.data[0].property_list;
        this.thumbpath = data.data[0].property_img_thumb_path;
        this.samudramPath = data.data[0].samudram_thumb_path;
        this.spinner.hide();
      } else {

        this.spinner.hide();
      }
    });
  }

}
