<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notifications;
use App\Models\Data;
use App\Models\Breshtimes;
use Carbon\Carbon;
use Illuminate\Notifications\Notification;

class NotificationController extends Controller
{
    //
    public function createbreshtime(Request $request){
        $user = auth()->user();
        if ($request['time']==""){
            return response()->json([
                'success'   =>  false
            ]);
        }
        $breshtime=new Breshtimes;
        $breshtime["userid"]=$user->id;
        $breshtime["time"]=$request['time'];
        $breshtime->save();
        return response()->json([
            'success'   =>  true,
        ]);
    }
    public function updatebreshtime(Request $request){
        if ($request['time']==""){
            return response()->json([
                'success'   =>  false
            ]);
        }
        $update['time']=$request['time'];
        $data=Breshtimes::Where([
            'id'  => $request["id"],
        ])->update($update);
        return response()->json([
            'success'   =>  true,
        ]);
    }
    public function invited(Request $request){
        $update['visited']=1;
        $isvisited=Notifications::Where([
            'id'  => $request["index"],
            'visited'=>1
        ])->first();
        if($isvisited){
            return response()->json([
                'success'   =>  false,
            ]);
        }
        $data=Notifications::Where([
            'id'  => $request["index"],
        ])->update($update);
        return response()->json([
            'success'   =>  true,
        ]);
    }
    public function deletebreshtime(Request $request){
        $delete['id']=$request['id'];
        $data=Breshtimes::Where([
            'id'  => $delete["id"],
        ])->delete();
        return response()->json([
            'success'   =>  true,
        ]);
    }
    public function loadbreshtime(Request $request){

        $user = auth()->user();
        $data=Breshtimes::Where([
            'userid'  => $user->id,
        ])->select('id',"time")->orderBy('time')->get();
        return response()->json([
            'success'   =>  true,
            'data'      =>  [
                $data
            ]
        ]);
    }
    public function onlynotification(Request $request){
        $user = auth()->user();
        $count=Notifications::Where([
            'userid'  => $user->id,
            "visited"  => false,
        ])->count();
        $notifications=Notifications::Where([
            'userid'  =>$user->id,
        ])->select('id','date',"time","type","value","visited")->orderBy('date',"DESC")->orderBy('time',"DESC")->paginate(6);
        return response()->json([
            'success'   =>  true,
            'count'      =>  [
                $count
            ],
            'value' =>[
                $notifications
            ]
        ]);

    }
    public function notification(Request $request){
        $user = auth()->user();
        $date = strtotime($request["date"]);
        $time=$request["time"];
        $startbreshtime=Breshtimes::where([
            ['userid',"=",$user->id],
            ["time","<=",$time],
            ['updated_at','<=',Carbon::now()]
        ])->orderby("time","DESC")->first();
        if($startbreshtime){
            $startbreshtime=$startbreshtime['time'];
            $isinvitevbreshcount=Notifications::Where([
                ['userid',"=",$user->id],
                ['date' ,"=", date('Y-m-d',$date)],
                ["time","<=",$time],
                ["time",">=",$startbreshtime],
                ["type","=","1"]
            ])->first();
            if(!$isinvitevbreshcount){
                $currentbresh=Data::Where([
                    ['userid',"=",$user->id],
                    ['date' ,"=", date('Y-m-d',$date)],
                    ["time","<=",$time],
                    ["time",">=",$startbreshtime],
                    ["type","=",1]
                ])->first();
                if(!$currentbresh){
                    $breshnoti=new Notifications;
                    $breshnoti['date'] =$request["date"];
                    $breshnoti['time']=$startbreshtime;
                    $breshnoti['userid']=$user->id;
                    $breshnoti["type"]=1;
                    $breshnoti->save();
                }
            }
        }
        // return response()->json([
        //     'success'   =>  true,
        //     'value' =>[
        //         substr($user->created_at,0,10)
        //     ]
        // ]);
        $selfcheckday = Carbon::parse($date)->diffInDays(Carbon::parse(strtotime(substr($user->created_at,0,10))));
        // dd($selcheckday);
        if($selfcheckday>6&&(($selfcheckday%7)==6)){
            $isinvitevbreshcount=Notifications::Where([
                'userid'  => $user->id,
                'date'  => date('Y-m-d',$date),
                'type' =>"2"
            ])->first();
            if(!$isinvitevbreshcount){
              if(Carbon::parse($time)->format('H')>=20){
                $selfcheck=new Notifications;
                $selfcheck['date'] =$request["date"];
                $selfcheck['time']="20:00:00";
                $selfcheck['userid']=$user->id;
                $selfcheck["type"]=2;
                $selfcheck["value"]="1";
                $selfcheck->save();
              }
            }
        }
        else if($selfcheckday>6&&(($selfcheckday%7)==0)){
            $isinvitevbreshcount=Notifications::Where([
                'userid'  => $user->id,
                'date'  => date('Y-m-d',$date),
                'type' =>"2"
            ])->first();
            if(!$isinvitevbreshcount){
                if(Carbon::parse($time)->format('H')>=4){
                    $selfcheck=new Notifications;
                    $selfcheck['date'] =$request["date"];
                    $selfcheck['time']="08:00:00";
                    $selfcheck['userid']=$user->id;
                    $selfcheck["type"]=2;
                    $selfcheck["value"]="2";
                    $selfcheck->save();
                  }
            }
        }
        else if($selfcheckday>6&&(($selfcheckday%7)==1)){
            $isinvitevbreshcount=Notifications::Where([
                'userid'  => $user->id,
                'date'  => date('Y-m-d',$date),
                'type' =>"2"
            ])->first();
            if(!$isinvitevbreshcount){
                if(Carbon::parse($time)->format('H')>=8){
                    $selfcheck=new Notifications;
                    $selfcheck['date'] =$request["date"];
                    $selfcheck['time']="08:00:00";
                    $selfcheck['userid']=$user->id;
                    $selfcheck["type"]=2;
                    $selfcheck["value"]="3";
                    $selfcheck->save();
                }
            }
        }
        // return response()->json([
        //     'success'   =>  true,
        //     'value' =>[
        //         $currentbresh
        //     ]
        // ]);
        $isinvitevbreshcount=Notifications::Where([
            'userid'  => $user->id,
            'date'  => date('Y-m-d',$date),
            'type' =>"3"
        ])->first();
        if(!$isinvitevbreshcount&&(Carbon::parse($user->created_at)->diffInDays(Carbon::parse($date))!=0)&&(Carbon::parse($time)->format('H')>=8)){
            $count=Data::Where([
                'userid'  => $user->id,
                'date'  => date('Y-m-d', strtotime('-1 day', $date)),
                "type"  => 2,
            ])->count();
            $breshcout=new Notifications;
            $breshcout['date'] =$request["date"];
            $breshcout['time']="08:00:00";
            $breshcout['userid']=$user->id;
            $breshcout["type"]=3;
            $breshcout["value"]=$count;
            $breshcout->save();
        }
        // return response()->json([
        //     'success'   =>  true,
        //     'value' =>[
        //         $selfcheckday
        //     ]
        // ]);

        $count=Notifications::Where([
            'userid'  => $user->id,
            "visited"  => false,
        ])->count();
        $notifications=Notifications::Where([
            'userid'  =>$user->id,
        ])->select('id','date',"time","type","value","visited")->orderBy('date',"DESC")->orderBy('time',"DESC")->paginate(6);
        return response()->json([
            'success'   =>  true,
            'count'      =>  [
                $count
            ],
            'value' =>[
                $notifications
            ]
        ]);
    }
}
