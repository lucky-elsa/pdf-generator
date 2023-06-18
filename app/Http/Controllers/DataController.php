<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\DataRequest;
use App\Models\Data;

class DataController extends Controller
{
    public function __construct()
    {
        // $user = auth()->user();
        // if($user["name"]==null){
        //     return response()->json([
        //         'success'   =>  false
        //     ]);
        // }
    }
    public function me(Request $request){
        $user = auth()->user();
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
            ]
        ]);
    }

    public function loaddata(Request $request){
        $user = auth()->user();
        $time = strtotime($request["date"]);
        $data=Data::Where([
            'userid'  => $user->id,
            "date"  => date('Y-m-d',$time)
        ])->select('id',"time","type","value")->orderBy('time')->get();
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
                $data
            ]
        ]);
    }
    public function getuserdata(Request $request){
        if($request['page']=='-1'){
            $data=Data::Where([
                'userid'  =>$request["userid"]
            ])->select('id','date',"time","type","value","created_at")->orderBy('date','desc')->orderBy('time','desc')->get();
        }else{
            $data=Data::Where([
                'userid'  =>$request["userid"]
            ])->select('id','date',"time","type","value","created_at")->orderBy('date','desc')->orderBy('time','desc')->paginate(7);
        }
        foreach ($data as &$value) {
            $value['updated_at']=date('Y-m-d H:i',strtotime('+9 hours',strtotime($value['created_at'])));
          }
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
                $data
            ]
        ]);
    }
    public function update(Request $request){
        // return response()->json([
        //     'success'   =>  true,
        //     'data'      =>  [
        //         $request["update"]["id"]
        //     ]
        // ]);
        $update =$request["update"];
        $data=Data::Where([
            'id'  => $update["id"],
        ])->update($update);
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
            ]
        ]);
    }
    public function create(DataRequest $request){
        $user = auth()->user();
        if ($request['time']==""){
            return response()->json([
                'success'   =>  false
            ]);
        }
        $req=$request->validated();
        $data=new Data;
        $data->userid=$user->id;
        $data->date=$req['date'];
        $data->time=$request['time'];
        $data->type=2;
        if (!empty($req['value'])){
            $data->value=$req['value'];
        }
        $data->save();
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
            ]
        ]);
    }
    public function isregister(Request $req){
        $user = auth()->user();
        $isregister=Data::Where([
            'userid'  => $user->id,
            'date'  => $req["date"],
            'type' =>"1"
        ])->first();
        if($isregister){
            return response()->json([
                'success'   =>  true
            ]);
        }
        return response()->json([
            'success'   =>  false
        ]);
    }
    public function createsleep(Request $req){
        $user = auth()->user();
        $data1=new Data;
        $data1->userid=$user->id;
        $data1->date=$req['update'];
        $data1->time=$req['time2'];
        $data1->type=1;
        $data1->value=$req['value'];
        $data1->save();
        $data2=new Data;
        $data2->userid=$user->id;
        $data2->date=$req['date'];
        $data2->time=$req['time1'];
        $data2->type=4;
        $data2->save();
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
            ]
        ]);
    }
    public function logout(Request $request){
        $user = auth()->user();
        $user->tokens()->delete();
        return response()->json('Successfully logged out');
    }
    public function createself(Request $request){
        $user = auth()->user();
        $image =$request->file('image');
        if($image!=null){
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/images/upload/');
            $image->move($destinationPath, $imageName);
            $image->imagePath = $destinationPath . $imageName;
            $imageName="/images/upload/".$imageName;
        }
        else{
            $destinationPath="";
            $imageName="";
        }
        $data=new Data;
        $data->userid=$user->id;
        $data->date=$request['date'];
        $data->time=$request['time'];
        $data->type=5;
        $data->value=$request['value']."|".$imageName;
        $data->save();
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
            ]
        ]);
    }
    public function createfile(Request $request){
        $user = auth()->user();
        if (empty($request['time'])){
            return response()->json([
                'success'   =>  false
            ]);
        }
        $image =$request->file('image');
        if($image!=null){
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/images/upload/');
            $image->move($destinationPath, $imageName);
            $image->imagePath = $destinationPath . $imageName;
            $imageName="/images/upload/".$imageName;
        }
        else{
            $destinationPath="";
            $imageName="";
        }
        $data=new Data;
        $data->userid=$user->id;
        $data->date=$request['date'];
        $data->time=$request['time'];
        $data->type=3;
        $data->value=$request['value']."|".$imageName;
        $data->save();
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
            ]
        ]);
    }
    public function updatemeal(Request $request){
        $image =$request->file('image');
        if($image!=null){
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/images/upload/');
            $image->move($destinationPath, $imageName);
            $image->imagePath = $destinationPath . $imageName;
            $imageName="/images/upload/".$imageName;
        }
        else{
            $imageName=explode("|", $request['value'])[1];
        }
        $value=explode("|", $request['value'])[0]."|".$imageName;
        // return response()->json([
        //     'success'   =>  true,
        //     'data'      =>  [
        //        explode("|", $request['value'])[0]
        //     ]
        // ]);
        $data=Data::Where([
            'id'  => $request["id"],
        ])->update(["time"=>$request['time'],"value"=>$value]);
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
            ]
        ]);
    }
}
