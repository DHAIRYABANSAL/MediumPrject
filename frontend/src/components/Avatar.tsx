export const Avatar = ({name = "Anonymous"} : {name : string | null | undefined}) => {
    return <div className="rounded-full bg-red-400 h-10 w-10 mt-3 ml-3 text-center flex flex-col justify-center">
                {name?.slice(0,1)}
            </div>
}