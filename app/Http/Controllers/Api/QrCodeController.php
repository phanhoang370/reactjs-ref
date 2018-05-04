<?php

namespace App\Http\Controllers\Api;

use App\Models\Company;
use App\Models\Guider;
use App\Models\LinkQrCompany;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Repositories\Company\CompanyInterface;
use App\Repositories\LinkQrCompany\LinkQrCompanyInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Validator;

class QrCodeController extends Controller
{
    protected $companyRepository;
    protected $linkQrCompanyRepository;

    public function __construct (
        CompanyInterface $companyRepository,
        LinkQrCompanyInterface $linkQrCompanyRepository
    ) {
        $this->companyRepository = $companyRepository;
        $this->linkQrCompanyRepository = $linkQrCompanyRepository;
    }

    public function getQrCode1()
    {
        $qrcode1 = $this->companyRepository->getQrCode1();

        return response()->json([
            'success' => true,
            'data' => $qrcode1,
            'message' => 'Qrcode create successfully',
        ]);
    }

    public function updateQrCode1(Request $request, $id)
    {
        $qrcode1 = $this->linkQrCompanyRepository->update($id, ['guid_id' => $request->guider]);
        $qrcode1 = $this->linkQrCompanyRepository->findLinkQrCompany($qrcode1->link_qr_id);

        return response()->json([
            'success' => true,
            'data' => $qrcode1,
            'message' => 'Qrcode update successfully',
        ]);
    }

    public function storeQrCode1(Request $request)
    {
        $data = [
            'serial' => $request->serial,
            'guid_id' => $request->guid_id,
        ];
        $rules = [
            'serial' => 'required',
            'guid_id' => 'numeric',
        ];
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            return response()->json([
                'success'=> false, 
                'error'=> $validator->messages(),
            ], 400);
        }
        $qrcode1 = $this->companyRepository->createQrCode1($data['serial'], $data['guid_id']);
        $qrcode1 = $this->linkQrCompanyRepository->findLinkQrCompany($qrcode1->link_qr_id);

        return response()->json([
            'success' => true,
            'data' => $qrcode1,
            'message' => 'Qrcode create successfully',
        ]);
    }

    /**
     * generate qrcode 1: 
     * QR code 1 serial - company id - guide id
     * 
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function generateQrCode1(Request $request)
    {
        // return response()->json([
        //     'success' => true,
        //     'data' => $request->all(),
        //     'message' => 'Qrcode create successfully',
        // ]);

        $create = false;
        $data = [
            'serial' => $request->serial,
        ];
        $rules = [
            'serial' => 'required',
        ];
        if ($request->guid_id) {
            $data['guid_id'] = $request->guid_id;
            $rules['guid_id'] = 'numeric';
        }
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            return response()->json([
                'success'=> false, 
                'error'=> $validator->messages(),
            ], 400);
        }

        $qrcode = QrCode::margin(0)->size(config('setting.qrcode.size'))->generate($data['serial']);
        $linkQrCompany = $this->companyRepository->findQrCode1($data['serial']);

        if ($request->guid_id) {
            $linkQrCompany = $this->companyRepository->createQrCode1($data['serial'], $data['guid_id']);
            $create = true;
        }
        $dataResponse = [
            'qrcode' => $qrcode,
            'linkQrCompany' => $linkQrCompany,
        ];

        return response()->json([
            'success' => true,
            'create' => $create,
            'data' => $dataResponse,
            'message' => 'Qrcode create successfully',
        ]);

    }

    public function generateqrcode2(Request $request)
    {

        $company_user = JWTAuth::toUser(JWTAuth::getToken());
        $company = Company::where('user_id', $company_user->user_id)->first();

        $qrcode=json_encode([$request->store_address]);

        return response()->json([
            'success' => true,
            'data' => QrCode::size(config('setting.qrcode.size'))->generate($qrcode),
            'message' => 'Qrcode create successfully',
        ]);

    }

    public function printQrCode($serial)
    {
        try {
            $this->linkQrCompanyRepository->findSerial($serial);
            $qrcode1 = QrCode::margin(0)->size(config('setting.qrcode.size'))->generate($serial);
            $linkListStore = config('setting.link.list-store');
            $qrcode2 = QrCode::margin(0)->size(config('setting.qrcode.size'))->generate($linkListStore);

            return response()->json([
                'success' => true,
                'data' => [
                    'qrcode1' => $qrcode1,
                    'qrcode2' => $qrcode2,
                ],
                'message' => 'Qrcode create successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Qrcode not found',
            ], 404);
        }
    }

    public function guiderQrcode1(Request $request){

        $guiderUser = JWTAuth::toUser(JWTAuth::getToken());
        $guider = Guider::where('user_id', $guiderUser->user_id)->first();

        $qr_code = DB::table('link_qr_companies')
            ->where('company_id',$request->company_id)
            ->where('guid_id',$guider->guid_id)
            ->select('qr_code')
            ->get()->first();

        $qrcode1 = QrCode::margin(0)->size($request->input('size'))->generate($qr_code->qr_code);

        return response()->json([
            'success' => true,
            'data' => [
                'qrcode1' => $qrcode1,
            ],
            'message' => 'Qrcode create successfully',
        ]);

    }

    public function guiderQrcode2(Request $request){

        $linkListStore = config('setting.link.list-store');
        $qrcode2 = QrCode::margin(0)->size($request->input('size'))->generate($linkListStore);

        return response()->json([
            'success' => true,
            'data' => [
                'qrcode2' => $qrcode2,
            ],
            'message' => 'Qrcode create successfully',
        ]);

    }
}

