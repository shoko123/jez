<?php

namespace Database\Seeders;

use Database\Seeders\AllFindsTablesSeeder;
use Database\Seeders\AreasTableSeeder;
use Database\Seeders\LociTableSeeder;
use Database\Seeders\MediaTablesSeeder;
use Database\Seeders\PermissionSeeder;
use Database\Seeders\LookupTablesSeeder;
use Database\Seeders\TagTablesSeeder;
use Database\Seeders\UsersTableSeeder;
use Database\Seeders\SpecialistTablesSeeder;
use Database\Seeders\AboutTableSeeder;
//use Database\Seeders\EliotSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(LookupTablesSeeder::class);
        $this->call(AreasTableSeeder::class);
        $this->call(LociTableSeeder::class);
        $this->call(AllFindsTablesSeeder::class);
        $this->call(AboutTableSeeder::class);        
        $this->call(TagTablesSeeder::class);
        $this->call(MediaTablesSeeder::class);
        $this->call(SpecialistTablesSeeder::class);
        //$this->call(EliotSeeder::class);
    }
}
