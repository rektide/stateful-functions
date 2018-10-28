import { stateful, useState, useEffect, useContext, provideContext, Context, Top } from ".."

const ctx= new Context()

function a( name){
	const [ getClicks, setClicks] = useState( 0)
	function click(){
		setClicks( getClicks()+ 1)
	}
	function reset(){
		setClicks( 0)
	}
	useEffect( _=> console.log(JSON.stringify({ type: "effect", name, clicks: getClicks()})))
	const c= useContext( ctx)
	if( c){
		console.log(JSON.stringify({ type: "context-found", name }))
	}
	return {
		click,
		reset
	}
}

function doA(){
	console.log(JSON.stringify({ type: "doA" }))
	const { click, reset }= stateful( a)( "doA")
	click()
	click()
	reset()
	click()
	click()
}

function doAAgain(){
	console.log(JSON.stringify({ type: "doAAgain" }))
	const { click, reset }= stateful( a)( "doAAgain")
	click()
	click()
	reset()
	click()
	click()
}

function doAsInterleaved(){
	console.log(JSON.stringify({ type: "doAsInterleaved" }))
	const
	  { click: click1, reset: reset1}= stateful( a)( "doAsInterleaved1"),
	  { click: click2, reset: reset2}= stateful( a)( "doAsInterleaved2")
	click1()
	click2()
	reset1()
	click1()
	click2()
}

function doContext(){
	const
	  name= "doContext",
	  outter= stateful( a)
	console.log(JSON.stringify({ type: name, step: 0}))
	//outter( "no-context-1") // doesnt find context doesn't show
	const runner= stateful( function(){
		//const inner= stateful( a)
		//inner( "no-context-2") // doesn't find context
		outter( "no-context-3") // doesn't find context
		provideContext( ctx,{ magic: "content"})
		//inner( name+ "1") // finds context!
		outter( name+ "1") // finds context!
		provideContext( ctx,{ magic: "beans"})
		//inner( name+ "2") // finds context!
		outter( name+ "2") // finds context!
	})()
	outter( "no-context-4") // again does not find context
	console.log(JSON.stringify({ type: "x"}))
}

if( typeof require!== undefined&& require.main=== module){
	doA()
	doAAgain()
	doAsInterleaved()
	doContext()
}
