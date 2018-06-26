import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-loader',
  templateUrl: './create-loader.component.html',
  styleUrls: ['./create-loader.component.css']
})
export class CreateLoaderComponent implements OnInit {

  public loaderName: any;
	public loaderEmail: any;
	public loaderPhone: any;
	public userName : any;
	public password: any;

  constructor() { }

  ngOnInit() {
  }

}
