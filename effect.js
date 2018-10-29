import { Effect, EffectCleanup} from "./symbol.js"
import { Top} from "./stateful.js"

//export function raiseEffect( stateful){
//	const effect= stateful[ Effect]
//	if( effect){
//		const cleanup= effect( stateful)
//		if( cleanup){
//			// record cleanup for next use
//			stateful[ EffectCleanup]= cleanup
//		}
//	}
//}
//export const RaiseEffect= raiseEffect

export function useEffect( cb){
	const stateful= Top()
	stateful[ Effect]= cb
}

export const UseEffect= useEffect
export default useEffect
