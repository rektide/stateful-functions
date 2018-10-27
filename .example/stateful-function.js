import { useState, useEffect, useContext } from ".."


function a(){
	const [ getClicks, setClicks] = useState( a, 0)
	function click(){
		setClicks( getClicks()+ 1)
	}
	function reset(){
		setClicks( 0)
	}
	useEffect( a, _=> console.log(JSON.stringify({ type: "effect", clicks: getClicks()})))
	return {
		click,
		reset
	}
}

function doA(){
	console.log(JSON.stringify({ type: "doA" }))
	const { click, reset }= a()
	click()
	click()
	reset()
	click()
	click()
}

function doAAgain(){
	console.log(JSON.stringify({ type: "doAAgain" }))
	const { click, reset }= a()
	click()
	click()
	reset()
	click()
	click()
}

if( typeof require!== undefined&& require.main=== module){
	doA()
	doAAgain()
}
