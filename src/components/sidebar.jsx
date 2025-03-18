import {useState} from 'react';

export default function NavBar() {
  const [open, setOpen] = useState(true);
  return (
    <>
      <nav className="shadow-md h-screen w-60 bg-teal-950 p-2">
        {/* header */}
        <div className="border px-3 py-2 h-20">
          <h1 className="text-xl text-white">Admin Dashboard</h1>
        </div>
      </nav>
    </>
  );
}
