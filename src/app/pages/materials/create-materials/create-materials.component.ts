import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';


@Component({
	selector: 'app-create-materials',
	templateUrl: './create-materials.component.html',
	styleUrls: ['./create-materials.component.css']
})
export class CreateMaterialsComponent implements OnInit {

	public access_token = '';
	public company_name = '';

	public materials_list: any[];
	public truck_types_list: any[];

	public materialType: any;
	
	public truckType1: any;
	public truckType2: any;
	public truckType3: any;
	public truckType4: any;
	public truckType5: any;
	public truckType6: any;
	public matFees1: any;
	public matFees2: any;
	public matFees3: any;
	public matFees4: any;
	public matFees5: any;
	public matFees6: any;
	

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {

		this.materialType = 0;

		this.truckType1 = 0;
		this.truckType2 = 0;
		this.truckType3 = 0;
		this.truckType4 = 0;
		this.truckType5 = 0;
		this.truckType6 = 0;

		this.matFees1 = 0;
		this.matFees2 = 0;
		this.matFees3 = 0;
		this.matFees4 = 0;
		this.matFees5 = 0;
		this.matFees6 = 0;


		// get company name 
		this.getCompanyName(this.access_token);

		// get truck types 
		this.getTruckTypes(this.access_token);

		// get materials 
		this.getMaterials(this.access_token);
	}

	// get company name
	getCompanyName(token) {
		this.apiServices.getDetailsSetHeader(token).subscribe(
			(res: any) => {
				if (res.status == 'successful') {
					let userType = res.userType;

					switch (userType) {
						case "DUMPUSER":
							this.company_name = res.dumpUser.dumpCompany.companyName;
							break;

						default:
							this.company_name = '';
							break;
					}


				}
			}
		)
	}
	// get truck types
	getTruckTypes(token) {
		this.apiServices.getTruckTypes(token).subscribe(
			(res: any) => {
				console.log(res);
				if( (res.status == "successful") && (res.message == "truck_types")) {
					this.truck_types_list = res.truck_types;
				}
			},

			err => {
				console.log(err);
			}
		)
	}

	// get materials 
	getMaterials(token) {
		this.apiServices.getMaterials(token).subscribe(
			(res: any) => {
				console.log(res);
				if( (res.status == "successful") && (res.message == "material")) {
					this.materials_list = res.material;
				}
			},

			err => {
				console.log(err);
			}
		)
	}

	onSaving() {

		let truck1 = this.truckType1;
		let truck2 = this.truckType2;
		let truck3 = this.truckType3;
		let truck4 = this.truckType4;
		let truck5 = this.truckType5;
		let truck6 = this.truckType6;

		let temp = [];

		if(truck1 !== 0) { let xx = { truckType: { id: truck1 }, fee: this.matFees1 }; temp.push(xx) };
		if(truck2 !== 0) { let xx = { truckType: { id: truck2 }, fee: this.matFees2 }; temp.push(xx) };
		if(truck3 !== 0) { let xx = { truckType: { id: truck3 }, fee: this.matFees3 }; temp.push(xx) };
		if(truck4 !== 0) { let xx = { truckType: { id: truck4 }, fee: this.matFees4 }; temp.push(xx) };
		if(truck5 !== 0) { let xx = { truckType: { id: truck5 }, fee: this.matFees5 }; temp.push(xx) };
		if(truck6 !== 0) { let xx = { truckType: { id: truck6 }, fee: this.matFees6 }; temp.push(xx) };


		const data = {
			material_id: this.materialType,
			mat_fees: temp
		}
		
		this.apiServices.createMaterialFees(data, this.access_token).subscribe(
			(res: any) => {
				console.log(res);

				if((res.status == "successful") && (res.message == "material_fees_created")) {
					alert('Successfully created Material fees');
					this.goToUpdate();
				}
			},
			err => {
				console.log(err);
			}
		)

	}

	goToUpdate() {
		this.router.navigate(['/pages/material/update']);
	}

	

}
