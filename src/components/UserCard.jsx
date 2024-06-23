

export default function UserCard({image  , name , jobTitle ,bio}){


    return(
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 p-4 justify-start cursor-pointer hover:bg-gray-100 rounded-md">
            {/* Avatar container */}
            <div className="w-14 md:w-20 h-14 md:h-20 rounded-full bg-gray-400 overflow-hidden">
                <img src={`${image}`} alt="user" className="w-full h-full"/>
            </div>
            {/* Details container */}
            <div className="flex flex-col gap-2">
                {/* name */}
                <p className="font-bold text-sm md:text-lg">{name}</p>
                {/* Job Title */}
                <p className="text-[11px] md:text-sm text-gray-400">{jobTitle}</p>
                {/* location */}
                <p className="text-[11px] md:text-sm text-gray-400">{bio}</p>
            </div>
        </div>
    )
}