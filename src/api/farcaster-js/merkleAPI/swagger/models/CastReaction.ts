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
import { User } from "./User";
/**
 *
 * @export
 * @interface Def37
 */
export interface CastReaction {
  /**
   *
   * @type {Def8}
   * @memberof Def37
   */
  type: CastReactionType;
  /**
   *
   * @type {Def11}
   * @memberof Def37
   */
  hash: string;
  /**
   *
   * @type {User}
   * @memberof Def37
   */
  reactor: User;
  /**
   *
   * @type {Def18}
   * @memberof Def37
   */
  timestamp: number;
  /**
   *
   * @type {Def6}
   * @memberof Def37
   */
  castHash: string;
}
