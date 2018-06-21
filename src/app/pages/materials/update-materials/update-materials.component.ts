import { Component, OnInit } from '@angular/core';
// import routes
import { Router } from '@angular/router';
// import api services
import { ApiServicesService } from '../../../services/api-services/api-services.service';


@Component({
	selector: 'app-update-materials',
	templateUrl: './update-materials.component.html',
	styleUrls: ['./update-materials.component.css']
})
export class UpdateMaterialsComponent implements OnInit {

	public access_token = '';
	public company_name = '';

	public materials_list: any[];
	public truck_types_list: any[];
	public material_fees: any[];
	public record_ids: any[];

	public materialType: any;
	public showBtn: boolean;

	constructor(
		public router: Router,
		private apiServices: ApiServicesService,

	) {
		this.access_token = localStorage.getItem('access_token')
	}


	ngOnInit() {

		this.materialType = 0;

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
				if ((res.status == "successful") && (res.message == "truck_types")) {
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
				if ((res.status == "successful") && (res.message == "material")) {
					this.materials_list = res.material;
				}
			},

			err => {
				console.log(err);
			}
		)
	}

	// get material fees 
	getMaterialFees(type, token) {
		
		this.apiServices.getMaterialFees(token).subscribe(
			(res: any) => {
				console.log(res);

				if((res.status == "successful") && (res.message == "material_fees")) {

					this.material_fees = res.material_fees[type];	
					console.log(res.material_fees[type]);	

					if(this.material_fees.length > 0) { this.showBtn = true }
					
					let temp = [];
					for(let x of res.material_fees[type]) {
						temp.push(x.id);
					}

					this.record_ids = temp;
					console.log(temp);
				}

			},
			err => {
				console.log(err);	
			}
		)
	}

	onChangeMaterial() {
		// hide btn
		this.showBtn = false;

		// get material type
		let matType = this.materialType;

		if(matType == 0) {
			this.material_fees = [];
		} else {
			this.getMaterialFees(matType, this.access_token);
		}

		
	}

	onUpdateMatFees() {
		
		let tempArr = [];

		for(let rec of this.record_ids) {
			let get_fee = $('#inputFee_' + rec).val();

			let obj = {id: rec, fee: get_fee};
			tempArr.push(obj);
		}

		const data = {
			mat_fees: tempArr
		}

		this.apiServices.updateMaterialFees(data, this.access_token).subscribe(
			(res:any) => {
				console.log(res);
				if((res.status == "successful") && (res.message == "material_fees_updated")){
					alert("Material Fees updated successfully");
					location.reload();
				}
			},
			err => {
				console.log(err);
			}
		)
	}

}
