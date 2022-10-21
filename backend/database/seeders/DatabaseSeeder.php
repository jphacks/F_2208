<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::create([
            'name' => env("MILLIG_ACCOUNT_NAME"),
            'email' => env("MILLIG_ACCOUNT_EMAIL"),
            'password' => env("MILLIG_ACCOUNT_PASSWORD"),
            'point' => env("MILLIG_ACCOUNT_POINT"),
        ]);
    }
}
