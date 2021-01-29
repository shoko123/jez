<?php

namespace App\Traits;

trait RegistrationTagTrait
{
    public function registrationTag($registrationData)
    {
        $tag = $registrationData->areaSeasonTag . '/' . $registrationData->locusNo . '.' . $registrationData->registrationCategory;
        if ($registrationData->basket_no) {
            $tag .= $registrationData->basket_no;
        }
        if ($registrationData->artifact_no) {
            if ($registrationData->basket_no) {
                $tag .= ".";
            }
            $tag .= $registrationData->artifact_no;
        }
        if ($registrationData->piece_no) {
            if ($registrationData->artifact_no) {
                $tag .= ".";
            }
            $tag .= "P" . $registrationData->piece_no;
        }
        return $tag;
    }
}
