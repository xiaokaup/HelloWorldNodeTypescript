import { Router } from 'express';
import {
  createVM,
  getMockOperationCommand,
  getS3BucketList,
  getS3BucketObjectSignedUrl,
  receiveOperationCommandResult,
} from '../controllers/CAWS';

export const RAWS = Router();

/**
 * @openapi
 * tags:
 *   name: AWS EC2
 *   description: AWS routes
 */
/**
 * @openapi
 * tags:
 *   name: AWS S3
 *   description: AWS routes
 */
/**
 * @openapi
 * /aws/createVM:
 *  post:
 *     description: Post to create a new VM win/linux
 *     tags:
 *         - AWS EC2
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      os:
 *                          type: string
 *                          default: Windows
 *     responses:
 *         '200':
 *             description: Success
 *         '400':
 *             description: Missing parameters
 *         '500':
 *             description: Error
 */
RAWS.route('/createVM').post(createVM);

/**
 * @openapi
 * /aws/getS3BucketList:
 *  get:
 *     description: getS3BucketList
 *     tags:
 *         - AWS S3
 *     responses:
 *         '200':
 *             description: Success
 *         '400':
 *             description: Missing parameters
 *         '500':
 *             description: Error
 */

RAWS.route('/getS3BucketList').get(getS3BucketList);

/**
 * @openapi
 * /aws/getS3BucketObjectSignedUrl:
 *  post:
 *     description: getS3BucketObjectSignedUrl
 *     tags:
 *         - AWS S3
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      fileName:
 *                          type: string
 *                          default: first_script.sh
 *     responses:
 *         '200':
 *             description: Success
 *         '400':
 *             description: Missing parameters
 *         '500':
 *             description: Error
 */

RAWS.route('/getS3BucketObjectSignedUrl').post(getS3BucketObjectSignedUrl);
