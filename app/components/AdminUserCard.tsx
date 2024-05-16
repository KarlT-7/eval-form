export default function AdminUserCard({user}: any) {
    console.log(user)
  return (
    <div
      className="w-full flex flex-row justify-around p-4 m-auto border-solid border-black border-4 rounded items-center hover:bg-slate-300 
          transition duration-300 ease-in-out"
    >

    <h1>{user.email}</h1>

    <input
          className="text-xl font-bold text-[#066fba]"
          type="button"
          value="Edit"
          onClick={() => {
;
          }}
        />

    </div>
  );
}
