import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail 
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
      />
    </Fragment>
  ) 
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://oliver:iXrBlngVOkAdYFtl@cluster0.zn9l74h.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db(); //建立 db 資料
  
  const meetupsCollection = db.collection('meetups'); //建立 collection
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    paths: meetups.map((meetup) => ({
      params: { meetupid: meetup._id.toString()},
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const meetupId = context.params.meetupid;

  const client = await MongoClient.connect('mongodb+srv://oliver:iXrBlngVOkAdYFtl@cluster0.zn9l74h.mongodb.net/meetups?retryWrites=true&w=majority');
  const db = client.db(); //建立 db 資料
  
  const meetupsCollection = db.collection('meetups'); //建立 collection
  const selectMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId), });
  console.log(selectMeetup);
  client.close();

  return {
    props: {
      meetupData: {
        id: selectMeetup._id.toString(),
        title: selectMeetup.title,
        address: selectMeetup.address,
        image: selectMeetup.image,
        description: selectMeetup.description,
      }
    },
  }
}

export default MeetupDetails;