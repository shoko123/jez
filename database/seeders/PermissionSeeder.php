<?php

namespace Database\Seeders;

use App\Models\Auth\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['guard_name' => 'api', 'name' => 'Area-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'Area-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'Area-media']);

        Permission::create(['guard_name' => 'api', 'name' => 'Season-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'Season-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'Season-media']);

        Permission::create(['guard_name' => 'api', 'name' => 'AreaSeason-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'AreaSeason-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'AreaSeason-media']);

        Permission::create(['guard_name' => 'api', 'name' => 'Locus-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'Locus-create']);
        Permission::create(['guard_name' => 'api', 'name' => 'Locus-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'Locus-delete']);
        Permission::create(['guard_name' => 'api', 'name' => 'Locus-media']);
        Permission::create(['guard_name' => 'api', 'name' => 'Locus-tag']);

        Permission::create(['guard_name' => 'api', 'name' => 'Stone-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'Stone-create']);
        Permission::create(['guard_name' => 'api', 'name' => 'Stone-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'Stone-delete']);
        Permission::create(['guard_name' => 'api', 'name' => 'Stone-media']);
        Permission::create(['guard_name' => 'api', 'name' => 'Stone-tag']);

        Permission::create(['guard_name' => 'api', 'name' => 'Pottery-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'Pottery-create']);
        Permission::create(['guard_name' => 'api', 'name' => 'Pottery-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'Pottery-delete']);
        Permission::create(['guard_name' => 'api', 'name' => 'Pottery-media']);
        Permission::create(['guard_name' => 'api', 'name' => 'Pottery-tag']);

        Permission::create(['guard_name' => 'api', 'name' => 'Lithic-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'Lithic-create']);
        Permission::create(['guard_name' => 'api', 'name' => 'Lithic-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'Lithic-delete']);
        Permission::create(['guard_name' => 'api', 'name' => 'Lithic-media']);
        Permission::create(['guard_name' => 'api', 'name' => 'Lithic-tag']);

        Permission::create(['guard_name' => 'api', 'name' => 'Glass-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'Glass-create']);
        Permission::create(['guard_name' => 'api', 'name' => 'Glass-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'Glass-delete']);
        Permission::create(['guard_name' => 'api', 'name' => 'Glass-media']);
        Permission::create(['guard_name' => 'api', 'name' => 'Glass-tag']);

        Permission::create(['guard_name' => 'api', 'name' => 'Metal-read']);
        Permission::create(['guard_name' => 'api', 'name' => 'Metal-create']);
        Permission::create(['guard_name' => 'api', 'name' => 'Metal-update']);
        Permission::create(['guard_name' => 'api', 'name' => 'Metal-delete']);
        Permission::create(['guard_name' => 'api', 'name' => 'Metal-media']);
        Permission::create(['guard_name' => 'api', 'name' => 'Metal-tag']);

        // create roles and assign existing permissions

        $roleAreaManager = Role::create(['guard_name' => 'api', 'name' => 'Area manager']);
        $roleAreaManager->givePermissionTo('Area-read');
        $roleAreaManager->givePermissionTo('Area-update');
        $roleAreaManager->givePermissionTo('Area-media');

        $roleSeasonManager = Role::create(['guard_name' => 'api', 'name' => 'Season manager']);
        $roleSeasonManager->givePermissionTo('Season-read');
        $roleSeasonManager->givePermissionTo('Season-update');
        $roleSeasonManager->givePermissionTo('Season-media');

        $roleAreaSeasonManager = Role::create(['guard_name' => 'api', 'name' => 'AreaSeason manager']);
        $roleAreaSeasonManager->givePermissionTo('AreaSeason-read');
        $roleAreaSeasonManager->givePermissionTo('AreaSeason-update');
        $roleAreaSeasonManager->givePermissionTo('AreaSeason-media');

        $roleLocusManager = Role::create(['guard_name' => 'api', 'name' => 'Locus manager']);
        $roleLocusManager->givePermissionTo('Locus-read');
        $roleLocusManager->givePermissionTo('Locus-create');
        $roleLocusManager->givePermissionTo('Locus-update');
        $roleLocusManager->givePermissionTo('Locus-delete');
        $roleLocusManager->givePermissionTo('Locus-media');
        $roleLocusManager->givePermissionTo('Locus-tag');

        $roleStoneManager = Role::create(['guard_name' => 'api', 'name' => 'Stone manager']);
        $roleStoneManager->givePermissionTo('Stone-read');
        $roleStoneManager->givePermissionTo('Stone-create');
        $roleStoneManager->givePermissionTo('Stone-update');
        $roleStoneManager->givePermissionTo('Stone-delete');
        $roleStoneManager->givePermissionTo('Stone-media');
        $roleStoneManager->givePermissionTo('Stone-tag');

        $rolePotteryManager = Role::create(['guard_name' => 'api', 'name' => 'Pottery manager']);
        $rolePotteryManager->givePermissionTo('Pottery-read');
        $rolePotteryManager->givePermissionTo('Pottery-create');
        $rolePotteryManager->givePermissionTo('Pottery-update');
        $rolePotteryManager->givePermissionTo('Pottery-delete');
        $rolePotteryManager->givePermissionTo('Pottery-media');
        $rolePotteryManager->givePermissionTo('Pottery-tag');

        $roleLithicManager = Role::create(['guard_name' => 'api', 'name' => 'Lithic manager']);
        $roleLithicManager->givePermissionTo('Lithic-read');
        $roleLithicManager->givePermissionTo('Lithic-create');
        $roleLithicManager->givePermissionTo('Lithic-update');
        $roleLithicManager->givePermissionTo('Lithic-delete');
        $roleLithicManager->givePermissionTo('Lithic-media');
        $roleLithicManager->givePermissionTo('Lithic-tag');

        $roleGlassManager = Role::create(['guard_name' => 'api', 'name' => 'Glass manager']);
        $roleGlassManager->givePermissionTo('Glass-read');
        $roleGlassManager->givePermissionTo('Glass-create');
        $roleGlassManager->givePermissionTo('Glass-update');
        $roleGlassManager->givePermissionTo('Glass-delete');
        $roleGlassManager->givePermissionTo('Glass-media');
        $roleGlassManager->givePermissionTo('Glass-tag');

        $roleMetalManager = Role::create(['guard_name' => 'api', 'name' => 'Metal manager']);
        $roleMetalManager->givePermissionTo('Metal-read');
        $roleMetalManager->givePermissionTo('Metal-create');
        $roleMetalManager->givePermissionTo('Metal-update');
        $roleMetalManager->givePermissionTo('Metal-delete');
        $roleMetalManager->givePermissionTo('Metal-media');
        $roleMetalManager->givePermissionTo('Metal-tag');

        $roleReader = Role::create(['guard_name' => 'api', 'name' => 'reader']);
        $roleReader->givePermissionTo(['Area-read', 'Season-read', 'AreaSeason-read', 'Locus-read', 'Stone-read', 'Pottery-read', 'Lithic-read', 'Glass-read', 'Metal-read']);

        $reader = User::where('email', 'guest@opendigreports.com')->firstOrFail();
        $reader->assignRole($roleReader);

        $editor = User::where('email', 'editor@opendigreports.com')->firstOrFail();
        $editor->assignRole($roleAreaManager, $roleSeasonManager, $roleAreaSeasonManager, $roleLocusManager, $roleStoneManager, $rolePotteryManager, $roleLithicManager, $roleGlassManager, $roleMetalManager);
    }
}
