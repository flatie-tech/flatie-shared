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
//# sourceMappingURL=chunk-OOJKTZT4.cjs.map
//# sourceMappingURL=chunk-OOJKTZT4.cjs.map