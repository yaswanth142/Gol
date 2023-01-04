import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { VariableService } from '../variable.service'
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor( public variable: VariableService) { }

  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // } 
  }

}
