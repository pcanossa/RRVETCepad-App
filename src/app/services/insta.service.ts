import { Injectable } from '@angular/core';
import { CommonAppService } from './common-app.service';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InstaService {

  constructor() { }
}
