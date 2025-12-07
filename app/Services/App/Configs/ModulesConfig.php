<?php

namespace App\Services\App\Configs;

class ModulesConfig
{
    public static function autoIncrementId()
    {
        return false;
    }

    public static function modules()
    {
        return [
            'Survey' => 'survey',
            'Season' => 'seasons',
            'Area' => 'areas',
            'Locus' => 'loci',
            'Stone' => 'stones',
            'Ceramic' => 'ceramics',
            'Fauna' => 'fauna',
            'Glass' => 'glass',
            'Lithic' => 'lithics',
            'Metal' => 'metals',
        ];
    }
}
