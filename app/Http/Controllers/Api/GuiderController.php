<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CreateGuiderRequest;
use App\Http\Requests\UpdateGuiderRequest;
use App\Jobs\SendUserVerificationEmail;
use App\Models\Company;
use App\Models\Guider;
use App\Models\Store;
use App\Repositories\User\UserInterface;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Guider\GuiderInterface;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;
use App\Repositories\Company\CompanyInterface;
use App\Repositories\Country\CountryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class GuiderController extends Controller
{
    protected $guiderRepository;
    protected $userRepository;

    public function __construct(
        GuiderInterface $guiderRepository,
        UserInterface $userRepository,
        CompanyInterface $companyRepository
    )
    {
        $this->guiderRepository = $guiderRepository;
        $this->userRepository = $userRepository;
        $this->companyRepository = $companyRepository;
    }

    public function company()
    {
        $guider_user = JWTAuth::toUser(JWTAuth::getToken());
        $guider = Guider::where('user_id', $guider_user->user_id)->first();

        $company = DB::table('companies')
            ->join('guiders', 'companies.company_id', '=', 'guiders.company_id')
            ->where('guiders.guid_id', $guider->guid_id)->get()->toArray();

        return response()->json([
            'success' => true,
            'data' => $company
        ]);
    }

    public function report(Request $request)
    {

        $guider_user = JWTAuth::toUser(JWTAuth::getToken());
        $guider = Guider::where('user_id', $guider_user->user_id)->first();

        if ($request->input('company_id') < 0) {
            $reports = \App\Models\Guider::with(['reports' => function ($query) use ($request, $guider) {
                $query->select('guid_id', 'store_name', DB::raw('SUM(bill_tot_cost) as bill_tot_cost'));
                $query->where('guid_id', $guider->guid_id);
                $query->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')]);
                $query->groupBy('guid_id', 'store_name');
            }])
                ->select('guid_id', 'guid_name')
                ->get();

            $total = DB::table('reports')
                ->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')])
                ->where('guid_id', $guider->guid_id)
                ->select(DB::raw('SUM(company_fee) as total'))
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'report'=>$reports,
                    'total'=>$total
                ],
                'message' => 'Report of Store',
            ]);

        } else {

            $reports = \App\Models\Guider::with(['reports' => function ($query) use ($request, $guider) {
                $query->select('store_id', 'store_name', DB::raw('SUM(bill_tot_cost) as bill_tot_cost'));
                $query->where('guid_id', $guider->guid_id);
                $query->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')]);
                $query->groupBy('store_id', 'store_name');
            }])
                ->where('company_id', $request->input('company_id'))
                ->select('guid_id', 'guid_name')
                ->get();

            $total = DB::table('reports')
                ->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')])
                ->where('guid_id', $guider->guid_id)
                ->where('company_id', $request->input('company_id'))
                ->select(DB::raw('SUM(company_fee) as total'))
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'report'=>$reports,
                    'total'=>$total
                ],
                'message' => 'Report of Store',
            ]);

        }
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
            $cities = $this->guiderRepository->paginate($limit);
        } else {
            $cities = $this->guiderRepository->all();
        }

        return response()->json([
            'success' => true,
            'data' => $cities
        ]);
    }

    public function getCompanyGuider(Request $request)
    {
        $guiders = $this->companyRepository->getAllGuider();

        return response()->json([
            'success' => true,
            'data' => $guiders,
        ]);

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
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateGuiderRequest $request)
    {

        $guider = [
            'guid_id' => $request->guid_id,
            'guid_name' => $request->guid_name,
            'guid_phone' => $request->guid_phone,
            'guid_resident_number' => $request->guid_resident_number,
            'manager_guid_id' => $request->manager_guid_id ? $request->manager_guid_id : 0,
            'guid_level' => $request->guid_level,
            'city_id' => $request->city,
            'guid_status' => 1,
        ];

        DB::beginTransaction();
        try {

            $guider = $this->companyRepository->createGuider($guider);


            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $guider,
                'message' => 'Create guide successfully',
            ]);
        } catch (Exception $e) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $guider = $this->guiderRepository->findGuider($id);

            return response()->json([
                'success' => true,
                'data' => $guider,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
            ], 404);
        }
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGuiderRequest $request, $id)
    {
        $guider = [
            'guid_name' => $request->guid_name,
            'guid_phone' => $request->guid_phone,
            'guid_resident_number' => $request->guid_resident_number,
            'manager_guid_id' => $request->manager_guid_id ? $request->manager_guid_id : 0,
            'guid_level' => $request->guid_level,
            'guid_status' => 1,
            'city_id' => $request->city,
        ];
        DB::beginTransaction();
        try {
            $guider = $this->guiderRepository->update($id, $guider);

            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $guider,
                'message' => 'Update guide successfully',
            ]);
        } catch (Exception $e) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $guider = $this->companyRepository->deleteGuider($id);

        if ($guider) {
            return response()->json([
                'success' => true,
                'message' => 'Delete guider successfully',
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Delete guider fail',
        ]);
    }

    public function sendEmail($mailTo, $token)
    {
        $job = (new SendUserVerificationEmail($mailTo, $token))
            ->onConnection('database')
            ->onQueue('emails');
        $this->dispatch($job);
    }

    public function generateToken()
    {
        return str_random(30);
    }

    public function getManager()
    {
        $select = [
            'guid_id',
            'guid_name',
        ];
        $guiders = $this->guiderRepository->getManager($select);

        return response()->json([
            'success' => true,
            'data' => $guiders,
        ]);
    }

    public function getGuiderForCreateUser()
    {
        $guiders = $this->guiderRepository->getGuiderForCreateUser();

        return response()->json([
            'success' => true,
            'data' => $guiders,
        ]);
    }
}

