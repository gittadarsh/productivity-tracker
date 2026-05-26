import {

  useEffect,
  useState,

} from "react";

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

import {

  Link,

} from "react-router-dom";

export default function MentorDashboard() {

  const [students, setStudents] =
    useState([]);

  const [
    activeStudents,
    setActiveStudents
  ] = useState(0);

  const [
    weakStudents,
    setWeakStudents
  ] = useState(0);

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

          const studentsData =
            [];

          querySnapshot.forEach(
            (doc) => {

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
            }
          );

          setStudents(
            studentsData
          );

          /* ANALYTICS */

          if (
            studentsData.length > 0
          ) {

            setActiveStudents(

              Math.floor(
                studentsData.length
                * 0.7
              )
            );

            setWeakStudents(

              Math.floor(
                studentsData.length
                * 0.3
              )
            );
          }

        } catch (error) {

          console.log(error);

          alert(
            "Failed to load students"
          );
        }
      };

    loadStudents();

  }, []);

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        👨‍🏫 Mentor Dashboard

      </h1>

      {/* ANALYTICS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            👥 Total Students

          </h2>

          <p className="text-5xl font-bold text-cyan-400">

            {students.length}

          </p>

        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            🔥 Active Students

          </h2>

          <p className="text-5xl font-bold text-green-400">

            {activeStudents}

          </p>

        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">

            ⚠ Weak Performers

          </h2>

          <p className="text-5xl font-bold text-red-400">

            {weakStudents}

          </p>

        </div>

      </div>

      {/* STUDENTS */}

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

            {students.map(
              (
                student,
                index
              ) => (

                <div
                  key={index}

                  className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6 rounded-3xl shadow-2xl"
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

                  {/* RANDOM STATUS */}

                  <div className="mt-4">

                    <p className="text-green-400 font-semibold">

                      🔥 Active Progress

                    </p>

                    <p className="text-slate-300 text-sm mt-1">

                      Weekly consistency improving

                    </p>

                  </div>

                  <Link
                    to={`/student/${student.uid}`}

                    className="mt-5 inline-block bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
                  >

                    View Progress

                  </Link>

                </div>
              )
            )}

          </div>
        )
      }

    </div>
  );
}