import { IoSend, IoCallOutline, IoVideocamOutline, IoInformationCircleOutline, IoAdd } from "react-icons/io5";

const ChatWindow = ({reciever}) => {
  return (
    <div className="flex-1 flex flex-col bg-base-100 relative h-full">
      {/* 1. Header: Glassmorphism Design */}
      <div className="sticky top-0 z-20 p-4 border-b border-base-content/5 bg-base-100/70 backdrop-blur-xl flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <div className="avatar online">
            <div className="w-11 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2">
              {/* <img src={reciever} alt="Sanjana" /> */}
            </div>
          </div>
          <div>
            <h2 className="font-black text-base-content tracking-tight">{reciever.fullName}</h2>
            <div className="flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <p className="text-[10px] text-base-content/60 font-bold uppercase tracking-tighter">Online</p>
            </div>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button className="btn btn-ghost btn-circle btn-sm text-base-content/70"><IoCallOutline size={20}/></button>
          <button className="btn btn-ghost btn-circle btn-sm text-base-content/70"><IoVideocamOutline size={22}/></button>
          <button className="btn btn-ghost btn-circle btn-sm text-primary"><IoInformationCircleOutline size={22}/></button>
        </div>
      </div>

      {/* 2. Message Area: Patterned Background */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-base-200/30 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        
        {/* Date Divider */}
        <div className="divider text-[10px] uppercase font-bold opacity-30">Today</div>

        {/* Incoming Message */}
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-8 rounded-lg">
              {/* <img src="https://i.pravatar.cc/150?u=sanjana" /> */}
            </div>
          </div>
          <div className="chat-bubble chat-bubble-secondary rounded-2xl rounded-tl-none shadow-sm text-sm">
            How is the Flyon UI working? I think the primary colors look great!
          </div>
          <div className="chat-footer opacity-40 text-[10px] mt-1">12:45 PM</div>
        </div>

        {/* Outgoing Message */}
        <div className="chat chat-end">
          <div className="chat-bubble chat-bubble-primary rounded-2xl rounded-tr-none shadow-xl shadow-primary/20 text-sm font-medium">
            It's working perfectly! The components are very easy to customize. 🚀
          </div>
          <div className="chat-footer opacity-40 text-[10px] mt-1">Seen 12:46 PM</div>
        </div>
      </div>

      {/* 3. Footer: Floating Input Design */}
      <div className="p-4 bg-transparent">
        <div className="bg-base-100 border border-base-content/10 shadow-2xl rounded-3xl p-2 flex items-center gap-2">
          <button className="btn btn-circle btn-ghost btn-sm text-primary bg-primary/10">
            <IoAdd size={24} />
          </button>
          
          <input
            type="text"
            placeholder="Write a message..."
            className="grow bg-transparent border-none focus:outline-none text-sm px-2 text-base-content placeholder:text-base-content/30"
          />

          <button className="btn btn-primary rounded-2xl px-5 h-10 min-h-0 flex items-center gap-2 hover:scale-105 transition-transform active:scale-95">
            <span className="text-xs font-bold uppercase tracking-wider">Send</span>
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;