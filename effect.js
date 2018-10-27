import { Effect} from "./symbol.js" 
import { Top} from "./stateful.js"

export function raiseEffect( stateful){
	const effects= stateful[ Effect]
	if( !effects){
		retrun
	}
	effects.forEach( effect=> effect( stateful))
}
export const RaiseEffect= raiseEffect

export function useEffect( cb){
	const
	  stateful= Top(),
	  effects= stateful[ Effect]|| (stateful[ Effect]= [])
	effects.push( cb)
}
export const UseEffect= useEffect
export default useEffect
