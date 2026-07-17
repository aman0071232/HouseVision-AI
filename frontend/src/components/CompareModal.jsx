import { useState } from "react";
import { FaTimes, FaBalanceScale } from "react-icons/fa";

export default function CompareModal({ predictions, onClose }) {


    function Feature({ icon, title, value }) {


    return (

        <div className="flex justify-between items-center bg-white/5 rounded-lg px-3 py-0">

            <div className="flex items-center gap-2">

                <span className="text-lg">

                    {icon}

                </span>

                <span className="font-medium text-xs">

                    {title}

                </span>

            </div>

            <span className="font-bold text-sm">

                {value}

            </span>

        </div>

    );

}

    const [houseA, setHouseA] = useState("");
    const [houseB, setHouseB] = useState("");

    const firstHouse = predictions.find(
        (item) => item._id === houseA
    );

    const secondHouse = predictions.find(
        (item) => item._id === houseB
    );

    return (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-6">

            <div className="bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden">

                {/* Header */}

                <div className="flex justify-between items-center px-6 py-6 border-b border-slate-700">

                    <div className="flex items-center gap-5">

                        <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex justify-center items-center">

                            <FaBalanceScale
                                size={20}
                                className="text-white"
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold">

                                Compare Houses

                            </h1>

                            <p className="text-slate-400 text-sm mt-1">

                                Compare two predictions side by side

                            </p>

                        </div>

                    </div>

                    <button

                        onClick={onClose}

                        className="w-12 h-12 rounded-full bg-red-500/20 hover:bg-red-500 transition flex justify-center items-center"

                    >

                        <FaTimes
                            className="text-red-400"
                            size={22}
                        />

                    </button>

                </div>

                {/* Selectors */}

                <div className="grid md:grid-cols-2 gap-6 p-6">

                    <div>

                        <label className="block text-slate-400 mb-3">

                            Select House A

                        </label>

                        <select

                            value={houseA}

                            onChange={(e) => setHouseA(e.target.value)}

                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm"

                        >

                            <option value="">

                                Choose House

                            </option>

                            {

                                predictions.map((item) => (

                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >

                                        ₹ {Number(item.predicted_price).toLocaleString()} | {item.input.Neighborhood}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                    <div>

                        <label className="block text-slate-400 mb-3">

                            Select House B

                        </label>

                        <select

                            value={houseB}

                            onChange={(e) => setHouseB(e.target.value)}

                            className="w-full bg-slate-800 border border-slate-700 rounded-md p-2 text-sm"

                        >

                            <option value="">

                                Choose House

                            </option>

                            {

                                predictions.map((item) => (

                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >

                                        ₹ {Number(item.predicted_price).toLocaleString()} | {item.input.Neighborhood}

                                    </option>

                                ))

                            }

                        </select>

                    </div>

                </div>

                {/* Comparison Area */}

                {

                    firstHouse && secondHouse && (


                                <div className="px-10 pb-10 flex justify-center">

                                    <div className="grid lg:grid-cols-2 gap-6 items-start max-w-2xl">

    {/* House A */}

    <div className="bg-gradient-to-br from-cyan-500 to-blue-700 rounded-3xl p-3 shadow-2xl">
        <div className="flex justify-between items-center mb-2">

            <h2 className="text-lg font-bold">
                🏠 House A
            </h2>

            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                Selected
            </span>

        </div>

        <h1 className="text-2xl font-extrabold mb-3">
            ₹ {Number(firstHouse.predicted_price).toLocaleString()}
        </h1>

        <div className="space-y-2">

            <Feature
                icon="⭐"
                title="Overall Quality"
                value={`${firstHouse.input.OverallQual}/10`}
            />

            <Feature
                icon="📐"
                title="Living Area"
                value={`${firstHouse.input.GrLivArea} sqft`}
            />

            <Feature
                icon="🚗"
                title="Garage Cars"
                value={firstHouse.input.GarageCars}
            />

            <Feature
                icon="🛏"
                title="Bedrooms"
                value={firstHouse.input.BedroomAbvGr}
            />

            <Feature
                icon="🛁"
                title="Bathrooms"
                value={firstHouse.input.FullBath}
            />

            <Feature
                icon="🍽"
                title="Kitchen"
                value={firstHouse.input.KitchenQual}
            />

            <Feature
                icon="📍"
                title="Neighborhood"
                value={firstHouse.input.Neighborhood}
            />

            <Feature
                icon="📅"
                title="Year Built"
                value={firstHouse.input.YearBuilt}
            />

        </div>

    </div>

    {/* House B */}

    <div className="bg-slate-800 rounded-3xl p-3 border border-slate-700 shadow-xl">

        <div className="flex justify-between items-center mb-2">

            <h2 className="text-lg font-bold">
                🏠 House B
            </h2>

            <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full text-xs">
                Selected
            </span>

        </div>

        <h1 className="text-2xl font-extrabold mb-3 text-cyan-400">
            ₹ {Number(secondHouse.predicted_price).toLocaleString()}
        </h1>

        <div className="space-y-2">

            <Feature
                icon="⭐"
                title="Overall Quality"
                value={`${secondHouse.input.OverallQual}/10`}
            />

            <Feature
                icon="📐"
                title="Living Area"
                value={`${secondHouse.input.GrLivArea} sqft`}
            />

            <Feature
                icon="🚗"
                title="Garage Cars"
                value={secondHouse.input.GarageCars}
            />

            <Feature
                icon="🛏"
                title="Bedrooms"
                value={secondHouse.input.BedroomAbvGr}
            />

            <Feature
                icon="🛁"
                title="Bathrooms"
                value={secondHouse.input.FullBath}
            />

            <Feature
                icon="🍽"
                title="Kitchen"
                value={secondHouse.input.KitchenQual}
            />

            <Feature
                icon="📍"
                title="Neighborhood"
                value={secondHouse.input.Neighborhood}
            />

            <Feature
                icon="📅"
                title="Year Built"
                value={secondHouse.input.YearBuilt}
            />

        </div>

    </div>

</div>
                        </div>

                    )

                }

            </div>

        </div>

    );

}