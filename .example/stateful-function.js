import { stateful, useState, useEffect, useContext, Top } from ".."


function a( name){
	const [ getClicks, setClicks] = useState( 0)
	function click(){
		setClicks( getClicks()+ 1)
	}
	function reset(){
		setClicks( 0)
	}
	useEffect( _=> console.log(JSON.stringify({ type: "effect", name, clicks: getClicks()})))
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

if( typeof require!== undefined&& require.main=== module){
	doA()
	doAAgain()
	doAsInterleaved()
}
