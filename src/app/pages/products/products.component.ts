import { Component, inject, ViewChild } from '@angular/core';
import { ProductListComponent } from '../../components/products/product-list/product-list.component';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { FormBuilder, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces';
import { ProductFormComponent } from '../../components/products/product-form/product-form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    ProductFormComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  public productService: ProductService = inject(ProductService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addProductsModal') public addProductsModal: any;
  public fb: FormBuilder = inject(FormBuilder);

  productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    category: ['', Validators.required],
  })

constructor() {
  this.productService.search.page = 1;
  this.productService.getAll();  
}

saveProduct(product: IProduct) {
  this.productService.save(product);
  this.modalService.closeAll();
}

callEdition(product: IProduct) {
  this.productForm.controls['id'].setValue(product.id ? JSON.stringify(product.id)  : '');
  this.productForm.controls['name'].setValue(product.name ? product.name : '');
  this.productForm.controls['description'].setValue(product.description ? product.description : '');
  this.productForm.controls['price'].setValue(product.price ? JSON.stringify(product.price) : '');
  this.productForm.controls['stock'].setValue(product.stock ? JSON.stringify(product.stock) : '');
  this.productForm.controls['category'].setValue(product.category ? JSON.stringify(product.category.id) : '');
  this.modalService.displayModal('md', this.addProductsModal);
}

updateProduct(product: IProduct) {
  this.productService.update(product);
  this.modalService.closeAll();
}

callModalAction() {
  this.productForm.reset();
  this.modalService.displayModal('md', this.addProductsModal)
}
















}

