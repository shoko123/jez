<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;
use App\Services\App\Utils\GetService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // As this is a SPA, we'll have to create the form in a position known to the front-end router
        // (Instead of the default laravel view route).
        ResetPassword::createUrlUsing(
            function ($notifiable, $token) {
                $baseUrl = env('APP_URL');
                return "{$baseUrl}/auth/reset-password/{$token}?email={$notifiable->getEmailForPasswordReset()}";
            }
        );

        Relation::enforceMorphMap([
            'user' => 'App\Models\User',
            'permission' => 'Spatie\Permission\Models\Permission',
            'role' => 'Spatie\Permission\Models\Role',
            'Area' => GetService::getModel('Area'),
            'Season' => GetService::getModel('Season'),
            'Survey' => GetService::getModel('Survey'),
            'Locus' => GetService::getModel('Locus'),
            'Stone' => GetService::getModel('Stone'),
            'Ceramic' => GetService::getModel('Ceramic'),
            'Lithic' => GetService::getModel('Lithic'),
            'Fauna' => GetService::getModel('Fauna'),
            'Metal' => GetService::getModel('Metal'),
            'Glass' => GetService::getModel('Glass'),
        ]);

        JsonResource::withoutWrapping();
    }
}
