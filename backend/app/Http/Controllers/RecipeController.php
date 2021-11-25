<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use File;
use Validator;
use App\User;
use App\Recipe;
use App\Ingredient;
use App\Step;


class RecipeController extends Controller {

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
    $this->middleware('auth:api', ['except' => ['getRecipeById', 'getLatest', 'getRecipesByCategory']]);
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

    public function getRecipesByCategory(Request $request) {
        $recipes = DB::table('recipes')->where('id_cateogry', '=', $request->id)->get();

        foreach ($recipes as $recipe) {
            $base64 = base64_encode($recipe->main_image);
            $recipe->main_image = $base64;
        }

        return $recipes;
    }

    public function getMyRecipes(Request $request) {
        $user = auth()->user();
        $recipes = DB::table('recipes')->where('id_user', '=', $user->id)->get();

        foreach ($recipes as $recipe) {
            $base64 = base64_encode($recipe->main_image);
            $recipe->main_image = $base64;
        }

        return $recipes;
    }

    public function newRecipe(Request $request) {
        $user = auth()->user();
        $recipe = new Recipe();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'main_image' => 'required',
            'diners' => 'required|numeric|min:1|max:12',
            'video' => 'nullable|string',
            'id_category' => 'numeric|min:1|max:12',
            'id_complexity' => 'numeric|min:1|max:3',
            'ingredients' => 'required',
            'steps' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $files = $request->file('main_image')->getRealPath();
        $image = file_get_contents($files);
        $base64 = base64_encode($image);
        $recipeImage = $base64;

        $name = $request->input('name');
        $diners = $request->input('diners');
        $video = $request->input('video');
        $category = $request->input('id_category');
        $complexity = $request->input('id_complexity');

        $recipe = array('name'=>$name,"main_image"=>$recipeImage,"diners"=>$diners,"video"=>$video, 'id_category'=>$category, 'id_complexity'=>$complexity, 'id_user'=>$user->id);
        $recipeCreate = Recipe::create($recipe);

        $ingredientsArray = (array_values($request->ingredients));

        foreach ($ingredientsArray as $key => $value) {
            $replace = str_replace('{"ingredient":"', "", $ingredientsArray[$key]);
            $replace2 = str_replace('"}', "", $replace);
            $ingredients = array('id_recipe'=>$recipeCreate->id, 'ingredient'=>$replace2);

            Ingredient::create($ingredients);
        }

        $stepsArray = (array_values($request->steps));

        foreach ($request->steps as $key => $value) {
            $replace = str_replace('{"step":"', "", $stepsArray[$key]);
            $replace2 = str_replace('"}', "", $replace);
            $step = array('id_recipe'=>$recipeCreate->id, 'step'=>$replace2);
            
            Step::create($step);
        }
    }
}