
import { DbOperation } from './clsDb'
const shortid = require('shortid'),
    COLLECTION_NAME = 'TWEETS'

export interface ITweet {
    _id: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export class ClsTweet {
    /**
     * 
     * @param tweet 
     */
    public static addTweet(tweet: ITweet): Promise<ITweet> {

        return new Promise((resolve, reject) => {
            tweet._id = shortid.generate(), tweet.created_at = new Date(), tweet.updated_at = new Date();
            DbOperation.save(tweet, COLLECTION_NAME).then((data: ITweet) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * 
     * @param tweetId 
     */
    public static getTweet(tweetId: number) {

        return new Promise((res, rej) => {
            DbOperation.find({ _id: tweetId }, COLLECTION_NAME)
                .then((data: ITweet) => {
                    res(data);
                })
                .catch((error) => {
                    rej(error);
                });
        });
    }


    /**
     * 
     * @param tweetId 
     */
    public static getTweetList(pageNo: number, pageSize: number) {

        return new Promise((res, rej) => {
            DbOperation.findWithPaginantion(pageNo, pageSize, COLLECTION_NAME)
                .then((data: ITweet) => {
                    res(data);
                })
                .catch((error) => {
                    rej(error);
                });
        });
    }
    /**
     * 
     * @param tweetId 
     */
    public static deleteTweet(tweetId: number) {

        return new Promise((res, rej) => {
            DbOperation.remove({ _id: tweetId }, COLLECTION_NAME).then((data: ITweet) => {
                res(data);
            }).catch((error) => {
                rej(error);
            });
        });
    }
    /**
     * 
     * @param tweetId 
     */
    public static updateTweet(tweetId: number, postData: ITweet) {

        return new Promise((res, rej) => {
            let updateObject: any = {
                query: {
                    _id: tweetId
                },
                updateFields: {
                    content: postData.content,
                    updated_at: new Date()
                }
            }
            DbOperation.updateFields(updateObject, COLLECTION_NAME)
                .then((data: ITweet) => {
                    res(data);
                })
                .catch((error) => {
                    rej(error);
                });
        });
    }
}
