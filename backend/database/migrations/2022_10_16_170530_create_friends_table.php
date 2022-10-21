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
    public function up() {
        Schema::create('friends', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('friend_id');
            $table->integer("intimacy")->default(0);
            $table->boolean("favorite")->default(false);
            $table->bigInteger("sent_exp")->default(0);
            $table->bigInteger("received_exp")->default(0);
            $table->timestamps();

            $table->primary(['id', 'friend_id']);
            $table->foreign('id')->references('id')->on('users');
            $table->foreign('friend_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('friends');
    }
};
