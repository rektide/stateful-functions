import { Stack, Top} from "./stateful.js"
import { Context as ContextSymbol, ContextValue} from "./symbol.js"
import { RaiseEffect} from "./effect.js"

export class Context{
	constructor(){
	}
}


let currentContext= new WeakMap()
export function useContext( ctx){
	const
	  top= Top(),
	  cached= currentContext.get( top), // provider we are bound to now
	  stack= Stack()
	for( let i= stack.length- 1; i>= 0; --i){
		const
		  cursor= stack[ i],
		  map= cursor[ ContextSymbol],
		  found= map&& map.get( ctx)
		if( !found){
			continue
		}
		if( cached!== found){
			currentContext.set( ctx, cursor)
			if( cached){
				// de-listen to whomever we were listening to & listen to this new 
				const
				  listeners= cached[ ContextSymbol].get( ctx).listeners,
				  i= listeners.indexOf( top)
				listeners.splice( i, 1)
			}
		}
		console.log("found", found.value)
		found.listeners.push( top)
		return found.value
	}
	console.log("context failed")
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
