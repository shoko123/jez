<?php

namespace App\Traits;

trait RegistrationTagTrait
{
    public function tag($find)
    {
        $tag = "";
        if (isset($find->locus)) {
            $tag = $find->locus->areaSeason->tag . '/' . $find->locus->locus_no . '.' . $find->registration_category;
        } else {
            $tag = $find->tag . '/' . $find->locus_no . '.' . $find->registration_category;
        }
        if ($find->registration_category == 'AR') {
            $tag .= $find->basket_no . "." . $find->artifact_no;
        } else {
            //format basket.artifact
            if ($find->basket_no !== 0) {
                $tag .= $find->basket_no;
            }
            if ($find->artifact_no !== 0) {
                if ($find->basket_no !== 0) {
                    $tag .= ".";
                }
                $tag .= $find->artifact_no;
            }
           
        }
        return $tag;
    }
}
