import {

  useEffect,
  useState,

} from "react";

import {

  collection,
  addDoc,
  query,
  where,
  onSnapshot,

} from "firebase/firestore";

import {

  db,
  auth,

} from "../firebase";

export default function FeedbackChat({

  studentUID,

}) {

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  useEffect(() => {

    if (!studentUID) return;

    const q = query(

      collection(
        db,
        "feedback"
      ),

      where(
        "studentUID",
        "==",
        studentUID
      )
    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {

          const loadedMessages =
            [];

          snapshot.forEach(
            (doc) => {

              loadedMessages.push(
                doc.data()
              );
            }
          );

          setMessages(
            loadedMessages
          );
        }
      );

    return () =>
      unsubscribe();

  }, [studentUID]);

  const sendMessage =
    async () => {

      if (
        message.trim() === ""
      ) {

        return;
      }

      try {

        await addDoc(

          collection(
            db,
            "feedback"
          ),

          {

            studentUID,

            sender:
              auth.currentUser
                ?.displayName,

            text:
              message,

            createdAt:
              new Date(),
          }
        );

        setMessage("");

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <h2 className="text-4xl font-bold mb-8">

        💬 Mentor Feedback Chat

      </h2>

      {/* MESSAGE LIST */}

      <div className="space-y-4 max-h-[400px] overflow-y-auto mb-8">

        {messages.length === 0 ? (

          <div className="bg-slate-900 border border-slate-700 p-5 rounded-2xl">

            No feedback messages yet

          </div>

        ) : (

          messages.map(
            (
              msg,
              index
            ) => (

              <div
                key={index}

                className="bg-slate-900 border border-slate-700 p-5 rounded-2xl"
              >

                <p className="font-bold text-cyan-400 mb-2">

                  {msg.sender}

                </p>

                <p className="text-lg">

                  {msg.text}

                </p>

              </div>
            )
          )
        )}

      </div>

      {/* INPUT */}

      <div className="flex gap-4">

        <input

          type="text"

          value={message}

          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }

          placeholder="Write feedback..."

          className="flex-1 bg-slate-900 border border-slate-700 px-5 py-4 rounded-2xl outline-none"
        />

        <button

          onClick={sendMessage}

          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4 rounded-2xl font-bold hover:scale-105 transition duration-300"
        >

          Send

        </button>

      </div>

    </div>
  );
}
