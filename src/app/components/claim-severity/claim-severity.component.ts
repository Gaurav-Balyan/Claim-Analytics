import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ActivatedRoute } from '@angular/router';

import { SecurityService } from 'src/app/services/security.service';
import { LoaderService } from 'src/app/services/loader.service';
import { GlobalErrorHandler } from 'src/app/services/exception-handler/global-error-handler';
import { MatSliderModule } from '@angular/material/slider';


@Component({
  selector: 'app-claim-severity',
  templateUrl: './claim-severity.component.html',
  styleUrls: ['./claim-severity.component.css']
})
export class ClaimSeverityComponent implements OnInit {
  claimNumber: any;
  claimDetail: any;
  claimantDetail: any;
  claimSeverity: any;
  restrictedDrugAlert: any;
  statusMessage: string;
  matSlider: string;

  constructor(private reportService: ReportService,
              private activatedRoute: ActivatedRoute,
              private securityService: SecurityService,
              private loaderService: LoaderService,
              private errorService: GlobalErrorHandler
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      // Decrypt the parameters from the URL after converting the value using atob(ASCII to Binary)
      const decryptedClaimId = this.securityService.decrypt(atob(params.claimId));
      const decryptedUserId = this.securityService.decrypt(atob(params.userId));
      this.getSeverityClaim(decryptedClaimId, decryptedUserId);
    });
  }

  private getSeverityClaim(claimId, userId) {
    this.loaderService.show();
    this.reportService.fetchSeverityClaimDetail(claimId, userId).subscribe((res: any) => {
      if (res.OK) {
        this.statusMessage = '';
        this.claimNumber = res.claimnumber;
        this.claimDetail = res.ClaimDetail;
        this.claimSeverity = res.ClaimSeverity;
        this.claimantDetail = res.ClaimantDetail;
        this.restrictedDrugAlert = res.RestrictedDrugAlert;

      } else {
        this.loaderService.hide();
        this.statusMessage = res.message;
      }
      this.loaderService.hide();
    }, (error: any) => {
      this.loaderService.hide();
    });
  }
}
