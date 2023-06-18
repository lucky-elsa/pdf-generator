<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Videos;

class VideoController extends Controller
{
    public function loadvideo(Request $request){
        $data=Videos::Where([
            'type'  =>$request["type"]
        ])->select('value','title','text',"type")->get();
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
                $data
            ]
        ]);
    }
}
