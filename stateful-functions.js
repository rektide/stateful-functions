import { Effect} from "symbol.js" 

function raiseEffect(fn){
	const effects= fn[ Effect]
	if( !effects){
		retrun
	}
	effects.forEach( effect=> effect( fn))
}

const _state= new WeakMap()
export function useState( val){
	// retrieve existing
	if( _state.has( fn)){
		return  state.get( fn)
	}

	// state
	let _val= val
	function getValue(){
		return _val
	}
	function setValue( val){
		const effected= val!== _val
		_val= val
		if( effected){
			raiseEffect( fn)
		}
	}

	// marshal, save & return
	const state= [ getValue, setValue]
	_state.set( state)
	return state
}

export function useEffect( fn, cb){
	const effects= fn[ Effect]|| (fn[ Effect]= [])
	effects.push( cb)
}

export function Context( val){
	return { context: val }
}

export function useContext( fn, ctx){
	
}

const stack= []
export function stateful( fn, thisArg){
	const wrapper= thisArg=== undefined? function( ...args){
		stack.push( wrapper)
		fn( ...args)
		stack.pop()
	}: function(){
		stack.push( wrapper)
		fn.call( thisArg, ...args)
		stack.pop()
	}
	// wrapper.fn= fn
	return wrapper
}
