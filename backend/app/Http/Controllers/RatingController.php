<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Rating;
use App\User;


class RatingController extends Controller {

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
    $this->middleware('auth:api', ['except' => ['getRating']]);
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
}