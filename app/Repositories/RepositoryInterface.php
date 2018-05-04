<?php
namespace App\Repositories;

interface RepositoryInterface
{
    /**
     * Get All
     * 
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all($columns = ['*']);

    /**
     * Find
     * 
     * @param $id
     * 
     * @return mixed
     */
    public function find($id);

    /**
     * Create
     * 
     * @param array $attributes
     * 
     * @return mixed
     */
    public function create(array $attributes);

    /**
     * Create
     * 
     * @param array $attributes
     * 
     * @return mixed
     */
    public function insert(array $attributes);

    /**
     * Update
     * 
     * @param $id
     * @param array $attributes
     * 
     * @return bool|mixed
     */
    public function update($id, array $attributes);

    /**
     * Delete
     * 
     * @param string|array $ids
     * 
     * @return mixed
     */
    public function delete($ids);

    /**
     * where in
     * 
     * @param $column
     * @param array $values
     * 
     * @return $this
     */
    public function whereIn($column, array $values);

    /**
     * where not in
     * 
     * @param $column
     * @param array $values
     * 
     * @return $this
     */
    public function whereNotIn($column, array $values);

    /**
     * or where
     * 
     * @param $column 
     * @param $operator
     * @param $value
     * 
     * @return $this
     */
    public function orWhere($column, $operator = null, $value = null);

    /**
     * where
     * 
     * @param $conditions
     * @param $operator
     * @param $value
     * 
     * @return $this
     */
    public function where($conditions, $operator = null, $value = null);

    /**
     * paginate
     * 
     * @param $limit
     * @param  array  $columns
     * 
     * @return mixed
     */
    public function paginate($limit = null, $columns = ['*']);

    /**
     * first or create
     * 
     * @param  array  $input
     * 
     * @return mixed
     */
    public function firstOrCreate(array $input = []);

    /**
     * Check if entity has relation
     *
     * @param string $relation
     *
     * @return $this
     */
    public function has($relation);

    /**
     * Load relations
     *
     * @param array|string $relations
     *
     * @return $this
     */
    public function with($relations);

    /**
     * Load relation with closure
     *
     * @param string $relation
     * @param closure $closure
     *
     * @return $this
     */
    public function whereHas($relation, $closure);

    /**
     * orderby
     * 
     * @param $column    [description]
     * @param  string $direction [description]
     * @return           [description]
     */
    public function orderBy($column, $direction = 'asc');

    public function withCount($relation);

    public function lists($column, $key = null);

    public function select($columns = ['*']);
}
