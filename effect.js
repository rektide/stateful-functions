import { Effect, EffectCleanup, EffectCleanupPending} from "./symbol.js"
import { Top} from "./stateful.js"

export function raiseEffect( stateful){
	const effect= stateful[ Effect]
	if( !effect){
		return
	}
	const cleanup= effect( stateful)
	if( cleanup){
		// record cleanup for next use
		stateful[ EffectCleanup]= cleanup
	}
}
export const RaiseEffect= raiseEffect

export function useEffect( cb){
	const
	  stateful= Top(),
	  cleanup= stateful[ EffectCleanup]
	if( cleanup){
		// a new cb is showing up, cleanup old
		cleanup( stateful)
		stateful[ EffectCleanup]= null
	}
	stateful[ Effect]= cb
}
export const UseEffect= useEffect
export default useEffect
