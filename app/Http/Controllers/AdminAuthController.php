<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AdminRequest;
use Illuminate\Support\Facades\Crypt;
use App\Models\Adminuser;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    public function login(AdminRequest $request){
        $data=$request->validated();
        $user=Adminuser::Where([
            'userid'  =>  $data['userid']
        ])->first();
        if (!$user) {
            return response()->json([
                'success'   =>  false,
                'message'   =>  trans('auth.user_not_found')
            ]);
        }
        if (!Hash::check($data['password'], $user->password)) {
            return response()->json([
                'success'   =>  false,
                'message'   =>  trans('auth.failed')
            ]);
        }
        $res = $user->toArray();
        // if ($user->userid) {
        //     $res['userid'] = new OfficeResource($user->userid);
        // }
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
                'token' =>  $user->createToken('access_token',['server'])->plainTextToken,
                'user'  =>  $user
            ]
        ]);
    }
}
