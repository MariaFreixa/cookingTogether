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
  public user: any;

  constructor(public recipeService: RecipeService, private sanitizer: DomSanitizer, private authStateService: AuthStateService, private token: TokenService) {}

  ngOnInit(): void { 
    this.getData();
  }

  getData() {
    this.authStateService.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });

    this.recipeService.getLatestRecipes().subscribe((recipes) => {
      console.log("last recipes: ", recipes);
      recipes.forEach(element => {
        let objectURL = 'data:image/jpeg;base64,' + element.main_image;
        element.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
      this.recipes = recipes;
      console.log("last recipes: ", recipes);
    });

    if(this.isSignedIn) {
      this.user = JSON.parse(this.token.getUser());
      this.recipeService.getFav(this.user.id).subscribe((recipesFav) => {
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
