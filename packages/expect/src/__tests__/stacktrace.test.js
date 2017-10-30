/**
 * Copyright (c) 2014-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const jestExpect = require('../');

jestExpect.extend({
  toMatchPredicate(received, argument) {
    argument(received);
    return {
      message: () => '',
      pass: true,
    };
  },
});

it('stack trace points to correct location when using matchers', () => {
  try {
    jestExpect(true).toBe(false);
  } catch (error) {
    expect(error.stack).toContain('stacktrace.test.js:23');
  }
});

it('stack trace points to correct location when using nested matchers', () => {
  try {
    jestExpect(true).toMatchPredicate(value => {
      jestExpect(value).toBe(false);
    });
  } catch (error) {
    expect(error.stack).toContain('stacktrace.test.js:32');
  }
});