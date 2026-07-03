import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'constants/index': 'src/constants/index.ts',
    'enums/index': 'src/enums/index.ts',
    'errors/index': 'src/errors/index.ts',
    'schemas/index': 'src/schemas/index.ts',
    'tokens/index': 'src/tokens/index.ts',
    'types/index': 'src/types/index.ts',
    'urls/index': 'src/urls/index.ts',
    'utils/index': 'src/utils/index.ts',
    'validation/index': 'src/validation/index.ts',
    'locales/index': 'src/locales/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  clean: true,
  treeshake: true,
  sourcemap: true,
  external: ['zod'],
  onSuccess: 'node scripts/emit-tokens-assets.mjs',
});
