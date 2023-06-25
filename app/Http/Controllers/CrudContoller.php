<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Documents;

class CrudContoller extends Controller
{
    public function getDocuments(Request $request)
    {
        $document = Documents::all();

        return response()->json(['success' => true, 'data' => $document]);
    }

    public function addDocument(Request $request)
    {
        $document = Documents::create([
            "userId" => $request->userId,
            "document_type" => $request->document_type,
            "country" => $request->country,
            "number" => $request->number,
            "issue_date" => substr($request->issue_date, 0, 10),
            "expiration_date" => substr($request->expiration_date, 0, 10)
        ]);

        return response()->json(['success' => true, 'data' => $document]);
    }
}