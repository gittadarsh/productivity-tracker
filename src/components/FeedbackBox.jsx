import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { db, auth } from "../firebase";

export default function FeedbackBox({
  studentId,
}) {

  const [feedback,
    setFeedback] =
    useState("");

  const [feedbacks,
    setFeedbacks] =
    useState([]);

  const loadFeedbacks =
    async () => {

      try {

        const q = query(

          collection(
            db,
            "feedback"
          ),

          where(
            "studentId",
            "==",
            studentId
          )
        );

        const querySnapshot =
          await getDocs(q);

        const feedbackList = [];

        querySnapshot.forEach(
          (doc) => {

            feedbackList.push(
              doc.data()
            );
          }
        );

        setFeedbacks(
          feedbackList
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    loadFeedbacks();

  }, []);

  const sendFeedback =
    async () => {

      if (
        feedback.trim() === ""
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
            mentorId:
              auth.currentUser.uid,

            studentId:
              studentId,

            text:
              feedback,

            createdAt:
              new Date(),
          }
        );

        setFeedback("");

        loadFeedbacks();

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mt-10">

      <h2 className="text-3xl font-bold mb-6">

        💬 Mentor Feedback

      </h2>

      {/* INPUT */}

      <div className="flex gap-4 mb-8">

        <input
          type="text"

          placeholder="Write feedback..."

          value={feedback}

          onChange={(e) =>
            setFeedback(
              e.target.value
            )
          }

          className="bg-slate-900 border border-slate-700 p-4 rounded-2xl w-full outline-none text-white"
        />

        <button
          onClick={sendFeedback}

          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 rounded-2xl font-bold hover:scale-105 transition duration-300"
        >

          Send

        </button>

      </div>

      {/* FEEDBACK LIST */}

      <div className="space-y-4">

        {feedbacks.length === 0 ? (

          <p className="text-slate-400">

            No feedback yet

          </p>

        ) : (

          feedbacks.map(
            (item, index) => (

              <div
                key={index}

                className="bg-slate-900 border border-slate-700 p-5 rounded-2xl"
              >

                <p className="text-lg">

                  {item.text}

                </p>

              </div>
            )
          )
        )}

      </div>

    </div>
  );
}