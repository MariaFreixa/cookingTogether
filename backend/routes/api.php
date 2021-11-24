<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    //gestion de usuarios
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('user-profile', 'AuthController@userProfile');
    Route::post('update-avatar-user', 'AuthController@updateAvatarUser');
    Route::post('update-user-profile', 'AuthController@updateProfileUser');
    Route::get('getAvatar/{id}', function ($id) {
        $user = App\User::find($id);
        return response()->make($user->avatar, 200, array(
            'Content-Type' => ('Content-type: image/jpeg')
        ));
    });
    //categorias
    Route::get('categories', 'CategoryController@getAllCategories'); //cogemos todas las categorias
    //recetas
    Route::get('recipe/{id}', 'RecipeController@getRecipeById'); //cogemos la receta por id
    Route::get('latest', 'RecipeController@getLatest'); //cogemos las ultimas recetas 
    Route::get('recipes-category/{id}', 'RecipeController@getRecipesByCategory'); //cogemos las recetas de X categoria
    Route::get('my-recipes', 'RecipeController@getMyRecipes'); //cogemos las recetas creadas por el usuario X
    //favorites
    Route::get('favorites', 'FavoriteController@getFav'); //cogemos las recetas favoritas de X usuario
    //ratings
    Route::get('ratings/{id}', 'RatingController@getRating'); //cogemos las puntuaciones de las recetas
    Route::get('more-rated', 'RatingController@getMoreRated'); //cogemos las recetas más puntuadas
    
});


