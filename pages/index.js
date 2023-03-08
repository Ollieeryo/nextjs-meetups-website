import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups website</title>
        <meta name="description" content="Try and use the meetups list and make some friends" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
  
//   //fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

export async function getStaticProps() {
  //fetch data from API
  //這段代碼並不會包在客戶端，this code will execute when this page is pre-generated
  const client = await MongoClient.connect('mongodb+srv://oliver:iXrBlngVOkAdYFtl@cluster0.zn9l74h.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db(); //建立或連接 db 資料
  
  const meetupsCollection = db.collection('meetups'); //建立或連接 collection
  //使用 mongodb 的 find 方法把所有 collection 資料找出來，同時這是異步請求 await
  const meetups = await meetupsCollection.find().toArray(); //把資料轉成 array
  //完成上述流程記得關閉 mongodb 連結
  client.close();
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(), //記得 id 要轉成字串
      }))
    },
    revalidate: 1,
  };
}

export default HomePage;