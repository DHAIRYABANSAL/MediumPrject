import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return <div className="grid grid-cols-1 sm:grid-cols-2">
        <div>
            <Auth type="signup"/>
        </div>
        <div className="invisible sm:visible">
            <Quote />
        </div>

    </div>
}