<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Adminuser;
use Illuminate\Support\Facades\Hash;
use DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $i = 1;
        DB::table('adminuser')->insert([
            'userid' => 'admin',
            'password' => Hash::make('admin'),
            'clinic_id'=>1
        ]);
        DB::table('adminuser')->insert([
            'userid' => 'admin-tmdu',
            'password' => Hash::make('admin-tmdu'),
            'clinic_id'=>1
        ]);
    }
}
