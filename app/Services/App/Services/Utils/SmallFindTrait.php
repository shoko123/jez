<?php

namespace App\Services\App\Services\Utils;

use Illuminate\Database\Eloquent\Model;
use App\Services\App\GetService;
use App\Models\Module\DigModuleModel;
use App\Services\App\Services\Utils\FormatRelated;
use App\Services\App\Services\Utils\LocusFormat;
use PgSql\Lob;

trait SmallFindTrait
{
    static DigModuleModel $locus;

    public static function smallFindRelatedModules(string $locus_id)
    {
        $locus = GetService::getModel('Locus', true);
        $locus->findOrfail($locus_id);
        $formatted = LocusRelated::relatedModules($locus_id);
        array_unshift($formatted, FormatRelated::transformOneItem('Belongs To', 'Locus', $locus));
        return $formatted;
    }

    public static function smallFindDiscreteFilterOptions(bool $withRegCode): array
    {
        $options = [
            'Season' => [
                'field' => 'locus_id',
                'start' => 1,
                'length' => 1
            ],
            'Area' => [
                'field' => 'locus_id',
                'start' => 2,
                'length' => 1
            ],
            'Registration Code' => 'code',
            'Locus Id' => 'locus_id' // This one is required by create to avoid duplicate ids.
            // It is not a part of the tag/filter system.
        ];
        if (!$withRegCode) {
            unset($options['Registration Code']);
        }
        return $options;
    }

    public static function smallFindOrderByOptions(bool $withRegCode): array
    {
        $options = [
            'Season' => [
                'field' => 'locus_id',
                'start' => 1,
                'length' => 1
            ],
            'Area' => [
                'field' => 'locus_id',
                'start' => 2,
                'length' => 1
            ],
            'Locus No.' =>            [
                'field' => 'locus_id',
                'start' => 3,
                'length' => 3
            ],
            'Registration Code' => 'code',
            'Basket No.' => 'basket_no',
            'Artifact No.' => 'artifact_no',
        ];
        if (!$withRegCode) {
            unset($options['Registration Code']);
        }
        return $options;
    }
}
