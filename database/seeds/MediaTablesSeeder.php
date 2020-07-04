<?php
use App\Models\Locus;
use App\Models\Finds\Pottery;
use App\Models\Finds\Stone;
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
        $scenes = Scene::with('mymedia', 'sceneables')->get();

        foreach ($scenes as $scene) {
            //build file path
            $item = $scene->sceneables[0];
            $item_type = $item->sceneable_type;
            $item_id = $item->sceneable_id;

            switch ($item_type) {

                case 'Locus':
                    $item = Locus::findOrFail($item_id);
                    break;
                case 'Stone':
                    $item = Stone::findOrFail($item_id);
                    break;
                case 'Pottery':
                    $item = Pottery::findOrFail($item_id);
                    break;
            }
            foreach ($scene->mymedia as $mediaItem) {

                $nameFull = str_pad($mediaItem->id, 6, "0", STR_PAD_LEFT) . '.' . $mediaItem->extension;
                $myPath = "app/public/DB/media/full/" . $nameFull;
                $fullPath = storage_path($myPath);
                $data = (object) ['type' => $item_type, 'id' => $item_id, 'path' => $fullPath];

                //dd($data);
                $item->addMedia($fullPath)
                    ->preservingOriginal()
                    ->toMediaCollection('photo', 'media');
            }

        }
        */
    }
}
