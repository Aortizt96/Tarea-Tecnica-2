import { Component, inject, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoryService } from '../../services/category.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from '../../interfaces';
import { CategoryListComponent } from '../../components/categories/category-list/category-list/category-list.component';
import { CategoryFormComponent } from '../../components/categories/category-form/category-form/category-form.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  public categoriesService: CategoryService = inject(CategoryService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addCategoriesModal') public addCategoriesModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
  })

  constructor() {
    this.categoriesService.search.page = 1;
    this.categoriesService.getAll()
  }

  saveCategory(category: ICategory) {
    this.categoriesService.save(category);
    this.modalService.closeAll();
  }

  callEdition(category: ICategory) {
    this.categoryForm.controls['id'].setValue(category.id ? JSON.stringify(category.id) : '');
    this.categoryForm.controls['name'].setValue(category.name ? category.name : '');
    this.categoryForm.controls['description'].setValue(category.description ? category.description : '');
    this.modalService.displayModal('md', this.addCategoriesModal);
  }
  
  updateCategory(order: ICategory) {
    this.categoriesService.update(order);
    this.modalService.closeAll();
  }

  callModalAction() {
    this.categoryForm.reset();
    this.modalService.displayModal('md', this.addCategoriesModal)
  }
}

