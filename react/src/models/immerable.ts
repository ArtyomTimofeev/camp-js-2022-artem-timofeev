import { immerable } from 'immer';

/**
 * Abstract class that makes other classes compatible with Immer.
 * @see {@link https://immerjs.github.io/immer/complex-objects}.
 */
export abstract class Immerable {
  /**
   * @inheritdoc
   */
  private readonly [immerable] = true;
}

export type OmitImmerable<T> = Omit<T, '[immerable]'>;
