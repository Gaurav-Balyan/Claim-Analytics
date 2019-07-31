import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private navService: NavService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log('I am called', this.navService.getReportState());
      console.log('Params changed');
    });
  }
}
