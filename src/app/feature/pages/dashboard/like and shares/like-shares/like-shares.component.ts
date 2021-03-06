import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { apiUrls } from '@app/shared/constants/apiUrls';
import { RequestService } from '@app/shared/services/request.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-like-shares',
  templateUrl: './like-shares.component.html',
  /* <app-most-liked-album [universityListData] = 'universityListData'></app-most-liked-album>
<app-most-liked-artist [universityListData] = 'universityListData'></app-most-liked-artist> */
  styleUrls: ['./like-shares.component.scss']
})
export class LikeSharesComponent implements OnInit {

  // selection = new SelectionModel<any>(true, []);
  // totalCount: number = 0;
	// pageIndex = 0;
	// pageSize = 10;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchKey: string = '';
  // typeId:any = 2;
  // universityId :any = 0;
  // mediaTypeId : any = 1;
  // year:any;
  // monthId :any;

  universityListData: any = [];
  // MEDIA_TYPES:MEDIATYPES[] = MEDIA_TYPES;
  // MONTHS : MONTH[] = MONTHS;
  // YEARS = YEARS;

  // totalLikeShareData:any;
  // monthLikeShareData :any;
  // dataSource: MatTableDataSource<LikeShareModel>;

  constructor(private requestService: RequestService,
    public _cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.monthId = this.getDate().month + 1;
    // this.year = this.getDate().year;
    // this.getFilterData()
    this.getUniverityList()
    
  }


/**
 * Gets monthly stream data
 */
//  getMonthlyLikeData(resiterpagination:boolean){
//   let params = {
//     page : this.pageIndex,
//     pageSize : this.pageSize,
//     university_id : this.universityId,
//     month : this.monthId,
//     media_type : this.mediaTypeId,
//     year : this.year
//     time_span : 2    
//   }
  //   let url:string = environment.baseUrl + apiUrls.getMonthlyLikeShareData
  // this.requestService.get(url , params).subscribe((res:any)=>{
  //   if(res.status_code == 200 ){
  //     console.log("REspons is:", res)
  //     this.totalCount = res.data.count;
  //     this.monthLikeShareData = res.data.mediaData;
  //     this.paginator = new MatPaginator(this.paginator._intl, this._cdr)
  //     this.setDataSource(this.monthLikeShareData, resiterpagination);
      
  
  //     // console.log("Data source:", this.dataSource);
  //   }
  // },(err)=>{
  //   console.log("Error is:", err);
  // })
  
  // }

  /**
   * Gets total stream data
   */
  /*getTotalLikeShareData(resiterpagination:boolean){
    let params = {
      page : this.pageIndex,
      pageSize : this.pageSize,
      university_id : this.universityId,
      media_type : this.mediaTypeId,
         time_span : 1 
    }
      let url:string = environment.baseUrl + apiUrls.getTotalLikeShareData
      this.requestService.get(url , params).subscribe((res:any)=>{
        if(res.status_code == 200 ){
          console.log("REspons is:", res)
          this.totalCount = res.data.count;
          this.totalLikeShareData = res.data.mediaData;
          this.paginator = new MatPaginator(this.paginator._intl, this._cdr)
          this.setDataSource(this.totalLikeShareData, resiterpagination);
          
      
          // console.log("Data source:", this.dataSource);
        }
      },(err)=>{
      console.log("ERror is:", err)
      })
  }



  setDataSource(streamData:any, resiterpagination:boolean){
    let likeShareData = this.fillUser(streamData);
		this.dataSource = new MatTableDataSource<LikeShareModel>(likeShareData);
    // this._cdr.markForCheck();
    if (resiterpagination) {
			this.dataSource.paginator = this.paginator;
			console.log("length is:",this.paginator.length);

		}
    console.log("DAtasource is:",	this.dataSource);
  }
*/
/*
  fillUser(likeShareData:any) {
		if (likeShareData.length > 0) {
		  likeShareData.forEach((data:any, index:number) => {
			data.position = index + 1;
			// data.phone_number = data.phone_number == null ? 'NA' : data.phone_number
				});
		}
		return likeShareData;
	  }
    */
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
  /*
  selectUniversity(event:any){
    this.universityId = undefined;
     console.log("Event is:", event.target.value)
     if(event.target.value){
     this.universityId = event.target.value
     }
  }
  */




  /**
   * Selects type
   * @param event 
   */

  /* selectType(event:any){
    // this.typeId = undefined;
    if(event.target.value){
      // this.year = '';
      // this.monthId = '';
      this.typeId = event.target.value;
   
    }
    console.log("Event is:", event.target.value)
  } */

 /*  getFilterData(){
    if(this.typeId == 1){
      this.getMonthlyLikeData(true);
    }
    else if(this.typeId == 2){
      this.getTotalLikeShareData(true)
    }
  } */

  /**
   * Selects media type
   * @param event 
   */
/*   selectMediaType(event:any){
    // this.mediaTypeId = undefined;
    console.log("Event is:", event.target.value)
    if(event.target.value){
    this.mediaTypeId = event.target.value
    }
 } */

 /**
  * Selects year
  * @param event 
  */
/*  selectYear(event:any){
  //  this.year = undefined;
  console.log("Event is:", event.target.value)
  if(event.target.value){
  this.year = event.target.value
  }
} */

/* selectMonth(event:any){
  // this.monthId = undefined;
 console.log("Event is:", event.target.value)
 if(event.target.value){
 this.monthId = event.target.value
 }
} */





/**
 * Gets date
 * @returns  
 */
/* getDate(){
 let today =  new Date();
 let month = today.getMonth();
 let year = today.getFullYear();
 return {
   month : month,
   year : year
 }
}
 */
/**
 * Pages change
 * @param page 
 */
/* pageChange(page:any) {
  this.pageIndex = page.pageIndex;
  this.getTotalLikeShareData(false);
  this.getMonthlyLikeData(false);
} */

}
