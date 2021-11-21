import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AuthStateService } from 'src/app/shared/services/auth-state.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit {
  public misRecetas: Recipe[] = [];
  public misRecetasFavoritas: Recipe[] = [];
  public isSignedIn: boolean = false;
  public user: any;

  constructor(public recipeService: RecipeService, private sanitizer: DomSanitizer, private authStateService: AuthStateService, private token: TokenService) {}

  ngOnInit(): void { 
    this.getUserAuthState();
    this.getMisRecetas();
    this.getMisRecetasFavoritas();
  }

  getUserAuthState() {
    this.authStateService.userAuthState.subscribe(val => {
      this.isSignedIn = val;
    });
  }

  getMisRecetas() {
    this.recipeService.getLatestRecipes().subscribe((recipes) => {
      recipes.forEach(element => {
        let objectURL = 'data:image/jpeg;base64,' + element.main_image;
        element.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.recipeService.getRatings(element.id).subscribe((rating) => {
          element.rating = rating;
        })
      });
      this.misRecetas = recipes;
      
      console.log("Mis recetas: ", recipes);
    });

    this.mirarRecetaIsFavorita();
  }

  getMisRecetasFavoritas() {
    this.recipeService.getLatestRecipes().subscribe((recipes) => {
      recipes.forEach(element => {
        let objectURL = 'data:image/jpeg;base64,' + element.main_image;
        element.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.recipeService.getRatings(element.id).subscribe((rating) => {
          element.rating = rating;
        })
      });
      this.misRecetasFavoritas = recipes;
      
      console.log("mis recetas favoritas: ", recipes);
    });

    this.mirarRecetaIsFavorita();
  }

  mirarRecetaIsFavorita() {
    if(this.isSignedIn) {
      this.user = JSON.parse(this.token.getUser());
      this.recipeService.getFav(this.user.id).subscribe((recipesFav) => {
         recipesFav.forEach((recipeFav) => {
          this.misRecetas.forEach((recipe) => {
            if(recipe.id == recipeFav.id) {
              recipe.userFavorite = true;
            }
          })
        });
      });
    }
  }
}
