import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route,ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import {PopupService} from '../popup.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CountriesService } from '../countries.service';
import * as shajs from 'sha.js';
import { MustMatch } from '../helpers/must-match.validator';

import { VariableService } from '../variable.service'
import { DatePipe } from '@angular/common';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
sessionid:string;
uid:any; 
countryjson:any;
len:any
tname:any;
i:number;
cname:any=[];
sname:any=[];
dname:any=[];
mstate:any;
mcity:any;
mcountry:any;
isDob:boolean=false;
address:any;
firstname:string;
lastName:string;
email:string;
phone:any;
dob:any;
pincode;
nationality;
mcountry1;
mstate1;
Ndata:any;
mcity1;
changed:boolean=false;
errMsg:boolean=false;
stateInfo: any[] = [];
countryInfo: any[] = [];
cityInfo: any[] = [];
offerData=[
  {
    "offername":"Hike",
    "offersmall":"hike"
  },
  {
    "offername":"Drop",
    "offersmall":"drop"
  }
]

oldpassword: any;
  newpassword: any;
  msg: any;
  religion:any=[];
  confirmpassword:any;
callback:any;
profileDetails:any;
  minDate:any;
  maxDate:any
  propType
  constructor(private api:ApiService,private spinnerService: Ng4LoadingSpinnerService,private popup:PopupService,private router:Router,private country:CountriesService,private formBuilder: FormBuilder, public variable: VariableService,private datePipe:DatePipe, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(paramsId => {
      this.propType = paramsId;
      // console.log(this.propType)
      // this.id = paramsId.id;
      // localStorage.setItem("bid",this.id)
      // if(paramsId.g_id){
        
      // }
    });
    
 
    this.sessionid=localStorage.getItem('sessionid')
    this.uid=localStorage.getItem('uid')
   }

   ChangePassForm: FormGroup;
   submitted = false;

   profileUpdateForm: FormGroup;
   isSubmitted = false;


  ngOnInit() {
    // if(this.variable.isScroll){
    //   $("html, body").animate({ scrollTop: 0 });
    //   this.variable.isScroll=false;
    // }
    this.spinnerService.show()
    this.api.profileGet(this.sessionid,this.uid).subscribe((data:any)=>{
      if(data.status=='Success'){
        //console.log(data)
        this.profileDetails=data.data[0]
        this.profileUpdateForm.get('firstName').setValue(this.profileDetails.first_name)
        this.profileUpdateForm.get('lastName').setValue(this.profileDetails.last_name)
        this.profileUpdateForm.get('mobile').setValue(this.profileDetails.user_mobile)
        this.profileUpdateForm.get('email').setValue(this.profileDetails.user_email)
        this.profileUpdateForm.get('pincode').setValue(this.profileDetails.user_pin)
        this.profileUpdateForm.get('nationality').setValue(this.profileDetails.user_nationality)
        this.profileUpdateForm.get('address').setValue(this.profileDetails.user_address)
        this.profileUpdateForm.get('country').setValue(this.profileDetails.user_country)
        // this.profileUpdateForm.controls['mobile'].disable();
        this.profileUpdateForm.controls['email'].disable();
        this.dob=this.profileDetails.user_dob
        if(this.dob!="None"){
        let date = new Date(this.dob);
        this.profileUpdateForm.patchValue({dob: {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()},
          jsdate:date
        }});
      }
        this.api.getState(this.profileDetails.user_country).subscribe((data:any)=>{
          //console.log(data)
          this.stateInfo=data.data
          this.profileUpdateForm.get('state').setValue(this.profileDetails.user_state)
        this.api.getCity(this.profileDetails.user_state).subscribe((data:any)=>{
          //console.log(data)
          this.cityInfo=data.data
          this.profileUpdateForm.get('city').setValue(this.profileDetails.user_city)
          this.api.getNationality().subscribe((data: any) => {
            this.Ndata = data
            this.api.getCountry().subscribe((data: any) => {
              this.spinnerService.hide()
              if(data.status=='Success'){
                this.countryInfo = data.data
              }
              
            },
            (err: HttpErrorResponse) => {
              this.spinnerService.hide()
              // this.isError = true;
              this.popup.failureMessage = "Server Error";
              this.popup.failurepopup();
              this.profileUpdateForm.reset();
            });
          },
          (err :HttpErrorResponse)=>{
            this.popup.failureMessage="Internal Server Error"
                this.popup.failurepopup();
            this.spinnerService.hide()
          });
       
        },
        (err :HttpErrorResponse)=>{
          this.popup.failureMessage="Internal Server Error"
              this.popup.failurepopup();
          this.spinnerService.hide()
        });

        },
        (err :HttpErrorResponse)=>{
          this.popup.failureMessage="Internal Server Error"
              this.popup.failurepopup();
          this.spinnerService.hide()
        });
        
        
      }
    else{
      this.spinnerService.hide()
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
  
    // this.getCountries();
    this.disableUntil()
    this.ChangePassForm = this.formBuilder.group({
      oldpassword:['',Validators.required],
      password: ['', Validators.required],
      confirmPassword:['',Validators.required],
     
    }, {
      validator: MustMatch('password', 'confirmPassword')
  });

  this.profileUpdateForm = this.formBuilder.group({
    firstName:['',Validators.required],
    lastName: ['', Validators.required],
    mobile:['',Validators.required],
    dob:['',Validators.required],
    address:[''],
    country:[''],
    state:[''],
    city:[''],
    email:['', [Validators.required, RxwebValidators.email()]],
    pincode:[''],
    nationality:['',Validators.required],
   
  })
  this.profileUpdateForm.reset() 
  }

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    disableUntil:{year: 0, month: 0, day: 0},
    disableSince:{year: 0, month: 0, day: 0}
  };

  disableUntil() {
    this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 100))
    let copy = this.getCopyOfOptions();
    copy.disableUntil = {year: this.minDate.getFullYear(), 
                         month: this.minDate.getMonth()+1 , 
                         day: this.minDate.getDate()};
    copy.disableSince = {year: this.maxDate.getFullYear(), 
                          month: this.maxDate.getMonth()+1, 
                          day: this.maxDate.getDate()};
    this.myOptions = copy;
}
getCopyOfOptions(): INgxMyDpOptions {
  return JSON.parse(JSON.stringify(this.myOptions));
}

