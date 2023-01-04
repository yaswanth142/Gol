import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';
declare var $: any;
@Injectable({
  providedIn: 'root'
})

export class ApiService {
url:any;
  constructor(private http: HttpClient, private router: Router) { }

  //  private baseurl="http://192.168.1.187:5000/api/v1/"//test
  // private baseurl="http://192.168.1.196:5000/api/v1/"//DEV 
  // public baseurl="http://192.168.1.117:5000/api/v1/"//DEV 
  // public baseurl="http://13.235.47.120:5000/api/v1/"//QA 
  // public baseurl="http://192.168.1.108:5000/api/v1/"//DEV 
  // public baseurl="http://192.168.1.36:5000/api/v1/"//DEV 
  // public baseurl = "http://54.66.146.192:1000/api/v1/"//DEV
  // public baseurl ="http://192.168.1.170:6700/api/v1/"//Load
  // private baseurl = "http://golakshadweep-1603453389.ap-south-1.elb.amazonaws.com:1392/api/v1/"//prod
  // public baseurl = "https://www.golakshadweep.com/api/v1/"//prod
  public baseurl="http://54.163.146.56/api/v1/" //NEW DEV

  // public baseurl="http://54.163.146.56:1000/api/v1/"



  private loginApi = this.baseurl + 'tourist_login';
  private registerationApi = this.baseurl + 'tourist_registration';
  private emailVerifyApi = this.baseurl + 'user_verification';
  private profileGetApi = this.baseurl + 'tourist_profile_update'
  private updatePasswordApi = this.baseurl + 'change_password';
  private logoutApi = this.baseurl + 'tourist_logout';
  private checkLinkApi = this.baseurl + 'forgot_password';
  private newPassApi = this.baseurl + 'new_password_verification';
  private GalleryApi = this.baseurl + 'gallery_fetch';
  private samudramApi = this.baseurl + 'samudram_fetch';
  private stayingTouristApi = this.baseurl + 'stayingtourist_fetch';
  private privatePropertyApi = this.baseurl + 'private_property_fetch';
  private activityApi = this.baseurl + 'activity_fetch';
  private countryApi = this.baseurl + 'country_fetch ';
  private stateApi = this.baseurl + 'state_fetch  ';
  private cityApi = this.baseurl + 'city_fetch ';
  private reviewApi = this.baseurl + 'reviews_fetch';
  private shipTravelDetailsApi = this.baseurl + 'samudram_fetch_all_portal';
  private myreservationsApi=this.baseurl + 'user_find_reservation_fetch_mobile';
  private islandFetchAllAPi=this.baseurl + 'island_fetch';
  private islandSingleFetchApi=this.baseurl+"island_det";
  private findResevationFetchApi=this.baseurl+"find_reservation_fetch";
  private bookingHistoryApi=this.baseurl+"booking_history";
  private bookingDetailsApi=this.baseurl+"fetch_single_booking_portal";
  private cancelBookingApi=this.baseurl+"tourist_booking_cancel";
  private homeApi=this.baseurl+"home_page_fetch";
  private islandStaysApi=this.baseurl+"private_sports_property_combine"
  private propertyFetchApi=this.baseurl+"property_fetch"
  private islandPropertyApi=this.baseurl+"island_private_sports_filter";
  private packageFetchApi=this.baseurl+"all_package_fetch";
  private packageNameFetchApi=this.baseurl+"package_id_fetch";
  private socialMediaLoginApi=this.baseurl+"social_media_login";
  private individualAvailabilityCheckApi=this.baseurl+"individual_availability_check";
  private currencyFetchApi=this.baseurl + "fetch_currencies"
  private orderManagementApi=this.baseurl+"order_management"
  private paymentManagementApi=this.baseurl+"payment_management_mobile"
  private verifyPaymentApi=this.baseurl +'verify_payment';
  private faqApi=this.baseurl+"faq_fetch_all";
  private alertApi=this.baseurl+"alert_view_portal";
  private availabilitySearchApi=this.baseurl+"availability_search";
  private offerFetchApi=this.baseurl+"offer_name_fetch";
  private OfferPropertyAPi= this.baseurl+"offers_single_fetch_portal";
  private activitySingleFetchApi=this.baseurl+"activity_single_fetch_mob";
  private guestDataApi=this.baseurl+"booking_data_fetch";
  private faqFetchApi=this.baseurl+"faq_category_wise_fetch";
  private bedAvailabilityApi=this.baseurl+"property_room_available_bed_filter";

