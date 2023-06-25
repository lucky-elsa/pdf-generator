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

    public function addCategories(Request $request)
    {
        $category = Categories::create([
            "documents" => $request->documents,
            "maritime" => $request->maritime,
            "competency" => $request->competency,
            "medical" => $request->medical,
            "offshore" => $request->offshore
        ]);

        return response()->json(['success' => true, 'data' => $category]);
    }
}