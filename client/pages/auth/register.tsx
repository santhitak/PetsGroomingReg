import { SetStateAction, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  pets: Pets;
};

type Pets = {
  name: string;
  type: PetTypes;
  age: number;
};

enum PetTypes {
  unselected = "",
  rabbit = "Rabbit",
  dog = "Dog",
  cat = "Cat",
  bird = "Bird",
}

const allPetTypes = [
  {
    value: PetTypes.unselected,
  },
  {
    value: PetTypes.rabbit,
  },
  {
    value: PetTypes.cat,
  },
  {
    value: PetTypes.dog,
  },
  { value: PetTypes.bird },
];

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<any>(PetTypes.unselected);
  const [petAge, setPetAge] = useState(0);

  const setSelectedType = (e: { target: { value: SetStateAction<any> } }) => {
    setPetType(e.target.value);
  };

  const mySwal = Swal.mixin({
    customClass: {
      confirmButton: "py-2 px-4 bg-gray-500 rounded font-semibold text-white",
      cancelButton:
        "py-2 px-4 bg-gray-300 text-gray-800 mr-4 rounded font-semibold",
    },
    buttonsStyling: false,
  });

  const validation = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !petAge ||
      !petName ||
      petType === PetTypes.unselected
    ) {
      mySwal.fire({
        title: "Please complete the form",
        icon: "warning",
        timer: 3000,
      });
      return;
    }
  };

  const submitUserInfo = async () => {
    validation();

    const data: UserInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      pets: {
        name: petName,
        age: petAge,
        type: petType,
      },
    };

    mySwal
      .fire({
        title: "Submit Register?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) mySwal.fire("Registered", "", "success");
              if (response.status !== 200)
                mySwal.fire("Error Occured", "", "error");
            })
            .catch((err: any) => {
              console.log(err);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          mySwal.fire("Cancelled", "", "error");
        }
      });
  };

  return (
    <>
      <div className="w-full h-screen bg-pets flex justify-center items-center">
        <div className="w-2/5 min-h-[60vh] h-auto bg-white/60 backdrop-blur-md rounded-lg shadow-lg font-semibold text-gray-900">
          <div className="p-10 flex flex-col space-y-4">
            <div className="flex space-x-4">
              <div>
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  className="mt-2 border w-full rounded p-2"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  className="mt-2 border w-full rounded p-2"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="text"
                className="mt-2 border w-full rounded p-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <div>
                <label htmlFor="">Pet Name</label>
                <input
                  type="text"
                  className="mt-2 border w-full rounded p-2"
                  onChange={(e) => setPetName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Pet Age</label>
                <input
                  type="number"
                  className="mt-2 border w-full rounded p-2"
                  min={0}
                  onChange={(e) => setPetAge(e.target.valueAsNumber)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Pet Type</label>
              <select
                className="p-2 w-full rounded mt-2 border"
                onChange={setSelectedType}
              >
                {allPetTypes.map((item: { value: PetTypes }, i: number) => (
                  <option value={item.value} key={i} className="py-5">
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="bg-gray-100 py-2 rounded"
              onClick={submitUserInfo}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
