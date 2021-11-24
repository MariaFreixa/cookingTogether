import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-mis-recetas',
  templateUrl: './mis-recetas.component.html',
  styleUrls: ['./mis-recetas.component.scss']
})
export class MisRecetasComponent implements OnInit {
  public misRecetas: Recipe[] = [];
  public misRecetasFavoritas: Recipe[] = [];
  //Tablas
  public displayedColumns: string[] = ['id', 'name', 'action'];
  public dataSourceMisRecetas = null;
  public dataSourceMisRecetasFavoritas = null;

  @ViewChild('paginatorMisReceta') paginatorMisReceta: MatPaginator;
  @ViewChild('paginatorMisRecetasFavoritas') paginatorMisRecetasFavoritas: MatPaginator;

  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void { 
    this.getMisRecetas();
    this.getMisRecetasFavoritas();
  }

  getMisRecetas() {
    this.recipeService.getMyRecipes().subscribe((recipes) => {
      this.dataSourceMisRecetas = new MatTableDataSource();  
      this.dataSourceMisRecetas.data = recipes;
      this.dataSourceMisRecetas.paginator = this.paginatorMisReceta;
      this.misRecetas = recipes;
      console.log("Mis recetas: ", recipes);
    });
  }

  getMisRecetasFavoritas() {
    this.recipeService.getFav().subscribe((recipes) => {
      this.dataSourceMisRecetasFavoritas = new MatTableDataSource();  
      this.dataSourceMisRecetasFavoritas.data = recipes;
      this.dataSourceMisRecetasFavoritas.paginator = this.paginatorMisRecetasFavoritas;
      this.misRecetasFavoritas = recipes;
      console.log("mis recetas favoritas: ", recipes);
    });
  }
}
