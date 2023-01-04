import { Component, OnInit ,PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route, ActivatedRoute ,NavigationStart} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { VariableService } from './variable.service'
import { PopupService } from './popup.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './helpers/must-match.validator';
import * as shajs from 'sha.js';
import { DatePipe } from '@angular/common';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { DOCUMENT } from '@angular/common';
import { HostListener, Inject } from "@angular/core";
import { PlatformLocation,LocationStrategy ,isPlatformBrowser } from '@angular/common'
import Swal from 'sweetalert2'

// declare var $: any;
import $ from "jquery";
import { map } from 'rxjs/operators';
declare const window: any;
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AppComponent implements OnInit {
  private _isPopState = false;
  private _routeScrollPositions: { [url: string]: number } = {};
  private _deferredRestore = false;

  private user: SocialUser;
  private loggedIn: boolean;
  title = 'gol';
  isSignin: number;
  username: any;
  password: any;
  isError: boolean = false;
  isError1: boolean = false;
  errMsg: boolean = false;
  msg: any;
  minDate: any;
  maxDate: any;

  isDob: boolean = false;
  firstName: string;
  lastName: string;
  email: string;
  phone: any;
  dob: any;
  nationality: any;
  confirmPassword: any;
  password1: any;
  emailExist: boolean = false;
  phoneExist: boolean = false;
  Ndata: any;
  packageData: any;
  show: boolean;
  show1: boolean;
  show2: boolean;
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    Swal.close();
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object,public api: ApiService, private router: Router, public variable: VariableService, private spinnerService: Ng4LoadingSpinnerService, public popup: PopupService, private formBuilder: FormBuilder, private datePipe: DatePipe, private authService: AuthService, private route: ActivatedRoute, location: PlatformLocation,private locStrat: LocationStrategy) {
    this.show = false;
    this.show1 = false;
    this.show2 = false;

    // constructor(public api:ApiService,private router:Router,public variable:VariableService, private spinnerService: Ng4LoadingSpinnerService,public popup:PopupService ,private formBuilder: FormBuilder,private datePipe:DatePipe,private route: ActivatedRoute,location: PlatformLocation) {
    location.onPopState(() => {
      //console.log(window.location.pathname)
      window.onbeforeunload = function () { return "Your data will be lost!"; };
      //       var r = confirm("You pressed a Back button! Are you sure?!");

      // if (r == true) {
      //     // Call Back button programmatically as per user confirmation.
      //     history.back();
      //     // Uncomment below line to redirect to the previous page instead.
      //     // window.location = document.referrer // Note: IE11 is not supporting this.
      // } else {
      //     // Stay on the current page.
      //     // history.pushState(null, null, window.location.pathname);
      // }

      // history.pushState(null, null, window.location.pathname);

    });


    // constructor(public api:ApiService,private router:Router,public variable:VariableService, private spinnerService: Ng4LoadingSpinnerService,public popup:PopupService ,private formBuilder: FormBuilder,private datePipe:DatePipe,private route: ActivatedRoute) { 
    this.api.packageNameFetch().subscribe((data: any) => {

      // //console.log(data)
      this.packageData = data.data
      //   for (let i = 0; i < this.packageData.length; i++) {



      //     if(this.packageData[i].pkg_name=='Swaying Palm'){
      //       this.packageData[i].sort_id=2;
      //     }
      //     else if(this.packageData[i].pkg_name=='Samudram'){
      //       this.packageData[i].sort_id=1;
      //     }
      //     else if(this.packageData[i].pkg_name=='Silver Sand/One Island'){
      //       this.packageData[i].sort_id=3;
      //     }
      //     else{
      //       this.packageData[i].sort_id=4;
      //     }
      //   this.packageData.sort(function (a, b) {
      //     var nameA = a.sort_id; 
      //     var nameB = b.sort_id; 
      //     if (nameA < nameB) {
      //       return -1;
      //     }
      //     if (nameA > nameB) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      // }
    })
    this.variable.username = localStorage.getItem('username')
    if (localStorage.getItem('sessionid') != null && localStorage.getItem('uid') != null) {

      this.variable.isLogin = true;
      this.api.profileGet(localStorage.getItem('sessionid'), localStorage.getItem('uid')).subscribe((data: any) => {
        if (data.status == 'Success') {
          this.spinnerService.hide()
        }
        else {
          this.spinnerService.hide()
        }
      },
        (err: HttpErrorResponse) => {
          this.spinnerService.hide()
          if (err.status == 403) {
            localStorage.clear()
            this.variable.isLogin = false
            this.variable.isScroll=true
            this.router.navigate([''])
          }
        });

    } else {
      this.variable.isLogin = false;
    }



  }
  
  loginForm: FormGroup;
  submitted = false;

  registerForm: FormGroup;
  isSubmitted = false;

  forgotForm: FormGroup;
  isSubmit = false;

  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number >= 150) {
      $(".navbar-static-top").addClass("dark");
    }
    else {
      $(".navbar-static-top").removeClass("dark");
    }

  }

  alertMsg: any;

  ngOnInit() {

    jQuery('body').bind('click', function(e) {
      if(jQuery(e.target).closest('.navbar').length == 0) {
          // click happened outside of .navbar, so hide
          var opened = jQuery('.navbar-collapse').hasClass('collapse in');
          if ( opened === true ) {
              jQuery('.navbar-collapse').collapse('hide');
          }
      }
  });
    this.variable.isHeader = true
    // this.signOut()

    if (isPlatformBrowser(this.platformId)) {
      // prevent nguniversal problems
      this.addScrollTopListeners();
  }
    // this.router.events.subscribe(event => {
    //   if(event instanceof NavigationEnd) {
    //     // event is an instance of NavigationEnd, get url!  
    //     const url = event.urlAfterRedirects;
    // if(url=='/'){
    //   $( '#setMenu a' ).on("click", function(){
    //     $('#setMenu').hide();
    // });
    // $('#setMenu a input').prop( "checked" ,false);
    // $('.navbar-collapse ul li a').click(function () {
    //    $('.setMenu').removeClass('in'); 
    // });
    //   $('.navbar-collapse ul li a').click(function(){
    //     $(".navbar-collapse").collapse('hide');
    //     $('.navbar-collapse').removeClass('in'); 
    // });
    // $(document).ready(function () {
    //   // jQuery('.navbar-collapse a').click(function(){ 
    //   //   jQuery('.navbar-collapse').css('height', '0');
    //   //   jQuery('.navbar-collapse').removeClass('collapse in');
    //   // });  
    //   // $('.navbar-toggle').on('click', function () {
    //   //   $('.navbar-nav').addClass('open');
    //   // });

    //   $('.menu-mt a').on("click", function () {
    //     $('.menu-mt').removeClass('collapse in');
    //   });
    // });
    this.api.alert().subscribe((data: any) => {
      console.log(data)
      if (data.status == "Success" && data.message != "No data") {
        this.variable.iSData = true
        this.variable.alertMsg = data.data[0].alert_data
        // jQuery('#exampleModalCenter1').modal('show'); 
      }
      else {
        this.variable.isSignin = true
      }
    },
      (err: HttpErrorResponse) => {
        // this.popup.failureMessage="Internal Server Error"
        //     this.popup.failurepopup();
        // this.spinner.hide()
      });
    //   }
    // // }
    // })




    this.disableUntil()
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, RxwebValidators.email()]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      email1: ['', [Validators.required, RxwebValidators.email()]],
      password1: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      nationality: ['', Validators.required]
    }, {
      validator: MustMatch('password1', 'confirmPassword')
    });

    this.forgotForm = this.formBuilder.group({
      email2: ['', [Validators.required, RxwebValidators.email()]],

    });

    this.api.getNationality().subscribe((data: any) => {
      this.Ndata = data
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
      });
    // this.spinnerService.show()

    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   //console.log(user);
    // });

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

  }

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    disableUntil: { year: 0, month: 0, day: 0 },
    disableSince: { year: 0, month: 0, day: 0 }
  };

  disableUntil() {
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 100))
    let copy = this.getCopyOfOptions();
    copy.disableUntil = {
      year: this.minDate.getFullYear(),
      month: this.minDate.getMonth() + 1,
      day: this.minDate.getDate()
    };
    copy.disableSince = {
      year: this.maxDate.getFullYear(),
      month: this.maxDate.getMonth() + 1,
      day: this.maxDate.getDate()
    };
    this.myOptions = copy;
  }
  getCopyOfOptions(): INgxMyDpOptions {
    return JSON.parse(JSON.stringify(this.myOptions));
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.registerForm.patchValue({ dob: null });
  }

  setDate(): void {
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    // Set today date using the patchValue function
    this.registerForm.patchValue({
      dob: {
        date: {
          year: this.maxDate.getFullYear(),
          month: this.maxDate.getMonth() + 1,
          day: this.maxDate.getDate()
        },
        jsdate: this.maxDate
      }
    });
  }

  signin() {
    this.variable.isSignin = 1;
    this.loginForm.reset()
    this.submitted = false
    this.show = false
    // jQuery('#exampleModalCenter').modal('show');
    // this.resetlogin()
  }

  signup() {
    this.variable.isSignin = 2;
    this.registerForm.reset()
    this.isSubmitted = false
    // jQuery('#exampleModalCenter').modal('show');
    // this.resetregister()
  }
  forgot() {
    // this.resetforgot()
    this.variable.isSignin = 3;
    this.forgotForm.reset()
    this.isSubmit = false
    // jQuery('#exampleModalCenter').modal('hide'); 

    // $('.modal-backdrop').hide();
  }
  get f() { return this.loginForm.controls; }
  get g() { return this.registerForm.controls; }
  get h() { return this.forgotForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.spinnerService.show()
    this.username = this.loginForm.value.email
    this.password = shajs('sha512').update(this.loginForm.value.password).digest('hex')
    // this.password=this.loginForm.value.password
    this.api.login(this.username, this.password).subscribe((data: any) => {
      this.spinnerService.hide()
      if (data.status == "Success") {
        // console.log(this.router.url)
        this.variable.isLogin = true
        this.variable.username = data.data[0].user_name
        localStorage.setItem('sessionid', data.data[0].session_token)
        localStorage.setItem('uid', data.data[0].user_id)
        localStorage.setItem('username', data.data[0].user_name)
        if (this.router.url == '/findreservations') {
          this.variable.isScroll=true
          this.router.navigate(['bookingHistory'])
        }
        jQuery('#exampleModalCenter').modal('hide');
      }
      else {
        this.variable.isLogin = false
        if (data.status == 'Fail') {
          this.popup.failureMessage = data.message
          this.popup.failurepopup();
          this.loginForm.get('password').setValue('')
          this.submitted = false
        }
        else {
          this.popup.failureMessage = "Internal Server Error"
          this.popup.failurepopup();
          this.loginForm.reset()
        }

      }
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
        this.loginForm.reset()
      });
  }

  regSubmit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.password = shajs('sha512').update(this.registerForm.value.password1).digest('hex')
    this.confirmPassword = this.registerForm.value.confirmPassword
    this.spinnerService.show();
    this.firstName = this.registerForm.value.firstName
    this.lastName = this.registerForm.value.lastName
    this.email = this.registerForm.value.email1
    this.phone = this.registerForm.value.phone
    this.nationality = this.registerForm.value.nationality
    this.dob = this.registerForm.value.dob.jsdate
    this.dob = this.datePipe.transform(this.dob, 'yyyy-MM-dd');
    this.api.register(this.firstName, this.lastName, this.email, this.password, this.phone, this.nationality, this.dob).subscribe((data: any) => {
      this.spinnerService.hide();
      if (data.status == "Success") {
        this.registerForm.reset()
        this.isSubmitted = false
        jQuery('#exampleModalCenter').modal('hide');
        this.popup.sucessMessage = data.message
        this.popup.sucesspopup()
        this.variable.isScroll=true
        this.router.navigate([''])
      } else {
        // if( data.message=="Email already exist"){
        //   this.popup.failureMessage="Email already exist"
        //   this.popup.failurepopup()
        // }
        // else if(data.message=="Mobile number already exist"){
        //   this.popup.failureMessage="Mobile number already exist"
        //   this.popup.failurepopup()
        // }
        // else{
        this.popup.failureMessage = data.message
        this.popup.failurepopup()
        // }
      }
    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
      });
  }
  forgotSubmit() {
    this.isSubmit = true;
    if (this.forgotForm.invalid) {
      return;
    }
    this.email = this.forgotForm.value.email2
    this.spinnerService.show();

    this.api.checkEmail(this.email).subscribe((data: any) => {
      this.spinnerService.hide();
      if (data.status == "Success") {
        this.forgotForm.reset();
        jQuery('#exampleModalCenter').modal('hide');
        // this.router.navigate(['']);
        this.popup.sucessMessage = "We've send password reset link to your email. Please check your email.";
        this.popup.sucesspopup()
      }
      else {
        if (data.status == "Fail" && data.message == "Email already exists") {
          this.popup.failureMessage = data.message
          this.popup.failurepopup();

        }
        else {
          this.popup.failureMessage = data.message
          this.popup.failurepopup();
        }

      }

    },
      (err: HttpErrorResponse) => {
        this.popup.failureMessage = "Internal Server Error"
        this.popup.failurepopup();
        this.spinnerService.hide()
      });
  }


  // resetlogin(){
  //   if((<HTMLFormElement>document.getElementById("logindata"))){


  //     (<HTMLFormElement>document.getElementById("logindata")).reset();

  //     }
  //     this.isError=false;
  //     this.isError1=false;
  //     this.errMsg=false;
  // }

  // resetregister(){
  //   if((<HTMLFormElement>document.getElementById("register"))){


  //     (<HTMLFormElement>document.getElementById("register")).reset();

  //     }
  //     this.isError=false;
  //     this.isError1=false;
  //     this.errMsg=false;
  // }

  // resetforgot(){
  //   if((<HTMLFormElement>document.getElementById("forgotPass"))){


  //     (<HTMLFormElement>document.getElementById("forgotPass")).reset();

  //     }
  //     this.isError=false;
  //     this.isError1=false;
  //     this.errMsg=false;
  // }

  logout() {
    this.variable.logout()
  }


  register(f: NgForm) {
    this.emailExist = false
    if (f.invalid) {

      this.errMsg = true;
    }
    else {
      this.errMsg = false;
      this.spinnerService.show();
      //  setTimeout(()=>this.spinnerService.hide(),5000)
      //  this.password1=shajs('sha512').update(f.value.password).digest('hex')
      //  //console.log(this.password1)
      this.api.register(this.firstName, this.lastName, this.email, this.password, this.phone, this.nationality, this.dob).subscribe((data: any) => {
        this.spinnerService.hide();
        if (data.status == "Success" && data.message == "User successfully registered as tourist") {
          f.reset()
          this.popup.sucessMessage = "You have successfully registered. Please confirm your email to login"
          this.popup.sucesspopup()
          this.variable.isScroll=true
          this.router.navigate([''])
        }

        else {
          if (data.status == "Success" && data.message == "User already registered as Tourist.Please verify your email") {
            f.reset()
            this.popup.infoMessage = data.message
            this.popup.infopopup()
            jQuery('#exampleModalCenter').modal('hide');
            // this.router.navigate([''])
          }
          else {


            if (data.message == "Email already exist") {
              this.emailExist = true

            }
            else if (data.message == "Mobile number already exist") {
              this.phoneExist = true
            }
            else {
              this.popup.failureMessage = "Server Error"
              this.popup.failurepopup()
            }
          }

        }

      },
        (err: HttpErrorResponse) => {
          this.popup.failureMessage = "Internal Server Error"
          this.popup.failurepopup();
          this.spinnerService.hide()
        });
    }
  }
  dobcheck(val) {
    var myDate = new Date(val);
    var today = new Date('2004-12-31');
    var limit = new Date('1950-01-01')
    if (myDate > today || myDate < limit) {
      this.isDob = true;
    }
    else {
      this.isDob = false;
    }
  }


  // forgotPass(f: NgForm) {
  //   this.emailExist = false

  //   if (f.invalid) {
  //     this.errMsg = true;
  //   }
  //   else {
  //     this.errMsg = false;
  //     this.spinnerService.show();

  //     this.api.checkEmail(this.email).subscribe((data: any) => {
  //       this.spinnerService.hide();
  //       if (data.status == "Success") {
  //         f.reset();
  //         jQuery('#exampleModalCenter').modal('hide'); 
  //         // this.router.navigate(['']);
  //         this.popup.sucessMessage = "We've send password reset link to your email. Please check your email.";
  //         this.popup.sucesspopup()
  //       }
  //       else {
  //         if (data.status == "Fail" && data.message == "Email already exists") {
  //           this.emailExist = true

  //         }
  //         else {
  //           this.popup.failureMessage = data.message
  //           this.popup.failurepopup();
  //         }

  //       }

  //     })
  //   }
  // }

  sendRoute() {
    this.variable.isScroll=true
    this.router.navigate(["property"]);
  }

  packageidfetch(val) {
    this.variable.isScroll=true
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() =>
      this.router.navigate(["package", val]));
  }
  sendNewRoute() {
    this.variable.isScroll=true
    this.router.navigateByUrl('/refresh', { skipLocationChange: true }).then(() =>
      this.router.navigate(["property", 'private']));
  }


  signInWithGoogle(): void {

    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => 

    //   //console.log(x)
    //   );
    window.onbeforeunload = function (e) {
      this.authService.signOut();
    };

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      // console.log(x)
      this.spinnerService.show()
      this.api.socialMediaLogin(x.idToken, x.email, x.firstName, x.id, x.lastName, x.name, x.provider).subscribe((data: any) => {
        //console.log(data)
        this.spinnerService.hide()
        if (data.status == "Success") {
          this.variable.isLogin = true
          this.variable.username = data.data[0].user_name
          localStorage.setItem('sessionid', data.data[0].session_token)
          localStorage.setItem('uid', data.data[0].user_id)
          localStorage.setItem('username', data.data[0].user_name)
          if (this.router.url == '/findreservations') {
            this.variable.isScroll=true
            this.router.navigate(['bookingHistory'])
          }
          jQuery('#exampleModalCenter').modal('hide');
        }
        else {
          this.variable.isLogin = false
          if (data.status == 'Fail') {
            this.popup.failureMessage = data.message
            this.popup.failurepopup();
            // this.loginForm.get('password').setValue('')
            // this.submitted=false
          }
          else {
            this.popup.failureMessage = "Internal Server Error"
            this.popup.failurepopup();
            this.loginForm.reset()
          }

        }
      },
        (err: HttpErrorResponse) => {
          this.popup.failureMessage = "Internal Server Error"
          this.popup.failurepopup();
          this.spinnerService.hide()
          // this.loginForm.reset()
        });
    })

  }

  signInWithFB(): void {
    window.onbeforeunload = function (e) {
      this.authService.signOut();
    };
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      //console.log(x)
      this.spinnerService.show()
      this.api.socialMediaLogin(x.authToken, x.email, x.firstName, x.id, x.lastName, x.name, x.provider).subscribe((data: any) => {
        //console.log(data)
        this.spinnerService.hide()
        if (data.status == "Success") {
          this.variable.isLogin = true
          this.variable.username = data.data[0].user_name
          localStorage.setItem('sessionid', data.data[0].session_token)
          localStorage.setItem('uid', data.data[0].user_id)
          localStorage.setItem('username', data.data[0].user_name)
          if (this.router.url == '/findreservations') {
            this.variable.isScroll=true
            this.router.navigate(['bookingHistory'])
          }
          jQuery('#exampleModalCenter').modal('hide');
        }
        else {
          this.variable.isLogin = false
          if (data.status == 'Fail') {
            this.popup.failureMessage = data.message
            this.popup.failurepopup();
            // this.loginForm.get('password').setValue('')
            // this.submitted=false
          }
          else {
            this.popup.failureMessage = "Internal Server Error"
            this.popup.failurepopup();
            this.loginForm.reset()
          }

        }
      },
        (err: HttpErrorResponse) => {
          this.popup.failureMessage = "Internal Server Error"
          this.popup.failurepopup();
          this.spinnerService.hide()
          // this.loginForm.reset()
        });
    })
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signOut(): void {
    this.authService.signOut();
  }
  // fun(){


  //   location.onPopState(() => {

  //     var r = confirm("You pressed a Back button! Are you sure?!");

  //     if (r == true) {
  //         // Call Back button programmatically as per user confirmation.
  //         history.back();
  //         // Uncomment below line to redirect to the previous page instead.
  //         // window.location = document.referrer // Note: IE11 is not supporting this.
  //     } else {
  //         // Stay on the current page.
  //         history.pushState(null, null, window.location.pathname);
  //     }

  //     history.pushState(null, null, window.location.pathname);
  // });
  // }
  goHome() {
    this.variable.isScroll=true
    this.router.navigate([''])
    $("html, body").animate({ scrollTop: 0 });
  }
  passwordToggle() {
    this.show = !this.show;
  }

  onResize(event){
  //  console.log(event.target.innerWidth)  // window width
  }
  // passwordToggle1() {
  //   this.show1 = !this.show1;
  // }
  // passwordToggle2() {
  //   this.show2 = !this.show2;
  // }

  adoutLak(){
    this.variable.isScroll=true
    this.router.navigate(['aboutlakshadweep'])
    
  }

  islandStay(){
    this.variable.isScroll=true
    this.router.navigate(['property'])
  }
  about(){
    this.variable.isScroll=true
    this.router.navigate(['about'])
  }
  findreservations(){
    this.variable.isScroll=true
    this.router.navigate(['findreservations'])
  }
  bookingHistory(){
    this.variable.isScroll=true
    this.router.navigate(['bookingHistory'])
  }
  contact(){
    this.variable.isScroll=true
    this.router.navigate(['contact'])
  }
  faq(){
    this.variable.isScroll=true
    this.router.navigate(['faq'])
  }
  profileupdate(){
    this.variable.isScroll=true
    this.router.navigate(['profileupdate'])
  }

  changepassword(){
    this.variable.isScroll=true
    this.router.navigate(['changepassword'])
  }
  policy(){
    this.variable.isScroll=true
    this.router.navigate(['policy'])
  }
  terms(){
    this.variable.isScroll=true
    this.router.navigate(['terms'])
  }


    /**
     * Save the current ``window.pageYOffset`` in {@link _routeScrollPositions}, keyed by the given url.
     *
     * @param url scroll route
     */
    private saveScroll(url) {
        this._routeScrollPositions[url] = window.pageYOffset;
    }

    /**
     * Attempt to restore the scroll position for the given url. The scroll position is restored only if the body clientHeight is big
     * enough to accomodate it. {@link _deferredRestore} is reset to false on success or if there is no saved scroll posiiton for the url.
     *
     * @param url key in {@link _routeScrollPositions}
     * @returns {boolean} true if the scroll position was changed
     */
    private restoreScroll(url) {
        const savedScroll = this._routeScrollPositions[url];
        if (savedScroll === undefined) {
            // no saved scroll position for this url :(
            this._deferredRestore = false;
            return false;
        }

        const documentHeight = document.body.clientHeight, windowHeight = window.innerHeight;

        if (savedScroll + windowHeight <= documentHeight) {
            // document is already tall enough to scroll directly
            window.scrollTo(0, savedScroll);
            this._deferredRestore = false;
            return true;
        }

        return false;
    }

    private addScrollTopListeners() {
        // force scroll position at top of page when route changes through routerLink navigation
        //  (and not when it changes through browser back/forward)
        //  https://github.com/angular/angular/issues/10929#issuecomment-372265497
        // remember and restore scroll positions when navigating using back/forward
        //  https://github.com/angular/angular/issues/10929#issuecomment-274264962

        if ('scrollRestoration' in history) {
            // disable automatic scroll restoration by browsers, since it's doing a bad job
            // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
            history.scrollRestoration = 'manual';
        }

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart) {
                // the position should not be saved at NavigationStart during popstate navigation because it will already be mangled
                if (!this._isPopState) {
                    // save scroll position of urls on router navigation
                    // at NavigationStart, router.url is still the url of the current route (not the target of the navigation)
                    this.saveScroll(this.router.url);
                    // console.log(this.router.url);
                }
            }

            if (event instanceof NavigationEnd) {
                if (this._isPopState) {
                    // popstate navigation, try to restore saved scroll position immediately
                    // immediate restoration might be possible if the source view is taller than the target view
                    if (!this.restoreScroll(event.url)) {
                        // document is too short, and restoring the saved scroll position would not work;
                        // defer the restoration to the next tick, when document should be reflowed and reach its target height
                        setTimeout(() => {
                            if (this._deferredRestore) {
                                this.restoreScroll(event.url);
                                this._deferredRestore = false;
                            }
                        });

                        // using _deferredRestore, the route is marked for restoring its scroll position at a later time
                        // attempts are made to restore the scroll position in ngAfterContentChecked; it's most likely that this will
                        //  happen in the current tick, but setTimeout is added just in case
                        this._deferredRestore = true;
                    }
                } else {
                    // scroll to top on regular router navigation
                    window.scrollTo(0, 0);
                }

                // end of navigation event, remove _isPopState flag
                this._isPopState = false;
            }
        });

        this.locStrat.onPopState(() => {
            // during a navigation event we must know if it was triggered by popstate navigation or regular router navigation
            this._isPopState = true;

            // on browser back/forward navigation, popstate is fired before any Navigation or other router events
            // router.url is still the current route and the position must be saved here because it can be
            // mangled by browser behavior before reaching NavigationStart
            this.saveScroll(this.router.url);
        });
    }

    ngAfterContentChecked() {
        if (this._deferredRestore) {
            // ngAfterContentChecked is used to try and restore the scroll position in the
            // same tick as the first document reflow which makes it possible (i.e. before setTimeout)
            // this could prevent scroll flashes/jankiness
            this.restoreScroll(this.router.url);
        }
      }
}
