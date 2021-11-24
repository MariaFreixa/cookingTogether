<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Favorite;
use App\User;


class FavoriteController extends Controller {

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
    $this->middleware('auth:api', ['except' => []]);
    }

    /**
     * Get favorites recipes by user ID
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFav(Request $request) {
        $user = auth()->user();

        $recipes = DB::table('users')
        ->join('favorites', 'favorites.id_user', '=', 'users.id')
        ->join('recipes', 'recipes.id_user', '=', 'users.id')
        ->distinct('recipes.id')
        ->get(array('recipes.*'));

        foreach ($recipes as $recipe) {
            $base64 = base64_encode($recipe->main_image);
            $recipe->main_image = $base64;
        }
        
        return response()->json($recipes);
    }
}