import { Component, computed, EventEmitter, inject, Input,Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from '../../categories/category-list/category-list/category-list.component';
import { CategoryFormComponent } from '../../categories/category-form/category-form/category-form.component';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CategoryListComponent,
    CategoryFormComponent

  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

    public categoriesService: CategoryService = inject(CategoryService);

    constructor() {
      this.categoriesService.search.page = 1;
      this.categoriesService.getAll();
    }

    categories = computed(() => this.categoriesService.categories$());

    @Input() productForm!: FormGroup;
    @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
    @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

    callSave() {
      let selectedCategoryId: number = this.productForm.controls['category'].value;
      let product: IProduct = {
        name: this.productForm.controls['name'].value,
        description: this.productForm.controls['description'].value,
        price: this.productForm.controls['price'].value,
        stock: this.productForm.controls['stock'].value,
        category: { id: selectedCategoryId }
      }
      
      if(this.productForm.controls['id'].value) {
        product.id = this.productForm.controls['id'].value;
      } 
      if(product.id) {
        this.callUpdateMethod.emit(product);
      } else {
       this.callSaveMethod.emit(product);
      }
    }


  }


