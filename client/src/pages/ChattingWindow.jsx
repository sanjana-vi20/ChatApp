import Sidebar from '../components/Sidebar'
import ContactList from '../components/ContactList'
import ChatWindow from '../components/ChatWindow'
import { useState } from 'react';

const ChattingWindow = () => {
  const [fetchmode , setFetchmode] = useState("AC");
  const [reciever , setReciever] = useState({});

  return (
    <div className="flex h-[89vh] w-full overflow-hidden bg-base-200 p-2 md:p-2 pt-3 font-sans">
      <div className="flex w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <Sidebar setFetchmode={setFetchmode} />
        <ContactList fetchmode={fetchmode} setReciever={setReciever}/>
        <ChatWindow reciever={reciever} />
      </div>
    </div>
  );
};

export default ChattingWindow;