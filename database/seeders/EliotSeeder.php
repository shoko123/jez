<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EliotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $path = base_path() . '/database/seeders/sql/tmp/FlintBasketExcel.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        
        $collection = DB::table('FlintBasketExcel')->get();
        
        foreach ($collection as $index => $item) {
            $as =  DB::table("areas_seasons")->where('dot', $item->year . '.' . $item->area)->first();
           
            $locus = DB::table("loci")->where('area_season_id', '=', $as->id)->where('locus_no', '=', $item->locus_no)->first();
            if (empty($locus)) { dd("NOT FOUND as_id: " . $as->id . " locus_no: " . $item->locus_no);}
            $locus_id = $locus->id;
            
            DB::transaction(function () use ($item, $locus_id) {
                $find = [];
                $lithic = [];
  
                $lithic["description"] = null;
                //$lithic["notes"] = null;
                $lithic["weight"] = $item->Wt_grams === '' ? NULL : intVal($item->Wt_grams);
               
                DB::table('lithics')->insert($lithic);
                $lithic_id = DB::getPdo()->lastInsertId();
                
                $find["findable_type"] = 'Lithic';
                $find["findable_id"] = $lithic_id;       
                $find["locus_id"] = $locus_id;
                $find["registration_category"] = 'LB';
                $find["basket_no"] = $item->basket_no;
                $find["artifact_no"] = 0;

                $find["artifact_count"] = 1;
                $find["preservation_id"] = 1;
                $find["related_pottery_basket"] = $item->related_pottery;
                $find["date"] = $item->date;
                $find["description"] = null;//$item->date;
                $find["notes"] = $item->Notes;
                $find["square"] = null;
                $find["keep"] = null;
                $find["level_top"] = null;
                $find["level_bottom"] = null;

                DB::table('finds')->insert($find);
            });
            
        }
        
    }
}
