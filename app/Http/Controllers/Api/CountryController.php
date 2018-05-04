<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Country\CountryInterface;
use App\Http\Requests\CreateCountryRequest;
use App\Http\Requests\UpdateCountryRequest;
use Validator;

class CountryController extends Controller
{
    protected $countryRepository;

    public function __construct (CountryInterface $countryRepository)
    {
        $this->countryRepository = $countryRepository;
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
            $cities = $this->countryRepository->paginate($limit);
        } else {
            $cities = $this->countryRepository->all();
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
    public function store(CreateCountryRequest $request)
    {
        $country = $this->countryRepository->create($data);

        return response()->json([
            'success' => true,
            'data' => $country,
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
        $country = $this->countryRepository->find($id);

        return response()->json([
            'success' => true,
            'data' => $country,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCountryRequest $request, $id)
    {
        $country = $this->countryRepository->update($id, $data);

        return response()->json([
            'success' => true,
            'data' => $country,
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
        $this->countryRepository->delete($id);

        return response()->json([
            'success' => true,
        ]);
    }
}
