'use strict';

// src/types/pagination.types.ts
function createPaginatedResponse(data, count, offset, limit) {
  const page = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit);
  return {
    data,
    count,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
}

exports.createPaginatedResponse = createPaginatedResponse;
//# sourceMappingURL=chunk-IGBERUWL.cjs.map
//# sourceMappingURL=chunk-IGBERUWL.cjs.map