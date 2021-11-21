import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  public recipes: Recipe[] = [];
  public isSignedIn: boolean = false;
  public subscription;

  constructor(private route: ActivatedRoute, public recipeService: RecipeService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.subscription = this.route.params.subscribe(params => {
      this.recipeService.getRecipesByCategory(params['id']).subscribe((recipes) => {
        this.recipes = recipes;
        recipes.forEach(element => {
          let objectURL = 'data:image/jpeg;base64,' + element.main_image;
          element.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.recipeService.getRatings(element.id).subscribe((rating) => {
            element.rating = rating;
          })
        });
        this.recipes = recipes;
      });
    });
  }

  //To prevent memory leak
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
