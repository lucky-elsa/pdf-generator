<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;

class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // DB::table('data')->insert([
        //     'date' =>  Carbon::now()->format('Y:m:d'),
        //     "time" =>Carbon::now()->format('H:i:s'),
        //     'type' =>1,
        // ]);
        DB::table('data')->insert([
            'date' =>  Carbon::parse('2022-05-01'),
            "time" =>Carbon::now()->format('H:i:s'),
            'type' =>1,
        ]);
        DB::table('data')->insert([
            'date' =>  Carbon::parse('2022-05-01'),
            "time" =>Carbon::now()->format('H:i:s'),
            'type' =>2,
            "value"=>"スッキリしている"
        ]);
        DB::table('data')->insert([
            'date' =>  Carbon::parse('2022-05-01'),
            "time" =>Carbon::now()->format('H:i:s'),
            'type' =>3,
            "value"=>"1|1"
        ]);
        DB::table('data')->insert([
            'date' =>  Carbon::parse('2022-05-01'),
            "time" =>Carbon::now()->format('H:i:s'),
            'type' =>4,
            "value"=>"image.png|家系ラーメン"
        ]);
        DB::table('data')->insert([
            'date' =>  Carbon::parse('2022-05-01'),
            "time" =>Carbon::now()->format('H:i:s'),
            'type' =>3,
            "value"=>"1|1"
        ]);
        DB::table('data')->insert([
            'date' =>  Carbon::parse('2022-05-01'),
            "time" =>Carbon::now()->format('H:i:s'),
            'type' =>1,
        ]);
        //
    }
}
