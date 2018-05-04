<?php

namespace App\Repositories\Report;

use App\Repositories\BaseRepository;
use App\Models\Report;
use DB;
use App\Repositories\Guider\GuiderInterface;
use App\Repositories\Company\CompanyInterface;
use App\Repositories\Store\StoreInterface;

class ReportRepository extends BaseRepository implements ReportInterface
{
    protected $guiderRepository;
    protected $companyRepository;

    public function __construct (
        GuiderInterface $guiderRepository,
        CompanyInterface $companyRepository,
        StoreInterface $storeRepository
    )
    {
        $this->guiderRepository = $guiderRepository;
        $this->companyRepository = $companyRepository;
        $this->storeRepository = $storeRepository;
        parent::__construct();
    }

    public function model()
    {
        return Report::class;
    }

    public function getReportGuider($start, $end, $id = null)
    {

//        $report = DB::table('reports')->join('guiders', 'guiders.guid_id', '=', 'reports.guid_id');
//        $report = $report->whereBetween('bill_date', [$start, $end]);
//        if ($id) {
//            $report = $report->where('reports.guid_id', '=', $id);
//        }
//        $report = $report->groupBy('guid_name','store_name')
//            ->select('guid_name','store_name',  DB::raw('SUM(bill_cost) as bill_tot_cost'))
//            ->get()->toArray();
//        return $report;


        $reports = $this->guiderRepository->with(['reports' => function($query) {
            $query->select('guid_id', 'store_name',  DB::raw('SUM(bill_cost) as bill_tot_cost'));
            $query->groupBy('guid_id', 'store_name');
        }]);
        if ($id) {
            $reports = $reports->where('guid_id', '=', $id);
        }
        $reports = $reports->select('guid_id', 'guid_name')
        ->get();

        return $reports;

    }

    public function reportGuiderStore($start, $end)
    {
        $company = $this->companyRepository->getCompanyFromUserLoggedIn();
        $reports = $this->guiderRepository->with(['reports' => function($query) use ($company, $start, $end) {
            $query->where('company_id', '=', $company->company_id);
            $query->whereBetween('bill_date', [$start, $end]);
            $query->select(
                'guid_id', 
                'store_name', 
                DB::raw('SUM(bill_cost) as bill_tot_cost'), 
                DB::raw('SUM(company_fee) as com_fee_cost')
            );
            $query->groupBy('guid_id', 'store_name');
        }])
        ->select('guid_id', 'guid_name')
        ->get();

        return $reports;
    }

    public function reportCompanyStore($start, $end)
    {
        $company = $this->companyRepository->getCompanyFromUserLoggedIn();
        $reports = $this->storeRepository->with(['reports' => function($query) use ($start, $end, $company) {
            $query->where('company_id', '=', $company->company_id);
            $query->whereBetween('bill_date', [$start, $end]);
            $query->select(
                'store_id', 
                'company_id', 
                DB::raw('substring(bill_date,1,7) bill_date'), 
                DB::raw('SUM(bill_cost) as bill_tot_cost'), 
                DB::raw('SUM(company_fee) as com_fee_cost')
            );
            $query->groupBy('store_id', 'company_id', DB::raw('substring(bill_date,1,7)'));
            $query->orderBy('bill_date', 'asc');
        }])
        ->select('store_id', 'store_name')
        ->get();

        return $reports;
    }

    public function reportCompanyGuider($start, $end)
    {
        $company = $this->companyRepository->getCompanyFromUserLoggedIn();
        $reports = $this->guiderRepository->with(['reports' => function($query) use ($start, $end, $company) {
            $query->where('company_id', '=', $company->company_id);
            $query->whereBetween('bill_date', [$start, $end]);
            $query->select(
                'guid_id', 
                DB::raw('substring(bill_date,1,7) bill_date'), 
                DB::raw('SUM(company_fee) as com_fee_cost')
            );
            $query->groupBy('guid_id', DB::raw('substring(bill_date,1,7)'));
            $query->orderBy('bill_date', 'asc');
        }])
        ->select('guid_id', 'guid_name', 'guid_level')
        ->get();

        return $reports;
    }
}
