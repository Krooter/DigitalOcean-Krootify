import { Injectable } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  progressCount = 0;

  constructor(private progressService: NgxSpinnerService) { }

  progress(){
    this.progressCount++;
    this.progressService.show(undefined, {
      type: 'ball-clip-rotate',
      fullScreen: true,
      bdColor: "rgba(0, 0, 0, 0.8)",
      size: "medium"
    })
  }

  idle() {
    this.progressCount--;
    if(this.progressCount <= 0){
      this.progressCount = 0;
      this.progressService.hide();
    }
  }
}
