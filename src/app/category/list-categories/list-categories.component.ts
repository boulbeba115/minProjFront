import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/dialog-confirmation/dialog-confirmation.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { ExportExelService } from 'src/app/services/export-exel.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class ListCategoriesComponent implements AfterViewInit {

  categories: Category[];
  displayedColumns: string[] = ["id", "nom", "qte", "created", "updated", "actions"];
  dataSource = new MatTableDataSource();
  isReady: boolean = false;
  sortValue;
  filterValue = "0";
  search: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categoryService: CategoryService, private router: Router, public dialog: MatDialog, @Inject('Window') private window: Window, private exportExelService: ExportExelService) { }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getAllCat();
  }
  getAllCat() {
    this.categoryService.getAll()
      .subscribe(
        data => {
          this.categories = data;
          this.dataSource.data = this.categories
          this.isReady = true;
        },
        error => {
          console.log(error);
        });
  }
  openAddDialog() {
    let dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'cancel')
        return
      if (result != null) {
        this.categoryService.save(result).subscribe(
          response => {
            this.getAllCat();
          },
          error => {
            console.log(error);
          });
      }
    })
  }
  openEditDialog(id) {
    let dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '600px',
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'cancel')
        return
      if (result != null) {
        if (result)
          this.categoryService.save(result).subscribe(
            response => {
              this.getAllCat();
            },
            error => {
              console.log(error);
            });
      }
    })
  }
  deleteEvent(id: any) {
    this.categoryService.delete(id)
      .subscribe(
        response => {
          this.getAllCat();
        },
        error => {
          console.log(error);
        });
  }
  openDialog(id: any) {
    let dialogRef = this.dialog.open(DialogConfirmationComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "confirm") {
        this.deleteEvent(id);
      }
    })
  }
  exportAsPDF() {
    if (this.categories.length < 1)
      return
    let keys = Object.keys(this.categories[0])
    let values = this.categories.map(x => {
      return Object.values(x)
    })
    var doc = new jsPDF();
    doc.text('Category List', 15, 10);
    doc.text((new Date()).toLocaleDateString("en-US"), 170, 10);
    autoTable(doc, {
      theme: 'grid',
      head: [keys],
      body: values,
    })
    doc.save('List_Categories.pdf');
  }
  exportAsExel() {
    this.exportExelService.exportAsExcelFile(this.categories, "List_Categories")
  }
  refresh() {
    this.getAllCat();
  }
  onSearch() {
    let backup = this.categories,
      search = this.search.trim();
    if (search == "") {
      this.dataSource.data = this.categories
      return
    }
    switch (Number.parseInt(this.filterValue)) {
      case 0:
        this.dataSource.data = backup.filter(item =>
          item.id == search
        )
        break;
      case 1:
        this.dataSource.data = backup.filter(item =>
          item.nom == search
        )
        break;
      case 2:
        this.dataSource.data = backup.filter(item =>
          item.createdAt.toString() == search
        )
        break;
      case 3:
        this.dataSource.data = backup.filter(item =>
          item.updatedAt.toString() == search
        )
        break;
      default:
        this.dataSource.data = backup.filter(item =>
          item.id == search
        )
        break;
        break;
    }
  }
  onSort() {
    switch (Number.parseInt(this.sortValue)) {
      case 0:
        this.dataSource.data = this.categories.sort((a, b) => {
          return a.id - b.id;
        })
        break;
      case 1:
        this.dataSource.data = this.categories.sort((a, b) => {
          let nomA = a.nom.toLowerCase(), nomB = b.nom.toLowerCase();
          if (nomA < nomB) return -1;
          if (nomA > nomB) return 1;
          return 0;
        })
        break;
      case 2:
        this.dataSource.data = this.categories.sort((a, b) => {
          let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        })
        break;
      case 3:
        this.dataSource.data = this.categories.sort((a, b) => {
          let dateA = new Date(a.updatedAt), dateB = new Date(b.updatedAt);
          return dateA.getTime() - dateB.getTime();
        })
        break;
      case 4:
        this.getAllCat()
        break;
      default:
        this.getAllCat()
        break;
    }
  }
  onSortType() {
    this.dataSource.data = this.dataSource.data.reverse()
  }

}
