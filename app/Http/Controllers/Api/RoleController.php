<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\Role\RoleInterface;
use App\Http\Requests\CreateRoleRequest;
use Validator;
use DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RoleController extends Controller
{
    protected $roleRepository;

    public function __construct (RoleInterface $roleRepository)
    {
        $this->roleRepository = $roleRepository;
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
            $roles = $this->roleRepository->paginate($limit);
        } else {
            $roles = $this->roleRepository->withCount('perms')->get();
        }

        return response()->json([
            'success' => true, 
            'data'=> $roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateRoleRequest $request)
    {
        $data = [
            'name' => $request->name,
            'display_name' => $request->display_name,
            'description' => $request->description,
            'permissions' => $request->permissions,
        ];

        DB::beginTransaction();
        try {
            $role = $this->roleRepository->create($data);
            $role->savePermissions($data['permissions']);
            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $role,
            ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'data' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!is_numeric($id)) {
            return response()->json([
                'success' => false,
            ], 404);
        }
        try {
            $role = $this->roleRepository->findRole($id);

            return response()->json([
                'success' => true,
                'data' => $role,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->only('name', 'display_name', 'description', 'permissions');

        $rules = [
            'name' => 'required',
            'display_name' => 'required',
            'description' => 'required',
            'permissions' => 'required',
        ];
        $validator = Validator::make($data, $rules);
        if ($validator->fails()) {
            return response()->json([
                'success'=> false, 
                'error'=> $validator->messages(),
            ], 400);
        }
        DB::beginTransaction();
        try {
            $role = $this->roleRepository->update($id, $data);
            $role->savePermissions($data['permissions']);
            DB::commit();

            return response()->json([
                'success' => true,
                'data' => $role,
            ]);
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json([
                'success' => false,
                'data' => $e->getMessage(),
            ], 400);
        }
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
        if ($id == 1) {
            return response()->json([
                'success' => false,
                'data' => $id,
                'message' => 'Can not delete this role',
            ], 403);
        }
        $this->roleRepository->delete($id);

        return response()->json([
            'success' => true,
            'data' => $id,
        ]);
    }

    public function getRole()
    {
        $roles = $this->roleRepository->getRoleForCreateUpdate();

        return response()->json([
            'success' => true, 
            'data'=> $roles
        ]);
    }
}
