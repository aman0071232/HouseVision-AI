import { FaChartLine, FaHome, FaBrain } from "react-icons/fa";

function Stats() {

    const stats = [

        {
            title:"Accuracy",
            value:"90.96%",
            icon:<FaChartLine/>
        },

        {
            title:"Training Houses",
            value:"1460",
            icon:<FaHome/>
        },

        {
            title:"AI Model",
            value:"XGBoost",
            icon:<FaBrain/>
        }

    ]

    return(

        <section className="max-w-7xl mx-auto px-8 py-10">

            <div className="grid md:grid-cols-3 gap-8">

                {
                    stats.map((item,index)=>(

                        <div
                        key={index}
                        className="bg-white/5
                        backdrop-blur-xl
                        rounded-3xl
                        p-8
                        border border-white/10">

                            <div className="text-cyan-400 text-4xl">

                                {item.icon}

                            </div>

                            <h1 className="text-4xl font-bold mt-5">

                                {item.value}

                            </h1>

                            <p className="text-gray-400 mt-2">

                                {item.title}

                            </p>

                        </div>

                    ))
                }

            </div>

        </section>

    )

}

export default Stats;