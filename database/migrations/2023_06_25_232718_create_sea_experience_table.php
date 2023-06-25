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
        Schema::create('seas', function (Blueprint $table) {
            $table->id();
            $table->string('userId');
            $table->string('vessel');
            $table->string('vessel_type');
            $table->string('rank');
            $table->string('contracts');
            $table->string('contract_duration');
            $table->string('description');
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
        Schema::dropIfExists('seas');
    }
};
