<?php

namespace Database\Seeders;

use Database\Seeders\AllFindsTablesSeeder;
use Database\Seeders\AreasTableSeeder;
use Database\Seeders\LociTableSeeder;
use Database\Seeders\MediaTablesSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\StaticTablesSeeder;
use Database\Seeders\TagTablesSeeder;
use Database\Seeders\UsersTableSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(AreasTableSeeder::class);
        $this->call(LociTableSeeder::class);
        $this->call(StaticTablesSeeder::class);
        $this->call(TagTablesSeeder::class);
        $this->call(AllFindsTablesSeeder::class);
        $this->call(MediaTablesSeeder::class);
    }
}
