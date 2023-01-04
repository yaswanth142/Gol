import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { Router, NavigationEnd, Route } from '@angular/router';
import { Slick } from "ngx-slickjs"
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var jQuery: any;
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
import {PopupService} from '../popup.service'
import { VariableService } from '../variable.service'
@Component({
  selector: 'app-island-list',
  templateUrl: './island-list.component.html',
  styleUrls: ['./island-list.component.css']
})
export class IslandListComponent implements OnInit {
  islandData:any;
  imgpath:any;
  p: number = 1;
  constructor(public api: ApiService , public variable: VariableService,public popup:PopupService, private router: Router, private sanitizer: DomSanitizer,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.spinnerService.show()
    this.api.islandFetchAll().subscribe((data:any)=>{
      this.spinnerService.hide()
      //console.log(data)
      if(data.status=='Success'){
        this.imgpath=data.data[0].imagepath
        this.islandData=data.data[0].Islands
        for (let i = 0; i < this.islandData.length; i++) {
          var mydiv = document.createElement("div");                 
          mydiv.innerHTML = this.islandData[i].island_desc;         
          this.islandData[i].island_desc=mydiv.textContent || mydiv.innerText;         
          this.islandData[i].island_desc=this.islandData[i].island_desc.trim(); 
        
        //   if(this.islandData[i].island_name.toLowerCase()=='agatti'){
        //     this.islandData[i].sort_id=1;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='kavaratti'){
        //     this.islandData[i].sort_id=2;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='bangaram'){
        //     this.islandData[i].sort_id=3;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='thinnakkara'){
        //     this.islandData[i].sort_id=4;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='kadmat'){
        //     this.islandData[i].sort_id=5;
        //   }

        //   else if(this.islandData[i].island_name.toLowerCase()=='minicoy'){
        //     this.islandData[i].sort_id=6;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='kalpeni'){
        //     this.islandData[i].sort_id=7;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='androth'){
        //     this.islandData[i].sort_id=8;
        //   }
        //   else if(this.islandData[i].island_name.toLowerCase()=='amini'){
        //     this.islandData[i].sort_id=9;
        //   }
        //   else{
        //     this.islandData[i].sort_id=10;
        //   }
        //   this.islandData.sort(function (a, b) {
        //   var nameA = a.sort_id; 
        //   var nameB = b.sort_id; 
        //   if (nameA < nameB) {
        //     return -1;
        //   }
        //   if (nameA > nameB) {
        //     return 1;
        //   }
        //   return 0;
        // });
      }
      }
    },
        (err :HttpErrorResponse)=>{
          this.popup.failureMessage="Internal Server Error"
              this.popup.failurepopup();
          this.spinnerService.hide()
        });
  }
  singleIsland(val){
    this.router.navigate(['singleIsland',val])
  }
  
}
