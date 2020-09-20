<?php

namespace App\Policies;

use App\Models\Dig\Stone;
use App\Models\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StonePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return true;
    }

    public function view(User $user, Stone $stone)
    {
        return true;
    }
    
    public function create(User $user)
    {
        return $user->hasPermissionTo('Stone-create', 'api');
    }
    
    public function update(User $user, Stone $stone)
    {       
        return $user->hasPermissionTo('Stone-update', 'api');
    }

    public function delete(User $user, Stone $stone)
    {
        return $user->hasPermissionTo('Stone-delete', 'api');
    }
}
