import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import * as pbi from 'powerbi-client';

import { ReportService } from '../../../services/report.service';
import { NavItem } from 'src/app/shared/models/nav-item.model';
import { READ, WRITE, PUBLISH } from 'src/app/shared/constants';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  item: NavItem;
  powerBIDetails: any;
  public screenHeight: number;
  @ViewChild('reportContainer', { static: false }) reportContainer: ElementRef;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private navService: NavService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('I am called', this.navService.getSelectedNavItem());

      // Set the currently active item in menu
      this.item = this.navService.getSelectedNavItem()
      this.getPowerBIDetails(this.item.reportId);
    });
    this.screenHeight = window.screen.height;
  }

  // Fetch the PowerBI report for selected reportId
  getPowerBIDetails(selectedReportId) {
    this.reportService.powerBIDetails(selectedReportId).subscribe(powerBIData => {
      this.powerBIDetails = powerBIData;
      this.showReport(READ);
    });
  }

  showReport(mode) {
    const accessToken = this.powerBIDetails.EmbedToken.token;
    const groupWorkspaceId = '0335be74-d584-45c2-a82c-19ede3845f5d';
    const embedUrl =
      this.powerBIDetails.EmbedUrl +
      this.powerBIDetails.Id +
      '&groupId=' + groupWorkspaceId;
    const embedReportId = this.powerBIDetails.Id;
    let config = {};

    const defConfig = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken,
      embedUrl,
      id: embedReportId,
      settings: {},
      permissions: pbi.models.Permissions.All,
      viewMode: pbi.models.ViewMode.View,
    };

    // Setting config based on authorization status of user
    if (mode === READ) {
      config = {
        ...defConfig
      }
    }
    else if (mode === WRITE) {
      config = {
        ...defConfig,
        permissions: pbi.models.Permissions.All,
        viewMode: pbi.models.ViewMode.Edit
      };
    } else if (mode === PUBLISH) {
      config = {
        ...defConfig,
        permissions: pbi.models.Permissions.All,
        viewMode: pbi.models.ViewMode.Edit
      };
    }

    const reportContainer = this.reportContainer.nativeElement;
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );

    // Reset the container to load the next report
    powerbi.reset(reportContainer);

    // Embed the report in the container here
    const report = powerbi.embed(reportContainer, config);

    // Various handlers for report
    report.off('loaded');
    report.on('loaded', () => {
      console.log('Loaded');
    });
    report.on('error', () => {

    });
  }
}
