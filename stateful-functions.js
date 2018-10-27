export { raiseEffect, RaiseEffect, useEffect, UseEffect} from "./effect.js"
export { useState, UseState} from "./state.js"
export { stack, Stack, stateful, Stateful, top, Top} from "./stateful.js"

export function Context( val){
	return { context: val }
}

export function useContext( fn, ctx){
}
