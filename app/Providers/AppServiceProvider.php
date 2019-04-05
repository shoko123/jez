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
            'Area'          => 'App\Models\Area',
            'Locus'         => 'App\Models\Locus',
            'PotteryBasket' => 'App\Models\Finds\Pottery\PotteryBasket',
            'Pottery'       => 'App\Models\Finds\Pottery\Pottery',
            'Flint'         => 'App\Models\Finds\Stone\Flint',
            'Groundstone'   => 'App\Models\Finds\Stone\Groundstone',
            'Stone'         => 'App\Models\Finds\Stone\Stone',
            'Fauna'         => 'App\Models\Finds\Fauna',
            'Flora'         => 'App\Models\Finds\Flora',
            'Shell'         => 'App\Models\Finds\Shell',
            'Glass'         => 'App\Models\Finds\Glass',
            'Metal'         => 'App\Models\Finds\Metal',    
            'Tbd'           => 'App\Models\Finds\Tbd',
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
