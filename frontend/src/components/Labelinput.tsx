interface LabelInputPropType{
    label : string,
    placeholder : string,
    onChange : any
}

export const LabelInput = ({label, placeholder, onChange} : LabelInputPropType) => {
    return <div className="min-w-xl">
        <div className="m-5">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={onChange} type="text" id="first_name" className=" w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}