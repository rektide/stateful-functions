import { Effect, EffectCleanup} from "./symbol.js"
import { Top} from "./stateful.js"

export function useEffect( cb){
	const stateful= Top()
	stateful[ Effect]= cb
}

export const UseEffect= useEffect
export default useEffect
