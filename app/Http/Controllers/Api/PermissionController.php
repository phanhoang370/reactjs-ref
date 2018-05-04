<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Permission\PermissionInterface;

class PermissionController extends Controller
{
    protected $permissionRepository;

    public function __construct (PermissionInterface $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
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
            $permissions = $this->permissionRepository->paginate($limit);
        } else {
            $permissions = $this->permissionRepository->all();
        }

        return response()->json([
            'success' => true, 
            'data'=> $permissions
        ]);
    }
}
