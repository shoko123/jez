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

        //$loci = Locus::with('area')->get();
        //$loci = Locus::with('area')->get(['locus', 'description']);
        //})->select('loci.*', 'areas.*')->get();
       
        $loci = Locus::join('areas', 'loci.area_id', '=', 'areas.id')
        ->select('loci.id', 'square', 'date_opened', 'date_closed', 'level_opened', 'level_closed', 
                 'locus_above', 'locus_below', 'locus_co_existing','loci.description', 'loci.deposit', 'areas.year', 'areas.area', 'loci.locus')
        ->orderBy('areas.year', 'asc')
        ->orderBy('areas.area', 'asc')
        ->orderBy('loci.locus', 'asc')
        ->getQuery() // Optional: downgrade to non-eloquent builder so we don't build invalid User objects.
        ->get();


            /*
        square', 20)->nullable();
            $table->timestamp('date_opened')->nullable();
            $table->timestamp('date_closed')->nullable();
            $table->string('level_opened', 20)->nullable();
            $table->string('level_closed', 20)->nullable();
            $table->string('locus_above', 50)->nullable();
            $table->string('locus_below', 50)->nullable();
            $table->string('locus_co_existing', 50)->nullable();
            $table->string('description', 500)->nullable();
            $table->string('deposit', 500)->nullable();
            $table->string('registration_notes'
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

    public static function lociAll() {

        $loci = Locus::with('Area')//->orderBy('dig_year', 'area', 'locus')
                ->get();
        return $loci;
    }
}
