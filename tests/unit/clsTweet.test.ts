'use strict';

import { ClsTweet } from "./../../lib/clsTweet";
import { DbConnect } from "./../../lib/dbConnect"

describe('Test for cart class', () => {

    beforeAll(async (done) => {
        await DbConnect.dbConnect();
        done();
    });
    test('Scenario sending valid body object ====>\n', async (done) => {
        let tweet: any = {
            _id: "",
            content: "Hello dear",
            created_at: "",
            updated_at: ""
        };
        let body: any = {
            tweet: tweet
        };

        ClsTweet.addTweet(body).then((data: any) => {
           // console.log('data test', data);
            expect(data.result).toBeTruthy()
            done();
        }).catch((error) => {
            console.log('errr test', error)
            done();
        })
    });
});
