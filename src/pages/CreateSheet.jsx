import {

  useState,
  useEffect,

} from "react";

import {

  collection,
  addDoc,
  getDocs,

} from "firebase/firestore";

import {

  db,
  auth,

} from "../firebase";

export default function CreateSheet() {

  const [sheetName, setSheetName] =
    useState("");

  const [
    description,
    setDescription
  ] = useState("");

  const [section, setSection] =
    useState("");

  const [sheets, setSheets] =
    useState([]);

  /* LOAD SHEETS */

  useEffect(() => {

    loadSheets();

  }, []);

  const loadSheets =
    async () => {

      try {

        const snapshot =
          await getDocs(

            collection(
              db,
              "sheets"
            )
          );

        const loadedSheets =
          [];

        snapshot.forEach(
          (doc) => {

            loadedSheets.push({

              id: doc.id,

              ...doc.data(),
            });
          }
        );

        setSheets(
          loadedSheets
        );

      } catch (error) {

        console.log(error);
      }
    };

  /* CREATE SHEET */

  const createSheet =
    async () => {

      if (
        !sheetName ||
        !description ||
        !section
      ) {

        return;
      }

      try {

        await addDoc(

          collection(
            db,
            "sheets"
          ),

          {

            sheetName,

            description,

            section,

            createdBy:
              auth.currentUser
                ?.displayName,

            createdAt:
              new Date(),
          }
        );

        setSheetName("");
        setDescription("");
        setSection("");

        loadSheets();

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        👨‍🏫 Create Question Sheet

      </h1>

      {/* CREATE FORM */}

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl mb-10">

        <h2 className="text-3xl font-bold mb-6">

          ➕ New Sheet

        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Sheet Name"

            value={sheetName}

            onChange={(e) =>
              setSheetName(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Section"

            value={section}

            onChange={(e) =>
              setSection(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          />

        </div>

        <textarea
          placeholder="Sheet Description"

          value={description}

          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }

          className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none w-full mt-4 h-32"
        />

        <button
          onClick={createSheet}

          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-2xl font-bold mt-6 hover:scale-105 transition duration-300"
        >

          Create Sheet

        </button>

      </div>

      {/* SHEETS */}

      <div className="space-y-6">

        {sheets.map(
          (sheet) => (

            <div
              key={sheet.id}

              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl"
            >

              <h2 className="text-3xl font-bold mb-4">

                📚 {sheet.sheetName}

              </h2>

              <p className="text-lg text-slate-300 mb-3">

                📝 {sheet.description}

              </p>

              <p className="text-lg text-cyan-400 mb-2">

                🎓 Section:
                {" "}
                {sheet.section}

              </p>

              <p className="text-sm text-slate-400">

                Created By:
                {" "}
                {sheet.createdBy}

              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}