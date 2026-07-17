import { FaSearch, FaMapMarkerAlt, FaSortAmountDown } from "react-icons/fa";

export default function FilterBar({
  search,
  setSearch,
  neighborhood,
  setNeighborhood,
  sortBy,
  setSortBy,
  total,
  filtered
}) {

  const neighborhoods = [
    "All",
    "NAmes",
    "CollgCr",
    "OldTown",
    "Edwards",
    "Gilbert",
    "Somerst",
    "NridgHt",
    "Sawyer",
    "BrkSide"
  ];

  return (

    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 mb-10">

      <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4 items-center">

        {/* Search */}

        <div className="relative">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

          <input
            type="text"
            placeholder="Search Neighborhood..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-400"
          />

        </div>

        {/* Neighborhood */}

        <div className="relative">

          <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

          <select
            value={neighborhood}
            onChange={(e)=>setNeighborhood(e.target.value)}
            className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-400"
          >

            {

              neighborhoods.map(item=>(

                <option key={item} value={item}>

                  {item}

                </option>

              ))

            }

          </select>

        </div>

        {/* Sort */}

        <div className="relative">

          <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

          <select
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
            className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-cyan-400"
          >

            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="high">Highest Price</option>
            <option value="low">Lowest Price</option>

          </select>

        </div>

        {/* Result Counter */}

        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl py-3 px-5 text-center shadow-lg">

          <p className="text-sm text-white/80">

            Showing

          </p>

          <h2 className="font-bold text-xl">

            {filtered} / {total}

          </h2>

        </div>

      </div>

    </div>

  );

}