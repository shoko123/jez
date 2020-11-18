<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class TagTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/database/seeders/sql/pottery_tags_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/stone_tags_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/lithic_tags_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/glass_tags_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/metal_tags_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/flora_tags_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/fauna_tags_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);

        $path = base_path() . '/database/seeders/sql/period_tags_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);
       
        /*
        $path = base_path() . '/database/seeders/sql/tags_tables_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);
         */

        $path = base_path() . '/database/seeders/sql/taggables_table_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);
    }
}
