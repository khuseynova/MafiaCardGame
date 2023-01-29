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
            $table->foreignId('room_id')->nullable()->constrained("room");
            $table->foreignId('character_id')->nullable()->constrained("characters");
            $table->string("firstname",20);
            $table->string("lastname",20);
            $table->string("nickname",40)->unique();
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedInteger('wins');
            $table->unsignedInteger('loses');
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
