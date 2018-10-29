import { stateful, useState, useEffect, useContext, provideContext, Context, Top } from ".."

const ctx= new Context()

function a( name){
	const [ clicks, setClicks, getClicks] = useState( 0)
	function click(){
		setClicks( getClicks()+ 1)
	}
	function reset(){
		setClicks( 0)
	}
	const context= useContext( ctx)
	if( context){
		console.log(JSON.stringify({ type: "ctx", name, context }))
	}
	useEffect( _=> {
		console.log(JSON.stringify({ type: "eff", name, context, clicks}))
		return ()=> console.log(JSON.stringify({ type: "cln", name, context, clicks}))
	})
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
	const fn= stateful( a)
	fn( "no-context-setup")
	const runner= stateful( function exec( pass){
		fn( "no-context-running-"+ pass)
		provideContext( ctx,{ magic: "content"})
		provideContext( ctx,{ magic: "beans"})
		fn( "has-context-beans-"+ pass)
		provideContext( ctx,{ magic: "beanstalk"})
		provideContext( ctx,{ magic: "clouds"})
		fn( "has-context-clouds-"+ pass)
		provideContext( ctx,{ magic: "castle"})
	})
	fn("runner-defined")
	runner("run1")
	fn("run-1")

	console.log()
	runner("run2")
	fn("run-2")
}

if( typeof require!== undefined&& require.main=== module){
	doA()
	doAAgain()
	doAsInterleaved()
	doContext()
}
