import { NgModule } from '@angular/core';
import { Routes,PreloadAllModules, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AuthGuard } from "./auth.guard";
import { CanDeactivateGuard } from "./can-deactivate-guard.service";
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RefreshComponent } from './refresh/refresh.component';
import { SwipeComponent } from './swipe/swipe.component';
import { SamudramComponent } from './samudram/samudram.component';
import { MyreservationsComponent } from './myreservations/myreservations.component';
import { FindreservationsComponent } from './findreservations/findreservations.component';

import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { IslandListComponent } from './island-list/island-list.component';
import { SingleIslandComponent } from './island-list/single-island/single-island.component';

import { StayingtouristComponent } from './stayingtourist/stayingtourist.component';
import { IndividualpropertyComponent } from './individualproperty/individualproperty.component';
import { PrivatepropertyComponent } from './privateproperty/privateproperty.component';
import { TouristAddComponent } from './tourist-add/tourist-add.component';
import { HistoryDetailsComponent } from './history-details/history-details.component';


import { SearchresultComponent } from './searchresult/searchresult.component';
import { SamudramdetailspageComponent } from './samudramdetailspage/samudramdetailspage.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { IslandPropertyComponent } from './island-property/island-property.component';

import { AboutlakshadweepComponent } from './aboutlakshadweep/aboutlakshadweep.component';
import { PaymentPreviewComponent } from './payment-preview/payment-preview.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { TermsMobileComponent } from './terms-mobile/terms-mobile.component';
import { FaqComponent } from './faq/faq.component';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { FaqMobileComponent } from './faq-mobile/faq-mobile.component';
import { AboutMobileComponent } from './about-mobile/about-mobile.component';
import { OfferPropertyComponent } from './offer-property/offer-property.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { PolicyComponent } from './policy/policy.component';
import { PrivacyMobileComponent } from './privacy-mobile/privacy-mobile.component';


const routes: Routes = [ 
  {
    path:'',
    component:HomeComponent,
  },
  {
    path: 'refresh',    component: RefreshComponent
  },
  {
    path:'confirm/:code',
    component:ConfirmComponent
  },
  {
    path:'faq',
    component:FaqComponent
  },
  {
    path:'privacy/mobile/:options',
    component:PrivacyMobileComponent
  },
  {
    path:'offerDetails',
    component:OfferDetailsComponent
  },

  {
    path:'forgotpassword/:id',
    component:ForgotpasswordComponent
  },
  {
    path:'offerProperty/:id',
    component:OfferPropertyComponent
  },
  {
    path:'attractions/:id',
    component:AttractionsComponent
  },
  

  {
    path:'changepassword',
    component:ChangepasswordComponent,canActivate:[AuthGuard]
  },
  {
    path:'profileupdate',
    component:ProfileEditComponent,canActivate:[AuthGuard]
  },
  {
    path:'profileupdate/:id/:g_id/:j_id',
    component:ProfileEditComponent,canActivate:[AuthGuard]
  },
  {
    path:'paymentSuccess',
    component:PaymentSuccessComponent,canActivate:[AuthGuard]
  },
  {
    path:'swipe',
    component:SwipeComponent
  },
  {
    path:'package/:id',
    component:SamudramComponent
  },
  {
    path:'terms/mobile/:option',
    component:TermsMobileComponent
  },
  {
    path:'faq/mobile',
    component:FaqMobileComponent
  },
  {
    path:'about/mobile',
    component:AboutMobileComponent
  },
  
  
  {
    path:'myreservations',
    component:MyreservationsComponent,canActivate:[AuthGuard]
  }, 
  {
    path:'findreservations',
    component:FindreservationsComponent
  },
  {
    path:'bookingHistory',
    component:BookingHistoryComponent,canActivate:[AuthGuard]
  }, 
  {
    path:'historyDetails/:id',
    component:HistoryDetailsComponent,canActivate:[AuthGuard]
  }, 
  {
    path:'islandList',
    component:IslandListComponent
  }, {
    path:'singleIsland/:id',
    component:SingleIslandComponent
  },
  {
    path:'contact',
    component:ContactUsComponent
  },
  {
    path:'about',
    component:AboutComponent
  },
  {
    path:'islandProperty/:id',
    component:IslandPropertyComponent
  },
   //vishnu
   {
    path: 'property',
    component: StayingtouristComponent
  },
  {
    path: 'packagedetails/:id',
    component: IndividualpropertyComponent
  },
  {
    path: 'packagedetails/:id/:g_id/:j_id',
    component: IndividualpropertyComponent
  },
  {
    path: 'private',
    component: PrivatepropertyComponent
  },
  {
    path: 'result',
    component: SearchresultComponent
  },
  {
    path: 'aboutlakshadweep',
    component: AboutlakshadweepComponent
  },
  {
    path: 'info/:id',
    component: SamudramdetailspageComponent
  },    
  {
    path: 'info/:id/:g_id/:j_id',
    component: SamudramdetailspageComponent
  },                                                    
  {
    path:'touristAdd/:b_id',
    component:TouristAddComponent,canActivate:[AuthGuard],canDeactivate: [CanDeactivateGuard]
  },                                                    
  {
    path:'payment/:mid',
    component:PaymentPreviewComponent,canActivate:[AuthGuard]
  },                                                    
  {
    path:'terms',
    component:PrivacypolicyComponent
  },                                                    
  {
    path:'policy',
    component:PolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
