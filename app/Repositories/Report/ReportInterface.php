<?php
namespace App\Repositories\Report;

interface ReportInterface
{
    public function getReportGuider ($start,$end,$id=null);
    public function reportGuiderStore($start, $end);
    public function reportCompanyStore($start, $end);
    public function reportCompanyGuider($start, $end);
}
