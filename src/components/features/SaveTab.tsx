export default function SaveTab() {
  return (
<div className="p-8 text-white text-center ">
      <h2 className="text-3xl font-bold mb-4">Learn</h2>
      <p className="mb-2">Get concise <span className="font-semibold text-cyan-300">article snapshots</span> for efficient learning.</p>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {/* Card 1 */}
        <div className="bg-[#1a2237] rounded-xl px-6 py-8 shadow-lg flex flex-col items-center min-h-[260px]">
          <div className="mb-5 w-full flex justify-center">
            {/* Simple Graph Icon */}
            <svg width="60" height="40"><polyline points="5,35 20,25 35,30 50,10 55,15" fill="none" stroke="#00bcd4" strokeWidth="3"/><circle cx="50" cy="10" r="3" fill="#fff"/><circle cx="20" cy="25" r="3" fill="#fff"/><circle cx="35" cy="30" r="3" fill="#fff"/></svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">You don’t know how to consistently improve your LLM products.</h3>
          <p className="text-cyan-200">Unlock the potential of your models with actionable insights.</p>
        </div>
        {/* Card 2 */}
        <div className="bg-[#1a2237] rounded-xl px-6 py-8 shadow-lg flex flex-col items-center min-h-[260px]">
          <div className="mb-5 w-full flex justify-center">
            {/* Speedometer Icon */}
            <svg width="60" height="40"><path d="M10,35 A20,20 0 0,1 50,35" fill="none" stroke="#00bcd4" strokeWidth="3"/><line x1="30" y1="35" x2="45" y2="25" stroke="#fff" strokeWidth="3"/><text x="15" y="38" fill="#fff" fontSize="10">30% efficiency</text></svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Your LLM products are too expensive or slow.</h3>
          <p className="text-cyan-200">Optimize costs and boost speed for better performance.</p>
        </div>
        {/* Card 3 */}
        <div className="bg-[#1a2237] rounded-xl px-6 py-8 shadow-lg flex flex-col items-center min-h-[260px]">
          <div className="mb-5 w-full flex justify-center">
            {/* Tools/Frameworks Icon */}
            <svg width="60" height="40"><rect x="10" y="25" width="12" height="10" fill="#00bcd4"/><rect x="28" y="20" width="12" height="15" fill="#00bcd4" opacity="0.7"/><rect x="46" y="28" width="8" height="7" fill="#00bcd4" opacity="0.5"/></svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">You are overwhelmed by tools/frameworks.</h3>
          <p className="text-cyan-200">Simplify your workflow with curated solutions.</p>
        </div>
        {/* Card 4 */}
        <div className="bg-[#1a2237] rounded-xl px-6 py-8 shadow-lg flex flex-col items-center min-h-[260px]">
          <div className="mb-5 w-full flex justify-center">
            {/* Lightbulb Icon */}
            <svg width="40" height="40"><ellipse cx="20" cy="18" rx="10" ry="13" fill="#00bcd4" opacity="0.5"/><rect x="16" y="28" width="8" height="8" rx="2" fill="#fff"/><line x1="20" y1="36" x2="20" y2="40" stroke="#fff" strokeWidth="2"/></svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">You need actionable, clear learning paths.</h3>
          <p className="text-cyan-200">Get step-by-step guidance to master new concepts.</p>
        </div>
      </div>
    </div>
  );
}
