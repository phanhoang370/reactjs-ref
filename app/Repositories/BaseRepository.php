<?php
namespace App\Repositories;

abstract class BaseRepository implements RepositoryInterface
{
    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $model;

    /**
     * BaseRepository constructor.
     */
    public function __construct()
    {
        $this->makeModel();
    }

    /**
     * get model
     * 
     * @return string
     */
    abstract public function model();

    /**
     * Set model
     */
    public function makeModel()
    {
        $this->model = app()->make(
            $this->model()
        );
    }

    /**
     * Get All
     * 
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all($columns = ['*'])
    {
        return $this->model->all($columns = ['*']);
    }

    /**
     * Find
     * 
     * @param $id
     * 
     * @return mixed
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Create
     * 
     * @param array $attributes
     * 
     * @return mixed
     */
    public function create(array $attributes)
    {
        return $this->model->create($attributes);
    }

    /**
     * insert
     * 
     * @param array $attributes
     * 
     * @return mixed
     */
    public function insert(array $attributes)
    {
        return $this->model->insert($attributes);
    }

    /**
     * Update
     * 
     * @param $id
     * @param array $attributes
     * 
     * @return bool|mixed
     */
    public function update($id, array $attributes)
    {
        $result = $this->model->find($id);
        if($result) {
            $result->update($attributes);
            return $result;
        }

        return false;
    }

    /**
     * Delete
     * 
     * @param string|array $ids
     * 
     * @return mixed
     */
    public function delete($ids)
    {
        if (empty($ids)) {
            return true;
        }
        $ids = is_array($ids) ? $ids : [$ids];

        return $this->model->destroy($ids);
    }

    /**
     * where in
     * 
     * @param $column
     * @param array $values
     * 
     * @return $this
     */
    public function whereIn($column, array $values)
    {
        $values = is_array($values) ? $values : [$values];
        return $this->model->whereIn($column, $values);
    }

    /**
     * where not in
     * 
     * @param $column
     * @param array $values
     * 
     * @return $this
     */
    public function whereNotIn($column, array $values)
    {
        $values = is_array($values) ? $values : [$values];
        return $this->model->whereNotIn($column, $values);
    }

    /**
     * or where
     * 
     * @param $column 
     * @param $operator
     * @param $value
     * 
     * @return $this
     */
    public function orWhere($column, $operator = null, $value = null)
    {
        return $this->model->orWhere($column, $operator, $value);
    }

    /**
     * where
     * 
     * @param $conditions
     * @param $operator
     * @param $value
     * 
     * @return $this
     */
    public function where($conditions, $operator = null, $value = null)
    {
        return $this->model->where($conditions, $operator, $value);
    }

    /**
     * paginate
     * 
     * @param $limit
     * @param  array  $columns
     * 
     * @return mixed
     */
    public function paginate($limit = null, $columns = ['*'])
    {
        $limit = is_null($limit) ? config('setting.paginate') : $limit;

        return $this->model->paginate($limit, $columns);
    }

    /**
     * first or create
     * 
     * @param  array  $input
     * 
     * @return mixed
     */
    public function firstOrCreate(array $input = [])
    {
        return $this->model->firstOrCreate($input);
    }

    /**
     * Check if entity has relation
     *
     * @param string $relation
     *
     * @return $this
     */
    public function has($relation)
    {
        return $this->model->has($relation);
    }
    /**
     * Load relations
     *
     * @param array|string $relations
     *
     * @return $this
     */
    public function with($relations)
    {
        return $this->model->with($relations);
    }

    /**
     * Load relation with closure
     *
     * @param string $relation
     * @param closure $closure
     *
     * @return $this
     */
    public function whereHas($relation, $closure)
    {
        return $this->model->whereHas($relation, $closure);
    }

    /**
     * orderby
     * 
     * @param $column    [description]
     * @param  string $direction [description]
     * @return           [description]
     */
    public function orderBy($column, $direction = 'asc')
    {
        return $this->model->orderBy($column, $direction);
    }

    public function withCount($relation)
    {
        return $this->model->withCount($relation);
    }

    public function lists($column, $key = null)
    {
        return $this->model->pluck($column, $key);
    }

    public function select($columns = ['*'])
    {
        return $this->model->select($columns);
    }
}
