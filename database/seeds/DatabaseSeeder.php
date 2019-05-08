<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(AreasTableSeeder::class);
        $this->call(LociTableSeeder::class);
        $this->call(AllFindsTablesSeeder::class);
        $this->call(ImagesTablesSeeder::class);
        $this->call(StaticTablesSeeder::class);
        //$this->call(PotteryBasketsTableSeeder::class);               
        //$this->call(PotterysTableSeeder::class);
        //$this->call(ClaysTableSeeder::class);
        //$this->call(FlintsTableSeeder::class);
        //$this->call(GroundstonesTableSeeder::class);
        //$this->call(FaunasTableSeeder::class);
        //$this->call(FlorasTableSeeder::class);
        //$this->call(GlassesTableSeeder::class);
        //$this->call(MetalsTableSeeder::class);
        //$this->call(TbdsTableSeeder::class);
        //$this->call(FindsTableSeeder::class);      
    }
}
