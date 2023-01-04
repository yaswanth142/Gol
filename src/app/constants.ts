
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { Router, NavigationEnd, Route } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { VariableService } from './variable.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import { Slick } from "ngx-slickjs"
import * as $ from 'jquery';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import { DatePipe } from '@angular/common';
import { PopupService } from './popup.service'
import { summaryFileName } from '@angular/compiler/src/aot/util';


export const constants = {
    apiVersion: 'dfskfhdjkhdfskhk',
    
  }