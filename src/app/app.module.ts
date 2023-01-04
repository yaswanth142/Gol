import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import $ from "jquery";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { NgxGalleryModule } from 'ngx-gallery';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ngx-toastr';
import {VariableService} from './variable.service'
import {S3Service} from './s3.service'
import { PopupService } from './popup.service';
import { ConfirmComponent } from './confirm/confirm.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AuthGuard } from "./auth.guard";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";
import { NgxSiemaModule } from 'ngx-siema';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import { ConfirmPassDirective} from './changepass/confirm-pass.directive';
import { ConfirmNewpassDirective } from './newpass/confirm-newpass.directive';
import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
// import { MomentModule } from 'ngx-moment';
// import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
// import {DatepickerModule} from 'ngx-date-picker';
import { NgDatepickerModule } from 'ng2-datepicker';
import { RefreshComponent } from './refresh/refresh.component';
import { NgxSlickJsModule } from "ngx-slickjs";
import { SwipeComponent } from './swipe/swipe.component';
// import { BarRatingModule } from "ngx-bar-rating";
// import { NgxStarRatingModule } from 'ngx-star-rating';
import { NgxStarsModule } from 'ngx-stars';
import {RatingModule} from "ngx-rating";
import { SamudramComponent } from './samudram/samudram.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SamudramTouristDetailsComponent } from './samudram-tourist-details/samudram-tourist-details.component';
import { MyreservationsComponent } from './myreservations/myreservations.component';
import { FindreservationsComponent } from './findreservations/findreservations.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
import { IslandListComponent } from './island-list/island-list.component';
import { SingleIslandComponent } from './island-list/single-island/single-island.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//vishnu
import { StayingtouristComponent } from './stayingtourist/stayingtourist.component';
// import { NgSelectModule } from '@ng-select/ng-select';
import { IndividualpropertyComponent } from './individualproperty/individualproperty.component';
import { PrivatepropertyComponent } from './privateproperty/privateproperty.component';
import { MyDatePickerModule } from 'mydatepicker';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { SamudramdetailspageComponent } from './samudramdetailspage/samudramdetailspage.component';


import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { TouristAddComponent } from './tourist-add/tourist-add.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider,LoginOpt  } from 'angularx-social-login';
import { IslandPropertyComponent } from './island-property/island-property.component';
import { StarRatingModule } from 'angular-star-rating';
import { StickyHeaderComponent } from './stick_header';
import {TooltipModule} from "ngx-tooltip";
import { AboutlakshadweepComponent } from './aboutlakshadweep/aboutlakshadweep.component';
import { PaymentPreviewComponent } from './payment-preview/payment-preview.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { WindowRef } from './payment-preview/WindowRef';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TermsMobileComponent } from './terms-mobile/terms-mobile.component';
import { FaqComponent } from './faq/faq.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { FaqMobileComponent } from './faq-mobile/faq-mobile.component';
import { AboutMobileComponent } from './about-mobile/about-mobile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OfferPropertyComponent } from './offer-property/offer-property.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { PolicyComponent } from './policy/policy.component';
import { PrivacyMobileComponent } from './privacy-mobile/privacy-mobile.component';

const googleLoginOptions:LoginOpt = {
  return_scopes: true,
  enable_profile_selector: true

}

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('509505917551-832va94o8mjj0d6m1417gfrgnclsjoc9.apps.googleusercontent.com',googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('551415472320193')
  },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    ProfileEditComponent,
    ConfirmEqualValidatorDirective,
    ConfirmPassDirective,
    ConfirmNewpassDirective,
    RefreshComponent,
    SwipeComponent,
    SamudramComponent,
    SamudramTouristDetailsComponent,
    MyreservationsComponent,
    FindreservationsComponent,
    BookingHistoryComponent,
    IslandListComponent,
    SingleIslandComponent,
    StayingtouristComponent,
    IndividualpropertyComponent,
    PrivatepropertyComponent,
    TouristAddComponent,
    HistoryDetailsComponent,
    SearchresultComponent,
    SamudramdetailspageComponent,
    ContactUsComponent,
    AboutComponent,
    IslandPropertyComponent,
    StickyHeaderComponent,
    AboutlakshadweepComponent,
    PaymentPreviewComponent,
    PrivacypolicyComponent,
    PaymentSuccessComponent,
    TermsMobileComponent,
    FaqComponent,
    OfferDetailsComponent,
    FaqMobileComponent,
    AboutMobileComponent,
    OfferPropertyComponent,
    AttractionsComponent,
    PolicyComponent,
    PrivacyMobileComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGalleryModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxMyDatePickerModule.forRoot(), 
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    
    Ng2SearchPipeModule,
    NgxSiemaModule.forRoot(),
    BrowserAnimationsModule,
    NgDatepickerModule,
    NgxSlickJsModule.forRoot(),
    NgxStarsModule,
    RatingModule,
    SlickCarouselModule,
    NgSelectModule,
    MyDatePickerModule,
    RxReactiveFormsModule,
    SocialLoginModule,
    StarRatingModule.forRoot(),
    TooltipModule,
    // BarRatingModule,
    // NgxStarRatingModule
    // NgxDaterangepickerMd.forRoot(),
    // MomentModule,
    // NgxMyDatePickerModule.forRoot(),
    // DatepickerModule 
  ],
  providers: [
    ApiService,
    VariableService,
    S3Service,
    PopupService,
    CanDeactivateGuard,
    AuthGuard,
    DatePipe,
    WindowRef ,
    {

    
    provide: AuthServiceConfig,
    useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
