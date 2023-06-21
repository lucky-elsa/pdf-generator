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
    public function login(Request $request)
    {           
        $user = Users::Where([
            'email' => $request->email
        ])->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => trans('auth.user_not_found')
            ]);
        }
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => trans('auth.failed')
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $user->createToken('access_token')->plainTextToken,
                'name' => $user["name"],
                'avatar' => $user["avatar"],
                'id' => $user["id"]
            ]
        ]);
    }
}