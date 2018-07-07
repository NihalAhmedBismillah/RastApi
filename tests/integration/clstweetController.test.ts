'use strict';
const request = require('request');
import { App } from './../../app'
const baseUrl = "http://localhost:8080";

describe.skip('Test for cart class', () => {

    test('Scenario check server started or not ====>\n', async (done) => {
        request(baseUrl, (error, response, body) => {
            console.log('body', body);

            // expect(response.statusCode).toBe(200);
            done();
        });
    });

    test('Scenario post request ====>\n', async (done) => {

        let tweet: any = {
            _id: "",
            content: "Hello dear",
            created_at: "",
            updated_at: ""
        };
        let option: any = {
            json: JSON.stringify(tweet),
            method: "POST",
            url: `${baseUrl}/api/v1/tweet`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        request(option, (error, response, body) => {
            console.log('body', body);
           // expect(response.statusCode).toBe(200);
            done();
        });

    });
});