import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { Complexity } from 'src/app/shared/models/complexity.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { ComplexityService } from 'src/app/shared/services/complexity.service';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.scss']
})
export class CrearRecetaComponent implements OnInit {
  registerForm: FormGroup;
  errors = null;
  public categories: Category[];
  public complexity: Complexity[];

  constructor(public router: Router, public fb: FormBuilder, public recipeService: RecipeService, public categoryService: CategoryService, public complexityService: ComplexityService) {
    this.registerForm = this.fb.group({
      name: [''],
      main_image: [''],
      diners: [''],
      video: [''],
      id_category: [''],
      id_complexity: [''],
      steps: [''],
      ingredients: ['']
    });
  }

  ngOnInit() { 
    this.getData();
  }

  getData() {
    this.categoryService.getAllCategories().subscribe((response: Category[]) => {
      this.categories = response;
    });
    this.complexityService.getAllComplexities().subscribe((response: Complexity[]) => {
      this.complexity = response;
    });
  }

  onSubmit() {
    this.recipeService.newRecipe(this.registerForm.value).subscribe(
      result => {
        console.log(result)
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset()
        this.router.navigate(['cocina']);
      }
    )
  }

}
