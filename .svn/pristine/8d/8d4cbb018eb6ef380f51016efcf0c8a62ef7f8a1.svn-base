import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loadingSubscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.loadingSubscription = this.loaderService.isLoading.subscribe(
      isLoading => {
        isLoading ? this.spinner.show() : this.spinner.hide();
      }
    );
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
