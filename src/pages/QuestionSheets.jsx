import {

  useState,
  useEffect,

} from "react";

import {

  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,

} from "firebase/firestore";

import {

  db,

} from "../firebase";

export default function QuestionSheets() {

  const [questions, setQuestions] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("");

  const [topic, setTopic] =
    useState("");

  const [link, setLink] =
    useState("");

  /* LOAD QUESTIONS */

  useEffect(() => {

    loadQuestions();

  }, []);

  const loadQuestions =
    async () => {

      try {

        const snapshot =
          await getDocs(

            collection(
              db,
              "questions"
            )
          );

        const loadedQuestions =
          [];

        snapshot.forEach(
          (doc) => {

            loadedQuestions.push({

              id: doc.id,

              ...doc.data(),
            });
          }
        );

        setQuestions(
          loadedQuestions
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load questions"
        );
      }
    };

  /* ADD QUESTION */

  const addQuestion =
    async () => {

      if (
        !title ||
        !difficulty ||
        !topic ||
        !link
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      try {

        await addDoc(

          collection(
            db,
            "questions"
          ),

          {

            title,

            difficulty,

            topic,

            link,

            solved: false,
          }
        );

        setTitle("");
        setDifficulty("");
        setTopic("");
        setLink("");

        alert(
          "Question Added Successfully!"
        );

        loadQuestions();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to add question"
        );
      }
    };

  /* TOGGLE SOLVED */

  const toggleSolved =
    async (
      questionId,
      currentSolved
    ) => {

      try {

        await updateDoc(

          doc(
            db,
            "questions",
            questionId
          ),

          {

            solved:
              !currentSolved,
          }
        );

        loadQuestions();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to update question"
        );
      }
    };

  /* PROGRESS */

  const solvedCount =
    questions.filter(
      (q) => q.solved
    ).length;

  const progress =
    questions.length > 0

      ? Math.round(

          (
            solvedCount /
            questions.length
          ) * 100
        )

      : 0;

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        📚 DSA Question Sheet

      </h1>

      {/* ADD QUESTION */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h2 className="text-3xl font-bold mb-6">

          ➕ Add Question

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Question Title"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Difficulty"

            value={difficulty}

            onChange={(e) =>
              setDifficulty(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Topic"

            value={topic}

            onChange={(e) =>
              setTopic(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Problem Link"

            value={link}

            onChange={(e) =>
              setLink(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          />

        </div>

        <button
          onClick={addQuestion}

          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-2xl font-bold mt-6 hover:scale-105 transition duration-300"
        >

          Add Question

        </button>

      </div>

      {/* PROGRESS */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h2 className="text-3xl font-bold mb-6">

          📈 Progress Tracker

        </h2>

        <div className="w-full bg-slate-700 rounded-full h-6 mb-4">

          <div

            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-6 rounded-full"

            style={{
              width:
                `${progress}%`,
            }}
          >

          </div>

        </div>

        <p className="text-2xl font-bold text-cyan-400">

          {progress}% Completed

        </p>

      </div>

      {/* QUESTIONS */}

      <div className="space-y-6">

        {questions.map(
          (question) => (

            <div
              key={question.id}

              className={`p-8 rounded-3xl border shadow-2xl transition duration-300

              ${
                question.solved

                  ? "bg-gradient-to-br from-green-500 to-emerald-700 border-green-400"

                  : "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
              }`}
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                  <h2 className="text-3xl font-bold mb-3">

                    {question.solved
                      ? "✅"
                      : "⬜"}

                    {" "}

                    {question.title}

                  </h2>

                  <p className="text-lg text-slate-200 mb-2">

                    📚 Topic:
                    {" "}
                    {question.topic}

                  </p>

                  <p className="text-lg text-slate-300">

                    ⚡ Difficulty:
                    {" "}
                    {question.difficulty}

                  </p>

                </div>

                <div className="flex gap-4 flex-wrap">

                  <a
                    href={question.link}

                    target="_blank"

                    rel="noreferrer"

                    className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition duration-300"
                  >

                    Solve Problem

                  </a>

                  <button
                    onClick={() =>
                      toggleSolved(
                        question.id,
                        question.solved
                      )
                    }

                    className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 rounded-2xl font-bold hover:scale-105 transition duration-300"
                  >

                    {
                      question.solved

                        ? "Mark Unsolved"

                        : "Mark Solved"
                    }

                  </button>

                </div>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}