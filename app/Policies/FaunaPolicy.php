<?php

namespace App\Policies;

use App\Models\Dig\Fauna;
use App\Models\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FaunaPolicy
{
    use HandlesAuthorization;

    public function viewAny(?User $user)
    {
        return true;
    }

    public function view(?User $user, Fauna $Fauna)
    {
        return true;
    }
    
    public function create(User $user)
    {
        return $user->hasPermissionTo('Fauna-create', 'api');
    }
    
    public function update(User $user, Fauna $Fauna)
    {       
        return $user->hasPermissionTo('Fauna-update', 'api');
    }

    public function delete(User $user, Fauna $Fauna)
    {
        return $user->hasPermissionTo('Fauna-delete', 'api');
    }
}
