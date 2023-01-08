/* tslint:disable */
/* eslint-disable */
/**
 * Merkle API
 * API documentation for all publicly exposed APIs provided by Merkle Manufactory, Inc for Farcaster V2.
 *
 * OpenAPI spec version: 2.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import { CastReactionType } from "./CastReactionType";

/**
 *
 * @export
 * @interface V2CastReactionsBody1
 */
export interface V2CastReactionsBody1 {
  /**
   *
   * @type {Def8}
   * @memberof V2CastReactionsBody1
   */
  type: CastReactionType;
  /**
   *
   * @type {Def6}
   * @memberof V2CastReactionsBody1
   */
  castHash: string;
}
