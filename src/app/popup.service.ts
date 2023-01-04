import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from "rxjs/operators";
import * as _ from 'lodash';
declare var $: any;
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class PopupService {
sucessMessage:any;
failureMessage:any;
infoMessage:any;
  constructor(private router:Router) { }
sucesspopup(){
  Swal.fire({
    type: 'success',
    title: this.sucessMessage,
    width:'42em',
    padding:'2.55em',
    customClass: {
      popup: 'animated tada',
      title: 'title-text'
    }
    
  })
}

failurepopup(){
  Swal.fire({
    type: 'error',
    title: this.failureMessage,
    width:'42em',
    padding:'2.55em',
    customClass: {
      popup: 'animated shake',
      title: 'title-text',
    }
  })
}

infopopup(){
  Swal.fire({
    type: 'info',
    width:'42em',
    padding:'2.55em',
    title: this.infoMessage,
    customClass: {
      popup: 'animated swing',
      title: 'title-text'
    }
  })
}

}
