<?php

namespace App\Http\Controllers;

use App\Models\Finds\Find;
use Illuminate\Http\Request;

class FindController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Find::count();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Finds\FindRegistration  $findRegistration
     * @return \Illuminate\Http\Response
     */
    public function show(Find $find)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Finds\FindRegistration  $findRegistration
     * @return \Illuminate\Http\Response
     */
    public function edit(Find $find)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Finds\FindRegistration  $findRegistration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Find $find)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Finds\FindRegistration  $findRegistration
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {    
        $find = Find::findOrFail($id); 
        
        if ($find->delete($id)) {
            return $find;
        }
    }
    
    public function image($id)
    {    
        $find = Find::findOrFail($id); 
        
        if ($find->delete($id)) {
            return $find;
        }
    }
}
