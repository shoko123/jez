<?php

use App\Models\Scene\MyMedia;
use App\Models\Scene\Scene;
use Illuminate\Database\Seeder;

class MediaTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/database/seeds/sql/media_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);
        
        return;

        /*
        
        //copy files from old to new media system (homemade to media-library)
        $scenes = Scene::with('mymedia')->get();    

        foreach ($scenes as $scene) {
            //build file path
            foreach ($scene->mymedia as $mediaItem) {
                
                $nameFull = str_pad($mediaItem->id, 6, "0", STR_PAD_LEFT) . '.' . $mediaItem->extension;
                $myPath = "app/public/DB/media/full/" . $nameFull;
                $fullPath = storage_path($myPath);
               
                //dd($fullPath);
                $scene
                    ->addMedia($fullPath)
                    ->preservingOriginal()
                    ->toMediaCollection('photo', 'media');
                    
            }
            
        }
        */
        
    }
}
