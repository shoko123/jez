<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Reader',
            'email' => 'reader@gmail.com',
            'password' => bcrypt('Somanystones'),
        ]);

        DB::table('users')->insert([
            'name' => 'Editor',
            'email' => 'editor@gmail.com',
            'password' => bcrypt('Eatenbydogs'),
        ]);

        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('Scorpionseverywhere'),
        ]);
    }
}
