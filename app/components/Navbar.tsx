interface page{
  page: String;
}

export default function Navbar({page}: page) {
  return (
    <nav className="flex justify-around flex-row bg-white border-b-2px border-solid border-black py-10px px-0 text-center w-full m-0">
      <div className="w-1/5 content-center">
        <a href="/constructor">
          <h2 className={`text-[2em] font-bold text-black m-0 ${page === 'constructor' ? 'underline decoration-black decoration-4 underline-offset-4':''}`}>
            Form Constructor
          </h2>
        </a>
      </div>
      <div className="w-1/5 content-center">
        <a href="/home">
          <h1 className={`text-[3.5em] font-bold text-black m-0 ${page === 'home' ? 'underline decoration-black decoration-4 underline-offset-4':''}`}>EvalForm</h1>
        </a>
      </div>
      <div className="w-1/5 content-center">
        <a href="/myforms">
          <h2 className={`text-[2em] font-bold text-black m-0 ${page === 'forms' ? 'underline decoration-black decoration-4 underline-offset-4':''}`}>My Forms</h2>
        </a>
      </div>
    </nav>
  );
}
