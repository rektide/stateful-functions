import { Args, Context, Effect, EffectCleanup} from "./symbol.js"

//// state holding ////
// generally for internal use

let _stack= []
export function stack(){
	return _stack
}
export const Stack= stack
export function top(){
	const top= _stack[ _stack.length- 1]
	return top
}
export const Top= top

//// interface ////

/**
 * Turn a vanilla function into a stateful function
 * @param {function} inputFn - a function to build a stateful wraper for
 * @param [thisArg] - optional "this" to call inputFn with. By default, will pass through `this`. if null, will pass nothing ever, but is faster.
 * @returns {function} a "wrapped" version of the inputFn with stateful behaviors
 */
export function stateful( inputFn, { thisArg}= {}){
	let execStack
	const
	  name= inputFn.name+ "Stateful",
	  call= thisArg=== undefined? ( args)=> {
		return inputFn.call( this, ...args)
	  }: thisArg!== null? function( args){
		return inputFn.call( thisArg, ...args)
	  }: function( args){
		return inputFn( ...args)
	  },
	  wrapper= {[ name]: function( ...args){
		const oldStack= _stack
		execStack= _stack= _stack.concat( wrapped)

		const cleanup= wrapped[ EffectCleanup]
		if( cleanup){
			cleanup()
			wrapped[ EffectCleanup]= null
		}

		wrapped[ Args]= args
		const
		  val= call( args),
		  effect= wrapped[ Effect]
		if( effect){
			wrapped[ Effect]= null
			const cleanup= effect()
			if( cleanup){
				wrapped[ EffectCleanup]= cleanup
			}
		}
		_stack= oldStack
		//wrapped[ Context]= null
		return val
	  }},
	  wrapped= wrapper[ name]
	// wrapped.fn= fn
	return wrapped
}
export const Stateful= stateful
export default stateful


