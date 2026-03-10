import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import api from "../config/Api";

const ContactList = ({ fetchmode  , setReciever}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/user/fetch-all-contacts");
      setContacts(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("contacts :", contacts);

  useEffect(() => {
    fetchContacts();
  }, [fetchmode]);
  return (
    <>
      <div className="w-80 bg-base-100 flex flex-col border-r border-base-content/5">
        <div className="p-6">
          <h1 className="text-2xl font-black text-base-content mb-4 uppercase tracking-widest">
            Chats
          </h1>
          {/* Using accent for the focus ring of the search bar */}
          <label className="input input-filled bg-base-200 focus-within:ring-accent rounded-2xl flex items-center gap-2">
            <IoSearch className="text-base-content/50" />
            <input
              type="text"
              className="grow border-none focus:ring-0 text-sm"
              placeholder="Search friends..."
            />
          </label>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {contacts.map(
            (
              item,
              idx, // Note: item first, then idx
            ) => (
              <div
                className="flex items-center gap-4 p-3 bg-accent/10 border-r-4 border-accent rounded-xl cursor-pointer"
                key={item._id} 
                onClick={()=>setReciever(item)}// Use item._id for better performance than index
              >
                <div className="avatar online">
                  <div className="w-12 rounded-xl">
                    <img
                      src={
                        item.profilePic ||
                        `https://i.pravatar.cc/150?u=${item._id}`
                      }
                      alt="contact"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-base-content">
                    {item.fullName}
                  </h3>
                  <p className="text-xs text-accent font-medium truncate">
                    {item.email}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default ContactList;
