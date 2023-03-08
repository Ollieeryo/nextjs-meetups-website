// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';


function NewMeetupPage () {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    //路由為api資料夾及裡面的檔案
    const response = await fetch('/api/new-meetup',{
      method: 'POST',
      body: JSON.stringify(enteredMeetupData), //將表單輸入的資料傳入
      headers: {
        'Content-Type': 'application/json'
      }
    }); 

    const data = await response.json();

    console.log(data);

    // 確保提交表單之後直接回到首頁
    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name="description" content="Add your own meetups and enhance networking" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </Fragment>
  )
}

export default NewMeetupPage;