const effect= Symbol.for("stateful-function:effect")
function raiseEffect(fn){
	const effects= fn[ effect]
	if( !effects){
		retrun
	}
	effects.forEach( effect=> effect( fn))
}

const _state= new WeakMap()
export function useState( fn, val){
	// retrieve existing
	if( _state.has( fn)){
		return  state.get( fn)
	}

	// state
	let _val= val
	function setValue( val){
		const effected= val!== _val
		val= _val
		if(effected){
			raiseEffect(fn)
		}
	}

	const state= [ _val, setvalue]
	_state.set( state)
	return state
}

export function useEffect( fn, cb){
	const effects= fn[ effect]|| (fn[ effect]= [])
	effects.push( fn)
}

export function Context( val){
	return { context: val }
}

export function useContext( fn, ctx){
	
}
