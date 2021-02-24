<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EliotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        return;
        ///////
      
        $collection = \DB::table('eliot')->get();
        foreach ($collection as $index => $item) {
            \DB::transaction(function () use ($item) {
                $find = [];
                $pot = [];
                $pieces = explode(".", $item->all);

                $locus_no = intval($pieces[0]);
                $basket_no = intval($pieces[1]);
                $artifact_no = intval($pieces[2]);
                $loci = \DB::table('loci')
                ->where('locus_no', '=', $locus_no)
                ->where('area_season_id', '=', 10)
                ->get();
                $locus_id = $loci[0]->id;



                $pot["description"] = $item->Type . " " . $item->description;
                $pot["periods"] = $item->BB;

                \DB::table('pottery')->insert($pot);
                $pot_id = \DB::getPdo()->lastInsertId();

                $find["findable_type"] = "Pottery";
                $find["findable_id"] = $pot_id;

                //registration data of all small finds
                $find["locus_id"] = $locus_id;
                $find["registration_category"] = "PT";
                $find["basket_no"] = $basket_no;
                $find["artifact_no"] = $artifact_no;
                $find["piece_no"] = null;
                $find["artifact_count"] = 1;
                $find["preservation_id"] = 1;
                $find["related_pottery_basket"] = null;

                $find["date"] = null;
                //$find["description"] = "Eliot's Registration";
                $find["notes"] = "Eliot's Registration";
                //$find["square"] = null;
                $find["keep"] = true;
                //$find["level_top"] = null;
                //$find["level_bottom"] = null;

                \DB::table('finds')->insert($find);

            });
        }

    }
}
