import { ArrowRight, Plus, XIcon } from "lucide-react";
import { useRef, useState } from "react";

const AddNewSessionModal = () => {
  const modal = useRef<HTMLDialogElement>(null);

  const openModal = () => modal.current?.showModal();
  const [details, setDetails] = useState<string>();
  return (
    <div>
      <button
        onClick={() => openModal()}
        className="btn bg-white text-black mt-5 rounded-xl px-4 md:px-8 hover:scale-105 active:scale-95 transition-all hover:bg-black hover:text-white font-bold"
      >
        <Plus className="size-6 font-bold" />
        Start a Consultation{" "}
      </button>
      <dialog id="my_modal_2" ref={modal} className="modal">
        <div className="modal-box  rounded-2xl">
          <h2 className="font-bold text-lg">Add Basic Details</h2>
          <div>
            {" "}
            <p className="py-4">Add Symptoms or Any Other Details</p>
            <textarea
              rows={6}
              placeholder="Add details here..."
              className="textarea w-full"
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className="flex justify-end items-center mt-4 gap-2">
            <form method="dialog">
              <button className="btn btn-outline px-6 bg-white text-black rounded-lg hover:bg-gray-300 active:scale-95 transition-all duration-300">
                Cancel
              </button>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                <XIcon />
              </button>
            </form>

            <button
              disabled={!details}
              className={`btn px-4 ${
                details ? "bg-black" : "bg-gray-400"
              }  text-white rounded-lg hover:bg-gray-500 active:scale-95 transition-all duration-300`}
            >
              Next <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button></button>
        </form>
      </dialog>
    </div>
  );
};

export default AddNewSessionModal;
