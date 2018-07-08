import { ITweet, ClsTweet } from '../../lib/clsTweet'
interface IError {
    message: string;
    detail: any
}
export class TweetController {

    public static init(app) {

        return new Promise((resolve, reject) => {

            app.post('/api/v1/tweet', (req, res) => {

                let tweet: ITweet = req.body;
                ClsTweet.addTweet(tweet).then((data) => {
                    res.json(data);
                }).catch((error) => {
                    let resp: IError = <IError>{
                        message: error,
                        detail: 'data not saved'
                    };
                    res.json(resp);
                })
            });
            app.get('/api/v1/tweet/:id', (req, res) => {
                let id: number = req.params.id;

                ClsTweet.getTweet(id).then((data) => {
                    res.json(data);
                }).catch((error) => {
                    let resp: IError = <IError>{
                        message: error,
                        detail: 'data not get'
                    };
                    res.json(resp);
                });
            });
            app.get('/api/v1/tweet', (req, res) => {

                let pageNo: number = +req.query.page || 1;
                let pageSize: number = +req.query.pagesize || 5;
                ClsTweet.getTweetList(pageNo, pageSize).then((data) => {
                    res.json(data);
                }).catch((error) => {
                    let resp: IError = <IError>{
                        message: error,
                        detail: 'data not get'
                    };
                    res.json(resp);
                })
            });
            app.put('/api/v1/tweet/:id', (req, res) => {
                let bodyData: ITweet = req.body;
                let id: number = req.params.id;
                ClsTweet.updateTweet(id, bodyData).then((result: any) => {
                    res.send(result);
                }).catch((error) => {
                    let resp: IError = <IError>{
                        message: error,
                        detail: 'data not update '
                    };
                    res.json(resp);
                });

            });
            app.delete('/api/v1/tweet/:id', (req, res) => {
                let id: number = req.params.id;
                ClsTweet.deleteTweet(id).then((data: any) => {
                    res.send(data);
                }).catch((error) => {
                    let resp: IError = <IError>{
                        message: error,
                        detail: 'data not update '
                    };
                    res.json(resp);
                });
            });

            app.get('/', (req, res) => {
                res.send('server started on post 3001');
            });
            resolve();
        })
    }
}
