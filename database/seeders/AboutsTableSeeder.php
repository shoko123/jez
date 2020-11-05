<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AboutsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/database/seeders/sql/abouts_table_seeder.sql';
        $sql = file_get_contents($path);
        \DB::unprepared($sql);
    }
}
