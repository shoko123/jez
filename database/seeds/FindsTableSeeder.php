<?php

use Illuminate\Database\Seeder;

class FindsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/database/seeds/sql/finds_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);
    }
}
