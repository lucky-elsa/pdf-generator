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

    public function getCrewing(Request $request)
    {
        $crewings = Crewings::select('id', "company", "country", "how", "filled", "comment")->orderBy('id')->get();
        var_dump($crewings);
        return response()->json(['success' => true, 'data' => $crewings]);
    }
}