import { Stack, Top} from "./stateful.js"
import { Args} from "./symbol.js"
export class Context{
	constructor(){
	}
}

// 
const _contexts= new WeakMap()

function walkContextsTo( ctx, stack= Stack()){
	while( stack.length){
		const
		  ctxs= _contexts.get( stack),
		  value= ctx&& ctx.get( ctx)
		if( value){
			return {
			  ctx,
			  stateful: stack[ stack.length- 1],
			  value
			}
		}
		stack= stack[ stack.length- 2]
	}
}

let currentContext= new WeakMap()
export function useContext( ctx){
	const
	  top= Top(),
	  cached= currentContext.get( top),
	  provider= walkContextsTo( ctx),
	  value= provider&& provider.value
	if( cached!== value){
		currentContext.set( top, value)
		if( cached){
			// de-listen to whomever we were listening to & listen to this new
			const
			  listeners= cached.listeners,
			  i= listeners.indexOf( cached)
			if( i!== -1){
				listeners.splice( i, 1)
			}
		}
		if( provider&& provider.value){
			provider.value.listeners.push( top)
		}
	}
	return provider&& provider.value&& provider.value.value
}

export function provideContext( ctx, value){
	const
	  stack= Stack(),
	  hadCtxs= _contexts.get( stack),
	  newCtxs= !hadCtxs&& new WeakMap(),
	  ctxs= hadCtxs|| newCtxs,
	  oldCtx= hadCtxs&& hadCtxs.get( ctx),
	  changed= oldCtx&& oldCtx.value!== value
	if( newCtxs){
		_contexts.set( stack, newCtxs)
	}
	if( !oldCtx){
		ctxs.set( ctx, { value, listeners: []})
	}else{
		oldCtx.value= value
	}
	if( changed){
		for( let listener of oldCtx.listeners){
			const args= listener[ Args]
			listener( ...args)
		}
	}
}
