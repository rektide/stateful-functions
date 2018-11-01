import stateful from "./stateful.js"

export async function *iterable( fn){
	let wake
	const
	  pending= [],
	  wrapped= stateful( fn, { ontick: function( val){
		pending.push( val)
		notify( pending)
	  })
	while( true){
		yield pop( pending)
	}
}

async function pop( arr){
	while( true){
		if( arr.length){
			return arr.pop()
		}
		await wait( arr)
	}
}

function notify( o){
	const listeners= _wait.get( o)
	if( !listeners){
		return
	}
	listeners.forEach( _run)
	_wait.set( o, [])
}
async function wait( o){
	const
	  defer= Defer(),
	  resolve= defer.resolve.bind( defer)
	  oldListeners= _wait.get( o)
	if( oldListeners){
		oldListeners.push( resolve)
	}else{
		_wait.set( o, [ resolve])
	}
	return defer.promise
}
const _wait= new WeakMap()
function _run( fn){
	fn()
}


