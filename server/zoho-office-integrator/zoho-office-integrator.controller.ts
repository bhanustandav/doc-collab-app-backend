// eslint-disable-next-line no-unused-vars
const fs = require('fs');
const request = require('request');


export default class ZohoOfficeIntegratorCtrl {
  // eslint-disable-next-line no-unused-vars
   create(req: any, res: any, next: any) {
    const inputData = req.body;
    const formData = {};

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in inputData) {
      // @ts-ignore
      formData[key.toString()] = inputData[key];
    }


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: 'https://writer.zoho.com/writer/v1/officeapi/document?apikey=19232f09d016ec7d0cba5e057d7dd652',
      formData
    };

    request(options, (err: any, httpResponse: any, body: any) => {
      if (err) console.log(err);
      console.log(body);
      return res.send(body);
    });
  }

// eslint-disable-next-line no-unused-vars
   edit(req: any, res: any, next: any) {
    const inputData = req.body;
    const formData = {};

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in inputData) {
      // @ts-ignore
      formData[key.toString()] = inputData[key];
    }


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: 'https://writer.zoho.com/writer/v1/officeapi/document?apikey=19232f09d016ec7d0cba5e057d7dd652',
      formData
    };

    request(options, (err: any, httpResponse: any, body: any) => {
      if (err) console.log(err);
      console.log(body);
      return res.send(body);
    });
  }

// eslint-disable-next-line no-unused-vars
   deleteDocument(req:any, res: any, next: any) {
    const inputData = req.body;


    const options = {
      method: 'DELETE',
      url: `https://writer.zoho.com/writer/v1/officeapi/session/${inputData.sessionKey}?apikey=19232f09d016ec7d0cba5e057d7dd652`
    };

    request(options, (err: any, httpResponse: any, body: any) => {
      if (err) console.log(err);
      console.log(body);
      return res.send(body);
    });
  }

  saveDocument1(req: any, res: any, next: any) {
     return res.send('Ok')
  }

  saveDocument(req: any, res: any, next: any) {
    const inputData = req.body;
    const formData : any= {};

    console.log("input")
    console.log(inputData)
    // // eslint-disable-next-line guard-for-in,no-restricted-syntax
    // for (const key in inputData) {
    //   // @ts-ignore
    //   formData[key.toString()] = inputData[key];
    // }

    formData['apikey'] = '19232f09d016ec7d0cba5e057d7dd652'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url: `https://writer.zoho.com/writer/officeapi/v1/document/${inputData.sessionKey}/save`,
      formData
    };
  console.log(`https://writer.zoho.com/writer/officeapi/v1/document/${inputData.sessionKey}/save`)
    console.log('################')
    request(options, (err: any, httpResponse: any, body: any) => {
      if (err) console.log("error"+err);
      console.log(body);
      return res.send(body);
    });
  }

}
