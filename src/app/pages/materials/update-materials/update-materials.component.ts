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
	public original_truck_types_list: any[];
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
		this.retrieveAlreadyAddedMaterials(this.access_token);

		this.showBtn = true;

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
					let tempTruckType = res.truck_types;

					let tempFee = [];
					let tempFee2 = [];

					//initializing all truck types with fee 0
					for (let trucker of tempTruckType) {

						let truckFee = {
							truckId :trucker.id,
							type: trucker.type,
							fee : 0,
							feeId : 0
						}
						console.log("add to tempTruckFeeData: ");
						tempFee.push(truckFee);
						
					}

					for (let trucker2 of tempTruckType) {

						let truckFee2 = {
							truckId :trucker2.id,
							type: trucker2.type,
							fee : 0,
							feeId : 0
						}
						console.log("add to tempTruckFeeData: ");
						tempFee2.push(truckFee2);
						
					}

					this.truck_types_list = tempFee;
					this.original_truck_types_list = tempFee2;
					
					
				}
			},

			err => {
				console.log(err);
			}
		)
	}


	// get materials 
	// getMaterials(token) {
	// 	this.apiServices.getMaterials(token).subscribe(
	// 		(res: any) => {
	// 			console.log(res);
	// 			if ((res.status == "successful") && (res.message == "material")) {
	// 				this.materials_list = res.material;
	// 			}
	// 		},

	// 		err => {
	// 			console.log(err);
	// 		}
	// 	)
	// }

	// get already added materials 
	retrieveAlreadyAddedMaterials(token) {
		this.apiServices.geAlreadyAddedMaterials(token).subscribe(
			(res: any) => {
				console.log(res);
				if ((res.status == "successful") && (res.message == "material_fees")) {
					//this.materials_list = res.material_fees;
					let tempMaterials : any = res.material_fees;
					this.materials_list = Object.keys(tempMaterials);

					for (let material of this.materials_list) {
						console.log("material : " + material);
					}

				}
			},

			err => {
				console.log(err);
			}
		)
	}

	// get material fees 
	getMaterialFees(type, token) {

		console.log("onChangeMaterial 2 : " + type);
		
		this.apiServices.getMaterialFees(token).subscribe(
			(res: any) => {
				//console.log(res);

				console.log("onChangeMaterial 333333");

				if((res.status == "successful") && (res.message == "material_fees")) {

					console.log("onChangeMaterial 44444: " + type);

					this.material_fees = res.material_fees[type];	

					//console.log("onChangeMaterial 44444: " + type);

					// for(let feesWithType of this.material_fees) {
					// 	console.log("onChangeMaterial feesWithType: " + feesWithType);
					// }

					let temp = [];
					let tempFee = [];

					// for(let z of this.truck_types_list) {
					// 	console.log("truckFeeData z fee : " + z.fee);
					// 	console.log("truckFeeData z type : " + z.type);
					// 	console.log("truckFeeData z fee id : " + z.feeId);
					// }

					for(let truckFee of this.truck_types_list) {

						
						truckFee.fee = 0;

						for(let x of this.material_fees) {

							if(truckFee.truckId == x.truckType.id){
								truckFee.fee = x.fee;
								truckFee.feeId = x.id;
							
								break;
							}
							
						}

						temp.push(truckFee.feeId);
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
		//this.showBtn = false;

		// get material type
		let matType = this.materialType;

		this.truck_types_list = [];
		this.truck_types_list = this.original_truck_types_list;

		// for(let truck_obj of this.original_truck_types_list) {
		// 	console.log("adding from original array: " + truck_obj.fee)
		// 	this.truck_types_list.push(truck_obj);
		// }
		
		console.log("onChangeMaterial : " + matType);

		this.getMaterialFees(matType, this.access_token);
	}

	onUpdateMatFees() {
		
		let tempArr = [];

		for(let rec of this.record_ids) {
			console.log("onUpdateMatFees :" + rec);
			
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
					
					this.apiServices.altScc('Material Fees updated successfully', null);
					
				}
			},
			err => {
				console.log(err);
			}
		)
	}

	

}
