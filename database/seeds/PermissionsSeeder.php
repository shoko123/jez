<?php

use App\Models\Auth\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PremissionsSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['guard_name' => 'api',  'name'  => 'Stone-read']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Stone-create']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Stone-update']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Stone-delete']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Stone-media']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Stone-tag']);

        Permission::create(['guard_name' => 'api',  'name'  => 'Locus-read']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Locus-create']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Locus-update']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Locus-delete']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Locus-media']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Locus-tag']);

        Permission::create(['guard_name' => 'api',  'name'  => 'Pottery-read']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Pottery-create']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Pottery-update']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Pottery-delete']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Pottery-media']);
        Permission::create(['guard_name' => 'api',  'name'  => 'Pottery-tag']);

        // create roles and assign existing permissions
        $roleStoneManager = Role::create(['guard_name' => 'api', 'name' => 'stone manager']);
        $roleStoneManager->givePermissionTo('Stone-read');
        $roleStoneManager->givePermissionTo('Stone-create');
        $roleStoneManager->givePermissionTo('Stone-update');
        $roleStoneManager->givePermissionTo('Stone-delete');
        $roleStoneManager->givePermissionTo('Stone-media');
        $roleStoneManager->givePermissionTo('Stone-tag');

        $roleLocusManager = Role::create(['guard_name' => 'api', 'name' => 'locus manager']);
        $roleLocusManager->givePermissionTo('Locus-read');
        $roleLocusManager->givePermissionTo('Locus-create');
        $roleLocusManager->givePermissionTo('Locus-update');
        $roleLocusManager->givePermissionTo('Locus-delete');
        $roleLocusManager->givePermissionTo('Locus-media');
        $roleLocusManager->givePermissionTo('Locus-tag');

        $rolePotteryManager = Role::create(['guard_name' => 'api', 'name' => 'pottery manager']);
        $rolePotteryManager->givePermissionTo('Pottery-read');
        $rolePotteryManager->givePermissionTo('Pottery-create');
        $rolePotteryManager->givePermissionTo('Pottery-update');
        $rolePotteryManager->givePermissionTo('Pottery-delete');
        $rolePotteryManager->givePermissionTo('Pottery-media');
        $rolePotteryManager->givePermissionTo('Pottery-tag');

        $roleReader = Role::create(['guard_name' => 'api', 'name' => 'reader']);
        $roleReader->givePermissionTo(['Locus-read', 'Stone-read', 'Pottery-read']);

        $reader = User::where('email', 'guest@opendigreports.com')->firstOrFail();
        $reader->assignRole($roleReader);
        
        $editor = User::where('email', 'editor@opendigreports.com')->firstOrFail();
        $editor->assignRole($roleReader, $roleLocusManager, $roleStoneManager, $rolePotteryManager);
    }
}
