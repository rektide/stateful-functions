//// state holding ////
// generally for internal use

const _stack= []
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
	const
	  name= inputFn.name+ "Stateful",
	  wrapper= {[ name]: thisArg=== undefined? ( ...args)=> {
		_stack.push( wrapped)
		const val= inputFn.call( this, ...args)
		_stack.pop()
		return val
	  }: thisArg!== null? function(){
		_stack.push( wrapped)
		const val= inputFn.call( thisArg, ...args)
		_stack.pop()
		return val
	  }: function(){
		_stack.push( wrapped)
		const val= inputFn( ...args)
		_stack.pop()
		return val
	  }},
	  wrapped= wrapper[ name]
	// wrapped.fn= fn
	return wrapped
}
export const Stateful= stateful
export default stateful


