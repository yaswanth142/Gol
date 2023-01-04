import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate,CanActivateChild,OnInit {
  constructor( private router: Router) { }
  sessionid:string;
  uid:any;
  ngOnInit() {
    this.sessionid=localStorage.getItem('sessionid')
    this.uid=localStorage.getItem('uid')
    // console.log(this.sessionid)
    // this.main.viewProfile(this.uid,this.sessionid).subscribe((data :any)=>{
    //   console.log(data)
    // })
    // this.authService.AccessToken=localStorage.getItem('usertoken')
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
  if(localStorage.getItem('sessionid')!=null && localStorage.getItem('uid')!=null){
  return true;
  }
  else{
    // window.location.reload()
  this.router.navigate(['/']);
  return false
  }
  
  

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(localStorage.getItem('sessionid')==null && localStorage.getItem('uid')==null){
        return true;
        }
        else{
        this.router.navigate(['#/']);
        return false
        }
      
        }
}
