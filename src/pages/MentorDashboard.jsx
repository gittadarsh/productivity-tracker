import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

import { Link } from "react-router-dom";

export default function MentorDashboard() {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    const loadStudents = async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(db, "users")
          );

        const studentsData = [];

        querySnapshot.forEach((doc) => {

          const data = doc.data();

          if (data.role === "student") {

            studentsData.push(data);
          }
        });

        setStudents(studentsData);

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

            <Link
              to={`/student/${student.uid}`}
              className="mt-5 inline-block bg-cyan-500 px-5 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition"
            >
              View Progress
            </Link>

          </div>
        ))}

      </div>

    </div>
  );
}