import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

function DeleteConfirmationModal({
    open,
    onClose,
    onConfirm
}) {

    return (

        <AnimatePresence>

            {open && (

                <motion.div

                    initial={{ opacity: 0 }}

                    animate={{ opacity: 1 }}

                    exit={{ opacity: 0 }}

                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50"

                >

                    <motion.div

                        initial={{
                            scale: 0.8,
                            opacity: 0,
                            y: 50
                        }}

                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0
                        }}

                        exit={{
                            scale: 0.8,
                            opacity: 0,
                            y: 50
                        }}

                        transition={{
                            duration: 0.25
                        }}

                        className="bg-slate-900 border border-slate-700 rounded-3xl p-10 w-[90%] max-w-md shadow-2xl"

                    >

                        <div className="flex justify-center">

                            <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">

                                <FaTrashAlt
                                    size={42}
                                    className="text-red-500"
                                />

                            </div>

                        </div>

                        <h2 className="text-3xl font-bold text-center mt-8">

                            Delete Prediction?

                        </h2>

                        <p className="text-center text-slate-400 mt-4 leading-7">

                            This action cannot be undone.

                            <br />

                            The prediction will be permanently
                            removed from your history.

                        </p>

                        <div className="flex gap-5 mt-10">

                            <button

                                onClick={onClose}

                                className="flex-1 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 transition"

                            >

                                Cancel

                            </button>

                            <button

                                onClick={onConfirm}

                                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"

                            >

                                Delete

                            </button>

                        </div>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>

    );

}

export default DeleteConfirmationModal;