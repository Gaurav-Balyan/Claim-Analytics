import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { AuthService } from '../../../services/auth.service';
import * as pbi from 'powerbi-client';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  powerBIDetails: any;
  public screenHeight: number;
  @ViewChild('reportContainer', { static: false }) reportContainer: ElementRef;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private navService: NavService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('I am called', this.navService.getReportState());
      console.log('Params changed');
    });
    this.getPowerBIDetails();
    this.screenHeight = window.screen.height;
  }

  getPowerBIDetails() {
    this.userService.powerBIDetails().subscribe(powerBIData => {
      this.powerBIDetails = powerBIData;
      console.log('Login Data details' + JSON.stringify(this.powerBIDetails));
    });
  }

  showReportTest() {
    let accessToken = this.powerBIDetails.EmbedToken.token;
    let groupWorkspaceId = '0335be74-d584-45c2-a82c-19ede3845f5d';
    let embedUrl =
      this.powerBIDetails.EmbedUrl +
      this.powerBIDetails.Id +
      '&groupId=' +
      groupWorkspaceId;
    let embedReportId = this.powerBIDetails.Id;

    let config = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken: accessToken,
      embedUrl: embedUrl,
      id: embedReportId,
      settings: {}
    };
    let reportContainer = this.reportContainer.nativeElement;
    let powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    let report = powerbi.embed(reportContainer, config);
    report.off('loaded');
    report.on('loaded', () => {
      console.log('Loaded');
    });
    report.on('error', () => {
      this.getPowerBIDetails();
    });
  }

  publishReport() {
    let accessToken = this.powerBIDetails.EmbedToken.token;
    let embedUrl = this.powerBIDetails.EmbedUrl;
    let embedReportId = this.powerBIDetails.Id;

    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    let config = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken: accessToken,
      embedUrl: embedUrl,
      id: embedReportId
      // permissions: '',
      //viewMode:'',
      /* ISettings: {
          filterPaneEnabled: true,
          navContentPaneEnabled: true
      } */
    };

    let reportContainer = <HTMLElement>(
      document.getElementById('reportContainer')
    );

    // Embed the report and display it within the div container.
    let powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    let report = powerbi.embed(reportContainer, config);
    report.off('loaded');
    report.on('loaded', function() {
      console.log('Loaded');
    });
  }
}
