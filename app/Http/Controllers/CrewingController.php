<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Crewings;

class CrewingController extends Controller
{
    public function create(Request $request)
    {   
        Crewings::create([
            "country" => $request->country,
            "company" => $request->company,
            "how" => $request->how
        ]);
        return response()->json(['success' => true, 'message' => 'Successful Saved'], 200);
    }
}