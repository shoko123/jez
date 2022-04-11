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
        $path = base_path() . '/database/seeders/sql/tmp/kasia.sql';
        $sql = file_get_contents($path);
        DB::unprepared($sql);

        
        $collection = DB::table('kasia0')->get();
        foreach ($collection as $index => $item) {
            if($item->locus_id === Null){
                break;
            }
            DB::transaction(function () use ($item) {
                $find = [];
                $fauna = [];

                $fauna["taxon"] = $item->taxon;
                $fauna["element"] = $item->bone;
                $fauna["symmetry"] = $item->side;
                $fauna["d_and_r"] = $item->DR;
                $fauna["age"] = $item->age;
                $fauna["breakage"] = $item->breakage;
                $fauna["butchery"] = $item->butchery !== '';
                $fauna["butchery_desc"] = $item->butchery_desc;
                $fauna["burning"] = $item->burning !== '';
                $fauna["burning_desc"] = $item->burning_desc;
                $fauna["weathering"] = $item->weathering;
                $fauna["other_bsm"] = $item->other_bsm;
                $fauna["notes"] = $item->notes;
                $fauna["measured"] = $item->measured !== '';
                $fauna["GL"] = $item->GL;
                $fauna["Glpe"] = $item->Glpe;
                $fauna["GLl"] = $item->GLl;
                $fauna["GLP"] = $item->GLP;
                $fauna["Bd"] = $item->Bd;
                $fauna["BT"] = $item->BT;
                $fauna["Dd"] = $item->Dd;
                $fauna["BFd"] = $item->BFd;
                $fauna["Bp"] = $item->Bp;
                $fauna["Dp"] = $item->Dp;
                $fauna["SD"] = $item->SD;
                $fauna["HTC"] = $item->HTC;
                $fauna["Dl"] = $item->Dl;
                $fauna["DEM"] = $item->DEM;
                $fauna["DVM"] = $item->DVM;
                $fauna["WCM"] = $item->WCM;
                $fauna["DEL"] = $item->DEL;
                $fauna["DVL"] = $item->DVL;
                $fauna["WCL"] = $item->WCL;
                $fauna["LD"] = $item->LD;
                $fauna["DLS"] = $item->DLS;
                $fauna["LG"] = $item->LG;
                $fauna["BG"] = $item->BG;
                $fauna["DID"] = $item->DID;
                $fauna["BFcr"] = $item->BFcr;
                $fauna["GD"] = $item->GD;
                $fauna["GB"] = $item->GB;
                $fauna["BF"] = $item->BF;
                $fauna["LF"] = $item->LF;
                $fauna["GLm"] = 0;
                $fauna["GH"] =0;
                $fauna["taxon_L1_id"] = 1;
                $fauna["element_L1_id"] = 1;



                DB::table('fauna')->insert($fauna);
                $fauna_id = DB::getPdo()->lastInsertId();

                $find["findable_id"] = $fauna_id;
                $find["findable_type"] = 'Fauna';
                $find["locus_id"] = $item->locus_id;
                $find["registration_category"] = 'LB';
                $find["basket_no"] = $item->basket_no;
                $find["artifact_no"] = $item->artifact_no;
                $find["artifact_count"] = 1;
                $find["preservation_id"] = 1;
                $find["related_pottery_basket"] = null;


                //$find["date"] = null;
                //$find["notes"] = "Eliot's Registration";
                //$find["square"] = null;
                $find["keep"] = true;
                //$find["level_top"] = null;
                //$find["level_bottom"] = null;

                DB::table('finds')->insert($find);
            });
        }
        
    }
}
