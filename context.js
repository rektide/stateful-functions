import { Stack} from "./stateful.js"
import { Context as ContextSymbol, ContextValue} from "./symbol.js"

export class Context{
	constructor( value){
		this.value= value
	}
	get value(){
		return this[ ContextValue]
	}
	set value( value){
		this[ ContextValue]= value
	}
}

export function useContext( ctx){
	const stack= Stack()
	for( let i= stack.length- 1; i> 0; --i){
		const
		  cursor= stack[ i],
		  map= cursor[ ContextSymbol],
		  existing= map&& map.get( ctx)
		if( existing){
			return existing
		}
	}
}

export function provideContext( ctx, val){
	const
	  stateful= Top(),
	  map= stateful[ ContextSymbol]|| (stateful[ ContextSymbol]= new WeakMap())
	map.set( ctx, val)
}
