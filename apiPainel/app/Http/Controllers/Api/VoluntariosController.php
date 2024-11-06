<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVoluntarioRequest;
use App\Http\Resources\VoluntarioResorce;
use App\Models\voluntario;
use Illuminate\Http\Request;

class VoluntariosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $voluntarios = voluntario::all();
        return VoluntarioResorce::collection($voluntarios);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreVoluntarioRequest $request)
    {
        $voluntario = voluntario::create($request -> validated());
        return new VoluntarioResorce($voluntario);
    }

    /**
     * Display the specified resource.
     */
    public function show(voluntario $voluntario)
    {
        return new VoluntarioResorce($voluntario);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreVoluntarioRequest $request, voluntario $voluntario)
    {
        $voluntario->update($request->validated());
        return new VoluntarioResorce($voluntario);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(voluntario $voluntario)
    {
        $voluntario -> delete();
        return Response(null, 204);
    }
}
