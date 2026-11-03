import { describe, expect, it } from '@jest/globals';
import { createItemSchema, editItemSchema } from '../src/schemas/cli.js';

describe('custom item fields', () => {
    it('accepts text, hidden, boolean, and linked fields', () => {
        const result = createItemSchema.safeParse({
            name: 'API credentials',
            type: 2,
            secureNote: { type: 0 },
            fields: [
                { name: 'Text', value: 'value', type: 0 },
                { name: 'Secret', value: 'secret', type: 1 },
                { name: 'Enabled', value: 'true', type: 2 },
                { name: 'Username', value: null, type: 3, linkedId: 100 },
            ],
        });

        expect(result.success).toBe(true);
    });

    it('requires linkedId for linked fields', () => {
        const result = editItemSchema.safeParse({
            id: 'item-id',
            fields: [{ name: 'Username', type: 3 }],
        });

        expect(result.success).toBe(false);
    });

    it('allows an empty array to clear fields', () => {
        expect(editItemSchema.safeParse({ id: 'item-id', fields: [] }).success).toBe(true);
    });

    it('allows fields to be omitted so existing fields are preserved', () => {
        expect(editItemSchema.safeParse({ id: 'item-id' }).success).toBe(true);
    });
});
