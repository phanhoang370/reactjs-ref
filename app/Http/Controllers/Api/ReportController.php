<?php

namespace App\Http\Controllers\Api;

use App\Models\Report;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Report\ReportInterface;
use Validator;

class ReportController extends Controller
{
    protected $reportRepository;

    public function __construct (ReportInterface $reportRepository) {
        $this->reportRepository = $reportRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function guider(Request $request){


        return response()->json([
            'success' => true,
            'data' => $this->reportRepository->getReportGuider(
                $request->input('startDate'),
                $request->input('endDate'),
                $request->input('guid_id')
            ),
            'message' => 'Report successfully',
        ]);
    }


    public function index(Request $request)
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->only('name', 'phone', 'address', 'city_id');

        $rules = [
            'name' => 'required',
            'phone' => 'required',
            'address' => 'required',
            'city_id' => 'required',
        ];
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            return response()->json([
                'success'=> false, 
                'error'=> $validator->messages(),
            ], 400);
        }

        $store = $this->storeRepository->create($data);

        return response()->json([
            'success' => true,
            'data' => $store,
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
        $store = $this->storeRepository->find($id);

        return response()->json([
            'success' => true,
            'data' => $store,
        ]);
    }

    public function reportGuiderStore(Request $request)
    {
        $reports = $this->reportRepository->reportGuiderStore(
            explode('T', $request->input('startDate'))[0],
            explode('T', $request->input('endDate'))[0]
        );

        return response()->json([
            'success' => true,
            'data' => $reports,
            'message' => 'Report successfully !!',
        ]);
    }

    public function reportCompanyStore(Request $request)
    {
        $reports = $this->reportRepository->reportCompanyStore(
            $request->input('startDate'),
            $request->input('endDate')
        );

        return response()->json([
            'success' => true,
            'data' => $reports,
            'message' => 'Report successfully !!',
        ]);
    }

    public function reportCompanyGuider(Request $request)
    {
        $reports = $this->reportRepository->reportCompanyGuider(
            $request->input('startDate'),
            $request->input('endDate')
        );

        return response()->json([
            'success' => true,
            'data' => $reports,
            'message' => 'Report successfully !!',
        ]);
    }
}
