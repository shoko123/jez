<?php

use Illuminate\Database\Seeder;

class PotteryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path().'/database/seeds/sql/pottery_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);
    }
}
