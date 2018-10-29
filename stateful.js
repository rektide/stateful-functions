import setImmediateShim from "set-immediate-shim"
import { RaiseEffect} from "./effect.js"

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
	  wrapper= {[ name]: thisArg=== undefined? ( ...args)=> {
		const oldStack= _stack
		execStack= _stack= _stack.concat( wrapped)
		const val= inputFn.call( this, ...args)
		_stack= oldStack

		function raise(){
			const oldStack= _stack
			_stack= execStack
			RaiseEffect( wrapped)
			_stack= oldStack
		}
		(val&& val.then)? val.then( raise): setImmediateShim( raise)
		return val
	  }: thisArg!== null? function(){
		const oldStack= _stack
		execStack= _stack= _stack.concat( wrapped)
		const val= inputFn.call( thisArg, ...args)
		_stack= oldStack

		function raise(){
			const oldStack= _stack
			_stack= execStack
			RaiseEffect( wrapped)
			_stack= oldStack
		}
		(val&& val.then)? val.then( raise): setImmediateShim( raise)
		return val
	  }: function(){
		const oldStack= _stack
		execStack= _stack= _stack.concat( wrapped)
		const val= inputFn( ...args)
		_stack= oldStack

		function raise(){
			const oldStack= _stack
			_stack= execStack
			RaiseEffect( wrapped)
			_stack= oldStack
		}
		(val&& val.then)? val.then( raise): setImmediateShim( raise)
		return val
	  }},
	  wrapped= wrapper[ name]
	// wrapped.fn= fn
	return wrapped
}
export const Stateful= stateful
export default stateful


