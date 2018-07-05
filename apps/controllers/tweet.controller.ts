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
                let id: string = req.params.id;
                console.log('id : ',id);
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
                console.log(req.query);
               let pageNo :number=  parseInt(req.query.page, 10) || 1;
               let pageSize:number = parseInt(req.query.pagesize, 10) || 5; 
               let id: string = req.params.id;
               console.log('pageNo : ',pageNo)
               console.log('pageSize : ',pageSize)
               ClsTweet.getTweetList(pageNo,pageSize).then((data) => {
                   console.log('result : ',data)
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
                let bodyData: any = req.body;
                let id: string = req.params.id;
                //TODO: Save data in database.
                res.send(bodyData);
            });
            app.delete('/api/v1/tweet/:id', (req, res) => {
                //TODO:Delete data from database
                let id: string = req.params.id;
                res.json({ id: id, message: 'record deleted' });
            });

            app.get('/', (req, res) => {
                res.send('server started on post 3001');
            });
            resolve();
        })
    }
}
