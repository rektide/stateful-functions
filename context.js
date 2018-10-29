import { Stack, Top} from "./stateful.js"
import { Args, Context as ContextSymbol, ContextValue} from "./symbol.js"
export class Context{
	constructor(){
	}
}

function walkStackTo( ctx, stack= Stack()){
	for( let i= stack.length- 1; i>= 0; i--){
		const
		  provider= stack[ i],
		  ctxs= provider[ ContextSymbol],
		  value= ctxs&& ctxs.get( ctx)
		if( value){
			return {
			  ctx,
			  provider,
			  value
			}
		}
	}
}

let currentContext= new WeakMap()
export function useContext( ctx){
	const
	  top= Top(),
	  cached= currentContext.get( top),
	  provider= walkStackTo( ctx),
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

export function provideContext( ctx, val){
	const
	  stateful= Top(),
	  contexts= stateful[ ContextSymbol]|| (stateful[ ContextSymbol]= new WeakMap()),
	  context= contexts.get( ctx)
	if( context){
		const changed= context.value!== val
		if( changed){
			context.value= val
			for( let listener of context.listeners){
				const args= listener[ Args]
				listener( ...args)
			}
		}
	}else{
		contexts.set( ctx, { value: val, listeners: []})
	}
}
