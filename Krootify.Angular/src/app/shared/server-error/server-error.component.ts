import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  error: any;

  constructor(private router: Router, private elementRef: ElementRef) {
    const navigation = this.router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;
    localStorage.setItem('error', this.error);
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.background = 'black';
  }
}
