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
            'description' => 'locus 13/s/1 (id-48)',
        ]);

        //2
        DB::table('scenes')->insert([
            'description' => 'gs 13/s/1.ar.1 (id-73)',
        ]);

        //3
        DB::table('scenes')->insert([
            'description' => 'gs 13/s/1.ar.2 (id-74)',
        ]);

        //4
        DB::table('scenes')->insert([
            'description' => 'locus 13/s/1 + ar.1 + ar.2',
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 1,
            'sceneable_type' => 'Locus',
            'sceneable_id' => 48,
            'id_string' => '13.S.001',
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 2,
            'sceneable_type' => 'Stone',
            'sceneable_id' => 73,
            'id_string' => '13.S.001.AR.01',
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 3,
            'sceneable_type' => 'Stone',
            'sceneable_id' => 74,
            'id_string' => '13.S.004.AR.02',
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 4,
            'sceneable_type' => 'Locus',
            'sceneable_id' => 48,
            'id_string' => '13.S.001',
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 4,
            'sceneable_type' => 'Stone',
            'sceneable_id' => 73,
            'id_string' => '13.S.001.AR.01',
        ]);

        DB::table('sceneables')->insert([
            'scene_id' => 4,
            'sceneable_type' => 'Stone',
            'sceneable_id' => 74,
            'id_string' => '13.S.001.AR.02',
        ]);
        DB::table('images')->insert([
            'scene_id' => 1,
            'image_no' => 1,
            'extension' => "jpeg",
        ]);
        DB::table('images')->insert([
            'scene_id' => 1,
            'image_no' => 2,
            'extension' => "jpeg",
        ]);
        DB::table('images')->insert([
            'scene_id' => 2,
            'image_no' => 1,
            'extension' => "jpeg",
        ]);

        DB::table('images')->insert([
            'scene_id' => 2,
            'image_no' => 2,
            'extension' => "jpeg",
        ]);

        DB::table('images')->insert([
            'scene_id' => 4,
            'image_no' => 1,
            'extension' => "jpeg",
        ]);
        DB::table('images')->insert([
            'scene_id' => 4,
            'image_no' => 2,
            'extension' => "jpeg",
        ]);
        DB::table('images')->insert([
            'scene_id' => 4,
            'image_no' => 3,
            'extension' => "jpeg",
        ]);

    }
}
