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
        Permission::create(['guard_name' => 'api',  'name'  => 'stone-read']);
        Permission::create(['guard_name' => 'api',  'name'  => 'stone-create']);
        Permission::create(['guard_name' => 'api',  'name'  => 'stone-update']);
        Permission::create(['guard_name' => 'api',  'name'  => 'stone-delete']);
        Permission::create(['guard_name' => 'api',  'name'  => 'stone-media']);

        Permission::create(['guard_name' => 'api',  'name'  => 'locus-read']);
        Permission::create(['guard_name' => 'api',  'name'  => 'locus-create']);
        Permission::create(['guard_name' => 'api',  'name'  => 'locus-update']);
        Permission::create(['guard_name' => 'api',  'name'  => 'locus-delete']);
        Permission::create(['guard_name' => 'api',  'name'  => 'locus-media']);

        Permission::create(['guard_name' => 'api',  'name'  => 'pottery-read']);
        Permission::create(['guard_name' => 'api',  'name'  => 'pottery-create']);
        Permission::create(['guard_name' => 'api',  'name'  => 'pottery-update']);
        Permission::create(['guard_name' => 'api',  'name'  => 'pottery-delete']);
        Permission::create(['guard_name' => 'api',  'name'  => 'pottery-media']);

        // create roles and assign existing permissions
        $roleStoneManager = Role::create(['guard_name' => 'api', 'name' => 'stone manager']);
        $roleStoneManager->givePermissionTo('stone-read');
        $roleStoneManager->givePermissionTo('stone-create');
        $roleStoneManager->givePermissionTo('stone-update');
        $roleStoneManager->givePermissionTo('stone-delete');
        $roleStoneManager->givePermissionTo('stone-media');

        $roleLocusManager = Role::create(['guard_name' => 'api', 'name' => 'locus manager']);
        $roleLocusManager->givePermissionTo('locus-read');
        $roleLocusManager->givePermissionTo('locus-create');
        $roleLocusManager->givePermissionTo('locus-update');
        $roleLocusManager->givePermissionTo('locus-delete');
        $roleLocusManager->givePermissionTo('locus-media');

        $rolePotteryManager = Role::create(['guard_name' => 'api', 'name' => 'pottery manager']);
        $rolePotteryManager->givePermissionTo('pottery-read');
        $rolePotteryManager->givePermissionTo('pottery-create');
        $rolePotteryManager->givePermissionTo('pottery-update');
        $rolePotteryManager->givePermissionTo('pottery-delete');
        $rolePotteryManager->givePermissionTo('pottery-media');

        $roleReader = Role::create(['guard_name' => 'api', 'name' => 'reader']);
        $roleReader->givePermissionTo(['locus-read', 'stone-read', 'pottery-read']);

        $reader = User::where('email', 'guest@opendigreports.com')->firstOrFail();
        $reader->assignRole($roleReader);
        
        $editor = User::where('email', 'editor@opendigreports.com')->firstOrFail();
        $editor->assignRole($roleReader, $roleLocusManager, $roleStoneManager, $rolePotteryManager);
    }
}
