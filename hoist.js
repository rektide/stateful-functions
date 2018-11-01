export function symlinkProps( src, target){
	const symlinks= {}
	for( const descriptor of getAllPropertyDescriptors(  src)){
		const name= descriptor.name|| descriptor.symbol
		if( target[ name]!== undefined){
			continue
		}
		symlinks[ name]= {
			configurable: descriptor.configurable,
			enumerable: descriptor.enumerable,
			get: function(){
				return src[ name]
			},
			set: function( value){
				src[ name]= value
			}
		}
	}
	Object.defineProperties( target, symlinks)
	return target
}
