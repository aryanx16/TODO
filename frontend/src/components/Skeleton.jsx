export default function () {
    return (
        <>
            <div className='flex flex-col animate-pulse  items-center'>
                <div className='w-96 sm:w-[500px] md:w-[600px] h-8 bg-slate-900 mt-4 rounded-full'></div>
                <div className='flex justify-start w-96 sm:w-[500px] md:w-[600px] m-2'>
                    <div className='w-16 bg-slate-900 h-8 rounded-lg mx-1'></div>
                    <div className='w-16 bg-slate-900 h-8 rounded-lg'></div>
                </div>
                <div className='w-96 sm:w-[500px] md:w-[600px] bg-slate-900 h-2 rounded-full'></div>
            </div>
        </>
    )
}