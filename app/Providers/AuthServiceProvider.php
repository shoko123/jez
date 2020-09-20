<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
        'App\Models\Dig\Locus' => 'App\Policies\LocusPolicy',
        'App\Models\Dig\Pottery' => 'App\Policies\PotteryPolicy',
        'App\Models\Dig\Lithic' => 'App\Policies\LithicPolicy',
        'App\Models\Dig\Stone' => 'App\Policies\StonePolicy',
        'App\Models\Dig\Metal' => 'App\Policies\MetalPolicy',
        'App\Models\Dig\Glass' => 'App\Policies\GlassPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
