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
        Schema::create('marintimes', function (Blueprint $table) {
            $table->id();
            $table->string('userId');
            $table->string('job_title');
            $table->string('years');
            $table->string('vessel_type');
            $table->string('client');
            $table->string('employers');
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
        Schema::dropIfExists('marintimes');
    }
};
