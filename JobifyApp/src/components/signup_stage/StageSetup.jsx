import TButton from "../core/TButton";

export default function StageSetup({handleregTypeSelection}) {
  return (
    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className="mt-6 text-center text-2xl md:text-3xl tracking-tight text-slate-800">Are you a registering as an Individual or Organisation?</h2>
        
        <div className="flex mt-10 items-center justify-center space-x-8">
            <TButton
              transparent={true}
              onClick={() => handleregTypeSelection('individual')}
              className="md:text-lg"
            >
            Individual
            </TButton>
            <TButton
              transparent={true}
              onClick={() => handleregTypeSelection('company')}
              className="md:text-lg"
            >
              Organisation
            </TButton>
        </div>
    </div>
  )
}
