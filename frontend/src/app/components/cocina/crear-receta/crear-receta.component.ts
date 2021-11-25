import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public recipeForm: FormGroup;
  public errors = null;
  public editMode = false;
  public id = null;
  public categories: Category[];
  public complexity: Complexity[];
  public selectedImage: any = '';

  constructor(public router: Router, public fb: FormBuilder, public recipeService: RecipeService, public categoryService: CategoryService, public complexityService: ComplexityService) {}

  ngOnInit() { 
    this.getData();
    this.initForm();
  }

  getData() {
    this.categoryService.getAllCategories().subscribe((response: Category[]) => {
      console.log("categories: ", response);
      this.categories = response;
    });
    this.complexityService.getAllComplexity().subscribe((response: Complexity[]) => {
      console.log("complexity: ", response);
      this.complexity = response;
    });
  }

  private initForm() {
    let recipeIngredients = new FormArray([]);
    let steps = new FormArray([]);

    this.recipeForm = this.fb.group({
      'name': ['', [Validators.required]],
      'diners': ['', [Validators.required]],
      'video': ['', [Validators.required]],
      'id_category': ['', [Validators.required]],
      'id_complexity': ['', [Validators.required]],
      'ingredients': recipeIngredients,
      'steps': steps,
      'main_image': []
    });
  }

  onImageChange(event) {
    console.log("event.target.files[0]: ", event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'ingredient': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddStep() {
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormGroup({
        'step': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }

  onSubmit() {
    var recipe = new FormData();
    recipe.append('main_image', this.selectedImage);
    recipe.append('name', this.recipeForm.value.name);
    recipe.append('diners', this.recipeForm.value.diners);
    recipe.append('video', this.recipeForm.value.video);
    recipe.append('id_category', this.recipeForm.value.id_category);
    recipe.append('id_complexity', this.recipeForm.value.id_complexity);
    this.recipeForm.value.ingredients.forEach((ingredient, i) => {
      recipe.append(`ingredients[${i}]`, JSON.stringify(ingredient))
    });

    this.recipeForm.value.steps.forEach((step, i) => recipe.append(`steps[${i}]`, step.step));

    this.recipeService.newRecipe(recipe).subscribe(
      result => {
        console.log(result)
      },
      error => {
        this.errors = error.error;
      },
      () => {
        this.recipeForm.reset()
        this.router.navigate(['cocina']);
      }
    )
  }

}
