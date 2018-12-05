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
        return $this->belongsTo('App\Models\Area');
        //return $this->belongsTo('Area');
    }

    public static function myLoci() {

        //$loci = Locus::with('Area')
        //->get();


        
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

        /*
        Vehicle::where('id',1)
    ->with(['staff'=> function($query){
        // selecting fields from staff table
        $query->select('id','name');
    }])
    ->get();

    */
        //$loci = $this->all();
        //$loci = Locus::all()->with('area');
        //with('Area')->orderBy('dig_year', 'area', 'locus')
                //->get();
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

    public static function lociList() {

        $loci = Locus::leftjoin('areas', 'loci.area_id', '=', 'areas.id')
        ->orderBy('areas.year', 'asc')
        ->orderBy('areas.area', 'asc')
        ->orderBy('loci.locus', 'asc') 
        ->get(array('loci.id', 'square', 'date_opened', 'date_closed', 'level_opened', 
        'level_closed', 'locus_above', 'locus_below', 'locus_co_existing', 'loci.description', 'deposit',
        'registration_notes', 'areas.year', 'areas.area', 'loci.locus'));
        
        return $loci;
    }


}
