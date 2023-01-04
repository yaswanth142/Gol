import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd, Route, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { PopupService } from '../popup.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/must-match.validator';
import * as shajs from 'sha.js';
import * as $ from 'jquery';
declare var jQuery: any;
import Swal from 'sweetalert2'
import { VariableService } from '../variable.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  tab: any = 1;
  keyword: any = 'active';
  activeData: any = [];
  passiveData: any = [];
  cancelData: any = [];
  imgPath: any;
  star: any = [];
  i: any = 0
  feedback: any;
  isConfirm: boolean = false
  finalData: any = [];
  NoActive: boolean = false
  NoPassive: boolean = false
  NoCancel: boolean = false
  img_list: any = [];
  isCancel:boolean=false;
  myDate:any;
  constructor(public api: ApiService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, public popup: PopupService, private route: ActivatedRoute, private formBuilder: FormBuilder, public variable: VariableService,private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.isConfirm = false


    this.keyword = 'active'
    this.Booking()

    this.star = 3
  }
  selectTab(id) {
    if (this.tab != id) {
      if (id == 1) {
        this.keyword = 'active'
        this.Booking()
      } else {
        if (id == 2) {

          this.keyword = 'past'
          this.Booking()
        }
        else {
          if (id == 3) {
            this.keyword = 'cancel'
            this.Booking()
          }
        }
      }

    }

    this.tab = id;
  }

  activeTab(num) {
    return this.tab === num;
  }

  Booking() {
    this.spinnerService.show()
    this.api.bookingHistory(localStorage.getItem('sessionid'), localStorage.getItem('uid'), this.keyword).subscribe((data: any) => {
      this.spinnerService.hide()
      if (data.status == "Success") {
        if (data.message != 'No data') {
          if (this.keyword == 'active') {
            this.myDate = new Date();
      this.myDate.setDate(this.myDate.getDate()); 
      this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');


            this.NoActive = false
            this.activeData = data.data[0].active_bookings
            for (let i = 0; i < this.activeData.length; i++) {
              var p_name = this.activeData[i].property_name.toLowerCase()
           
              if ((p_name.includes('samudram'))) {
                this.activeData[i].img_path = data.data[0].samudram_thumb_path
              }
              else {
                this.activeData[i].img_path = data.data[0].property_img_thumb_path
              }

              if(this.activeData[i].journey_start_date>this.myDate){
                this.activeData[i].isCancel=true
              }else{
                this.activeData[i].isCancel=false
              }
            }
            // console.log(this.activeData)
          }
          else {
            if (this.keyword == 'past') {
              this.NoPassive = false
              this.passiveData = data.data[0].past_bookings
              for (let i = 0; i < this.passiveData.length; i++) {
                var p_name = this.passiveData[i].property_name.toLowerCase()
                if ((p_name.includes('samudram'))) {
                  this.passiveData[i].img_path = data.data[0].samudram_thumb_path
                }
                else {
                  this.passiveData[i].img_path = data.data[0].property_img_thumb_path
                }
              }
              //console.log(this.passiveData)

            }
            else {
              if (this.keyword == 'cancel') {
                this.NoCancel = false
                this.cancelData = data.data[0].cancel_bookings
                for (let i = 0; i < this.cancelData.length; i++) {
                  var p_name = this.cancelData[i].property_name.toLowerCase()
                  if ((p_name.includes('samudram'))) {
                    this.cancelData[i].img_path = data.data[0].samudram_thumb_path
                  }
                  else {
                    this.cancelData[i].img_path = data.data[0].property_img_thumb_path
                  }
                }
                //console.log(this.cancelData)
              }
            }
          }
        }
        else {
          if (this.keyword == 'active') {
            this.activeData = []
            this.NoActive = true
          }
          if (this.keyword == 'past') {
            this.passiveData = []
            this.NoPassive = true
          }
          if (this.keyword == 'cancel') {
            this.cancelData = []
            this.NoCancel = true
          }
        }




      }
      else {
        this.spinnerService.hide()
        // this.isError = true;
        this.popup.failureMessage = "Server Error";
        this.popup.failurepopup();
      }

    },
      (err: HttpErrorResponse) => {
        // this.spinnerService.hide()
        // // this.isError = true;
        // this.popup.failureMessage = "Server Error";
        // this.popup.failurepopup();
        this.spinnerService.hide()
        if (err.status == 403) {
          localStorage.clear()
          this.variable.isLogin = false
          this.variable.isScroll = true;
          this.router.navigate([''])
        }
      });
  }



  reviewLength: any;
  reviewData: any;
  currentReview: any;
  reviewCategory;
  bookingId: any;

  getReview(id) {
    this.bookingId = id
    this.i = 0;
    this.isConfirm = false
    this.finalData = []
    this.spinnerService.show()
    this.api.reviewCategory(localStorage.getItem('sessionid'), localStorage.getItem('uid'), id).subscribe((data: any) => {

      this.spinnerService.hide()

      if (data.status == "Success") {
        this.reviewData = data.data

        this.reviewLength = this.reviewData.length;
        if (this.reviewLength == 1) {
          this.isConfirm = true
        } else {
          this.isConfirm = false
        }
        this.currentReview = this.reviewData[0]
        this.feedback = this.reviewData[0].feedback
        this.reviewCategory = this.reviewData[0].rating_category_name
        jQuery('#myModal').modal('show');
      }
      else {
        this.spinnerService.hide()
        this.popup.failureMessage = data.message;
        this.popup.failurepopup()
      }
    },
      (err: HttpErrorResponse) => {
        // this.popup.failureMessage="Internal Server Error"
        //     this.popup.failurepopup();
        this.spinnerService.hide()
        if (err.status == 403) {
          localStorage.clear()
          this.variable.isLogin = false
          this.variable.isScroll = true;
          this.router.navigate([''])
        }
      });

  }

  next() {
    if (this.reviewData[this.i].no_of_stars == 0.0) {

    } else {
      if (this.i < this.reviewLength - 2) {
        this.reviewData[this.i].feedback = this.feedback
        this.finalData.push(this.reviewData[this.i])
        this.i = this.i + 1
        this.currentReview = this.reviewData[this.i]
        this.feedback = this.currentReview.feedback
        this.reviewCategory = this.currentReview.rating_category_name
      } else {
        // console.log("djdjdj")
        this.isConfirm = true
        this.reviewData[this.i].feedback = this.feedback
        this.finalData.push(this.reviewData[this.i])
        this.i = this.i + 1
        this.currentReview = this.reviewData[this.i]
        this.feedback = this.currentReview.feedback
        this.reviewCategory = this.currentReview.rating_category_name
      }
    }



  }


  confirm() {
    this.reviewData[this.i].feedback = this.feedback
    this.finalData.push(this.reviewData[this.i])
    // console.log(this.finalData)
    this.spinnerService.show()
    this.api.reviewAdd(localStorage.getItem('sessionid'), localStorage.getItem('uid'), this.bookingId, this.finalData, this.img_list).subscribe((data: any) => {
      //console.log(data)
      this.spinnerService.hide()
      if (data.status == 'Success') {
        jQuery('#myModal').modal('hide');
        this.keyword = 'past'
        this.Booking()
        this.popup.sucessMessage = data.message;
        this.popup.sucesspopup()
      }
      else {
        this.popup.failureMessage = data.message;
        this.popup.failurepopup()
      }

    },
      (err: HttpErrorResponse) => {
        // this.popup.failureMessage="Internal Server Error"
        //     this.popup.failurepopup();
        this.spinnerService.hide()
        if (err.status == 403) {
          localStorage.clear()
          this.variable.isLogin = false
          this.variable.isScroll = true;
          this.router.navigate([''])
        }
      });

  }

  onRatingSet(val) {
    //console.log(val)
    this.reviewData[this.i].no_of_stars = val

  }
  payment(bookId,propType) {
     localStorage.setItem("cast",propType)
    this.router.navigate(['payment', bookId]);
  }

  cancelBooking(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      input: 'textarea',
      inputPlaceholder: 'Reason for Cancellation',
      inputAttributes: {
        'aria-label': 'Type your message here',
        maxlength: '200',
      },

      footer: 'Maximum character length is 200',
      // inputValue:'Booking has been cancelled due to non-technical reasons.',
      width: 700,
      showCancelButton: true,
      confirmButtonColor: '#24b7a9',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'Discard',
      customClass: {
        footer: 'footer-class',
        content: 'content-text',
        title: 'title-text'
      },
      inputValidator: (value) => {
        if (!value) {
          // console.log(value)
          return 'This field cannot be empty.'
        }
        else {
          this.spinnerService.show()
          this.api.cancelBooking(localStorage.getItem('sessionid'), localStorage.getItem('uid'), id, value).subscribe((data: any) => {
            if (data.status == "Success") {
              $("html, body").animate({ scrollTop: 0 });
              this.popup.sucessMessage = data.message

              // this.keyword='active'
              this.api.bookingHistory(localStorage.getItem('sessionid'), localStorage.getItem('uid'), 'active').subscribe((data: any) => {
                // this.spinnerService.hide()
                //console.log(data)
                if (data.status == "Success") {
                  if (data.message != 'No data') {
                    this.activeData = data.data[0].active_bookings
                    for (let i = 0; i < this.activeData.length; i++) {
                      var p_name = this.activeData[i].property_name.toLowerCase()
                      if ((p_name.includes('samudram'))) {
                        this.activeData[i].img_path = data.data[0].samudram_thumb_path
                      }
                      else {
                        this.activeData[i].img_path = data.data[0].property_img_thumb_path
                      }
                    }
                    // this.keyword='cancel'
                    this.api.bookingHistory(localStorage.getItem('sessionid'), localStorage.getItem('uid'), "cancel").subscribe((data: any) => {
                      this.spinnerService.hide()
                      this.popup.sucesspopup()
                      if (data.status == "Success") {
                        if (data.message != 'No data') {
                          this.cancelData = data.data[0].cancel_bookings
                          for (let i = 0; i < this.cancelData.length; i++) {
                            var p_name = this.cancelData[i].property_name.toLowerCase()
                            if ((p_name.includes('samudram'))) {
                              this.cancelData[i].img_path = data.data[0].samudram_thumb_path
                            }
                            else {
                              this.cancelData[i].img_path = data.data[0].property_img_thumb_path
                            }
                          }
                        }
                        else {
                          this.cancelData = []
                        }
                      }


                    },
                      (err: HttpErrorResponse) => {
                        this.spinnerService.hide()
                        // this.isError = true;
                        this.popup.failureMessage = "Server Error";
                        this.popup.failurepopup();
                      });
                  }
                  else {
                    this.activeData = []
                    this.api.bookingHistory(localStorage.getItem('sessionid'), localStorage.getItem('uid'), "cancel").subscribe((data: any) => {
                      this.spinnerService.hide()
                      this.popup.sucesspopup()
                      if (data.status == "Success") {
                        if (data.message != 'No data') {
                          this.cancelData = data.data[0].cancel_bookings
                          for (let i = 0; i < this.cancelData.length; i++) {
                            var p_name = this.cancelData[i].property_name.toLowerCase()
                            if ((p_name.includes('samudram'))) {
                              this.cancelData[i].img_path = data.data[0].samudram_thumb_path
                            }
                            else {
                              this.cancelData[i].img_path = data.data[0].property_img_thumb_path
                            }
                          }
                        }
                        else {
                          this.cancelData = []
                        }
                      }


                    },
                      (err: HttpErrorResponse) => {
                        this.spinnerService.hide()
                        // this.isError = true;
                        this.popup.failureMessage = "Server Error";
                        this.popup.failurepopup();
                      });
                  }
                }
                else {
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
                    this.variable.isLogin = false
                    this.variable.isScroll = true;
                    this.router.navigate([''])
                  }
                });
              // this.keyword='active'
              // this.Booking()

            }
            else {
              this.spinnerService.hide()
              this.popup.failureMessage = data.message
              this.popup.failurepopup()
            }


          }, (err: HttpErrorResponse) => {
            this.spinnerService.hide();


          })
        }
      },
    })
    // }).then((result) => {
    //   if (result.value) {
    // this.getReason(id)
    // this.spinnerService.show()
    // this.api.cancelBooking(localStorage.getItem('sessionid'), localStorage.getItem('uid'), id).subscribe((data: any) => {
    //   if (data.status == "Success") {
    //     $("html, body").animate({ scrollTop: 0 });
    //     this.popup.sucessMessage = data.message

    //     // this.keyword='active'
    //     this.api.bookingHistory(localStorage.getItem('sessionid'), localStorage.getItem('uid'),'active').subscribe((data:any)=>{
    //       // this.spinnerService.hide()
    //       //console.log(data)
    //       if(data.status=="Success"){
    //         if(data.message!='No data'){
    //           this.activeData=data.data[0].active_bookings
    //           for(let i=0;i<this.activeData.length;i++){
    //             var p_name=this.activeData[i].property_name.toLowerCase()
    //             if((p_name.includes('samudram'))){
    //               this.activeData[i].img_path=data.data[0].samudram_thumb_path
    //             }
    //             else{
    //               this.activeData[i].img_path=data.data[0].property_img_thumb_path
    //             }
    //           }
    //           // this.keyword='cancel'
    //           this.api.bookingHistory(localStorage.getItem('sessionid'), localStorage.getItem('uid'),"cancel").subscribe((data:any)=>{
    //             this.spinnerService.hide()
    //             this.popup.sucesspopup()
    //             if(data.status=="Success"){
    //               if(data.message!='No data'){
    //               this.cancelData=data.data[0].cancel_bookings
    //               for(let i=0;i<this.cancelData.length;i++){
    //                 var p_name=this.cancelData[i].property_name.toLowerCase()
    //                 if((p_name.includes('samudram'))){
    //                   this.cancelData[i].img_path=data.data[0].samudram_thumb_path
    //                 }
    //                 else{
    //                   this.cancelData[i].img_path=data.data[0].property_img_thumb_path
    //                 }
    //               }
    //             }
    //             else{
    //               this.cancelData=[]
    //             }
    //               }


    //             },
    //             (err: HttpErrorResponse) => {
    //               this.spinnerService.hide()
    //               // this.isError = true;
    //               this.popup.failureMessage = "Server Error";
    //               this.popup.failurepopup();
    //             });
    //         }
    //         else{
    //           this.activeData=[]
    //           this.api.bookingHistory(localStorage.getItem('sessionid'), localStorage.getItem('uid'),"cancel").subscribe((data:any)=>{
    //             this.spinnerService.hide()
    //             this.popup.sucesspopup()
    //             if(data.status=="Success"){
    //               if(data.message!='No data'){
    //               this.cancelData=data.data[0].cancel_bookings
    //               for(let i=0;i<this.cancelData.length;i++){
    //                 var p_name=this.cancelData[i].property_name.toLowerCase()
    //                 if((p_name.includes('samudram'))){
    //                   this.cancelData[i].img_path=data.data[0].samudram_thumb_path
    //                 }
    //                 else{
    //                   this.cancelData[i].img_path=data.data[0].property_img_thumb_path
    //                 }
    //               }
    //             }
    //             else{
    //               this.cancelData=[]
    //             }
    //               }


    //             },
    //             (err: HttpErrorResponse) => {
    //               this.spinnerService.hide()
    //               // this.isError = true;
    //               this.popup.failureMessage = "Server Error";
    //               this.popup.failurepopup();
    //             });
    //         }

    // }




    //     },
    //     (err: HttpErrorResponse) => {
    //       this.spinnerService.hide()
    //       // this.isError = true;
    //       this.popup.failureMessage = "Server Error";
    //       this.popup.failurepopup();
    //     });
    //     // this.keyword='active'
    //     // this.Booking()

    //   }
    //   else {
    //     this.spinnerService.hide()
    //     this.popup.failureMessage = data.message
    //     this.popup.failurepopup()
    //   }


    // }, (err: HttpErrorResponse) => {
    //   this.spinnerService.hide();


    // })
    //   }
    // })
  }

  getReason(id) {
    Swal.fire({
      title: 'Reason for cancellation',
      input: 'textarea',
      inputPlaceholder: 'Type your message here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      // inputValue:'Booking has been cancelled due to non-technical reasons.',
      showCancelButton: true,
      width: 700,
      confirmButtonText: 'Cancel',
      cancelButtonText: 'Discard',
      inputValidator: (value) => {
        if (!value) {
          // console.log(value)
          return 'This field cannot be empty.'
        }
        else {
          // console.log(value)
          // this.spinnerService.show()
          // this.api.replyEnquiry(this.sessionid, +this.userid, id.toString(), value).subscribe((data: any) => {
          //   console.log(data)
          //   if (data.status == "Success") {
          //     $("html, body").animate({ scrollTop: 0 });
          //     this.popup.sucessMessage = data.message;
          //     this.popup.sucesspopup()

          //     this.spinnerService.hide()
          //   }
          //   else {
          //     this.spinnerService.hide()
          //     this.popup.failureMessage = data.message
          //     this.popup.failurepopup()
          //   }
          // }, (err: HttpErrorResponse) => {
          //   this.spinnerService.hide();
          //   this.popup.failureMessage = "Internal Server Error"
          //   this.popup.failurepopup()
          // })
        }
      },

    })

  }

  historyDetails(val) {
    this.router.navigate(['historyDetails', val])
  }

}
