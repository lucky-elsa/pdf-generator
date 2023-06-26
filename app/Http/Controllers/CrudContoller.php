<?php

namespace App\Http\Controllers;

use App\Models\Marintimes;
use Illuminate\Http\Request;
use App\Models\Documents;
use App\Models\Marintimes as Marin;
use App\Models\Competency;

class CrudContoller extends Controller
{
    //  Documents Contoller
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

    //  Marintime Contoller
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

    //  Competency Contoller
    public function getCompetency(Request $request)
    {
        $competency = Competency::all();

        return response()->json(['success' => true, 'data' => $competency]);
    }

    public function addCompetency(Request $request)
    {
        $competency = Competency::create([
            "userId" => $request->userId,
            "name" => $request->name,
            "number" => $request->number,
            "issue_date" => $request->issue_date,
            "expiry_date" => $request->expiry_date
        ]);

        return response()->json(['success' => true, 'data' => $competency]);
    }

    public function deleteCompetency(Request $request, $id)
    {
        $competency = Competency::find($id)->delete();

        return response()->json(['success' => true, 'data' => $competency]);
    }
}