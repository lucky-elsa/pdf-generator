<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('videos')->insert([
            'value' =>  "/program/a4.mp4",
            "title" =>" 歯ブラシの持ち方",
            'text'=>"グー持ちで握りこむ持ち方は力が入りやすく、細かい操作が難しいです。ペンを握るような持ち方は、適度な力加減で細かい操作が可能です。",
            'type' =>1,
        ]);
        DB::table('videos')->insert([
            'value' =>  "/program/a3.mp4",
            "title" =>"磨き方",
            'text'=>"歯ブラシの毛先を歯面と垂直に当てます。小さく細かく動かすことで歯と歯の間に毛先が入り込み、歯間の汚れがよく落ちます。1・2本ずつ磨くように意識しましょう。",
            'type' =>1,
        ]);
        DB::table('videos')->insert([
            'value' =>  "/program/a6.mp4",
            "title" =>"前歯 外側",
            'text'=>"前歯は上下半分ずつ磨くように意識しましょう。歯と歯肉の間まで歯ブラシの毛先が当たっていますか？犬歯は丸みがあるので、丸みに沿わせるように角度を変えながら磨きましょう。",
            'type' =>2,
        ]);
        DB::table('videos')->insert([
            'value' =>  "/program/a5.mp4",
            "title" =>"前歯 内側",
            'text'=>"歯ブラシのつま先もしくはかかとを使用して、掻き出すように磨きましょう。歯はアーチ状に並んでいるので、犬歯まで軽く弧を描くように歯ブラシの角度を変えましょう。",
            'type' =>2,
        ]);
        DB::table('videos')->insert([
            'value' =>  "/program/a10.mp4",
            "title" =>"上の奥歯 外側",
            'text'=>"お口は大きく開けず、半開きの状態で頬を緩ませて磨きましょう。歯ブラシの背中側（裏側）で頬を広げるようにして、毛先を歯面に当てましょう。",
            'type' =>3,
        ]);
        DB::table('videos')->insert([
            'value' =>  "/program/a9.mp4",
            "title" =>"下の奥歯 外側",
            'text'=>"お口は大きく開けず、半開きの状態で頬を緩ませて磨きましょう。歯ブラシの背中側（裏側）で頬を広げるようにして、毛先を歯面に当てましょう。",
            'type' =>3,
        ]);
        // 1111111111111111111

        DB::table('videos')->insert([
            'value' =>  "/program/a8.mp4",
            "title" =>"上の奥歯 内側",
            'text'=>"歯の裏側の面と、歯肉との境目に歯ブラシの毛先を当てるように意識します。毛先が歯肉の境目に当たっている感触はありますか？歯ブラシの毛先が噛む面を跨いで当たらないように注意しましょう。",
            'type' =>3,
        ]);
        DB::table('videos')->insert([
            'value' =>  "/program/a7.mp4",
            "title" =>"下の奥歯 内側",
            'text'=>"歯と舌の間に歯ブラシを挿入します。歯の内側の面と、歯肉との境目に歯ブラシの毛先を当てるように意識します。毛先が歯の根元に当たっている感触はありますか？歯ブラシの毛先が内側の面から上へはみ出ないように注意しましょう。",
            'type' =>3,
        ]);
        DB::table('videos')->insert([
            'value' =>  "/program/a2.mp4",
            "title" =>"歯間ブラシ",
            'text'=>"前歯に適したI字型と、奥歯に適したL字型があります。少し抵抗がある程度のものが適正サイズです。1ヶ所5往復を目安に方向を変えながら動かしましょう。",
            'type' =>4,
        ]);
        DB::table('videos')->insert([
            'value' =>  "/program/a1.mp4",
            "title" =>" フロス・糸ようじ",
            'text'=>"糸のみのデンタルフロス、持ち手のついた糸ようじがあります。糸ようじは奥歯に適したY字型と、前歯に適したF字型があります。デンタルフロスは中指に巻き付けます。親指と人差し指で糸の向きを変えながら使用します。フロスを歯に添わせてノコギリのように動かしながら挿入します。歯肉の中に1〜2mm程度入れ込んで汚れを掻き出しましょう。",
            'type' =>4,
        ]);
    }
}
