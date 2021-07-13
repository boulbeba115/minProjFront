import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/dialog-confirmation/dialog-confirmation.component';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { ExportExelService } from 'src/app/services/export-exel.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class ProductListComponent implements AfterViewInit {

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute,
    public dialog: MatDialog, @Inject('Window') private window: Window,
    private exportExelService: ExportExelService) { }

  products: Product[];
  displayedColumns: string[] = ["id", "nom", "qte", "category", "availability", "created", "updated", "actions"];
  dataSource = new MatTableDataSource();
  isReady: boolean = false;
  sortValue;
  filterValue = "0";
  search: string = "";
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    if (this.route.snapshot.params.id) {
      this.productService.getAllByCat(this.route.snapshot.params.id)
        .subscribe(
          data => {
            this.products = data;
            this.dataSource.data = this.products
            this.isReady = true;
          },
          error => {
            console.log(error);
          });
      return
    }
    this.productService.getAll()
      .subscribe(
        data => {
          this.products = data;
          this.dataSource.data = this.products
          this.isReady = true;
        },
        error => {
          console.log(error);
        });

  }
  openAddDialog() {
    let dialogRef = this.dialog.open(AddProductComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'cancel')
        return
      if (result != null) {
        this.productService.save(result).subscribe(
          response => {
            this.getAllProducts();
          },
          error => {
            console.log(error);
          });
      }
    })
  }
  openEditDialog(id) {
    let dialogRef = this.dialog.open(EditProductComponent, {
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
          this.productService.edit(result).subscribe(
            response => {
              this.getAllProducts();
            },
            error => {
              console.log(error);
            });
      }
    })
  }
  deleteEvent(id: any) {
    this.productService.delete(id)
      .subscribe(
        response => {
          this.getAllProducts();
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
    if (this.products.length < 1)
      return
    let keys = Object.keys(this.products[0])
    let values = this.products.map(x => {
      return Object.values(x)
    })
    var doc = new jsPDF();
    doc.text('Products List', 15, 10);
    doc.text((new Date()).toLocaleDateString("en-US"), 170, 10);
    autoTable(doc, {
      theme: 'grid',
      head: [keys],
      body: values,
    })
    doc.save('Products_list.pdf');
  }
  exportAsExel() {
    this.exportExelService.exportAsExcelFile(this.products, "Products_list")
  }
  refresh() {
    this.getAllProducts();
  }
  onSearch() {
    let backup = this.products,
      search = this.search.trim();
    if (search == "") {
      this.dataSource.data = this.products
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
      case 4:
        this.dataSource.data = backup.filter(item =>
          item.category.nom == search
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
        this.dataSource.data = this.products.sort((a, b) => {
          return a.id - b.id;
        })
        break;
      case 1:
        this.dataSource.data = this.products.sort((a, b) => {
          let nomA = a.nom.toLowerCase(), nomB = b.nom.toLowerCase();
          if (nomA < nomB) return -1;
          if (nomA > nomB) return 1;
          return 0;
        })
        break;
      case 2:
        this.dataSource.data = this.products.sort((a, b) => {
          let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
          return dateA.getTime() - dateB.getTime();
        })
        break;
      case 3:
        this.dataSource.data = this.products.sort((a, b) => {
          let dateA = new Date(a.updatedAt), dateB = new Date(b.updatedAt);
          return dateA.getTime() - dateB.getTime();
        })
        break;
      case 4:
        this.getAllProducts()
        break;
      default:
        this.getAllProducts()
        break;
    }
  }
  onSortType() {
    this.dataSource.data = this.dataSource.data.reverse()
  }
}
