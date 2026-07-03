import { $ZodErrorMap } from 'zod/v4/core';

declare function export_default$2(): {
    localeError: $ZodErrorMap;
};

declare function export_default$1(): {
    localeError: $ZodErrorMap;
};

declare function export_default(): {
    localeError: $ZodErrorMap;
};

declare function setZodLocale(lang: string): void;

export { export_default$2 as deLocale, export_default$1 as enLocale, export_default as hrLocale, setZodLocale };
