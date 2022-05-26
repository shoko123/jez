<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $path = base_path() . '/database/seeders/sql/tags/pottery_tags_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/tags/stone_tags_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        // $path = base_path() . '/database/seeders/sql/tags/lithic_tags_seeder.sql';
        // $sql = file_get_contents($path);
        // DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/tags/glass_tags_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/tags/metal_tags_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        // $path = base_path() . '/database/seeders/sql/tags/flora_tags_seeder.sql';
        // $sql = file_get_contents($path);
        // DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/tags/fauna_tags_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/tags/global_tags_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);
    }
}
