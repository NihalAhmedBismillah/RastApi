import { AppSetUp } from "./appsetUp";


export class App {

  public  static run():Promise<boolean> {

        return new Promise ((res, rej) => {

            AppSetUp.init().then(()=>{
               res(true);
            }).catch((error)=>{
                rej(error);
            })
        });
    }
}

App.run().then(()=>{

    console.log('server started : post no : 8080');

}).catch((error)=>{
    
    console.log('Error :',JSON.stringify(error));
})