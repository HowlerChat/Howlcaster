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
import { User } from "./User";
import { NotificationCastReactionContent } from "./NotificationCastReactionContent";
/**
 *
 * @export
 * @interface Def47
 */
export interface NotificationCastReaction {
  /**
   *
   * @type {string}
   * @memberof Def47
   */
  type: "cast-reaction";
  /**
   *
   * @type {string}
   * @memberof Def47
   */
  id: string;
  /**
   *
   * @type {Def18}
   * @memberof Def47
   */
  timestamp: number;
  /**
   *
   * @type {User}
   * @memberof Def47
   */
  actor: User;
  /**
   *
   * @type {NotificationCastReactionContent}
   * @memberof Def47
   */
  content: NotificationCastReactionContent;
}
