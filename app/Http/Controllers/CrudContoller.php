<?php

namespace App\Http\Controllers;

use App\Models\Marintimes;
use Illuminate\Http\Request;
use App\Models\Documents;
use App\Models\Marintimes as Marin;

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

    public function deleteDocument(Request $request, $id)
    {
        $document = Documents::find($id)->delete();

        return response()->json(['success' => true, 'data' => $document]);
    }

    public function getMarintime(Request $request)
    {
        $marintime = Marin::all();

        return response()->json(['success' => true, 'data' => $marintime]);
    }

    public function addMarintime(Request $request)
    {
        $marintime = Marin::create([
            "userId" => $request->userId,
            "job_title" => $request->job_title,
            "years" => $request->years,
            "vessel_type" => $request->vessel_type,
            "client" => $request->client,
            "employers" => $request->employers
        ]);

        return response()->json(['success' => true, 'data' => $marintime]);
    }

    public function deleteMarintime(Request $request, $id)
    {
        $marintime = Marin::find($id)->delete();

        return response()->json(['success' => true, 'data' => $marintime]);
    }
}