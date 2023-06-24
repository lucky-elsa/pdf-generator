<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('add_crewing', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('company');
            $table->string('how');
            $table->string('country');
            $table->string('comment')->nullable();
            $table->boolean('filled');
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
        Schema::dropIfExists('crewing');
    }
};
