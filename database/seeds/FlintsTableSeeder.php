<?php

use Illuminate\Database\Seeder;

class FlintsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/database/seeds/sql/flints_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);
    }
}
