<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Rating;
use App\Recipe;


class RatingController extends Controller {

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
    $this->middleware('auth:api', ['except' => ['getRating', 'getMoreRated']]);
    }

    /**
     * Get rating for recipes
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRating(Request $request) {
        $recipe = $request->id;
        $sum = DB::table('ratings')->where('id_recipe', '=', $recipe)->avg('rating');
        return $sum;
    }

    public function getMoreRated(Request $request) {
        $recipes = DB::table('ratings')
        ->join('recipes','recipes.id', '=', 'ratings.id_recipe')
        ->distinct('recipes.id')
        ->orderBy('ratings.id_recipe', 'DESC')
        ->take(5)
        ->get(array('recipes.*'));
        
        foreach ($recipes as $recipe) {
            $base64 = base64_encode($recipe->main_image);
            $recipe->main_image = $base64;
        }

        return $recipes;
    }
}