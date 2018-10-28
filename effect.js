import { Effect, EffectCleanup} from "./symbol.js"
import { Top} from "./stateful.js"

export function raiseEffect( stateful){
	const effect= stateful[ Effect]
	if( !effect){
		return
	}
	const cleanup= effect( stateful)
	if( cleanup){
		stateful[ EffectCleanup]= cleanup
	}
}
export const RaiseEffect= raiseEffect

export function useEffect( cb){
	const
	  stateful= Top(),
	  cleanup= stateful[ EffectCleanup]
	if( cleanup){
		cleanup( stateful)
	}
	stateful[ Effect]= cb
}
export const UseEffect= useEffect
export default useEffect
