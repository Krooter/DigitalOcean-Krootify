import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/main');
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2b4162';
    this.elementRef.nativeElement.ownerDocument.body.style.background = '-webkit-gradient(linear, left top, left 30%, from(#2b4162), to(#12100e)) fixed';
  }
}
