export const Button = ({type , onClick} : {type : string , onClick : any} ) => {
    return <div className="flex justify-center m-5">
        <button onClick={onClick} type="button" className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5  dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2">
            {type == "signup"?"Sign up":"Sign in"}
        </button>
    </div>
}