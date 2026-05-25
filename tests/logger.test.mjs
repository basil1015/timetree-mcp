import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeForLogging, summarizeToolArguments } from '../.test-dist/utils/logger.js';

test('sanitizeForLogging recursively masks credentials and private TimeTree content', () => {
  const raw = {
    email: 'owner@example.com',
    password: 'pw',
    safe_count: 2,
    nested: {
      title: 'private event',
      note: 'private note',
      x: 'contact me at owner@example.com',
    },
    attachment: { content: 'comment body' },
    headers: {
      Cookie: '_session_id=abc123; path=/',
      'x-csrf-token': 'token-value',
    },
  };
  raw.self = raw;

  const sanitized = sanitizeForLogging(raw);

  assert.equal(sanitized.email, '***MASKED***');
  assert.equal(sanitized.password, '***MASKED***');
  assert.equal(sanitized.safe_count, 2);
  assert.equal(sanitized.nested.title, '***MASKED***');
  assert.equal(sanitized.nested.note, '***MASKED***');
  assert.equal(sanitized.nested.x, 'contact me at ***MASKED***');
  assert.equal(sanitized.attachment, '***MASKED***');
  assert.equal(sanitized.headers.Cookie, '***MASKED***');
  assert.equal(sanitized.headers['x-csrf-token'], '***MASKED***');
  assert.equal(sanitized.self, '[Circular]');
});

test('sanitizeForLogging serializes errors without leaking response bodies', () => {
  const error = new Error('failed for owner@example.com');
  error.statusCode = 403;
  error.response = { password: 'secret' };

  const sanitized = sanitizeForLogging({ error });

  assert.equal(sanitized.error.name, 'Error');
  assert.equal(sanitized.error.message, 'failed for ***MASKED***');
  assert.equal(sanitized.error.statusCode, 403);
  assert.equal(sanitized.error.response, '***MASKED***');
});

test('summarizeToolArguments logs shape only, not values', () => {
  const summary = summarizeToolArguments({ calendar_id: 1, title: 'private', note: 'secret' });
  assert.deepEqual(summary, {
    argument_count: 3,
    argument_keys: ['calendar_id', 'note', 'title'],
  });
});