    //vishnu 
    private propertyListFetchApi = this.baseurl + 'property_page_fetch';
    // private islandFetchApi = this.baseurl + 'island_fetch';
    private propertySearchApi = this.baseurl + 'property_fetch_filters';
    private individualPropApi = this.baseurl + 'individual_property_fetch';
    private privateListFetchApi = this.baseurl + 'property_list_fetch';
    private searchResultFetchApi = this.baseurl + 'property_filters';
    private individualTravelFetchApi = this.baseurl + 'shiptravel_details_fetch_mobile_portal';
    private availabilityFetchApi = this.baseurl + 'booking_availability_check';
    private enquiryTypeApi = this.baseurl + 'enquiry_type_all_fetch';
    private enquiryAddApi = this.baseurl + 'add_enquiry';
    private sourceSelectApi = this.baseurl + 'source_fetch_portal';
    private categoryFetchApi = this.baseurl + 'rating_category_fetch';
    private reviewAddApi = this.baseurl + 'tourist_rating_add';
    private offerHomeApi = this.baseurl + 'portal_offer_fetch';
    private passengerAddApi = this.baseurl + 'primary_secondary_user_booking_web';
    private paymentSamudramApi = this.baseurl + 'payment_preview_samudram';
    private paymentPropertyApi = this.baseurl + 'payment_preview_property';
    private newCostApi= this.baseurl + 'heritage_transportation_fee_fetch';
    

    
  login(user_name: string, user_password: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "user_email": user_name, "password": user_password, "ses_devtype": "w" };
    return this.http.post(this.loginApi, body, httpOptions).pipe(map(data => (data)));
  }



  register(first_name: string, last_name: string, user_email: string, password: any, user_mobile: any, user_nationality: string, user_dob: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "first_name": first_name, "last_name": last_name, "user_email": user_email, "password": password, "user_mobile": user_mobile, "user_nationality": user_nationality, "user_dob": user_dob, "dtype": "w" };
    return this.http.post(this.registerationApi, body, httpOptions).pipe(map(data => (data)));
  }


  emailVerify(encr_email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "encr_email": encr_email };
    return this.http.post(this.emailVerifyApi, body, httpOptions).pipe(map(data => (data)));
  }
  updatePassword(userId: any, sessionId: any, oldpassword: any, newpassword: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "user_id": userId, "session_token": sessionId, "old_password": oldpassword, "new_password": newpassword };
    return this.http.post(this.updatePasswordApi, body, httpOptions).pipe(map(data => (data)));
  }

  getNationality() {
    return this.http.get('.././assets/json/nationality.json').pipe(map(res => res));
  }

  profileGet(sessionid: string, uid: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "session_token": sessionid, "user_id": uid,"dtype":"w" };
    return this.http.post(this.profileGetApi, body, httpOptions).pipe(map(data => (data)));
  }
  logout(sessionid: string, uid: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "session_token": sessionid, "user_id": uid };
    return this.http.post(this.logoutApi, body, httpOptions).pipe(map(data => (data)));
  }

  // getCountry():Observable<any>
  // {
  //  return this.http.get('.././assets/json/country.json').pipe(map(res => res));
  // }



  profileUpdate(sessionid: string, uid: any, first_name: string, last_name: string, user_address: string, user_city: string, user_pin: any, user_nationality: string, user_dob: any,mobile:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "session_token": sessionid, "user_id": uid, "first_name": first_name, "last_name": last_name, "user_address": user_address, "user_city": user_city, "user_pin": user_pin, "user_nationality": user_nationality, "user_dob": user_dob,"dtype":"w","user_mobile":mobile};
    return this.http.put(this.profileGetApi, body, httpOptions).pipe(map(data => (data)));
  }


  checkEmail(email: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "user_email": email,"dtype": "w" };
    return this.http.post(this.checkLinkApi, body, httpOptions).pipe(map(data => (data)));
  }
  pwdNew(urlData: string, passNew: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "encr_email": urlData, "password": passNew };
    return this.http.post(this.newPassApi, body, httpOptions).pipe(map(data => (data)));
  }

  gallery() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w" };
    return this.http.post(this.GalleryApi, body, httpOptions).pipe(map(data => (data)));
  }
  samudram() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w" };
    return this.http.post(this.samudramApi, body, httpOptions).pipe(map(data => (data)));
  }

  stayingTourist() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w" };
    return this.http.post(this.stayingTouristApi, body, httpOptions).pipe(map(data => (data)));
  }


  privateProperty() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w" };
    return this.http.post(this.privatePropertyApi, body, httpOptions).pipe(map(data => (data)));
  }
  activity() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w" };
    return this.http.post(this.activityApi, body, httpOptions).pipe(map(data => (data)));
  }

  getCountry(): Observable<any> {
    return this.http.get(this.countryApi).pipe(map(res => res));
  }

  getState(country_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "country_id": country_id };
    return this.http.post(this.stateApi, body, httpOptions).pipe(map(data => (data)));
  }
  getCity(state_id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "state_id": state_id };
    return this.http.post(this.cityApi, body, httpOptions).pipe(map(data => (data)));
  }
  getReviews(): Observable<any> {
    return this.http.get(this.reviewApi).pipe(map(res => res));
  }
  shipTravelDetails(pkg_id:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w","pkg_id":pkg_id };
    return this.http.post(this.shipTravelDetailsApi, body, httpOptions).pipe(map(data => (data)));
  }

  myreservations(sessionid: string, uid: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w","user_id":uid,"session_token":sessionid };
    return this.http.post(this.myreservationsApi, body, httpOptions).pipe(map(data => (data)));
  }

  islandFetchAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w" };
    return this.http.post(this.islandFetchAllAPi, body, httpOptions).pipe(map(data => (data)));
  }

  islandSingleFetch(id:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w","island_id":id };
    return this.http.post(this.islandSingleFetchApi, body, httpOptions).pipe(map(data => (data)));
  }

  findResevationFetch(email:any,id:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w","booking_ref_id":id,"user_email":email };
    return this.http.post(this.findResevationFetchApi, body, httpOptions).pipe(map(data => (data)));
  }


  bookingHistory(sessionid: string, uid: any,keyword:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "keyword": keyword,"user_id":uid,"session_token":sessionid };
    return this.http.post(this.bookingHistoryApi, body, httpOptions).pipe(map(data => (data)));
  }
  bookingDetails(sessionid: string, uid: any,id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "booking_id": id,"user_id":uid,"session_token":sessionid };
    return this.http.post(this.bookingDetailsApi, body, httpOptions).pipe(map(data => (data)));
  }
  cancelBooking(sessionid: string, uid: any,id:any,value:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "booking_id": id,"user_id":uid,"session_token":sessionid,"booking_cancelled_reason":value };
    return this.http.post(this.cancelBookingApi, body, httpOptions).pipe(map(data => (data)));
  }

  islandStays(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype":"w"};
    return this.http.post(this.islandStaysApi, body, httpOptions).pipe(map(data => (data)));
  }
  islandProperty(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype":"w","island_id":id};
    return this.http.post(this.islandPropertyApi, body, httpOptions).pipe(map(data => (data)));
  }
  activitySingleFetch(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype":"w","activity_id":id};
    return this.http.post(this.activitySingleFetchApi, body, httpOptions).pipe(map(data => (data)));
  }
  offerProperty(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype":"w","offer_id":id};
    return this.http.post(this.OfferPropertyAPi, body, httpOptions).pipe(map(data => (data)));
  }
  
  

  packageFetch(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype":"w"};
    return this.http.post(this.packageFetchApi, body, httpOptions).pipe(map(data => (data)));
  }
  
  packageNameFetch(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
    return this.http.get(this.packageNameFetchApi, httpOptions).pipe(map(data => (data)));
  }


  socialMediaLogin(auth_token:any,user_email:any,first_name:any,unique_id:any,last_name:any,full_name:any,provider_name:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = {"auth_token":auth_token,"user_email":user_email,"first_name":first_name,"unique_id":unique_id,"last_name":last_name,"full_name":full_name,"provider_name":provider_name,"ses_devtype":"w"};
    return this.http.post(this.socialMediaLoginApi, body, httpOptions).pipe(map(data => (data)));
  }

  currencyFetch(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
    return this.http.get(this.currencyFetchApi, httpOptions).pipe(map(data => (data)));
  }


  orderManagement(sessionid: string, uid: any,id:any,status){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "booking_id": id,"user_id":uid,"session_token":sessionid ,"is_partial":status};
    return this.http.post(this.orderManagementApi, body, httpOptions).pipe(map(data => (data)));
  }

  paymentManagement(sessionid: string, uid: any,razorpay_payment_id:any,razorpay_signature:any,razorpay_order_id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "razorpay_payment_id": razorpay_payment_id,"user_id":uid,"session_token":sessionid,"razorpay_signature":razorpay_signature,"razorpay_order_id":razorpay_order_id};
    return this.http.post(this.paymentManagementApi, body, httpOptions).pipe(map(data => (data)));
  }

  verifyPayment(sessionid: string, uid: any,data_order_id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "data_order_id": data_order_id,"user_id":uid,"session_token":sessionid};
    return this.http.post(this.verifyPaymentApi, body, httpOptions).pipe(map(data => (data)));
  }
  
  alert(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
    return this.http.get(this.alertApi, httpOptions).pipe(map(data => (data)));
  }
  

  availabilitySearch(start_date: any, end_date: any,pkg_id:any,property_id:any,no_of_adult:any,no_of_child:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "start_date": start_date,"end_date":end_date,"pkg_id":pkg_id,"property_id":property_id,"no_of_adult":no_of_adult,"no_of_child":no_of_child,"dtype":"w"};
    return this.http.post(this.availabilitySearchApi, body, httpOptions).pipe(map(data => (data)));

  }
  

  offerFetch(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype":"w"};
    return this.http.post(this.offerFetchApi, body, httpOptions).pipe(map(data => (data)));
  }

  guestData(g_id,j_id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype":"w","guest_id":g_id,'json_id':j_id };
    return this.http.post(this.guestDataApi, body, httpOptions).pipe(map(data => (data)));
  }


  faqFetch(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
    return this.http.get(this.faqFetchApi, httpOptions).pipe(map(data => (data)));
  }

  

  bedAvailability(start_date,end_date,pkg_id,property_id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype":"w","start_date":start_date,"end_date":end_date,"pkg_id":pkg_id,"property_id":property_id};
    return this.http.post(this.bedAvailabilityApi, body, httpOptions).pipe(map(data => (data)));
  }
  
  
  
  
  //vishnu

  islandFetch() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "m" };
    return this.http.post(this.islandFetchAllAPi, body, httpOptions).pipe(map(data => (data)));
  }
  propertyListFetch() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "keyword": "stayingtourist" };
    return this.http.post(this.privateListFetchApi, body, httpOptions).pipe(map(data => (data)));
  }

  searchProperty(startdate: any, returndate: any, adultcount: any, childcount: any, island: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "start_date": startdate, "end_date": returndate, "no_of_child": childcount, "no_of_adult": adultcount, "island_id": island, "keyword": "stayingtourist" };
    return this.http.post(this.propertySearchApi, body, httpOptions).pipe(map(data => (data)));
  }
  searchPrivateProperty(startdate: any, returndate: any, adultcount: any, childcount: any, island: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "start_date": startdate, "end_date": returndate, "no_of_child": childcount, "no_of_adult": adultcount, "island_id": island, "keyword": "privateproperty" };
    return this.http.post(this.propertySearchApi, body, httpOptions).pipe(map(data => (data)));
  }
  individualPropertyDetails(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "property_id": id };
    return this.http.post(this.individualPropApi, body, httpOptions).pipe(map(data => (data)));
  }
  privateListFetch() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "keyword": "privateproperty" };
    return this.http.post(this.privateListFetchApi, body, httpOptions).pipe(map(data => (data)));
  }
  searchResult(startdate: any, returndate: any, adult: any, child: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "start_date": startdate, "end_date": returndate, "no_of_child": child, "no_of_adult": adult };
    return this.http.post(this.searchResultFetchApi, body, httpOptions).pipe(map(data => (data)));
  }
  individualShipDetails(shipId: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "ship_travel_id": shipId };
    return this.http.post(this.individualTravelFetchApi, body, httpOptions).pipe(map(data => (data)));
  }
  availabilityCheck(userId:any,sessionId:any,startdate:any,returndate:any,packageId:any,propertyId:any,ship_travel_id:any,bookingDetailsData:any,bookingDetails:any,transport:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "user_id": userId,"session_token":sessionId, "start_date":startdate,"end_date":returndate,"pkg_id":packageId, "property_id":propertyId,"ship_travel_id":ship_travel_id,"booking_details":bookingDetailsData,"property_booking_details":bookingDetails,"transportation_mode":transport,"dtype": "w","booking_id": 0};
    // console.log(body)
    return this.http.post(this.availabilityFetchApi, body, httpOptions).pipe(map(data => (data)));
  }


  individualAvailabilityCheck(userId:any,sessionId:any,startdate:any,returndate:any,packageId:any,propertyId:any,ship_travel_id:any,bookingDetails:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "user_id": userId,"session_token":sessionId,"start_date":startdate,"end_date":returndate,"pkg_id":packageId, "property_id":ship_travel_id,"ship_travel_id":propertyId,"booking_details":bookingDetails};
    // console.log(body)
    return this.http.post(this.individualAvailabilityCheckApi, body, httpOptions).pipe(map(data => (data)));
  }

  
  homeFetch() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w" };
    return this.http.post(this.homeApi, body, httpOptions).pipe(map(data => (data)));
  }


  getEnquiryType(): Observable<any> {
    return this.http.get(this.enquiryTypeApi).pipe(map(res => res));
  }
  getFaq(): Observable<any> {
    return this.http.get(this.faqApi).pipe(map(res => res));
  }
  
  enquiryTouristAdd(enquirytype:any,firstname:any,lastname:any,email:any,mobile:any,message:any,sourceId:any){
    const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  var body = { "enq_type_id": enquirytype,"enq_first_name":firstname, "enq_last_name":lastname,"enq_email":email,"enq_mobile":mobile, "enq_message":message, "source_id":sourceId };
  // console.log(body)
  return this.http.post(this.enquiryAddApi, body, httpOptions).pipe(map(data => (data)));
  }
  getSourceQuestions(): Observable<any> {
    return this.http.get(this.sourceSelectApi).pipe(map(res => res));
  }

  propertyFetch() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w" };
    return this.http.post(this.propertyFetchApi, body, httpOptions).pipe(map(data => (data)));
  }
  
  reviewCategory(session:any,uid:any,bookingid:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "session_token":session,
        "user_id": `${uid}`, 
        "booking_id":`${bookingid}`
      })
    }
    return this.http.get(this.categoryFetchApi, httpOptions).pipe(map(data => (data)));
  }

  reviewAdd(session:any,uid:any,bookingid:any,ratinglist:any,img_list:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "session_token": session,"user_id": uid,"booking_id": bookingid,"rating_list": ratinglist, "img_list":img_list};
    return this.http.post(this.reviewAddApi, body, httpOptions).pipe(map(data => (data)));
  }
  offetHomeFetch(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
    return this.http.get(this.offerHomeApi, httpOptions).pipe(map(data => (data)));
  }
  passengerAdd(uid:any,session:any,bookingId:any,fullName:any,guardianName:any,gender,dob:any,address:any,city_id:any,nationality:any,countryName:any,foodpreference:any,mobileInfo:any,emailInfo:any,passportInfo:any,secondaryList:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "user_id": uid,"session_token": session,"booking_id":bookingId,"ibd_name": fullName,"ibd_guardian_name":guardianName,"ibd_gender":gender,"ibd_age":dob,"ibd_address":address,"city_id":city_id,"ibd_nationality":nationality,"country_name":countryName,"ibd_food_pref":foodpreference,"ibd_mobile":mobileInfo,"ibd_email":emailInfo,"ibd_passport":passportInfo,"individual_list": secondaryList };
    return this.http.post(this.passengerAddApi, body, httpOptions).pipe(map(data => (data)));
  }
  paymentSamudramFetch(uid:any,session:any,bookingId:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "user_id": uid,"session_token": session,"booking_id":bookingId };
    return this.http.post(this.paymentSamudramApi, body, httpOptions).pipe(map(data => (data)));
  }
  paymentPropertyFetch(uid:any,session:any,bookingId:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "user_id": uid,"session_token": session,"booking_id":bookingId };
    return this.http.post(this.paymentPropertyApi, body, httpOptions).pipe(map(data => (data)));
  }
  newCostDetails(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "property_id": id, "pkg_id":0 };
    return this.http.post(this.newCostApi, body, httpOptions).pipe(map(data => (data)));
  }
  newCostDetailsPackage(shipid: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    var body = { "dtype": "w", "property_id": 0, "pkg_id":shipid };
    return this.http.post(this.newCostApi, body, httpOptions).pipe(map(data => (data)));
  }
}
