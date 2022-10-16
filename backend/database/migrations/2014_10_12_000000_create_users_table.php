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
            $table->biginteger('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('avater')->nullable();
            $table->integer('level')->default($value=1);
            $table->biginteger('total_exp')->default($value=0);
            $table->biginteger('balance_exp')->default($value=0);
            $table->timestamp('created_at')->timestamps();
            $table->timestamp('updated_at')->timestamps();
            $table->timestamp('deleted_at')->softDeletes($column = 'deleted_at');
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
