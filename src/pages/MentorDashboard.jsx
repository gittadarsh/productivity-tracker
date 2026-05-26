import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  db,
  auth,
} from "../firebase";

import { Link } from "react-router-dom";

export default function MentorDashboard() {

  const [students, setStudents] =
    useState([]);

  useEffect(() => {

    const loadStudents =
      async () => {

        try {

          const mentorUID =
            auth.currentUser.uid;

          const q = query(

            collection(
              db,
              "users"
            ),

            where(
              "mentorId",
              "==",
              mentorUID
            )
          );

          const querySnapshot =
            await getDocs(q);

          const studentsData = [];

          querySnapshot.forEach((doc) => {

            const data =
              doc.data();

            if (
              data.role ===
              "student"
            ) {

              studentsData.push(
                data
              );
            }
          });

          setStudents(
            studentsData
          );

        } catch (error) {

          console.log(error);
        }
      };

    loadStudents();

  }, []);

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        👨‍🏫 Mentor Dashboard

      </h1>

      {
        students.length === 0 ? (

          <div className="bg-slate-800 p-8 rounded-3xl">

            <h2 className="text-3xl font-bold">

              No Students Assigned

            </h2>

            <p className="text-slate-300 mt-4">

              Students connected to you
              will appear here.

            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {students.map((student, index) => (

              <div
                key={index}

                className="bg-slate-800 p-6 rounded-3xl shadow-lg"
              >

                <img
                  src={student.photo}
                  alt="profile"

                  className="w-20 h-20 rounded-full mb-4"
                />

                <h2 className="text-2xl font-bold">

                  {student.name}

                </h2>

                <p className="text-slate-300 mt-2">

                  {student.email}

                </p>

                <p className="text-sm text-slate-400 mt-2">

                  Assigned Student

                </p>

                <Link
                  to={`/student/${student.uid}`}

                  className="mt-5 inline-block bg-cyan-500 px-5 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition"
                >

                  View Progress

                </Link>

              </div>
            ))}

          </div>
        )
      }

    </div>
  );
}