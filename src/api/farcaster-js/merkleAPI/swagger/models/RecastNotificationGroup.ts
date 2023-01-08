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
import { NotificationRecast } from "./NotificationRecast";
/**
 *
 * @export
 * @interface Def58
 */
export interface RecastNotificationGroup {
  /**
   *
   * @type {string}
   * @memberof Def58
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Def58
   */
  type: string;
  /**
   *
   * @type {Def18}
   * @memberof Def58
   */
  latestTimestamp: number;
  /**
   *
   * @type {Def2}
   * @memberof Def58
   */
  totalItemCount: number;
  /**
   *
   * @type {Array<NotificationRecast>}
   * @memberof Def58
   */
  previewItems: Array<NotificationRecast>;
}
