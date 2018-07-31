import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

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
	public material_fees: any[];
	public truck_ids: any[];

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
	public materialName : any;

	// myform: FormGroup;


	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}

	ngOnInit() {

		// this.myform = new FormGroup({
		// 	test_name: new FormControl('', Validators.required)
		// })

		this.materialType = 0;
		this.materialName = "";

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

		
		// get materials 
		this.getMaterials(this.access_token);

		// get truck types 
		this.getTruckTypes(this.access_token);

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
							this.apiServices.altErr('You are not Authorized to go to this page', this.apiServices.logOut());
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
				if ((res.status == "successful") && (res.message == "truck_types")) {

					let temp_trucks = res.truck_types;
					let result = [];
					let t_t_ids = [];


					for (let truck of temp_trucks) {
						result.push(truck);
						t_t_ids.push(truck.id);
						console.log("truck added: " + truck.type);
					}

					this.truck_types_list = result;
					this.truck_ids = t_t_ids;	
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
				if ((res.status == "successful") && (res.message == "material")) {
					this.materials_list = res.material;
				}
			},

			err => {
				console.log(err);
			}
		)
	}

	onSaving() {

		this.materialName = $('#materialName').val();

		if (this.materialName.length == 0) {
			this.apiServices.altErr('Enter a material name', '')
		}
		else {
			let trucks = this.truck_ids;
			let temp = [];

			for (let id of trucks) {
				// get value from form 
				let t_fee = $('#inputFee_' + id).val();

				if (t_fee > 0) {
					let obj = {
						truckType: {
							id: id
						},
						fee: t_fee
					}

					temp.push(obj);
				}
			}

			const data = {
				material_name: this.materialName,
				mat_fees: temp
			}

			console.log("createMaterialFees data: " + data);

			this.apiServices.createMaterialFeesNew(data, this.access_token).subscribe(
				(res: any) => {
					console.log(res);

					if ((res.status == "successful") && (res.message == "material_fees_created")) {
						this.apiServices.altScc('Successfully created Material and fees', null);
					}
				},
				err => {
					console.log(err);
				}
			)
		}

	}

	goToUpdate() {
		this.router.navigate(['/pages/material/update']);
	}

	// get material fees 
	getMaterialFees(type, token) {

		this.apiServices.getMaterialFees(token).subscribe(
			(res: any) => {
				console.log("getMaterialFees: " + res);

				if ((res.status == "successful") && (res.message == "material_fees")) {

					let material_fees = res.material_fees[type];
					let t_t_ids = [];

					for (let mat of material_fees) {
						let t_id = mat.truckType.id;
						t_t_ids.push(t_id);
					}

					if(material_fees != null && material_fees.count > 0){

					}else{
						
					}

					// this.truck_ids = t_t_ids;

					// get the trucks
					//this.getTruckTypes(t_t_ids, token);

				}

			},
			err => {
				console.log(err);
			}
		)
	}

}
