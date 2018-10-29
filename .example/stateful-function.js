import { stateful, useState, useEffect, useContext, provideContext, Context, Top } from ".."

const ctx= new Context()

function a( name){
	const [ , setClicks, getClicks] = useState( 0)
	function click(){
		setClicks( getClicks()+ 1)
	}
	function reset(){
		setClicks( 0)
	}
	useEffect( _=> {
		console.log(JSON.stringify({ type: "effect", name, clicks: getClicks()}))
		return ()=> console.log(JSON.stringify({ type: "effect-cleanup", name, clicks: getClicks()}))
	})
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
	console.log(JSON.stringify({ type: "doContext", step: 0}))
	stateful( a)( "no-context-1") // doesnt find context doesn't show
	const runner= stateful( function exec(){
		stateful( a)( "no-context-2") // doesn't find context
		provideContext( ctx,{ magic: "content"})
		stateful( a)( "doContext-content") // finds context!
		provideContext( ctx,{ magic: "beans"})
		//stateful( a)( "doContent-beans") // finds context!
	})
	runner()
	console.log("break")
	runner()
	stateful( a)( "no-context-3") // again does not find context
}

if( typeof require!== undefined&& require.main=== module){
	doA()
	doAAgain()
	doAsInterleaved()
	doContext()
}
