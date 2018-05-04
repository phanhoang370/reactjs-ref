<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\City\CityInterface;
use App\Http\Requests\CreateCityRequest;
use App\Http\Requests\UpdateCityRequest;
use Validator;

class CityController extends Controller
{
    protected $cityRepository;

    public function __construct (CityInterface $cityRepository)
    {
        $this->cityRepository = $cityRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->limit;
        if ($limit) {
            $cities = $this->cityRepository->paginate($limit);
        } else {
            $cities = $this->cityRepository->all();
        }

        return response()->json([
            'success' => true, 
            'data'=> $cities
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCityRequest $request)
    {
        $city = $this->cityRepository->create($data);

        return response()->json([
            'success' => true,
            'data' => $city,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $city = $this->cityRepository->find($id);

        return response()->json([
            'success' => true,
            'data' => $city,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCityRequest $request, $id)
    {
        $city = $this->cityRepository->update($id, $data);

        return response()->json([
            'success' => true,
            'data' => $city,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $id = $request->id;
        $this->cityRepository->delete($id);

        return response()->json([
            'success' => true,
        ]);
    }
}
