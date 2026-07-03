import { $ZodErrorMap } from 'zod/v4/core';

declare function export_default(): {
    localeError: $ZodErrorMap;
};

declare function setZodLocale(lang: string): void;

export { export_default as hrLocale, setZodLocale };
