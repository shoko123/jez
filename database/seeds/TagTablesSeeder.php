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
        Tag::findOrCreate('Basalt-dense', 'Stone:material');
        Tag::findOrCreate('Basalt-vesicular', 'Stone:material');
        Tag::findOrCreate('Scoria', 'Stone:material');
        Tag::findOrCreate('Pumice', 'Stone:material');
        Tag::findOrCreate('Limestone', 'Stone:material');
        Tag::findOrCreate('Chalk', 'Stone:material');
        Tag::findOrCreate('Flint/Chert', 'Stone:material');
        Tag::findOrCreate('Sandstone', 'Stone:material');
        Tag::findOrCreate('Granite', 'Stone:material');
        Tag::findOrCreate('Unknown', 'Stone:material');
        Tag::findOrCreate('Tbd', 'Stone:material');

        Tag::findOrCreate('grinding-stones', 'Stone:typology');
        Tag::findOrCreate('active', 'Stone:typology');
        Tag::findOrCreate('passive', 'Stone:typology');
        Tag::findOrCreate('vessel', 'Stone:typology');
        Tag::findOrCreate('perforated', 'Stone:typology');
        Tag::findOrCreate('inactive', 'Stone:typology');

        Tag::findOrCreate('compelete', 'Stone:use-status');
        Tag::findOrCreate('blank', 'Stone:use-status');
        Tag::findOrCreate('debitage', 'Stone:use-status');
        Tag::findOrCreate('in-bedrock', 'Stone:use-status');
        Tag::findOrCreate('echofact', 'Stone:use-status');
        Tag::findOrCreate('pebble', 'Stone:use-status');
        Tag::findOrCreate('unfinished', 'Stone:use-status');
        Tag::findOrCreate('unused', 'Stone:use-status');
        Tag::findOrCreate('multiple-use', 'Stone:use-status');
        Tag::findOrCreate('reshaped', 'Stone:use-status');
        Tag::findOrCreate('retouched', 'Stone:use-status');
        Tag::findOrCreate('redesign', 'Stone:use-status');
        Tag::findOrCreate('intentional-breakage', 'Stone:use-status');

        Tag::findOrCreate('depression', 'Stone:features-major');
        Tag::findOrCreate('incision(s)', 'Stone:features-major');
        Tag::findOrCreate('groove(s)/notch(s)', 'Stone:features-major');
        Tag::findOrCreate('plastic', 'Stone:features-major');
        Tag::findOrCreate('perforation', 'Stone:features-major');

        Tag::findOrCreate('face-single', 'Stone:features-minor');
        Tag::findOrCreate('face-multiple', 'Stone:features-minor');
        Tag::findOrCreate('striation', 'Stone:features-minor');
        Tag::findOrCreate('wear-light', 'Stone:features-minor');
        Tag::findOrCreate('wear-heavy', 'Stone:features-minor');
        Tag::findOrCreate('polish', 'Stone:features-minor');
        Tag::findOrCreate('sheen', 'Stone:features-minor');
        Tag::findOrCreate('residue', 'Stone:features-minor');
        Tag::findOrCreate('thermal-effect', 'Stone:features-minor');
        Tag::findOrCreate('drill-marks', 'Stone:features-minor');
        Tag::findOrCreate('chissel-runs', 'Stone:features-minor');
        Tag::findOrCreate('pecking', 'Stone:features-minor');
        Tag::findOrCreate('flaking', 'Stone:features-minor');

        Tag::findOrCreate('grinding', 'Stone:interpertation');
        Tag::findOrCreate('grinding-straight', 'Stone:interpertation');
        Tag::findOrCreate('grinding-reciprocal', 'Stone:interpertation');
        Tag::findOrCreate('grinding-circular', 'Stone:interpertation');
        Tag::findOrCreate('rocking', 'Stone:interpertation');
        Tag::findOrCreate('pounding', 'Stone:interpertation');
        Tag::findOrCreate('chipping', 'Stone:interpertation');
        Tag::findOrCreate('cutting', 'Stone:interpertation');
        Tag::findOrCreate('chopping', 'Stone:interpertation');
        Tag::findOrCreate('crushing', 'Stone:interpertation');
        Tag::findOrCreate('circular', 'Stone:interpertation');

        Tag::findOrCreate('handstone', 'Stone:active-name');
        Tag::findOrCreate('processor', 'Stone:active-name');
        Tag::findOrCreate('pounder', 'Stone:active-name');
        Tag::findOrCreate('pestle', 'Stone:active-name');
        Tag::findOrCreate('abraider', 'Stone:active-name');
        Tag::findOrCreate('burnisher', 'Stone:active-name');
        Tag::findOrCreate('muller', 'Stone:active-name');
        Tag::findOrCreate('scraper', 'Stone:active-name');
        Tag::findOrCreate('multi-use', 'Stone:active-name');

        Tag::findOrCreate('slab', 'Stone:passive-name');
        Tag::findOrCreate('grinding-slab', 'Stone:passive-name');
        Tag::findOrCreate('pallette', 'Stone:passive-name');
        Tag::findOrCreate('quern', 'Stone:passive-name');
        Tag::findOrCreate('basin', 'Stone:passive-name');
        Tag::findOrCreate('netherstone', 'Stone:passive-name');
        Tag::findOrCreate('anvil', 'Stone:passive-name');

        Tag::findOrCreate('vessel', 'Stone:vessel-name');
        Tag::findOrCreate('bowl', 'Stone:vessel-name');
        Tag::findOrCreate('bowlet', 'Stone:vessel-name');
        Tag::findOrCreate('mortar', 'Stone:vessel-name');
        Tag::findOrCreate('cup', 'Stone:vessel-name');
        Tag::findOrCreate('goblet', 'Stone:vessel-name');
        Tag::findOrCreate('calice', 'Stone:vessel-name');
        Tag::findOrCreate('tripod', 'Stone:vessel-name');

        Tag::findOrCreate('weight', 'Stone:inactive-name');
        Tag::findOrCreate('loom-weight', 'Stone:inactive-name');
        Tag::findOrCreate('macehead', 'Stone:inactive-name');
        Tag::findOrCreate('slingstone', 'Stone:inactive-name');
        Tag::findOrCreate('disc', 'Stone:inactive-name');
        Tag::findOrCreate('chipped-disc', 'Stone:inactive-name');
        Tag::findOrCreate('grooved-stone', 'Stone:inactive-name');
        Tag::findOrCreate('incised-stone', 'Stone:inactive-name');
        
        Tag::findOrCreate('architectural', 'Stone:inactive-name');
        Tag::findOrCreate('statue', 'Stone:inactive-name');
        Tag::findOrCreate('stelle', 'Stone:inactive-name');

        Tag::findOrCreate('weight', 'Stone:perforated-name');
        Tag::findOrCreate('digging-stick', 'Stone:perforated-name');

        Tag::findOrCreate('wall-straight', 'Stone:vessel-attribute');
        Tag::findOrCreate('wall-invert', 'Stone:vessel-attribute');
        Tag::findOrCreate('wall-flaring', 'Stone:vessel-attribute');
        Tag::findOrCreate('base-disc', 'Stone:vessel-attribute');
        Tag::findOrCreate('base-straight', 'Stone:vessel-attribute');
    }
}
