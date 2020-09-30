<?php

namespace App\Traits;

trait RegistrationTagTrait
{
    public function registrationTag($registrationData)
    {
        $tag = $registrationData->areaSeasonTag . '/' . $registrationData->locusNo . '.' . $registrationData->registrationCategory . '.';
        switch ($registrationData->registrationCategory) {
            case "AR":
                $tag .= $registrationData->artifact_no;
                break;
            case "PT":
                $tag .= $registrationData->basketNo;
                break;
            default:
                $tag .= $registrationData->basketNo . '.' . $registrationData->artifact_no;
        }
        return $tag;
    }
}
