import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthStateService } from 'src/app/shared/services/auth-state.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../shared/services/recipe.service';

@Component({
  selector: 'app-ultimas-recetas',
  templateUrl: './ultimas-recetas.component.html',
  styleUrls: ['./ultimas-recetas.component.scss']
})
export class UltimasRecetasComponent implements OnInit {
  public recipes: Recipe[] = [];
  public isSignedIn: boolean = false;

  constructor(public recipeService: RecipeService, private sanitizer: DomSanitizer, private authStateService: AuthStateService, private token: TokenService) {}

  ngOnInit(): void { 
    this.getUserAuthState();
    this.getData();
  }

  getUserAuthState() {
    this.authStateService.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

  getData() {
    this.recipeService.getLatestRecipes().subscribe((recipes) => {
      recipes.forEach(element => {
        let objectURL = 'data:image/jpeg;base64,' + element.main_image;
        element.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.recipeService.getRatings(element.id).subscribe((rating) => {
          element.rating = rating;
        })
      });
      this.recipes = recipes;
      
      console.log("last recipes: ", recipes);
    });

    if(this.isSignedIn) {
      this.recipeService.getFav().subscribe((recipesFav) => {
         recipesFav.forEach((recipeFav) => {
          this.recipes.forEach((recipe) => {
            if(recipe.id == recipeFav.id) {
              recipe.userFavorite = true;
            }
          })
        });
      });
    }
  }
}
