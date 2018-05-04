<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BillRequest extends FormRequest
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
            //
            'bill_cost' => 'required|numeric',
            'bill_tot_cost' => 'required|numeric',
            'dc_rate' => 'required|numeric|digits_between:1,100',
            'content' => 'required'
        ];
    }
}
