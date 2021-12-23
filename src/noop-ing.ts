import { Ing } from './ing-class';

/**
 * Return Ing that has completed state as default.
 * Useful for optional inputs.
 */
export function noopIng() {
  const ing = new Ing();
  ing.success();
  return ing;
}
