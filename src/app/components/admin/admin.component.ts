import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as pbi from 'powerbi-client';
import {
  service as PBIService,
  IEmbedConfiguration,
  Embed,
  models
} from 'powerbi-client';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  sub: any;
  userNameToShow: string;
  userName1: boolean;
  userName2: boolean;
  userName3: boolean;
  userClaims: any;
  powerBIDetails: any;
  public screenHeight: number;
  @ViewChild('reportContainer', { static: false }) reportContainer: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    /* this.userNameToShow = localStorage.getItem('userName');
    if (this.userNameToShow.includes('shailendra')) {
      this.userName1 = true;
    } else if (this.userNameToShow.includes('girish')) {
      this.userName2 = true;
    } else if (this.userNameToShow.includes('vaibhav')) {
      this.userName3 = true;
    } */
    this.getPowerBIDetails();
    //this.publishReport();
    // this.getAllUserClaims();
    this.screenHeight = window.screen.height;
    // var token = this.powerBIDetails.EmbedToken.tokenId;
    // this.showReportTest(token);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  /* newUI() {
    this.router.navigateByUrl('/overview');
  } */
  getAllUserClaims() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
    });
  }

  getPowerBIDetails() {
    // console.log('Login Data in component' + JSON.stringify(this.userLoginModel));
    this.userService.powerBIDetails().subscribe(powerBIData => {
      //debugger;
      this.powerBIDetails = powerBIData;
      // this.publishReport();
      // sessionStorage.setItem('token', sessiontoken.token);
      // alert(this.sessiontoken);
      console.log('Login Data details' + JSON.stringify(this.powerBIDetails));
    });
  }

  showReportTest() {
    debugger;
    let accessToken = this.powerBIDetails.EmbedToken.token;
    let groupWorkspaceId = '0335be74-d584-45c2-a82c-19ede3845f5d';
    let embedUrl =
      this.powerBIDetails.EmbedUrl +
      this.powerBIDetails.Id +
      '&groupId=' +
      groupWorkspaceId;
    let embedReportId = this.powerBIDetails.Id;
    // Get models. models contains enums that can be used.
    // var models = window['powerbi-client'].models;
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
      // this.powerBIDetails.EmbedToken.tokenId;
    });
  }

  publishReport() {
    debugger;
    // Report's Secured Token
    let accessToken = this.powerBIDetails.EmbedToken.token;

    // Embed URL
    //let embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=ab04a2d0-22d5-435e-9e5a-c68da5cacaa4&groupId=0335be74-d584-45c2-a82c-19ede3845f5d&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVVTLUVBU1QyLUItUFJJTUFSWS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCJ9&uid=h9aslf';

    let embedUrl = this.powerBIDetails.EmbedUrl;
    // Report ID
    let embedReportId = this.powerBIDetails.Id;
    //let groupId = 'ad8538e0-8082-43fb-b04a-47a762419c36';

    // Get models. models contains enums that can be used.
    // let models = window['powerbi-client'].models;

    // Configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
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
    //debugger;

    // Grab the reference to the div HTML element that will host the report.
    let reportContainer = <HTMLElement>(
      document.getElementById('reportContainer')
    );

    // Report.off removes a given event handler if it exists.

    // Embed the report and display it within the div container.
    let powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    let report = powerbi.embed(reportContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off('loaded');

    // Report.on will add an event handler which prints to Log window.
    report.on('loaded', function() {
      console.log('Loaded');
    });
  }

  showReport() {
    window.alert('Showing report on edit mode');

    // Report's Secured Token
    let accessToken =
      'H4sIAAAAAAAEACWWxw6raBKF3-VuaQmToaVekHMymR3xJ5hgMozm3cetWVdSHanOV__542T3Z8rKP3__wVaYENI0L8vOXIsbHi2j4YxHfNHvBQfpfZk7xaDWPCukrHRMXELo2rNQiddoegc8j1GsrWnGOCqLC3S9K1Jgh5yX43wBl03SDeTET7RtYZXvf2xZugisH7XbAom1d2nSJ2KVCxJ5M8g4a2ETQZ97x7HgBoDq6PjOh9mZdsUxaxzlYUETLhtfqqQsl8rvOp1CpvfBnB-GTpn-mMJkDhVkwewmRCBbrAA0WrjEjigpMc7Xx-bkPE9dmkGPde90X1qbvFcxkxd7LayWphCzY-5Eh-wBtB5Pb2MFnOP9Lb4YXZOi2ReCqrQzg0GXBYajLqSqIImMN1w6kXAMeRZZYbVUr8xmKWSSfFDdXnbSpuWjaGB4EETj3jPHr7q474hmByZEG5Hg4VRC3JeVrHTDMIDuvSvsAYFLZeJwexwHfRKK72PC4RSdxlR6Ei76cm-nTiaUXyMbe6lUAflGZCNX7pMVCYNF1lm0U9XhG2Z5wwg3xsif6wi5T84Ze4tppEXgLyHC0G9BGDbkNIhV9jqZ-aWmeYku3m-KUfPLJYNibOCPDeWWqqk60FPY4CQhsr6wgSif6Dsu9Ljrfa4qiUN8dDNLonYlT_zXLwj1HDgX3WM58L2XOjJZZvbTszzpFGz9OnNny82xKsOWhlRPeaiDT3QKfnxQ0XQ-PrTSVdpelXO4HHQqmHgZcdfksxuGVNyjclH0_ZcvPm69AKmo206LkQ5vHELhHsSkX9oeceMoVtkv4PSBEyDjM0CdaCT6UHoe3UoGXT3dc1k5SZ1nnEZfFSQ0tE7QhZrUyIjfnByZ1uyBt-OasC2fWKnGPsAM9DW8Oir2WUQMtNxjgHKTVhaGgfMVX-tEUI3I31tMILPYhvVIgQHZ6GVvE5xmnnzgSsZGcfH0SpZ4jCM0uPhpGH-tWqiEwJSwEvp6ZH1DhUf7nRUirlIP71aCMKKsIDokJ4xlcbST8L3Tf9kto9OCpVmZTUtNgBsuO_NrgIv02_VE5mRcZsvoAdFW2oymoUbOQJP6655UL4SpJ6R7WlJgSbrF4wwoKcp0Ypoh2gEMH-VWIVb2xyK3vCA_bri72jf09bCdq_o4FfJBjpcpZjupu0joCHphKp3wfXgPAgNL35bKm6sBHlsI0RU7zE5dq2zfpHDO9c9sNkhm5N-eA1rPiawd5-Mk4_fR_YZH8fxyBu6tRZV--ODrtrD7JRkK0Rz02mBU66h8OXT4grYB4LGSVrw3kP2cOWGbx1tIGVpjx9OyJPnnnvfchH-q2Zeb9hYIKPhWzV5bvWjEqcmOdY-JkA3epzGA2JydtbTSMm5Ml9t5NUkzEBy86pEQRE78ouZugWSb890JiS5_bJqxbaNit0RaaFKnZuMdGVzDpA2iT4_q_TTCZCpKuCGbGlFMtLEo_rbh2YvMqw0SMkLXUWV7FmTVkg_N9tpQ3Zqm9bDyPJZei08d_W9z3tYt-lwyu4uKTQ0yLLm9FxBQ3rLn7lA0lR9KBB4CHzY1coAfEvjWtfjJqxELXP3OtxaCxrMZ5yOwY5-hSXParrL7dtwKK1gy584d48D6-NeoatPYR8IxqYia2dYPCxi_9OjSvt8DNEmYtUOjzlgCxB1vshg_D3pxl11fl2v6NvI8PLOUiQQ_7zDDMjloNZYpHLxtSYXf7GDO0iFW6Gc0QQuzHmaeqfAG0XaktYWlC4eomf6uKFrtLTF6qjXXxq1xQpI40iqvvJb52AX-nLEEwtI4jiADhRqLpWVnnKxVd7BN_Efcr76heGCGdc3MZF1FPBBKJu2WLnYVpMmFc7d_xJBPV2FFBilIVuy87dbR_tb1fhBx9Ul-dt_Jr1O7-HeVW7a7IOSk9YpyEzoUKz-YvAAKkKrvbriqvutwKqGODjx29p1PMHZ4dZrFaNVz7Enepi1gqEW0Nsr_9qMtu_kFph0ajvNtRD-fxZ4LNCXsWMU7bdaGoNpJmJcZ5jDX-Mr2TfCS7VX65q_9jMv6E-9qe5TJMxUVtvRDxmSl429amaJZUnoiqoRwjRbqBkk-AcVaQ5X6grdgxhWqJlCMPdbzqKWIvQN5JVO2Wk_YyyuoW7Y9d8_wfGVc3foPdQ7KCaShVs0yTDdwTShB9Zg4Yi_RRpSVhie5xovSMBh1-u4JSUQFbFU8EBMRfOMN-3Bx0FWGr9SEAu9sLxmozjX8yQbPhOFKVz3zSkHxvYmlqybo-rNakcZQPxnz9glQ9aBW1yQCPSJKURhP0j1xZhWMmuB_ddFe_PnrD7_c8zbp1f17ZwhQC8GJJh8ZnOEub2s8OjZn1CrkwxnvGz8SQ6qadPuVCNrxmvcpUWduakRjNAXWojz8JSVDA4w8l958CluKo5rH15zdGsa1aQmw5WW2L0R76dZ6vo8CiRQtb0ygV9Hn-6USlB0SjAFAR1ivhLyS_hIZxQe4hE1B4_OQlLwTseetcuPeXusWiFFopoSIeX10gauyT_NOTqwBGTyPCQCsO75DmukFRNeDJDV0gSYCRccjEH7qvbh63NvccGFilsQxzT9RH9MDj5dXzm7iE-c2J8BFyKguZdJsqxvjjs-phrVeHIco5-Meb8fN1zJlqCncW-XWvNywenehdwdMNZZZq6al5z___CvzPTfVooY_lR1UfD_IyUzUnBKz9HhHkuT_z_JaMGbbvlS_tMh0yPzH5OI7okqCxZtQUBE3obMlObgg0wTALbjID1c5BFmTJLxsP0QOJ4qwl9APtOaK-nDMeaoTJ9NgppLr0jOux5bpx60WQ3nLsdVgx-I7zjKN4VqeRSne3v3TIZD1jCqLFih62Dkf0ZdsSSnjNX08QnSxRlziaSs_ZMXavX9LVLNsFrOxMvZzeKf-jLzKAWo2zofImB9QWMmDE6oYjC54RI9gbrEVdJlYYT4yFN0T8HbkDWv7JubV8xNSgrRbWXaYDYUsHwZ_nSvPXB0RIYzuCF2iJncWn0kDM5mfSmdrXoK4PQwLtZk1iuPlLbrTWQwhRkqLq0Ml6hGv-oV4leH1r8z__R_5wAOSwgsAAA==';

    // Embed URL
    //let embedUrl = 'https://app.powerbi.com/reportEmbed?reportId=53bbfad4-5dde-4b10-912e-dd175da0533f&autoAuth=true&ctid=ad8538e0-8082-43fb-b04a-47a762419c36';

    let embedUrl = 'https://app.powerbi.com/reportEmbed'; //?reportId=53bbfad4-5dde-4b10-912e-dd175da0533f&autoAuth=true&ctid=ad8538e0-8082-43fb-b04a-47a762419c36';
    // Report ID
    let embedReportId = 'f6bfd646-b718-44dc-a378-b73e6b528204';
    // let groupId = 'ad8538e0-8082-43fb-b04a-47a762419c36';

    // Get models. models contains enums that can be used.
    let models = window['powerbi-client'].models;

    // Configuration used to describe the what and how to embed.
    // This object is used when calling powerbi.embed.
    // This also includes settings and options such as filters.
    // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
    let config = {
      type: 'report',
      accessToken: accessToken,
      embedUrl: embedUrl,
      id: embedReportId,
      viewMode: models.ViewMode.Edit
      /* ISettings: {
          filterPaneEnabled: true,
          navContentPaneEnabled: true
      } */
    };

    // Grab the reference to the div HTML element that will host the report.
    let reportContainer = <HTMLElement>(
      document.getElementById('reportContainer')
    );

    // Embed the report and display it within the div container.
    let powerbi = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
    debugger;
    let report = powerbi.embed(reportContainer, config);

    // Report.off removes a given event handler if it exists.
    report.off('loaded');

    // Report.on will add an event handler which prints to Log window.
    report.on('loaded', function() {
      console.log('Loaded');
    });
  }
}
