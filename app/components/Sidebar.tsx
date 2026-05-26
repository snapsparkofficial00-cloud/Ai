"use client";

import Link from "next/link";

const menuItems = [
{ name: "Dashboard", link: "/" },
{ name: "CEO Chat", link: "/ceo" },
{ name: "Control", link: "/control" },
{ name: "Terminal", link: "/terminal" },
];

export default function Sidebar() {
return (
<aside
className="
fixed
left-0
top-0
h-screen
w-[250px]
bg-[#020b2d]
border-r
border-[#0f172a]
p-5
"
>
<h1 className="text-cyan-400 text-4xl font-bold mb-10">
AI OS
</h1>

  <div className="space-y-3">
    {menuItems.map((item) => (
      <Link
        key={item.name}
        href={item.link}
        className="
          block
          bg-[#071338]
          hover:bg-[#10204d]
          rounded-xl
          px-5
          py-4
          text-white
          font-semibold
        "
      >
        {item.name}
      </Link>
    ))}
  </div>
</aside>

);
}
