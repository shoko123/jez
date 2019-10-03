<?php

use Illuminate\Database\Seeder;

class ImagesTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //1
        DB::table('scenes')->insert([
            'description' => 'pottery1',
        ]);

        //2
        DB::table('scenes')->insert([
            'description' => 'pottery2',
        ]);

        //3
        DB::table('scenes')->insert([
            'description' => 'flint1',
        ]);

        //4
        DB::table('scenes')->insert([
            'description' => 'pottery1+pottery2',
        ]);

        //5
        DB::table('scenes')->insert([
            'description' => 'pottery1+flint1',
        ]);

        //6
        DB::table('scenes')->insert([
            'description' => 'stone1',
        ]);

        //7
        DB::table('scenes')->insert([
            'description' => 'stone2',
        ]);

        //8
        DB::table('scenes')->insert([
            'description' => 'stone1+2',
        ]);




        DB::table('sceneables')->insert([
            'scene_id' => 1,
            'sceneable_type' => 'Pottery',
            'sceneable_id' => 1,
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 2,
            'sceneable_type' => 'Pottery',
            'sceneable_id' => 2,
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 3,
            'sceneable_type' => 'Flint',
            'sceneable_id' => 1,
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 4,
            'sceneable_type' => 'Pottery',
            'sceneable_id' => 1,
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 4,
            'sceneable_type' => 'Pottery',
            'sceneable_id' => 2,
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 5,
            'sceneable_type' => 'Pottery',
            'sceneable_id' => 1,
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 5,
            'sceneable_type' => 'Flint',
            'sceneable_id' => 1,
        ]);



        DB::table('sceneables')->insert([
            'scene_id' => 6,
            'sceneable_type' => 'Stone',
            'sceneable_id' => 1,
        ]);
        DB::table('sceneables')->insert([
            'scene_id' => 7,
            'sceneable_type' => 'Stone',
            'sceneable_id' => 2,
        ]);
        DB::table('sceneables')->insert([
            'scene_id' => 8,
            'sceneable_type' => 'Stone',
            'sceneable_id' => 1,
        ]);
        DB::table('sceneables')->insert([
            'scene_id' => 8,
            'sceneable_type' => 'Stone',
            'sceneable_id' => 2,
        ]);
    }
}
