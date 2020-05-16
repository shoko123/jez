<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use App\Models\Auth\User;

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
        Permission::create(['name' => 'Stone-read']);
        Permission::create(['name' => 'Stone-create']);
        Permission::create(['name' => 'Stone-update']);
        Permission::create(['name' => 'Stone-delete']);
        Permission::create(['name' => 'Stone-media']);
        
        Permission::create(['name' => 'Locus-read']);
        Permission::create(['name' => 'Locus-create']);
        Permission::create(['name' => 'Locus-update']);
        Permission::create(['name' => 'Locus-delete']);
        Permission::create(['name' => 'Locus-media']);
        
        Permission::create(['name' => 'Pottery-read']);
        Permission::create(['name' => 'Pottery-create']);
        Permission::create(['name' => 'Pottery-update']);
        Permission::create(['name' => 'Pottery-delete']);
        Permission::create(['name' => 'Pottery-media']);

        // create roles and assign existing permissions
        $roleStoneAll = Role::create(['name' => 'StoneAll']);
        $roleStoneAll->givePermissionTo('Stone-read');
        $roleStoneAll->givePermissionTo('Stone-create');
        $roleStoneAll->givePermissionTo('Stone-update');
        $roleStoneAll->givePermissionTo('Stone-delete');
        $roleStoneAll->givePermissionTo('Stone-media');

        $roleLocusAll = Role::create(['name' => 'LocusAll']);
        $roleLocusAll->givePermissionTo('Locus-read');
        $roleLocusAll->givePermissionTo('Locus-create');
        $roleLocusAll->givePermissionTo('Locus-update');
        $roleLocusAll->givePermissionTo('Locus-delete');
        $roleLocusAll->givePermissionTo('Locus-media');

        $rolePotteryAll = Role::create(['name' => 'PotteryAll']);
        $rolePotteryAll->givePermissionTo('Pottery-read');
        $rolePotteryAll->givePermissionTo('Pottery-create');
        $rolePotteryAll->givePermissionTo('Pottery-update');
        $rolePotteryAll->givePermissionTo('Pottery-delete');
        $rolePotteryAll->givePermissionTo('Pottery-media');

        $roleReadAll = Role::create(['name' => 'readAll']);
        $roleReadAll->givePermissionTo(['Locus-read', 'Stone-read', 'Pottery-read']);
        
        $userReader = User::findOrFail(1);
        $userReader->assignRole($roleReadAll);
        $userEditor = User::findOrFail(2);
        $userEditor->assignRole($roleReadAll, $roleLocusAll, $roleStoneAll,$rolePotteryAll);

        /*
        $role2 = Role::create(['name' => 'admin']);
        $role2->givePermissionTo('publish articles');
        $role2->givePermissionTo('unpublish articles');

        $role3 = Role::create(['name' => 'super-admin']);
        // gets all permissions via Gate::before rule; see AuthServiceProvider

        // create demo users
        $user = Factory(App\User::class)->create([
            'name' => 'Example User',
            'email' => 'test@example.com',
        ]);
        $user->assignRole($role1);

        $user = Factory(App\User::class)->create([
            'name' => 'Example Admin User',
            'email' => 'admin@example.com',
        ]);
        $user->assignRole($role2);

        $user = Factory(App\User::class)->create([
            'name' => 'Example Super-Admin User',
            'email' => 'superadmin@example.com',
        ]);
        $user->assignRole($role3);
        */
    }
}
