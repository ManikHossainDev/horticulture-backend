import { Schema, FilterQuery } from 'mongoose';
import { PaginateOptions, PaginateResult } from '../../../types/paginate';
// Plugin function for pagination
const paginate = <T>(schema: Schema<T>) => {
  schema.statics.paginate = async function (
    filter: FilterQuery<T>,
    options: PaginateOptions
  ): Promise<PaginateResult<T>> {
    const limit = options.limit ?? 10;
    const page = options.page ?? 1;
    const skip = (page - 1) * limit;
    const sort = options.sortBy ?? 'createdAt';
    const countPromise = this.countDocuments(filter).exec();
    let query = this.find(filter).sort(sort).skip(skip).limit(limit);
    if (options.populate) {
      query = query.populate(options.populate);
    }
    const [totalResults, results] = await Promise.all([
      countPromise,
      query.exec(),
    ]);

    return {
      results,
      page,
      limit,
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
    };
  };
};

export default paginate;
