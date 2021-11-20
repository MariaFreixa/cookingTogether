<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Recipe;


class RecipeController extends Controller {

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
    $this->middleware('auth:api', ['except' => ['getRecipeById', 'getLatest']]);
    }

    /**
     * Get recipe by id.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRecipeById(Request $request) {
        $recipe = Recipe::findOrFail($request->id);
        $base64 = base64_encode($recipe->main_image);
        $recipe->main_image = $base64;

        return $recipe;
    }

    /**
     * Get latest recipes.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLatest() {
        $recipes = Recipe::latest()->take(5)->get();
        foreach ($recipes as $recipe) {
            $base64 = base64_encode($recipe->main_image);
            $recipe->main_image = $base64;
        }
        return $recipes;
    }
}