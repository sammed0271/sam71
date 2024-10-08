import React from "react";

function Card(){
    const data = [
        {
            name: "Mahiya Ve",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, est.",
            link: "https://example.com"
        },
        {
            name: "Aaj Ki Raat",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, est.",
            link: "https://example.com"
        },
        {
            name: "Doli Saja Ke Rakhna",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, est.",
            link: "https://example.com"
        },
        {
            name: "Tainu Khabar Nahi",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, est.",
            link: "https://example.com"
        },
        {
            name: "Dil Tu Jaan Tu",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, est.",
            link: "https://example.com"
        }
    ]

    const handleClickDownload = ()=>{alert("Ye chal raha hai. huryy!!")}; 

    return (
        <div className='w-full h-screen bg-zinc-800 flex flex-col gap-4 justify-center items-center'>
            {data.map((item, index) => (
                <div className='w-90 px-3 py-2 bg-zinc-100 rounded-md '>
                    <h3 className="font-semibold text-xl">{item.name}</h3>
                    <p className="text-xs mt-2">{item.description}</p>
                    <button onClick={handleClickDownload} className='px-2 py-1 mt-2 text-zinc-100 bg-blue-500 rounded-md'>Download</button>
                </div>
            ))}
        </div>
    );
}

export default Card;
