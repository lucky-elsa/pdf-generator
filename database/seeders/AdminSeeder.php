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
        DB::table('users')->insert([
            'name' => 'admin',
            'surname' => 'admin',
            'email' => 'admin@gmail.com',
            'avatar' => 'admin.png',
            'country' => 'Latvia',
            'citizen' => 'Latvia',
            'phone' => '123456789',
            'birthday' => '1990-01-01',
            'airport' => 'Riga Airport',
            'password' => Hash::make('root123123'),
        ]);
    }
}
