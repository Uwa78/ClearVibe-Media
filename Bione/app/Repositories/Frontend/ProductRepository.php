<?php

namespace App\Repositories\Frontend;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class ProductRepository
{
    /**
     * Object model will be used to modify blogs table
     */
    protected Product $model;

    /**
     * Constructor for blog repository
     */
    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    /**
     * Get search result with paginate
     *
     * @param  array  $sort
     */
    public function paginateSearchResult($search, array $filter = [], $sort = 'latest')
    {
        $query = $this->model->with(['content', 'contents'])->newQuery();

        // Apply search filters if necessary
        if (! empty($search)) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            })->orWhereHas('category.contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            })->orWhereHas('tags', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        if (! empty($filter['category'])) {
            $query->whereHas('category.content', function ($q) use ($filter) {
                $q->where('title', $filter['category']);
            });
        }

        if (! empty($filter['tag'])) {
            $query->withAnyTags([$filter['tag']]);
        }

        if (isset($filter['min_price']) && isset($filter['max_price'])) {
            $query->whereBetween('price', [
                $filter['min_price'],
                $filter['max_price'],
            ]);
        }
        if (! empty($filter['sort'])) {
            switch ($filter['sort']) {
                case 'latest':
                    $query->latest();
                    break;
                case 'low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'high':
                    $query->orderBy('price', 'desc');
                    break;
                default:
                    $query->latest();
                    break;
            }
        } else {
            $query->latest();
        }

        return $query->where('status', '1')->paginate(perPage: 9);
    }

    public function getMaxProductPrice()
    {
        return Cache::remember('max_product_price', 3600, function () {
            return Product::selectRaw('MAX(price) as max_price')->value('max_price');
        });
    }
}
