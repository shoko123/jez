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
        Tag::findOrCreate('Flint or Chert', 'Stone:Material');
        Tag::findOrCreate('Sandstone', 'Stone:Material');
        Tag::findOrCreate('Granite', 'Stone:Material');
        Tag::findOrCreate('Unknown', 'Stone:Material');

        Tag::findOrCreate('Pebble', 'Stone:Source');
        Tag::findOrCreate('Bedrock', 'Stone:Source');

        Tag::findOrCreate('Complete', 'Stone:Preservation');
        Tag::findOrCreate('Incomplete', 'Stone:Preservation');
        Tag::findOrCreate('Fragment', 'Stone:Preservation');

        Tag::findOrCreate('Used', 'Stone:Life-Stage');
        Tag::findOrCreate('Unused', 'Stone:Life-Stage');
        Tag::findOrCreate('Blank', 'Stone:Life-Stage');
        Tag::findOrCreate('Preform', 'Stone:Life-Stage');
        Tag::findOrCreate('Debitage', 'Stone:Life-Stage');
        Tag::findOrCreate('Unfinished', 'Stone:Life-Stage');
        Tag::findOrCreate('Intentional breakage', 'Stone:Life-Stage');
        Tag::findOrCreate('Fire-cracked', 'Stone:Life-Stage');

        Tag::findOrCreate('Grinding slab', 'Stone:Typology');
        Tag::findOrCreate('Upper grinding stone', 'Stone:Typology');
        Tag::findOrCreate('Indeterminate slab or upper grinding stone', 'Stone:Typology');

        Tag::findOrCreate('Concave', 'Stone:Profile');
        Tag::findOrCreate('Convex', 'Stone:Profile');
        Tag::findOrCreate('Flat', 'Stone:Profile');

        Tag::findOrCreate('Grinding', 'Stone:Production');
        Tag::findOrCreate('Pounding', 'Stone:Production');
        Tag::findOrCreate('Flaking', 'Stone:Production');
        Tag::findOrCreate('Abrading', 'Stone:Production');
        Tag::findOrCreate('Drilling', 'Stone:Production');
        Tag::findOrCreate('Cutting', 'Stone:Production');
        Tag::findOrCreate('Chiseling', 'Stone:Production');
        Tag::findOrCreate('Polishing', 'Stone:Production');

        Tag::findOrCreate('Grinding', 'Stone:Use-Wear');
        Tag::findOrCreate('Pounding', 'Stone:Use-Wear');
        Tag::findOrCreate('Flaking', 'Stone:Use-Wear');
        Tag::findOrCreate('Abrading', 'Stone:Use-Wear');
        Tag::findOrCreate('Drilling', 'Stone:Use-Wear');
        Tag::findOrCreate('Residue', 'Stone:Use-Wear');
        Tag::findOrCreate('Polish', 'Stone:Use-Wear');
        Tag::findOrCreate('Use-light', 'Stone:Use-Wear');
        Tag::findOrCreate('Use-heavy', 'Stone:Use-Wear');

        Tag::findOrCreate('Face-single', 'Stone:Morphology');
        Tag::findOrCreate('Face-multiple', 'Stone:Morphology');
        Tag::findOrCreate('Depression', 'Stone:Morphology');
        Tag::findOrCreate('Incision', 'Stone:Morphology');
        Tag::findOrCreate('Groove or notch', 'Stone:Morphology');
        Tag::findOrCreate('Sculpted', 'Stone:Morphology');
        Tag::findOrCreate('Perforation', 'Stone:Morphology');

        Tag::findOrCreate('Active (handheld)', 'Stone:Function');
        Tag::findOrCreate('Passive', 'Stone:Function');
        Tag::findOrCreate('Either Active or Passive', 'Stone:Function');
        Tag::findOrCreate('Non-processor', 'Stone:Function');

        $path = base_path() . '/database/seeds/sql/taggables_table_seeder.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);
    }
}
