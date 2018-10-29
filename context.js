import { Stack, Top} from "./stateful.js"
import { Context as ContextSymbol, ContextValue} from "./symbol.js"
import { RaiseEffect} from "./effect.js"

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
		if( value!== undefined){
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
			listeners.splice( i, 1)
		}
	}
	if( !provider){
		return
	}
	console.log("useContext", JSON.stringify(provider))
	provider.value.listeners.push( top)
	return provider.value.value
}

export function provideContext( ctx, val){
	const
	  stateful= Top(),
	  map= stateful[ ContextSymbol]|| (stateful[ ContextSymbol]= new WeakMap()),
	  existing= map.get( ctx)
	if( existing){
		const changed= existing.value!== val
		if( changed){
			existing.value= val
			for( let listener of existing.listeners){
				RaiseEffect( listener)
			}
		}
	}else{
		map.set( ctx, { value: val, listeners: []})
	}
}
