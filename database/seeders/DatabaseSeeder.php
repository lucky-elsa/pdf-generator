<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'documents' => 'Passport / ID:',
            'maritime' => 'Job title 1',
            'competency' => 'Food Safety and HACPP',
            'medical' => 'OGUK',
            'offshore' => 'Basic Safety Training'
        ]);
        DB::table('categories')->insert([
            'documents' => 'Seaman’s Book',
            'maritime' => 'Job title 2',
            'competency' => 'Onshore Cooks Certificate',
            'medical' => 'Seafarers Medical ',
            'offshore' => 'BOSIET 5700'
        ]);
        DB::table('categories')->insert([
            'documents' => 'VISA',
            'maritime' => '',
            'competency' => '',
            'medical' => '',
            'offshore' => ''
        ]);
    }
}