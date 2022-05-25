import { Component, OnInit, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2b4162';
    this.elementRef.nativeElement.ownerDocument.body.style.background = '-webkit-gradient(linear, left top, left 30%, from(#2b4162), to(#12100e)) fixed';
    this.router.navigateByUrl("/dashboard/song");
  }
}
