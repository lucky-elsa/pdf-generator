<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Documents;
use App\Models\Marintimes as Marin;
use App\Models\Competency;
use App\Models\Medical;
use App\Models\Offshores;
use App\Models\Seas;
use App\Models\AddInformations;
use App\Models\Personals;

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

    //  Medical Contoller
    public function getMedical(Request $request)
    {
        $medical = Medical::all();

        return response()->json(['success' => true, 'data' => $medical]);
    }

    public function addMedical(Request $request)
    {
        $medical = Medical::create([
            "userId" => $request->userId,
            "name" => $request->name,
            "number" => $request->number,
            "issue_date" => substr($request->issue_date, 0, 10),
            "expiry_date" => substr($request->expiry_date, 0, 10)
        ]);

        return response()->json(['success' => true, 'data' => $medical]);
    }

    public function deleteMedical(Request $request, $id)
    {
        $medical = Medical::find($id)->delete();

        return response()->json(['success' => true, 'data' => $medical]);
    }

    //  Offshore Contoller
    public function getOffshore(Request $request)
    {
        $offshore = Offshores::all();

        return response()->json(['success' => true, 'data' => $offshore]);
    }

    public function addOffshore(Request $request)
    {
        $offshore = Offshores::create([
            "userId" => $request->userId,
            "name" => $request->name,
            "number" => $request->number,
            "issue_date" => substr($request->issue_date, 0, 10),
            "expiry_date" => substr($request->expiry_date, 0, 10)
        ]);

        return response()->json(['success' => true, 'data' => $offshore]);
    }

    public function deleteOffshore(Request $request, $id)
    {
        $offshore = Offshores::find($id)->delete();

        return response()->json(['success' => true, 'data' => $offshore]);
    }

    //  Sea Contoller
    public function getSea(Request $request)
    {
        $seas = Seas::all();

        return response()->json(['success' => true, 'data' => $seas]);
    }

    public function addSea(Request $request)
    {
        $seas = Seas::create([
            "userId" => $request->userId,
            "vessel" => $request->vessel,
            "vessel_type" => $request->vessel_type,
            "rank" => $request->rank,
            "contracts" => $request->contracts,
            "contract_duration" => $request->contract_duration,
            "description" => $request->description
        ]);

        return response()->json(['success' => true, 'data' => $seas]);
    }

    public function deleteSea(Request $request, $id)
    {
        $seas = Seas::find($id)->delete();

        return response()->json(['success' => true, 'data' => $seas]);
    }

    //  Information Contoller
    public function getInfo(Request $request)
    {
        $info = AddInformations::all();

        return response()->json(['success' => true, 'data' => $info]);
    }

    public function addInfo(Request $request)
    {
        $info = AddInformations::create([
            "userId" => $request->userId,
            "languages" => $request->languages,
            "computer" => $request->computer,
            "add_skills" => $request->add_skills
        ]);

        return response()->json(['success' => true, 'data' => $info]);
    }

    public function deleteInfo(Request $request, $id)
    {
        $info = AddInformations::find($id)->delete();

        return response()->json(['success' => true, 'data' => $info]);
    }

    //  Personal Contoller
    public function getPersonal(Request $request)
    {
        $personal = Personals::all();

        return response()->json(['success' => true, 'data' => $personal]);
    }

    public function addPersonal(Request $request)
    {
        $personal = Personals::create([
            "userId" => $request->userId,
            "name" => $request->name,
            "surname" => $request->surname,
            "citizen" => $request->citizen,
            "country" => $request->country,
            "phone" => $request->phone,
            "airport" => $request->airport,
            "email" => $request->email,
            "birthday" => substr($request->birthday, 0, 10),
            "gender" => $request->gender,
            "link" => $request->link
        ]);

        return response()->json(['success' => true, 'data' => $personal]);
    }
}