import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationEnd, Route, ActivatedRoute ,NavigationStart} from '@angular/router';
// import { AuthService } from 'angularx-social-login';
@Injectable({
  providedIn: 'root'
})
export class VariableService {
  isShow:boolean=false;
isLogin:boolean;
sessionid:string;
uid:any;
username:any;
isSignin:any;
skip:any;
mergedData:any;
isHeader:boolean=true;
alertMsg:any;
iSData:boolean=false;
isScroll:boolean=false;
  constructor( private router: Router,private api:ApiService, private spinnerService: Ng4LoadingSpinnerService) { }
  logout(){
    // localStorage.clear()
    this.skip=localStorage.getItem('isshow')
    this.spinnerService.show()
    this.sessionid=localStorage.getItem('sessionid')
    this.uid=localStorage.getItem('uid')
this.api.logout(this.sessionid,this.uid).subscribe((data:any)=>{
  this.spinnerService.hide()
  this.router.navigate([''])
  // this.authService.signOut();
  // console.log(data)
  localStorage.clear()
    this.isLogin=false
    localStorage.setItem('isshow',  this.skip);
},
(err :HttpErrorResponse)=>{
  
  this.spinnerService.hide()
 if(err.status==403){
  localStorage.clear()
  this.isLogin=false
  this.router.navigate([''])
 }
  // this.isPreloader=false
});
    
  }
}
