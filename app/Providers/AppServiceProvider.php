<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Relation::morphMap([
            'Area'          => 'App\Models\Dig\Area',
            'Season'        => 'App\Models\Dig\Season',
            'AreaSeason'    => 'App\Models\Dig\AreaSeason',
            'Locus'         => 'App\Models\Dig\Locus',
            'Pottery'       => 'App\Models\Dig\Pottery',
            'Lithic'        => 'App\Models\Dig\Lithic',
            'Stone'         => 'App\Models\Dig\Stone',
            'Fauna'         => 'App\Models\Dig\Fauna',
            'Flora'         => 'App\Models\Dig\Flora',
            'Glass'         => 'App\Models\Dig\Glass',
            'Metal'         => 'App\Models\Dig\Metal',    
            'Tbd'           => 'App\Models\Dig\Tbd',
        ]);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
