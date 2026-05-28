import {

  useEffect,
  useState,

} from "react";

import {

  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,

} from "firebase/firestore";

import {

  db,
  auth,

} from "../firebase";

import toast from "react-hot-toast";

export default function Chat() {

  const [
    messages,
    setMessages
  ] = useState([]);

  const [
    newMessage,
    setNewMessage
  ] = useState("");

  /* REALTIME CHAT */

  useEffect(() => {

    const q = query(

      collection(
        db,
        "messages"
      ),

      orderBy(
        "createdAt",
        "asc"
      )
    );

    const unsubscribe =
      onSnapshot(

        q,

        (
          snapshot
        ) => {

          const loadedMessages =
            [];

          snapshot.forEach(
            (doc) => {

              loadedMessages.push({

                id: doc.id,

                ...doc.data(),
              });
            }
          );

          setMessages(
            loadedMessages
          );
        },

        (error) => {

          console.log(error);

          toast.error(
            "Realtime chat failed"
          );
        }
      );

    return () =>
      unsubscribe();

  }, []);

  /* SEND MESSAGE */

  const sendMessage =
    async () => {

      if (
        !newMessage.trim()
      ) {

        return;
      }

      try {

        await addDoc(

          collection(
            db,
            "messages"
          ),

          {

            text:
              newMessage,

            name:
              auth.currentUser
                ?.displayName,

            uid:
              auth.currentUser
                ?.uid,

            photo:
              auth.currentUser
                ?.photoURL || "",

            createdAt:
              serverTimestamp(),
          }
        );

        setNewMessage("");

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to send message"
        );
      }
    };

  return (

    <div className="max-w-5xl mx-auto">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 rounded-3xl mb-8 shadow-2xl">

        <h1 className="text-4xl font-bold text-black">

          💬 Mentor Chat

        </h1>

        <p className="text-black/80 mt-2 text-lg">

          Realtime mentor-student communication

        </p>

      </div>

      {/* CHAT BOX */}

      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 h-[600px] overflow-y-auto shadow-2xl mb-6">

        <div className="space-y-5">

          {
            messages.map(
              (
                message
              ) => {

                const isCurrentUser =
                  message.uid ===
                  auth.currentUser?.uid;

                return (

                  <div
                    key={
                      message.id
                    }

                    className={`flex

                    ${
                      isCurrentUser

                        ? "justify-end"

                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[75%] p-4 rounded-3xl shadow-lg

                      ${
                        isCurrentUser

                          ? "bg-cyan-500 text-black"

                          : "bg-slate-800 border border-slate-700"
                      }`}
                    >

                      <div className="flex items-center gap-3 mb-2">

                        <img
                          src={
                            message.photo ||

                            `https://ui-avatars.com/api/?name=${message.name}&background=06b6d4&color=fff`
                          }

                          alt="profile"

                          className="w-10 h-10 rounded-full"
                        />

                        <p className="font-bold">

                          {message.name}

                        </p>

                      </div>

                      <p className="text-lg break-words">

                        {message.text}

                      </p>

                    </div>

                  </div>
                );
              }
            )
          }

        </div>

      </div>

      {/* INPUT */}

      <div className="flex gap-4">

        <input
          type="text"

          value={newMessage}

          onChange={(e) =>
            setNewMessage(
              e.target.value
            )
          }

          placeholder="Type your message..."

          className="flex-1 bg-slate-900 border border-slate-700 p-5 rounded-2xl outline-none text-lg"
        />

        <button
          onClick={sendMessage}

          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 rounded-2xl font-bold text-black hover:scale-105 transition"
        >

          Send

        </button>

      </div>

    </div>
  );
}