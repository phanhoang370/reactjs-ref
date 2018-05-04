<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateGuiderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'guid_id' => 'required|max:11|unique:guiders,guid_id',
            'guid_name' => 'required|max:255',
            'guid_level' => 'required|numeric|digits_between:1,5',
            'guid_phone' => 'required|numeric|digits_between:9,11',
            'guid_resident_number' => 'required|max:20',
            'city' => 'required|numeric',
        ];
    }
}
