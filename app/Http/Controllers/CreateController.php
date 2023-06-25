<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categories;

class CreateController extends Controller
{
    public function getCategories(Request $request)
    {
        $category = Categories::all();

        return response()->json(['success' => true, 'data' => $category]);
    }
}