<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChildRequest;
use Illuminate\Support\Facades\Crypt;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;
use App\Models\Videos;
use App\Models\Notifications;
use App\Http\Controllers\LineController;

class ClientAuthController extends Controller
{
    public function loadusers(Request $request)
    {
        $user = auth()->user();
        $data = Users::select('id', "ticketid", "name", "midpassword", "info", "created_at", "change", "type", "userid")->orderBy('id')->get();
        return response()->json([
            'success' => true,
            'data' => [
                $data
            ]
        ]);
    }
    public function searchusers(Request $request)
    {
        if (empty($request["ticketid"])) {
            $data = Users::select('id', "ticketid", "name", "midpassword", "info", "created_at", "type", "userid")->where("name", "like", '%' . $request["name"] . '%')->orderBy('id')->get();
        } else if (empty($request["name"])) {
            $data = Users::select('id', "ticketid", "name", "midpassword", "info", "created_at", "type", "userid")->where("ticketid", "like", '%' . $request["ticketid"] . '%')->orderBy('id')->get();
        } else {
            $data = Users::select('id', "ticketid", "name", "midpassword", "info", "created_at", "updated_at", "type", "userid")->where("name", "like", '%' . $request["name"] . '%')->orwhere("ticketid", "like", '%' . $request["ticketid"] . '%')->orderBy('id')->get();
        }
        return response()->json([
            'success' => true,
            'data' => [
                $data
            ]
        ]);
    }
    public function clientresetname(Request $request)
    {
        if (empty($request['name'])) {
            return response()->json(['success' => false, 'message' => '名前が必要です',], 200);
        }
        if (empty($request['ticketid'])) {
            return response()->json(['success' => false, 'message' => 'チケットIDが必要です'], 200);
        }
        $user = Users::Where([
            ['ticketid', '=', $request['ticketid']],
            ['id', '!=', $request['id']]
        ])->first();
        if ($user) {
            return response()->json(['success' => false, 'message' => 'この診察券番号は既に利用されています。'], 200);
        }
        $update["name"] = $request["name"];
        $update["ticketid"] = $request["ticketid"];
        $data = Users::Where([
            'id' => $request["id"],
        ])->update($update);

        return response()->json(['success' => true], 200);

    }
    public function clientresetInfo(Request $request)
    {
        $update["info"] = $request["info"];
        $data = Users::Where([
            'id' => $request["id"],
        ])->update($update);
        return response()->json(['success' => true], 200);
    }
    public function resettreat(Request $request)
    {
        $user = Users::Where([
            'id' => $request["id"],
        ])->first();
        // dd($user);
        $update["type"] = $request["type"];
        Users::Where([
            'id' => $request["id"],
        ])->update($update);
        $videos = Videos::Where([
            'type' => $request["type"]
        ])->select('value', 'text', 'title')->get();
        foreach ($videos as $value) {
            $breshcout = new Notifications;
            $breshcout['date'] = Carbon::now()->format('Y-m-d');
            $breshcout['time'] = Carbon::now()->format('H:i:s');
            $breshcout['userid'] = $request["id"];
            $breshcout["type"] = 4;
            $breshcout["value"] = $value["title"] . "|" . $value["text"] . "|" . $value["value"];
            $breshcout->save();
        }
        if ($user['LineId'] != "0") {
            (new LineController)->pushmessages($user->LineId, "おすすめのセルフケア動画です。動画を視聴してセルフケアのやり方を確認してください。\nhttp://tmdu-crpe22.jp/client/home/email/");
        }
        return response()->json(['success' => true], 200);
    }
    public function register(Request $request)
    {
        $user = Users::where([
            'email' => $request->email,
            'name' => $request->name
        ])->first();
        if ($user) {
            return response()->json(['success' => false, 'message' => 'User already exists'], 200);
        } else {
            $file = $request->file('image');
            $name = $file->getClientOriginalName();
            $desticationPath = 'avatar';
            $file->move($desticationPath, $name);
            $password = $request->password;

            Users::create([
                "name" => $request->name,
                "surname" => $request->surname,
                "citizen" => $request->citizen,
                "country" => $request->country,
                "airport" => $request->airport,
                "phone" => $request->phone,
                "email" => $request->email,
                "avatar" => $name,
                "birthday" => $request->selectedDate,
                "password" => Hash::make($password)
            ]);
            return response()->json(['success' => true, 'message' => 'Successful Register'], 200);    
        }
        
    }
    public function clientresetpass(Request $request)
    {
        $permitted_chars = 'abcdefghijklmnopqrstuvwxyz';
        $userid = substr(str_shuffle($permitted_chars), 0, 1);
        for (; ; ) {
            $userid = $userid . (string) rand(100000, 999999);
            $user = Users::Where([
                'userid' => $userid
            ])->first();
            if (!$user) {
                break;
            }
        }
        $password = (string) rand(10000000, 99999999);
        $data['password'] = Hash::make($password);
        $data['midpassword'] = $password;
        $data['change'] = 0;
        $data = Users::Where([
            'id' => $request["id"],
        ])->update($data);
        return response()->json(['success' => true, "password" => $password], 200);
    }
    public function resetpass(Request $request)
    {
        $user = auth()->user();
        $password = $request['password'];
        $data['password'] = Hash::make($password);
        $data['change'] = 1;
        $data = Users::Where([
            'id' => $user["id"],
        ])->update($data);
        return response()->json(['success' => true], 200);
    }
    public function login(ChildRequest $request)
    {
        $data = $request->validated();
        $user = Users::Where([
            'userid' => $data['userid']
        ])->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => trans('auth.user_not_found')
            ]);
        }
        if (!Hash::check($data['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => trans('auth.failed')
            ]);
        }
        $res = $user->toArray();
        // if ($user->userid) {
        //     $res['userid'] = new OfficeResource($user->userid);
        // }
        return response()->json([
            'success' => true,
            'data' => [
                'token' => $user->createToken('access_token', ['client'])->plainTextToken,
                'username' => $user["name"],
                'id' => $user["id"],
                'LineId' => $user['LineId'],
                'midpass' => $user['midpassword'],
                'change' => $user['change']
            ]
        ]);
    }
}