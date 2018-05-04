<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\BillRequest;
use App\Models\Bill;
use App\Models\LinkQrCompany;
use App\Models\Store;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class BillController extends Controller
{
    public function index(Request $request)
    {
        $store_user = JWTAuth::toUser(JWTAuth::getToken());
        $store = DB::table('stores')
            ->join('link_company_store','stores.store_id','=','link_company_store.store_id')
            ->where('link_company_store.user_id', $store_user->user_id)->first();

        return response()->json([
            'success' => true,
            'data' => Bill::whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')])
                ->where('store_id', $store->store_id)
                ->orderByDesc('bill_date')
                ->get()
                ->toArray(),
            'message' => 'List bill successfully',

        ]);
    }

    public function dcrate(Request $request){

        $store_user = JWTAuth::toUser(JWTAuth::getToken());
        $store = DB::table('stores')
            ->join('link_company_store','stores.store_id','=','link_company_store.store_id')
            ->where('link_company_store.user_id', $store_user->user_id)->first();

        $dc_rate = DB::table('link_qr_companies')
            ->join('companies','link_qr_companies.company_id','=','companies.company_id')
            ->join('link_company_store','companies.company_id','=','link_company_store.company_id')
            ->where('link_qr_companies.qr_code',$request->input('qr_code'))
            ->where('link_company_store.store_id',$store->store_id)
            ->select('link_company_store.dc_rate')
            ->get()->first();

        return response()->json([
            'success' => true,
            'data' => $dc_rate,
            'message' => 'Dcrate successfully',

        ]);
    }

    public function update(Request $request, $id)
    {
        $bill = Bill::findOrFail($id);
        $bill->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $bill,
            'message' => 'Create user successfully',

        ]);
    }

    //
    public function register(Request $request)
    {
        $data = $request->all();
        $store_user = JWTAuth::toUser(JWTAuth::getToken());
        $store = DB::table('stores')
            ->join('link_company_store','stores.store_id','=','link_company_store.store_id')
            ->where('link_company_store.user_id', $store_user->user_id)->first();

        $linkQr = LinkQrCompany::where('qr_code',$request->input('qr_code'))->first();

        $data['store_id'] = $store->store_id;
        $data['bill_date'] = date('Y-m-d H:i:s');

        $data['city_id'] = $linkQr->city_id;

        //hard code
        $data['company_id'] = $linkQr->company_id;
        $data['guid_id'] = $linkQr->guid_id;


        $bill = Bill::create($data);

        return response()->json([
            'success' => true,
            'data' => $bill,
            'message' => 'Create user successfully',
        ]);

    }

    public function company()
    {

        $store_user = JWTAuth::toUser(JWTAuth::getToken());
        $store = DB::table('stores')
            ->join('link_company_store','stores.store_id','=','link_company_store.store_id')
            ->where('link_company_store.user_id', $store_user->user_id)->first();

        $company = DB::table('companies')
            ->join('link_company_store', 'companies.company_id', '=', 'link_company_store.company_id')
            ->join('stores', 'link_company_store.store_id', '=', 'stores.store_id')
            ->where('stores.store_id', $store->store_id)
            ->get()
            ->toArray();

        return response()->json([
            'success' => true,
            'data' => $company,
            'message' => 'Company of Store',
        ]);

    }

    public function reportGuider(Request $request)
    {

        $store_user = JWTAuth::toUser(JWTAuth::getToken());
        $store = DB::table('stores')
            ->join('link_company_store','stores.store_id','=','link_company_store.store_id')
            ->where('link_company_store.user_id', $store_user->user_id)->first();

        if ($request->input('company_id') < 0) {

            $reports = \App\Models\Company::with(['reports' => function ($query) use ($request, $store) {
                $query->select('company_id', 'guid_name', DB::raw('SUM(bill_tot_cost) as bill_tot_cost'));
                $query->where('store_id', $store->store_id);
                $query->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')]);
                $query->groupBy('company_id', 'guid_name');
            }])
                ->select('company_id', 'company_name')
                ->get();

            $total = DB::table('reports')
                ->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')])
                ->where('store_id', $store->store_id)
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

            $reports = \App\Models\Company::with(['reports' => function ($query) use ($request, $store) {
                $query->select('company_id', 'guid_name', DB::raw('SUM(bill_tot_cost) as bill_tot_cost'));
                $query->where('store_id', $store->store_id);
                $query->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')]);
                $query->groupBy('company_id', 'guid_name');
            }])
                ->where('company_id', $request->input('company_id'))
                ->select('company_id', 'company_name')
                ->get();

            $total = DB::table('reports')
                ->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')])
                ->where('store_id', $store->store_id)
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

    public function reportDate(Request $request)
    {

        $store_user = JWTAuth::toUser(JWTAuth::getToken());
        $store = DB::table('stores')
            ->join('link_company_store','stores.store_id','=','link_company_store.store_id')
            ->where('link_company_store.user_id', $store_user->user_id)->first();

        if ($request->input('company_id') < 0) {

            $reports = \App\Models\Company::with(['reports' => function ($query) use ($request, $store) {
                $query->select('company_id', 'bill_date', DB::raw('SUM(bill_tot_cost) as bill_tot_cost'));
                $query->where('store_id', $store->store_id);
                $query->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')]);
                $query->groupBy('company_id', 'bill_date');
            }])
                ->select('company_id', 'company_name')
                ->get();

            $total = DB::table('reports')
                ->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')])
                ->where('store_id', $store->store_id)
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

            $reports = \App\Models\Company::with(['reports' => function ($query) use ($request, $store) {
                $query->select('company_id', 'bill_date', DB::raw('SUM(bill_tot_cost) as bill_tot_cost'));
                $query->where('store_id', $store->store_id);
                $query->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')]);
                $query->groupBy('company_id', 'bill_date');
            }])
                ->where('company_id', $request->input('company_id'))
                ->select('company_id', 'company_name')
                ->get();

            $total = DB::table('reports')
                ->whereBetween('bill_date', [$request->input('startDate'), $request->input('endDate')])
                ->where('store_id', $store->store_id)
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
}
