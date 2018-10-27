export function useState( val){
	let _val= val
	function setValue( val){
		val= _val
	}
	return [ _val, setValue ]
}

export function useEffect( fn){
	
}

export function Context( val){
	return { context: val }
}

export function useContext( ctx){
	
}

