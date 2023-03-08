//only work for server, not for the users
//這裡只負責處理 API，不是設置或回傳組件的地方
// api/new-meetup
import { MongoClient } from 'mongodb';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect('mongodb+srv://oliver:iXrBlngVOkAdYFtl@cluster0.zn9l74h.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db(); //建立 db 資料
    
    const meetupsCollection = db.collection('meetups'); //建立 collection
    const result = await meetupsCollection.insertOne(data) //插入資料(物件)

    console.log(result)

    client.close(); //req流程結束後關閉連結

    res.status(201).json({ message: 'Meetup inserted!' })//回應成功訊息
  }
}

export default handler;