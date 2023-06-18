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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('userid')->unique();
            $table->string('ticketid')->unique();
            $table->string('name')->nullable();;
            $table->string('midpassword');
            $table->string('password', 255);
            $table->string('clinic_id')->nullable();
            $table->string('LineId')->default('0');
            $table->integer('change')->default(0);
            $table->text("info")->nullable();
            $table->integer("type")->nullable();
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
        Schema::dropIfExists('users');
    }
};
