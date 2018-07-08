'use strict';

import { ClsTweet } from "./../../lib/clsTweet";
import { MockDbConnect } from "../../mockDb/mockDbConnection"

describe('Test for cart class', () => {

    beforeAll(async (done) => {
        await MockDbConnect.dbConnect();
        await MockDbConnect.dropTestCollection();
        done();
    });
    test('Scenario sending valid body object ====>\n', async (done) => {
        let tweet: any = {
            _id: "",
            content: "Hello dear",
            created_at: "",
            updated_at: ""
        };

        ClsTweet.addTweet(tweet).then((data: any) => {
            expect(data).toBeTruthy()
            done();
        }).catch((error) => {
            console.log('errr test', error)
            done();
        })
    });
});
