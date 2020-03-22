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
        Tag::findOrCreate('Basalt-dense', 'stone:material');
        Tag::findOrCreate('Basalt-vesicular', 'stone:material');
        Tag::findOrCreate('Scoria', 'stone:material');
        Tag::findOrCreate('Pumice', 'stone:material');
        Tag::findOrCreate('Limestone', 'stone:material');
        Tag::findOrCreate('Chalk', 'stone:material');
        Tag::findOrCreate('Flint/Chert', 'stone:material');
        Tag::findOrCreate('Sandstone', 'stone:material');
        Tag::findOrCreate('Granite', 'stone:material');
        Tag::findOrCreate('Unknown', 'stone:material');
        Tag::findOrCreate('Tbd', 'stone:material');

        Tag::findOrCreate('grinding-stones', 'stone:typology');
        Tag::findOrCreate('active', 'stone:typology');
        Tag::findOrCreate('passive', 'stone:typology');
        Tag::findOrCreate('vessel', 'stone:typology');
        Tag::findOrCreate('perforated', 'stone:typology');
        Tag::findOrCreate('inactive', 'stone:typology');

        Tag::findOrCreate('compelete', 'stone:use-status');
        Tag::findOrCreate('blank', 'stone:use-status');
        Tag::findOrCreate('debitage', 'stone:use-status');
        Tag::findOrCreate('in-bedrock', 'stone:use-status');
        Tag::findOrCreate('echofact', 'stone:use-status');
        Tag::findOrCreate('pebble', 'stone:use-status');
        Tag::findOrCreate('unfinished', 'stone:use-status');
        Tag::findOrCreate('unused', 'stone:use-status');
        Tag::findOrCreate('multiple-use', 'stone:use-status');
        Tag::findOrCreate('reshaped', 'stone:use-status');
        Tag::findOrCreate('retouched', 'stone:use-status');
        Tag::findOrCreate('redesign', 'stone:use-status');
        Tag::findOrCreate('intentional-breakage', 'stone:use-status');

        Tag::findOrCreate('depression', 'stone:features-major');
        Tag::findOrCreate('incision(s)', 'stone:features-major');
        Tag::findOrCreate('groove(s)/notch(s)', 'stone:features-major');
        Tag::findOrCreate('plastic', 'stone:features-major');
        Tag::findOrCreate('perforation', 'stone:features-major');

        Tag::findOrCreate('face-single', 'stone:features-minor');
        Tag::findOrCreate('face-multiple', 'stone:features-minor');
        Tag::findOrCreate('striation', 'stone:features-minor');
        Tag::findOrCreate('wear-light', 'stone:features-minor');
        Tag::findOrCreate('wear-heavy', 'stone:features-minor');
        Tag::findOrCreate('polish', 'stone:features-minor');
        Tag::findOrCreate('sheen', 'stone:features-minor');
        Tag::findOrCreate('residue', 'stone:features-minor');
        Tag::findOrCreate('thermal-effect', 'stone:features-minor');
        Tag::findOrCreate('drill-marks', 'stone:features-minor');
        Tag::findOrCreate('chissel-runs', 'stone:features-minor');
        Tag::findOrCreate('pecking', 'stone:features-minor');
        Tag::findOrCreate('flaking', 'stone:features-minor');

        Tag::findOrCreate('grinding', 'stone:interpertation');
        Tag::findOrCreate('grinding-straight', 'stone:interpertation');
        Tag::findOrCreate('grinding-reciprocal', 'stone:interpertation');
        Tag::findOrCreate('grinding-circular', 'stone:interpertation');
        Tag::findOrCreate('rocking', 'stone:interpertation');
        Tag::findOrCreate('pounding', 'stone:interpertation');
        Tag::findOrCreate('chipping', 'stone:interpertation');
        Tag::findOrCreate('cutting', 'stone:interpertation');
        Tag::findOrCreate('chopping', 'stone:interpertation');
        Tag::findOrCreate('crushing', 'stone:interpertation');
        Tag::findOrCreate('circular', 'stone:interpertation');

        Tag::findOrCreate('handstone', 'stone:active-name');
        Tag::findOrCreate('processor', 'stone:active-name');
        Tag::findOrCreate('pounder', 'stone:active-name');
        Tag::findOrCreate('pestle', 'stone:active-name');
        Tag::findOrCreate('abraider', 'stone:active-name');
        Tag::findOrCreate('burnisher', 'stone:active-name');
        Tag::findOrCreate('muller', 'stone:active-name');
        Tag::findOrCreate('scraper', 'stone:active-name');
        Tag::findOrCreate('multi-use', 'stone:active-name');

        Tag::findOrCreate('slab', 'stone:passive-name');
        Tag::findOrCreate('grinding-slab', 'stone:passive-name');
        Tag::findOrCreate('pallette', 'stone:passive-name');
        Tag::findOrCreate('quern', 'stone:passive-name');
        Tag::findOrCreate('basin', 'stone:passive-name');
        Tag::findOrCreate('netherstone', 'stone:passive-name');
        Tag::findOrCreate('anvil', 'stone:passive-name');

        Tag::findOrCreate('vessel', 'stone:vessel-name');
        Tag::findOrCreate('bowl', 'stone:vessel-name');
        Tag::findOrCreate('bowlet', 'stone:vessel-name');
        Tag::findOrCreate('mortar', 'stone:vessel-name');
        Tag::findOrCreate('cup', 'stone:vessel-name');
        Tag::findOrCreate('goblet', 'stone:vessel-name');
        Tag::findOrCreate('calice', 'stone:vessel-name');
        Tag::findOrCreate('tripod', 'stone:vessel-name');

        Tag::findOrCreate('weight', 'stone:inactive-name');
        Tag::findOrCreate('loom-weight', 'stone:inactive-name');
        Tag::findOrCreate('macehead', 'stone:inactive-name');
        Tag::findOrCreate('slingstone', 'stone:inactive-name');
        Tag::findOrCreate('disc', 'stone:inactive-name');
        Tag::findOrCreate('chipped-disc', 'stone:inactive-name');
        Tag::findOrCreate('grooved-stone', 'stone:inactive-name');
        Tag::findOrCreate('incised-stone', 'stone:inactive-name');
        
        Tag::findOrCreate('architectural', 'stone:inactive-name');
        Tag::findOrCreate('statue', 'stone:inactive-name');
        Tag::findOrCreate('stelle', 'stone:inactive-name');

        Tag::findOrCreate('weight', 'stone:perforated-name');
        Tag::findOrCreate('digging-stick', 'stone:perforated-name');

        Tag::findOrCreate('wall-straight', 'stone:vessel-attribute');
        Tag::findOrCreate('wall-invert', 'stone:vessel-attribute');
        Tag::findOrCreate('wall-flaring', 'stone:vessel-attribute');
        Tag::findOrCreate('base-disc', 'stone:vessel-attribute');
        Tag::findOrCreate('base-straight', 'stone:vessel-attribute');
    }
}
