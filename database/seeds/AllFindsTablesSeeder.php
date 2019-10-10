<?php

use Illuminate\Database\Seeder;

class AllFindsTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/database/seeds/sql/stones_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path().'/database/seeds/sql/pottery_baskets_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path().'/database/seeds/sql/pottery_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path().'/database/seeds/sql/lithics_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);   

        $path = base_path().'/database/seeds/sql/fauna_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path().'/database/seeds/sql/shells_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path().'/database/seeds/sql/flora_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path().'/database/seeds/sql/tbds_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path().'/database/seeds/sql/glasses_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        $path = base_path().'/database/seeds/sql/metals_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        
    }
}