clearDate(): void {
  // Clear the date using the patchValue function
  this.profileUpdateForm.patchValue({dob: null});
}

setDate(): void {
  this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
  // Set today date using the patchValue function
  this.profileUpdateForm.patchValue({dob: {
  date: {
      year: this.maxDate.getFullYear(),
      month: this.maxDate.getMonth() + 1,
      day: this.maxDate.getDate()},
      jsdate:this.maxDate
  }});
}

profileReset(){
  this.isSubmitted=false
}

getState(data){
  this.stateInfo=[]
  this.cityInfo=[]
  this.profileUpdateForm.get('state').setValue(null)
  this.profileUpdateForm.get('city').setValue(null)
  this.spinnerService.show()
  //console.log(data.country_id)
  var c_id=data.country_id
  this.api.getState(c_id).subscribe((data:any)=>{
    this.spinnerService.hide()
    //console.log(data)
    this.stateInfo=data.data
  },
  (err :HttpErrorResponse)=>{
    this.popup.failureMessage="Internal Server Error"
        this.popup.failurepopup();
    this.spinnerService.hide()
  });
}

getCity(data){
  this.cityInfo=[]
  this.profileUpdateForm.get('city').setValue(null)
  this.spinnerService.show()
  //console.log(data.state_id)
  var s_id=data.state_id
  this.api.getCity(s_id).subscribe((data:any)=>{
    this.spinnerService.hide()
    //console.log(data)
    this.cityInfo=data.data
  },
  (err :HttpErrorResponse)=>{
    this.popup.failureMessage="Internal Server Error"
        this.popup.failurepopup();
    this.spinnerService.hide()
  });
}

  get f() { return this.ChangePassForm.controls; }

  get g() { return this.profileUpdateForm.controls; }


  submit(){
    this.submitted = true;
    if (this.ChangePassForm.invalid) {
      return;
    }
    this.oldpassword = shajs('sha512').update(this.ChangePassForm.value.oldpassword).digest('hex')
    this.newpassword = shajs('sha512').update(this.ChangePassForm.value.password).digest('hex')
this.spinnerService.show()
    this.api.updatePassword(this.uid, this.sessionid, this.oldpassword, this.newpassword).subscribe((data: any) => {
      this.spinnerService.hide()
      if (data.status == "Success") {
        this.spinnerService.hide()
       this.ChangePassForm.reset();
       this.variable.isScroll=true;
        this.router.navigate(['']);
        this.variable.logout();
        this.popup.sucessMessage = "Password updated successfully. Please login....";
        this.popup.sucesspopup();
      }
      else {
        if (data.status == 'Fail') {
          // this.msg = data.message;
          this.popup.failureMessage = data.message;
          this.popup.failurepopup();
          // f.reset()
        }
        else {
          this.popup.failureMessage = "Server Error";
          this.popup.failurepopup();
        }
      }

    },
      (err: HttpErrorResponse) => {
        this.spinnerService.hide()
        // this.isError = true;
        // this.popup.failureMessage = "Server Error";
        // this.popup.failurepopup();
        
        this.ChangePassForm.reset();
        if (err.status == 403) {
          localStorage.clear()
          this.variable.isLogin=false
          this.variable.isScroll=true;
          this.router.navigate([''])
        }
      });
  }

  resetchange(){
    this.submitted=false
    this.ChangePassForm.reset()
  }


  onSubmit(){
    this.isSubmitted = true;
    if (this.profileUpdateForm.invalid) {
      return;
    }
  
    this.dob = this.profileUpdateForm.value.dob.jsdate
    this.dob =this.datePipe.transform( this.dob, 'yyyy-MM-dd');
    
    this.firstname=this.profileUpdateForm.value.firstName
    this.lastName=this.profileUpdateForm.value.lastName
    this.address=this.profileUpdateForm.value.address
    this.mcity=this.profileUpdateForm.value.city
    this.pincode=this.profileUpdateForm.value.pincode
    this.nationality=this.profileUpdateForm.value.nationality
    var mobile=this.profileUpdateForm.value.mobile
    this.spinnerService.show()
    this.api.profileUpdate(this.sessionid,this.uid,this.firstname,this.lastName,this.address,this.mcity,this.pincode,this.nationality,this.dob,mobile).subscribe((data:any)=>{
      this.spinnerService.hide()
      if(data.status=="Success"){
        if( this.propType.g_id){
          this.variable.username=data.data[0].first_name
          localStorage.setItem('username',data.data[0].first_name)
          this.variable.isScroll=true;
          this.callback=localStorage.getItem('callback')
          this.router.navigate([this.callback,this.propType.id,this.propType.g_id,this.propType.j_id])
        }else{
          console.log(data)
          this.variable.username=data.data[0].first_name
          localStorage.setItem('username',data.data[0].first_name)
         
          this.popup.sucessMessage=data.message
          this.popup.sucesspopup()
        }
       
      }
      else{
        this.popup.failureMessage=data.message
        this.popup.failurepopup()
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
 





  dobcheck(val){
    var myDate = new Date(val);
    var today = new Date('2004-12-31');
    var limit =new Date('1950-01-01')
    if(myDate >today || myDate < limit ){
    this.isDob=true;
    }
    else{
      this.isDob=false;
    }
    }




getCountries(){
  this.api.getCountry().
  subscribe(
    data2 => {
      this.countryInfo=data2.data;
      //console.log(this.countryInfo);
      this.len=this.countryInfo.length
      this.api.profileGet(this.sessionid,this.uid).subscribe((data:any)=>{
        //console.log(data)
        this.spinnerService.hide()
        if(data.status=="Success"){
         
          this.address=data.data[0].user_address;
          this.firstname=data.data[0].first_name;
          this.lastName=data.data[0].last_name;
          this.email=data.data[0].user_email;
          this.phone=data.data[0].user_mobile;
          this.dob=data.data[0].user_dob;
          this.mcountry1=data.data[0].user_country;
          this.mstate1=data.data[0].user_state;
          this.mcity1=data.data[0].user_city;
          this.pincode=data.data[0].user_pin;
          this.nationality=data.data[0].user_nationality;
          
          if(this.mcountry1!=null){
            for(this.i=0;this.i<this.len;this.i++){
              if(this.countryInfo[this.i].country_id==this.mcountry1){
                
               this.mcountry=this.countryInfo[this.i].country_id
             
               this.onChangeCountry(this.mcountry)
              //  this.mcountry=null;
          // this.mstate1=null;
          // this.mcity1=null;
              }
            }
            // for(var j=0;j<this.stateInfo.length;j++){
            //   if(this.stateInfo[j].StateName==this.mstate1){
            //     this.mstate=j
            //     this.onChangeState(j) 
            //    }
            // }
            // for(var k=0;k<this.cityInfo.length;k++){
            //   if(this.cityInfo[k]==this.mcity1){
            //     this.mcity=k 
            //    }
            // }
  
          }
  
        }
        else{
          this.popup.failureMessage="Something went wrong please try again"
          this.popup.failurepopup()
          this.variable.isScroll=true;
          this.router.navigate([''])
        }
      },
      (err :HttpErrorResponse)=>{
        // this.popup.failureMessage="Internal Server Error"
        //     this.popup.failurepopup();
        this.spinnerService.hide()
        if (err.status == 403) {
          localStorage.clear()
          this.variable.isLogin=false
          this.variable.isScroll=true;
          this.router.navigate([''])
        }
      });
      
    },
    err => console.log(err),
    () => console.log('complete')
  )
}

// onChangeCountry(countryValue) {
//   this.mstate=null
//   this.mcity=null
//   this.cityInfo=[]
//   this.stateInfo=this.countryInfo[countryValue].States;
  
// }
// onChangeState(stateValue) {
//   this.mcity=null
//   this.cityInfo=this.stateInfo[stateValue].Cities;
// }
onChangeCountry(countryValue){
  this.mstate=null;
  this.api.getState(countryValue).subscribe((data:any)=>{
    this.stateInfo=data.data;
      //console.log(this.stateInfo);
      this.len=this.stateInfo.length
     //console.log(this.mstate1) 
    if(data.status=="Success"){
      
      
      
      if(this.mstate1!=null){
        for(this.i=0;this.i<this.len;this.i++){
          if(this.stateInfo[this.i].state_id==this.mstate1){
            
           this.mstate=this.stateInfo[this.i].state_id
           
           this.onChangeState(this.mstate)
          }
        }
        

      }

    }
    else{
      this.popup.failureMessage="Something went wrong please try again"
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
onChangeState(cityValue){
  this.mcity=null
  this.api.getCity(cityValue).subscribe((data:any)=>{
    this.cityInfo=data.data;
      //console.log(this.cityInfo);
      this.len=this.cityInfo.length
     //console.log(this.mcity1) 
    if(data.status=="Success"){
      
      
      
      if(this.mcity1!=null){
        for(this.i=0;this.i<this.len;this.i++){
          if(this.cityInfo[this.i].city_id==this.mcity1){
            
           this.mcity=this.cityInfo[this.i].city_id
           
          //  this.onChangeCountry(this.i)
          }
        }
        

      }

    }
    else{
      this.popup.failureMessage="Something went wrong please try again"
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
