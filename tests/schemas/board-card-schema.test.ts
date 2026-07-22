import { describe, expect, it } from 'vitest';
import { createBoardCardSchema, updateBoardCardSchema } from '../../src/schemas';

const base = { title: 'Popraviti rasvjetu' };

/**
 * Card create/update travels as multipart/form-data, so booleans arrive as
 * the strings "true"/"false". Bare z.boolean() here rejected every UI card
 * create/edit (regression guard — notices had the identical bug).
 */
describe('board card schemas — multipart boolean coercion', () => {
  it('accepts and coerces string allowComments on create', () => {
    expect(createBoardCardSchema.parse({ ...base, allowComments: 'true' }).allowComments).toBe(
      true,
    );
    expect(createBoardCardSchema.parse({ ...base, allowComments: 'false' }).allowComments).toBe(
      false,
    );
  });

  it('accepts and coerces string allowComments on update', () => {
    expect(updateBoardCardSchema.parse({ allowComments: 'true' }).allowComments).toBe(true);
    expect(updateBoardCardSchema.parse({ allowComments: false }).allowComments).toBe(false);
  });

  it('leaves allowComments undefined when omitted (backend applies the default)', () => {
    expect(createBoardCardSchema.parse(base).allowComments).toBeUndefined();
    expect(updateBoardCardSchema.parse({}).allowComments).toBeUndefined();
  });
});
