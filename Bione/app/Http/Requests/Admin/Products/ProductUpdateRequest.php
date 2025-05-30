<?php

namespace App\Http\Requests\Admin\Products;

use App\Models\Setting;
use Illuminate\Foundation\Http\FormRequest;

class ProductUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'category_id' => ['nullable', 'exists:product_categories,id'],
            'short_description' => ['nullable'],
            'sku' => ['required'],
            'quantity' => ['required'],
            'price' => ['required', 'numeric', 'min:0'],
            'discount_price' => ['nullable', 'numeric'],
            'thumbnail_image' => ['max:2048'],
            'slider_images' => ['array', 'min:1'],
            'slider_images.*' => ['max:2048'],
            'status' => ['required', 'boolean'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],
        ];

        // Append language-specific validation rules
        $languages = json_decode(Setting::pull('languages'));
        foreach ($languages as $language) {
            $langCode = $language->code;
            $rules[$langCode.'_name'] = 'required|max:255';
            $rules[$langCode.'_description'] = 'required';
        }

        return $rules;
    }
}
