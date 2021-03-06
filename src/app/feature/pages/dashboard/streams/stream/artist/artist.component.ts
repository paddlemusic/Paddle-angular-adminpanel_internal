import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { apiUrls } from '@app/shared/constants/apiUrls';
import { MEDIATYPES, MEDIA_TYPES, MONTH, MONTHS, YEARS } from '@app/shared/constants/common';
import { RequestService } from '@app/shared/services/request.service';
import { environment } from '@env/environment';
import { StreamModel } from '../models/stream.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnChanges {
  @Input('universityListData') universityListData:any;

  selection = new SelectionModel<any>(true, []);
  totalCount: number = 0;
	pageIndex = 0;
	pageSize = 5;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchKey: string = '';
  typeId:any = 2;
  universityId :any = 0;
  mediaTypeId : any = 1;
  year:any;
  monthId :any;

  // universityListData: any = [];
  MEDIA_TYPES:MEDIATYPES[] = MEDIA_TYPES;
  MONTHS : MONTH[] = MONTHS;
  YEARS = YEARS;

  totalStreaData:any;
  monthStreamData :any;
  streamData : any;
  dataSource: MatTableDataSource<StreamModel>;

  constructor(private requestService: RequestService,
    public _cdr: ChangeDetectorRef) { }

    ngOnChanges(){
      this.universityListData = this.universityListData;
      // console.log("chnages calls:", this.universityListData)
     }

  ngOnInit(): void {
    this.monthId = this.getDate().month + 1;
    this.year = this.getDate().year;
    this.getFilterData()
    // this.getUniverityList()
    
  }


/**
 * Gets monthly stream data
 */
 getMonthlyStreamData(resiterpagination:boolean){
  let params = {
    page : this.pageIndex,
    pageSize : this.pageSize,
    university_id : this.universityId,
    month : this.monthId,
    media_type : 2,//this.mediaTypeId,
    year : this.year,
    time_span : 2, 
  }
    let url:string = environment.baseUrl + apiUrls.getMonthlyStreamData
  this.requestService.get(url , params).subscribe((res:any)=>{
    if(res.status_code == 200 ){
      console.log("REspons is:", res)
      this.totalCount = res.data.count;
      this.monthStreamData = res.data.mediaData;
      this.paginator = new MatPaginator(this.paginator._intl, this._cdr)
      this.setDataSource(this.monthStreamData, resiterpagination);
      
  
      // console.log("Data source:", this.dataSource);
    }
  },(err)=>{
    console.log("Error is:", err);
  })
  
  }

  /**
   * Gets total stream data
   */
  getTotalStreamData(resiterpagination:boolean){
    let params = {
      page : this.pageIndex,
      pageSize : this.pageSize,
      university_id : this.universityId,
      media_type : 2,//this.mediaTypeId,
    time_span : 1, 

    }
      let url:string = environment.baseUrl + apiUrls.getTotalStreamData
      this.requestService.get(url , params).subscribe((res:any)=>{
        if(res.status_code == 200 ){
          console.log("REspons is:", res)
          this.totalCount = res.data.count;
          this.totalStreaData = res.data.mediaData;
          this.paginator = new MatPaginator(this.paginator._intl, this._cdr)
          this.setDataSource(this.totalStreaData, resiterpagination);
          
      
          // console.log("Data source:", this.dataSource);
        }
      },(err)=>{
      console.log("ERror is:", err)
      })
  }



  setDataSource(streamData:any, resiterpagination:boolean){
    this.streamData = this.fillUser(streamData);
		this.dataSource = new MatTableDataSource<StreamModel>(this.streamData);
    // this._cdr.markForCheck();
    if (resiterpagination) {
			this.dataSource.paginator = this.paginator;
			console.log("length is:",this.paginator.length);

		}
    console.log("DAtasource is:",	this.dataSource);
  }


  fillUser(streamData:any) {
		if (streamData.length > 0) {
		  streamData.forEach((data:any, index:number) => {
			data.position = index + 1;
			// data.phone_number = data.phone_number == null ? 'NA' : data.phone_number
				});
		}
		return streamData;
	  }
  /**
   * Gets univerity list
   */
  getUniverityList(): void {

    let url: string = environment.baseUrl + apiUrls.getUniversities;
    let params: any = {
      name: this.searchKey
    }
    console.log("params are:", params)
    this.requestService.get(url, params).subscribe((res: any) => {
      if (res.status_code == 200) {
        console.log("REspons is:", res)
        this.universityListData = res.data.rows;
        console.log("Data source:", this.universityListData);
      }
    }, (err) => {
      console.log("ERror is:", err)
    })
  }



  /**
   * Selects university
   */
  selectUniversity(event:any){
    this.universityId = undefined;
     console.log("Event is:", event.target.value)
     if(event.target.value){
     this.universityId = event.target.value
     }
  }




  /**
   * Selects type
   * @param event 
   */
  selectType(event:any){
    // this.typeId = undefined;
    if(event.target.value){
      // this.year = '';
      // this.monthId = '';
      this.typeId = event.target.value;
   
    }
    console.log("Event is:", event.target.value)
  }

  getFilterData(){
    if(this.typeId == 1){
      this.getMonthlyStreamData(true);
    }
    else if(this.typeId == 2){
      this.getTotalStreamData(true)
    }
  }

  /**
   * Selects media type
   * @param event 
   */
  selectMediaType(event:any){
    // this.mediaTypeId = undefined;
    console.log("Event is:", event.target.value)
    if(event.target.value){
    this.mediaTypeId = event.target.value
    }
 }

 /**
  * Selects year
  * @param event 
  */
 selectYear(event:any){
  //  this.year = undefined;
  console.log("Event is:", event.target.value)
  if(event.target.value){
  this.year = event.target.value
  }
}

selectMonth(event:any){
  // this.monthId = undefined;
 console.log("Event is:", event.target.value)
 if(event.target.value){
 this.monthId = event.target.value
 }
}





/**
 * Gets date
 * @returns  
 */
getDate(){
 let today =  new Date();
 let month = today.getMonth();
 let year = today.getFullYear();
 return {
   month : month,
   year : year
 }
}

/**
 * Pages change
 * @param page 
 */
pageChange(page:any) {
  this.pageIndex = page.pageIndex;
  this.getFilterData()
  // this.getTotalStreamData(false);
  // this.getMonthlyStreamData(false);
}



}
