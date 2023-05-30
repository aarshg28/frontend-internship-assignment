import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from 'src/app/core/services/subjects.service';
import { Router } from '@angular/router';


@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  
  
})


export class TableViewComponent  {
displayActivePage($event: Event) {
throw new Error('Method not implemented.');
}
  @Input() booksList: Book[] = [];
  @Input() subjectName: string = '';
  searchValue : string = "";
  isSearched : boolean = false;
  totalPages : number = 1;
  startIndex : number = 0;
  endIndex : number = 10;

  page:number=1;
  count:number=0;
  
  
  tableSize : number = 10;
  tableSizes : any = [5,10,15,20];


  constructor(
    private router: Router,
    private subjectsService: SubjectsService,
    private route: ActivatedRoute,
    
  ) { }

  goToHome(){
    this.router.navigate(['/']);
  }


  previous(){
    this.startIndex = this.startIndex -10;
    this.endIndex = this.endIndex -10;
  }

  next()
  {
    this.startIndex = this.startIndex + 10;
    this.endIndex = this.endIndex + 10;
  }

  pageIndexed(index : number)
  {
    
      this.startIndex = (index - 1)* 10;
      this.endIndex = this.startIndex + 10;
    
  }

searchTable()
{
  this.isSearched = true;
  this.subjectsService.searchAPI(this.searchValue).subscribe((data) => {
    this.booksList = data?.docs; 
    if(this.booksList.length > 0) 
    {
      this.startIndex = 0;
      this.endIndex = 10;
    }
    this.totalPages = this.booksList.length / 10 + (this.booksList.length % 10 > 0 ? 1 : 0);
    console.log(this.totalPages);
    console.log(this.booksList.length % 10 > 0 ? 1 : 0);
  });
}

clear()
{
  this.isSearched = false;
  this.searchValue = "";
  
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.getAllBooks();
    });
  
}

getAllBooks() {
  this.subjectsService.getAllBooks(this.subjectName).subscribe((data) => {
    this.booksList = data?.works;
    if(this.booksList.length > 0) 
    {
      this.startIndex = 0;
      this.endIndex = 10;
    }
    });
}


onTableDataChange(event :any ){
  this.pageIndexed=event;
  this.searchTable();
}

onTableSizeChange(event :any ):void{
  this.tableSize=event.target.val ;
  this.page=1;
  this.searchTable;
  
}

 
}
