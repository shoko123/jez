<?php

namespace App\Traits;

trait RegistrationTagTrait
{
    public function tag($find)
    {
        $tag = "";
        if (isset($find->locus) ){
            $tag = $find->locus->areaSeason->tag . '/' . $find->locus->locus_no . '.' . $find->registration_category;
        } else {
            $tag = $find->tag . '/' . $find->locus_no . '.' . $find->registration_category;
        }
        if ($find->basket_no) {
            $tag .= $find->basket_no;
        }
        if ($find->artifact_no) {
            if ($find->basket_no) {
                $tag .= ".";
            }
            $tag .= $find->artifact_no;
        }
        if ($find->piece_no) {
            if ($find->artifact_no) {
                $tag .= ".";
            }
            $tag .= "P" . $find->piece_no;
        }
        return $tag;
    }
}
