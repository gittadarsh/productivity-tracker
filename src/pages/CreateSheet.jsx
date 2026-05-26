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

  const [
    assignedSection,
    setAssignedSection
  ] = useState("");

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

        alert(
          "Failed to load sheets"
        );
      }
    };

  /* CREATE SHEET */

  const createSheet =
    async () => {

      if (
        !sheetName ||
        !description ||
        !assignedSection
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
            "sheets"
          ),

          {

            sheetName,

            description,

            assignedSection,

            assignedStudents: [],

            createdBy:
              auth.currentUser
                ?.displayName,

            createdAt:
              new Date(),
          }
        );

        setSheetName("");

        setDescription("");

        setAssignedSection("");

        alert(
          "Sheet Created Successfully!"
        );

        loadSheets();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create sheet"
        );
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

          <select

            value={assignedSection}

            onChange={(e) =>
              setAssignedSection(
                e.target.value
              )
            }

            className="bg-slate-900 border border-slate-700 p-4 rounded-2xl outline-none"
          >

            <option value="">
              Select Section
            </option>

            <option value="Section A">
              Section A
            </option>

            <option value="Section B">
              Section B
            </option>

            <option value="Section C">
              Section C
            </option>

          </select>

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
                {sheet.assignedSection}

              </p>

              <p className="text-sm text-slate-400 mb-2">

                👨‍🏫 Created By:
                {" "}
                {sheet.createdBy}

              </p>

              <p className="text-sm text-slate-500">

                👥 Assigned Students:
                {" "}
                {
                  sheet
                    .assignedStudents
                    ?.length
                }

              </p>

            </div>
          )
        )}

      </div>

    </div>
  );
}