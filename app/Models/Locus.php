<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Models\Area;

class Locus extends Model
{
    protected $guarded = [];
    protected $table = 'loci';


    public function area()
    {       
        return $this->belongsTo(Area::class);
    }

    public static function myLoci() {

        $loci = \DB::select('SELECT loci.id, square, date_opened, date_closed,level_opened, 
            level_closed, locus_above, locus_below, locus_co_existing,loci.description, deposit,
            registration_notes, areas.year, areas.area, loci.locus FROM loci INNER JOIN areas ON loci.area_id =  areas.id
            ORDER BY areas.year, areas.area, loci.locus');
        
        
     
        //$loci = Locus::with('area')->get(['locus', 'description']);
        //})->select('loci.*', 'areas.*')->get();
       /*
        $loci = Locus::join('areas', 'loci.area_id', '=', 'areas.id')
        ->select('loci.id', 'square', 'date_opened', 'date_closed', 'level_opened', 'level_closed', 
                 'locus_above', 'locus_below', 'locus_co_existing','loci.description', 'deposit',
                 'registration_notes',
                 'areas.year',
                 'areas.area',
                 'loci.locus')
        ->orderBy('areas.year', 'asc')
        ->orderBy('areas.area', 'asc')
        ->orderBy('loci.locus', 'asc')
        ->getQuery() // Optional: downgrade to non-eloquent builder so we don't build invalid User objects.
        ->get();
*/
        
      
        return $loci;
    }

    public static function locusWithArea($id) {

        $locus = \DB::table('loci')
            ->select('loci.*', 'areas.area', 'areas.year')
            ->leftjoin('areas', 'loci.area_id', '=', 'areas.id')
            ->where('loci.id', '=', $id )
            ->first();
        return $locus;
    }

    public static function lociWithArea() {

        $loci = Locus::leftjoin('areas', 'loci.area_id', '=', 'areas.id')
        ->orderBy('areas.year', 'asc')
        ->orderBy('areas.area', 'asc')
        ->orderBy('loci.locus', 'asc') 
        ->get(array('loci.*', 'areas.year', 'areas.area'));
        //->get(array('loci.id', 'square', 'date_opened', 'date_closed', 'level_opened', 
        //'level_closed', 'locus_above', 'locus_below', 'locus_co_existing', 'loci.description', 'deposit',
        //'registration_notes', 'area_id', 'areas.year', 'areas.area', 'loci.locus'));
        
        return $loci;
    }

    
    public static function locusByTag($tag) {
        $id = $tag["id"];
   
        $locus = \DB::table('loci')
        ->select('loci.*', 'areas.area', 'areas.year')
        ->leftjoin('areas', 'loci.area_id', '=', 'areas.id')
        ->where('areas.year','=', $tag["year"])
        ->where('areas.area','=', $tag["area"])
        ->where('loci.locus','=', $tag["locus_no"])
        ->first();
      
        return $locus;
    }


    public function scopeArea($query, $areaId)
    {
        return $query->where('area_id', $areaId);
    }

}
