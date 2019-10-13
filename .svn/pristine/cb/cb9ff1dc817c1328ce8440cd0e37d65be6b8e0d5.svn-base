import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ActivatedRoute } from '@angular/router';
import { MatAccordion } from '@angular/material';

import { SecurityService } from '../../services/security.service';
import { LoaderService } from 'src/app/services/loader.service';
import { GlobalErrorHandler } from 'src/app/services/exception-handler/global-error-handler';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {
  panelOpenState = false;
  claimDetails: any;
  clientName: string;
  statusMessage: string;

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
      this.getClaim(decryptedClaimId, decryptedUserId);
    });
  }

  private getClaim(claimId, userId) {
    this.loaderService.show();
    this.reportService.fetchClaimDetail(claimId, userId).subscribe((res: any) => {
      if (res.OK) {
        this.loaderService.hide();
        this.claimDetails = res;
      } else {
        this.loaderService.hide();
        this.statusMessage = res.message;
      }
    }, (error: any) => {
      this.loaderService.hide();
      // this.errorService.handleError(error);
    });
  }
}
