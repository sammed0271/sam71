import React from "react";

function Cards(){

    const data = [
        {   image: 'https://media.istockphoto.com/id/1322104312/photo/freedom-chains-that-transform-into-birds-charge-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=ppUQ4yMvcMkVFKL9yPh1n3w5iqFW5Gh59YL-6DjqQXg=' ,
            name: "Amazon Basics",
            discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis excepturi dolore, pariatur officiis dolorem.',
            instock: false},
        {   image: 'https://images.unsplash.com/photo-1709884735626-63e92727d8b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
            name: "Home & Garden",
            discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis excepturi dolore, pariatur officiis dolorem.',
            instock: true},
        {   image: 'https://media.istockphoto.com/id/1127245421/photo/woman-hands-praying-for-blessing-from-god-on-sunset-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=Fbysb-YHuALb_Jyi4Q8Lw2QEVIFa3WSaPsvneGr7Q_8=',
            name: "Sports & Outdoors",
            discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis excepturi dolore, pariatur officiis dolorem.',
            instock: false},
        {   image:'https://media.istockphoto.com/id/1009803562/photo/group-of-people-on-peak-mountain-climbing-helping-team-work-travel-trekking-success-business.webp?a=1&b=1&s=612x612&w=0&k=20&c=7EYGdSzQ2MnRx-xWBUFq2e3WLFg8-A1vm0M5BElDnso=',
            name: "Electronics",
            discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis excepturi dolore, pariatur officiis dolorem.',
            instock: true},
        {   image: 'https://media.istockphoto.com/id/1297349747/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey.webp?a=1&b=1&s=612x612&w=0&k=20&c=_bmMiOFI0Mto3gUdKETEcIujX-kbW-q69DUxMU5jPEw=',
            name: "Beauty & Health",
            discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae perspiciatis excepturi dolore, pariatur officiis dolorem.',
            instock: false}
    ];


    return (
        <div className='w-full h-screen flex items-center justify-center gap-10 bg-zinc-200'>
            {data.map((elem, index)=>(
                <div key={index} className='w-52 bg-zinc-100 rounded-md overflow-hidden'>
                    <div className='w-full h-32 bg-zinc-300 '>
                        <img className="w-full h-full object-cover" src={elem.image} alt="" />
                    </div>
                    <div className="w-full px-3 py-4">
                        <h2 className="font-semibold">{elem.name}</h2>
                        <p>{elem.discription}</p>
                        <button className={`px-4 py-1 ${elem.instock? 'bg-blue-700' : 'bg-red-300'} text-zinc-100 rounded-md text-xs mt-3`}>
                            {elem.instock? 'In Stock' : 'Out of Stock'}
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Cards;
