import { useState, useEffect } from "react";

function EditProfileModal({
  isOpen,
  onClose,
  user,
  onSave,
}) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  useEffect(() => {

    if (user) {

      setName(user.name);

      setEmail(user.email);

    }

  }, [user]);

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-[420px]">

        <h2 className="text-3xl font-bold text-white mb-6">

          Edit Profile

        </h2>

        <div className="space-y-5">

          <div>

            <label className="text-slate-300">

              Full Name

            </label>

            <input

              type="text"

              value={name}

              onChange={(e)=>setName(e.target.value)}

              className="w-full mt-2 p-3 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"

            />

          </div>

          <div>

            <label className="text-slate-300">

              Email

            </label>

            <input

              type="email"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              className="w-full mt-2 p-3 rounded-xl bg-slate-800 text-white border border-slate-700 outline-none"

            />

          </div>

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button

            onClick={onClose}

            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600"

          >

            Cancel

          </button>

          <button

            onClick={() =>

              onSave({

                name,

                email

              })

            }

            className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600"

          >

            Save

          </button>

        </div>

      </div>

    </div>

  );

}

export default EditProfileModal;