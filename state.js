import { Top} from "./stateful.js"
import { Args} from "./symbol.js"

const _state= new WeakMap()

export function useState( val){
	const stateful= Top()

	// retrieve existing
	const existing= _state.get( stateful)
	if( existing){
		return existing
	}

	// state
	function getValue(){
		return state[ 0]
	}
	function setValue( val){
		const effected= val!== _val
		state[ 0]= val
		if( effected){
			// rerun ourselves
			stateful( ...stateful[ Args])
		}
	}

	// marshal, save & return
	const state= [ _val, setValue, getValue]
	_state.set( stateful, state)
	return state
}
export const UseState= useState
export default useState
