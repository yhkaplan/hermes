/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';

import type {ESNode} from 'hermes-estree';

import {VisitorKeys as FlowVisitorKeys} from 'hermes-eslint';

export function isNode(thing: mixed): boolean %checks {
  return (
    typeof thing === 'object' && thing != null && typeof thing.type === 'string'
  );
}

export type VisitorKeysType = $ReadOnly<{[string]: $ReadOnlyArray<string>}>;
export function getVisitorKeys<T: ESNode>(
  node: T,
  visitorKeys?: ?VisitorKeysType,
): $ReadOnlyArray<$Keys<T>> {
  const keys = (visitorKeys ?? FlowVisitorKeys)[node.type];
  if (keys == null) {
    throw new Error(`No visitor keys found for node type "${node.type}".`);
  }

  // $FlowExpectedError[prop-missing]
  return keys;
}
