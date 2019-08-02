import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { AuthService } from '../../../services/auth.service';
import * as pbi from 'powerbi-client';
import { UserService } from '../../../services/user.service';
import { NavItem } from 'src/app/shared/models/nav-item.model';

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
    private userService: UserService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('I am called', this.navService.getSelectedNavItem());

      // Set the currently active item in menu so we can place authorization
      this.item = this.navService.getSelectedNavItem();
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
    const accessToken = this.powerBIDetails.EmbedToken.token;
    const groupWorkspaceId = '0335be74-d584-45c2-a82c-19ede3845f5d';
    const embedUrl =
      this.powerBIDetails.EmbedUrl +
      this.powerBIDetails.Id +
      '&groupId=' +
      groupWorkspaceId;
    const embedReportId = this.powerBIDetails.Id;

    const config = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken,
      embedUrl,
      id: embedReportId,
      settings: {}
    };

    const reportContainer = this.reportContainer.nativeElement;
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    const report = powerbi.embed(reportContainer, config);
    report.off('loaded');
    report.on('loaded', () => {
      console.log('Loaded');
    });
    report.on('error', () => {
      this.getPowerBIDetails();
    });
  }

  publishReport() {
    const accessToken = this.powerBIDetails.EmbedToken.token;
    const embedUrl = this.powerBIDetails.EmbedUrl;
    const embedReportId = this.powerBIDetails.Id;

    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    const config = {
      type: 'report',
      tokenType: pbi.models.TokenType.Embed,
      accessToken,
      embedUrl,
      id: embedReportId
      // permissions: '',
      // viewMode:'',
      /* ISettings: {
          filterPaneEnabled: true,
          navContentPaneEnabled: true
      } */
    };

    const reportContainer = document.getElementById(
      'reportContainer'
    ) as HTMLElement;

    // Embed the report and display it within the div container.
    const powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    const report = powerbi.embed(reportContainer, config);
    report.off('loaded');
    report.on('loaded', () => {
      console.log('Loaded');
    });
  }
}
