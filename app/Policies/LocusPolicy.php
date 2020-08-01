<?php

namespace App\Policies;

use App\Models\Locus;
use App\Models\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LocusPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return true;
    }

    public function view(User $user, Locus $locus)
    {
        return true;
    }
    
    public function create(User $user)
    {
        return $user->hasPermissionTo('locus-create', 'api');
    }
    
    public function update(User $user, Locus $locus)
    {       
        return $user->hasPermissionTo('locus-update', 'api');
    }

    public function delete(User $user, Locus $locus)
    {
        return $user->hasPermissionTo('locus-delete', 'api');
    }


   
}
