<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_data', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('userId');
            $table->string('name');
            $table->string('surname');
            $table->string('citizen');
            $table->string('country');
            $table->string('phone');
            $table->string('airport');
            $table->string('email');
            $table->string('birthday');
            $table->string('gender');
            $table->string('link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal_data');
    }
};