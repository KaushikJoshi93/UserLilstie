

export default function Loader() {

    return (
        <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='md:h-8 h-4 md:w-8 w-4 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='md:h-8 h-4 md:w-8 w-4 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='md:h-8 h-4 md:w-8 w-4 bg-blue-400 rounded-full animate-bounce'></div>
        </div>
    )
}