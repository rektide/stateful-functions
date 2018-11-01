import { Args, Effect, EffectCleanup} from "./symbol.js"

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
 * @returns {function} a "wrapped" stateul version of the inputFn with stateful behaviors
 */
export function stateful( inputFn, { ontick, thisArg}= {}){
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
		// add ourselves to stack
		const oldStack= _stack
		execStack= _stack= _stack.concat( oldStack, wrapped)

		// cleanup any existing run
		const cleanup= wrapped[ EffectCleanup]
		if( cleanup){
			cleanup()
			wrapped[ EffectCleanup]= null
		}

		// save args & run
		wrapped[ Args]= args
		const
		  val= call( args),
		  effect= wrapped[ Effect]
		// our "render" event just happened
		if( ontick){
			ontick( val, wrapped)
		}

		// run new effects
		if( effect){
			// clear effects
			wrapped[ Effect]= null
			// run
			const cleanup= effect()
			if( cleanup){
				// save cleanup
				wrapped[ EffectCleanup]= cleanup
			}
		}

		// restore stack
		_stack= oldStack
		return val
	  }},
	  wrapped= wrapper[ name]
	return wrapped
}
export const Stateful= stateful
export default stateful


