import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AnimaisAppService } from './services/animais-app.service';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxScannerQrcodeModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [AnimaisAppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
