import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  @Input() src: string;
  @Input() title: string;
  public defaultImage;
  public resourceUrl;
  constructor() {
    if(environment.hasOwnProperty('DEFAULT_IMAGE') && environment.DEFAULT_IMAGE.trim() !== '' ) {
      this.defaultImage = environment.DEFAULT_IMAGE;
    }
    if (environment.hasOwnProperty('RESOURCE_URL') && environment.RESOURCE_URL.trim() !== '') {
      this.resourceUrl = environment.RESOURCE_URL;
    }
  }

  ngOnInit() {
    // Check image src is not from local assets folder
    if(this.src && this.src.indexOf('assets/') == -1) {
      /* In the API response we may get the resourceURL in the src. Hence added the resourceURL in src of image as per the condition*/
      this.src = this.src.startsWith('http') ? this.src : this.resourceUrl.concat(this.src);
    }
  }

  setDefaultImage(event) {
    event.target.src = this.defaultImage;
  }
}
