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
        Tag::findOrCreate('Basalt-vesicular', 'Stone:Material');
        Tag::findOrCreate('Basalt-dense', 'Stone:Material');
        Tag::findOrCreate('Scoria', 'Stone:Material');
        Tag::findOrCreate('Pumice', 'Stone:Material');
        Tag::findOrCreate('Limestone', 'Stone:Material');
        Tag::findOrCreate('Chalk', 'Stone:Material');
        Tag::findOrCreate('Flint/Chert', 'Stone:Material');
        Tag::findOrCreate('Sandstone', 'Stone:Material');
        Tag::findOrCreate('Granite', 'Stone:Material');
        Tag::findOrCreate('Unknown', 'Stone:Material');
        Tag::findOrCreate('Tbd', 'Stone:Material');

        Tag::findOrCreate('Pebble', 'Stone:Source');
        Tag::findOrCreate('Bedrock', 'Stone:Source');
        Tag::findOrCreate('Field or Quarry', 'Stone:Source');

        Tag::findOrCreate('Complete', 'Stone:Preservation');
        Tag::findOrCreate('Incomplete', 'Stone:Preservation');
        Tag::findOrCreate('Fragment', 'Stone:Preservation');

        Tag::findOrCreate('Nodule', 'Stone:Life-stage');
        Tag::findOrCreate('Blank', 'Stone:Life-stage');
        Tag::findOrCreate('Debitage', 'Stone:Life-stage');
        Tag::findOrCreate('Unfinished', 'Stone:Life-stage');
        Tag::findOrCreate('Unused', 'Stone:Life-stage');
        Tag::findOrCreate('Intentional-breakage', 'Stone:Life-stage');
        Tag::findOrCreate('Fire-cracked', 'Stone:Life-stage');

        Tag::findOrCreate('Flaking', 'Stone:Production');
        Tag::findOrCreate('Abrading', 'Stone:Production');
        Tag::findOrCreate('Pounding', 'Stone:Production');
        Tag::findOrCreate('Grinding', 'Stone:Production');
        Tag::findOrCreate('Smoothing', 'Stone:Production');
        Tag::findOrCreate('Incising', 'Stone:Production');
        Tag::findOrCreate('Drilling', 'Stone:Production');
        Tag::findOrCreate('Engraving', 'Stone:Production');

        Tag::findOrCreate('Grinding', 'Stone:Use');
        Tag::findOrCreate('Pounding', 'Stone:Use');
        Tag::findOrCreate('Chopping', 'Stone:Use');
        Tag::findOrCreate('Crushing', 'Stone:Use');
        Tag::findOrCreate('Cutting', 'Stone:Use');
        Tag::findOrCreate('Incising', 'Stone:Use');
        Tag::findOrCreate('Drilling', 'Stone:Use');
        Tag::findOrCreate('Wear-light', 'Stone:Use');
        Tag::findOrCreate('Wear-heavy', 'Stone:Use');
        Tag::findOrCreate('Residue', 'Stone:Use');
        Tag::findOrCreate('Sheen', 'Stone:Use');

        Tag::findOrCreate('Face-single', 'Stone:Morphological');
        Tag::findOrCreate('Face-multiple', 'Stone:Morphological');
        Tag::findOrCreate('Depression', 'Stone:Morphological');
        Tag::findOrCreate('Incision(s)', 'Stone:Morphological');
        Tag::findOrCreate('Groove/notch', 'Stone:Morphological');
        Tag::findOrCreate('Plastic', 'Stone:Morphological');
        Tag::findOrCreate('Perforation', 'Stone:Morphological');

        Tag::findOrCreate('Active (handheld)', 'Stone:Function');
        Tag::findOrCreate('Passive', 'Stone:Function');
        Tag::findOrCreate('Non-processor', 'Stone:Function');

        Tag::findOrCreate('Grinding slab', 'Stone:Typology');
        Tag::findOrCreate('Upper grindingstone', 'Stone:Typology');
        Tag::findOrCreate('Indeterminate: lower/upper grindingstone', 'Stone:Typology');

        $path = base_path() . '/database/seeds/sql/taggables_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);
    }
}
