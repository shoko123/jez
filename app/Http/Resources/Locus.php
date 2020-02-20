<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Locus extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        //return parent::toArray($request);
  
        
        return [
            'id' => $this->id,
            'square' => $this->square,
            'date_opened' => $this->date_opened,
            'date_closed' => $this->date_closed,
            'level_opened' => $this->level_opened,
            'level_closed' => $this->level_closed,
            'locus_above' => $this->locus_above,
            'locus_below' => $this->locus_below,
            'locus_co_existing' => $this->locus_co_existing,   
            'description' => $this->description,
            'deposit' => $this->deposit,
            'registration_notes' => $this->registration_notes,
            'area_id' => $this->area_id,
            //'area' => $this->area,
            'dig_year' => $this->year,
            'area_name' => $this->area,
            'locus_no' => $this->locus_no,
            'tag'=> $this->year . '.' . $this->area . '.' . $this->locus_no,

            
        ];   

    }
}

