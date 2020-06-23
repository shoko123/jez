<?php

use Illuminate\Database\Seeder;
use \Spatie\Tags\Tag;

class TagTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/database/seeds/sql/tags_tables_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);
    }
}
