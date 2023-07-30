import { useSelector } from "react-redux";

export function useAuth() {
    const { uid, displayName, email } = useSelector(state => state.auth)

    return {
        isAuth: !!email,
        displayName,
        uid,
        email
    }
}